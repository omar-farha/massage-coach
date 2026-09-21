-- Captain Sultan | Home Massage Booking Platform
-- Initial schema: services, customers, bookings, availability, blocked_dates
-- Includes RLS policies and a database-level guard against double booking.

create extension if not exists "pgcrypto";

-- ============================================================
-- updated_at helper
-- ============================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================
-- services
-- ============================================================
create table public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  duration int not null check (duration > 0),
  price numeric(10, 2) not null check (price >= 0),
  image_url text,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger services_set_updated_at
  before update on public.services
  for each row execute function public.set_updated_at();

alter table public.services enable row level security;

create policy "public can view active services"
  on public.services for select
  to anon
  using (active = true);

create policy "captain can manage services"
  on public.services for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- customers (never exposed to anon directly)
-- ============================================================
create table public.customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  area text not null,
  address text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index customers_phone_key on public.customers (phone);

create trigger customers_set_updated_at
  before update on public.customers
  for each row execute function public.set_updated_at();

alter table public.customers enable row level security;

create policy "captain can manage customers"
  on public.customers for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- bookings
-- ============================================================
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers (id) on delete cascade,
  service_id uuid not null references public.services (id) on delete restrict,
  booking_date date not null,
  start_time time not null,
  end_time time not null,
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled', 'completed')),
  total_price numeric(10, 2) not null check (total_price >= 0),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  time_range tsrange generated always as (
    tsrange((booking_date + start_time), (booking_date + end_time), '[)')
  ) stored,
  constraint bookings_time_order check (end_time > start_time),
  exclude using gist (time_range with &&) where (status <> 'cancelled')
);

create index bookings_date_idx on public.bookings (booking_date);
create index bookings_service_idx on public.bookings (service_id);
create index bookings_customer_idx on public.bookings (customer_id);
create index bookings_status_idx on public.bookings (status);

create trigger bookings_set_updated_at
  before update on public.bookings
  for each row execute function public.set_updated_at();

alter table public.bookings enable row level security;

create policy "captain can manage bookings"
  on public.bookings for all
  to authenticated
  using (true)
  with check (true);

-- Anonymous customers never query bookings directly; they go through
-- the public_booking_slots view (busy times only) and the
-- create_booking() function below.

-- ============================================================
-- availability (working schedule)
-- ============================================================
create table public.availability (
  id uuid primary key default gen_random_uuid(),
  day_of_week int not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  active boolean not null default true,
  constraint availability_time_order check (end_time > start_time)
);

create unique index availability_day_key on public.availability (day_of_week);

alter table public.availability enable row level security;

create policy "public can view availability"
  on public.availability for select
  to anon, authenticated
  using (true);

create policy "captain can manage availability"
  on public.availability for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- blocked_dates / blocked_times
-- ============================================================
create table public.blocked_dates (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  start_time time,
  end_time time,
  reason text
);

create index blocked_dates_date_idx on public.blocked_dates (date);

alter table public.blocked_dates enable row level security;

create policy "public can view blocked dates"
  on public.blocked_dates for select
  to anon, authenticated
  using (true);

create policy "captain can manage blocked dates"
  on public.blocked_dates for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- Public view: busy time ranges only (no customer data)
-- ============================================================
create view public.public_booking_slots
  with (security_invoker = false) as
  select booking_date, start_time, end_time
  from public.bookings
  where status <> 'cancelled';

grant select on public.public_booking_slots to anon, authenticated;

-- ============================================================
-- create_booking(): the only way anonymous visitors create bookings.
-- Runs as SECURITY DEFINER so it can find-or-create a customer and
-- insert a booking without ever granting anon direct table access.
-- The exclusion constraint above guarantees no double booking even
-- under concurrent requests.
-- ============================================================
create or replace function public.create_booking(
  p_service_id uuid,
  p_booking_date date,
  p_start_time time,
  p_name text,
  p_phone text,
  p_area text,
  p_address text,
  p_notes text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_customer_id uuid;
  v_duration int;
  v_price numeric(10, 2);
  v_end_time time;
  v_booking_id uuid;
begin
  if p_name is null or length(trim(p_name)) < 2 then
    raise exception 'الاسم غير صحيح';
  end if;
  if p_phone is null or length(trim(p_phone)) < 8 then
    raise exception 'رقم الموبايل غير صحيح';
  end if;
  if p_area is null or length(trim(p_area)) < 2 then
    raise exception 'المنطقة غير صحيحة';
  end if;
  if p_address is null or length(trim(p_address)) < 3 then
    raise exception 'العنوان غير صحيح';
  end if;

  select duration, price into v_duration, v_price
  from public.services
  where id = p_service_id and active = true;

  if not found then
    raise exception 'الخدمة غير متاحة حاليًا';
  end if;

  v_end_time := p_start_time + make_interval(mins => v_duration);

  select id into v_customer_id from public.customers where phone = trim(p_phone) limit 1;

  if v_customer_id is null then
    insert into public.customers (name, phone, area, address)
    values (trim(p_name), trim(p_phone), trim(p_area), trim(p_address))
    returning id into v_customer_id;
  else
    update public.customers
    set name = trim(p_name), area = trim(p_area), address = trim(p_address)
    where id = v_customer_id;
  end if;

  begin
    insert into public.bookings (customer_id, service_id, booking_date, start_time, end_time, total_price, notes)
    values (v_customer_id, p_service_id, p_booking_date, p_start_time, v_end_time, v_price, nullif(trim(coalesce(p_notes, '')), ''))
    returning id into v_booking_id;
  exception
    when exclusion_violation then
      raise exception 'للأسف هذا الموعد تم حجزه للتو، من فضلك اختر وقتًا آخر';
  end;

  return v_booking_id;
end;
$$;

grant execute on function public.create_booking(uuid, date, time, text, text, text, text, text) to anon, authenticated;
