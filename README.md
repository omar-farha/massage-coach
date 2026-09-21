# كابتن سلطان للمساج المنزلي

موقع احترافي كامل + نظام حجز أونلاين + لوحة تحكم خاصة لكابتن سلطان، مبني بـ Next.js 16 (App Router) و Supabase.

## المكدس التقني

- Next.js 16 (App Router, TypeScript, Turbopack)
- Tailwind CSS 4
- Framer Motion + Lucide React
- Supabase (Postgres + Auth)
- React Hook Form + Zod
- date-fns

## الإعداد

### 1. تثبيت الحزم

```bash
npm install
```

### 2. إنشاء مشروع Supabase

1. أنشئ مشروعًا جديدًا على [supabase.com](https://supabase.com).
2. من **SQL Editor**، شغّل الملفين بالترتيب:
   - `supabase/migrations/0001_init.sql` — الجداول، الحماية (RLS)، ودالة الحجز الآمنة، والقيد الذي يمنع تعارض المواعيد.
   - `supabase/migrations/0002_seed.sql` — الخدمات الثمانية الأساسية وجدول العمل الافتراضي (يوميًا 10:00 - 22:00).
3. من **Authentication > Users**، أنشئ مستخدمًا واحدًا لكابتن سلطان (بريد إلكتروني وكلمة مرور) — هذا هو حساب الدخول للوحة التحكم. لا حاجة لنظام تسجيل عملاء.

### 3. متغيرات البيئة

انسخ `.env.example` إلى `.env.local` وضع بيانات مشروعك (من Project Settings > API):

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
```

لا حاجة لمفتاح `service_role` إطلاقًا — كل الصلاحيات تُدار عبر RLS ودالة `create_booking` الآمنة (`SECURITY DEFINER`).

### 4. التشغيل محليًا

```bash
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) للموقع، و [http://localhost:3000/login](http://localhost:3000/login) للوحة تحكم كابتن سلطان.

## كيف يعمل نظام الحجز

- الحجز العام (بدون تسجيل دخول) يمر حصريًا عبر دالة Postgres باسم `create_booking` تعمل بصلاحيات `SECURITY DEFINER`، فلا يحتاج زوار الموقع أي صلاحية مباشرة على جداول العملاء أو الحجوزات.
- منع تعارض المواعيد مضمون على مستوى قاعدة البيانات عبر **Exclusion Constraint** (`EXCLUDE USING gist`) على نطاق وقت كل حجز، وليس فقط في كود التطبيق — هذا يمنع الحجز المزدوج حتى في حالة الطلبات المتزامنة.
- جدول `public_booking_slots` view يعرض فقط أوقات الحجوزات المشغولة (بدون بيانات العميل) للسماح بحساب المواعيد المتاحة بأمان.

## البنية

```
app/                    # صفحات Next.js (App Router)
  page.tsx              # الصفحة الرئيسية
  booking/               # صفحة الحجز
  login/                 # تسجيل دخول الكابتن
  dashboard/             # لوحة التحكم (محمية)
components/
  navbar/ hero/ sections/ services/ footer/   # أقسام الصفحة الرئيسية
  booking/               # خطوات الحجز
  dashboard/             # مكونات لوحة التحكم
  auth/                  # نموذج تسجيل الدخول
  ui/                    # مكونات أساسية قابلة لإعادة الاستخدام
lib/
  supabase/              # عملاء Supabase (متصفح / سيرفر / middleware)
  booking/               # منطق الحجز والتوفر والتحقق (zod)
  dashboard/              # server actions للوحة التحكم
  constants.ts           # نصوص، مناطق الخدمة، صور
supabase/migrations/      # سكريبتات قاعدة البيانات
types/                    # أنواع TypeScript + تعريف قاعدة البيانات
```

## النشر على Vercel

1. ادفع المشروع إلى مستودع Git.
2. أنشئ مشروعًا جديدًا على Vercel واربطه بالمستودع.
3. أضف متغيرات البيئة نفسها (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) في إعدادات المشروع على Vercel.
4. انشر — لا حاجة لأي إعداد بنية تحتية إضافي.

## ملاحظات

- الصور المستخدمة في الموقع صور تعبيرية عالية الجودة (Unsplash) بدون أي أشخاص حقيقيين مرتبطين بالكابتن سلطان، حسب متطلبات المشروع.
- الأسعار والمدد الظاهرة في قسم الخدمات قابلة للتعديل بالكامل من لوحة التحكم دون الحاجة لتعديل الكود.
