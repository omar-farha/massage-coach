You are building a complete production-ready website and dashboard for a premium home massage business.

IMPORTANT:
DO NOT stop after planning.
DO NOT give me a plan and wait for approval.
DO NOT repeatedly ask me for permission.
DO NOT ask me what decision to make when a reasonable professional decision can be made.
DO NOT split the implementation into multiple approval stages.

I want you to execute the entire project from start to finish in this task.

First inspect the existing project structure and understand what already exists.

Then implement the complete website, booking system, database structure, authentication, dashboard and responsive UI described below.

If something is not explicitly specified, make a reasonable professional decision that fits the brand and continue.

Only ask me a question if you are genuinely blocked by something that cannot reasonably be decided or implemented without my input.

Otherwise, make the decision yourself and keep building until the complete project is finished.

==================================================

1. # PROJECT

Build a complete professional website for:

Captain Sultan
كابتن سلطان للمساج المنزلي

Business type:
Premium home massage service.

Main purpose:

1. Customer-facing professional landing page.
2. Customers can browse massage services.
3. Customers can choose a service.
4. Customers can choose an available date and time.
5. Customers can enter their information.
6. Customers can confirm a booking.
7. The booking appears immediately in the Captain's dashboard.
8. Captain can manage bookings, customers, services and availability.

The final result should feel like a real premium business website, not a generic AI-generated template.

# ================================================== 2. EXECUTION RULES

Follow these rules throughout the entire project:

- Execute the complete implementation in one go.
- Do not wait for approval between steps.
- Do not repeatedly ask questions.
- Make reasonable design and technical decisions yourself.
- Do not over-engineer.
- Follow the exact scope of this project.
- Do not add unrelated features.
- If a small detail is missing, choose the most professional simple solution.
- Do not turn this into a SaaS platform.
- Do not create unnecessary abstractions.
- Do not rewrite working code unnecessarily.
- Do not modify unrelated parts of the project.
- Keep the implementation clean and maintainable.

If you encounter an error:

- diagnose it
- fix it
- continue

Do not stop just because something needs debugging.

Do not run Playwright, automated screenshots, full-project QA, database seeding, or unrelated debugging unless genuinely required to complete the requested functionality.

Perform only a reasonable final sanity check after implementation.

Then stop.

# ================================================== 3. BRAND

Brand name:

Captain Sultan

Arabic:

كابتن سلطان للمساج المنزلي

The provided logo is the main visual identity reference.

The logo uses:

- deep navy blue
- luxury gold
- Arabic decorative elements
- elegant premium style

Use the logo throughout the website where appropriate.

Do not redesign the logo.

# ================================================== 4. COLOR PALETTE

Use this palette:

Primary Navy:
#0B1F3A

Deep Navy:
#071426

Luxury Gold:
#C9A55C

Light Gold:
#E4CC91

Cream:
#F7F4ED

White:
#FFFFFF

Main Text:
#172033

Muted Text:
#697386

IMPORTANT:

The main website background should be WHITE / very light cream.

Do NOT make the entire website dark.

Use navy and gold as accents.

Gold should be used carefully and elegantly.

The website should feel:

Luxury
Premium
Calm
Clean
Professional
Trustworthy
Modern
Elegant
Arabic

# ================================================== 5. LANGUAGE

The entire customer-facing website is Arabic only.

Use natural Egyptian Arabic where appropriate.

The design must be RTL.

Use professional Arabic copy.

Do not use awkward literal translations.

The dashboard should also be Arabic and RTL.

# ================================================== 6. TECHNOLOGY STACK

Use:

Frontend:

- Next.js 15+
- App Router
- TypeScript
- Tailwind CSS

Animations:

- Framer Motion

Icons:

- Lucide React

Backend:

- Supabase

Database:

- Supabase PostgreSQL

Authentication:

- Supabase Auth

Storage:

- Supabase Storage if image uploads are needed

Forms:

- React Hook Form

Validation:

- Zod

Date handling:

- date-fns

Deployment:

- Vercel

Do not add a large UI framework unless genuinely necessary.

Prefer custom Tailwind components.

# ================================================== 7. PROJECT STRUCTURE

Keep the architecture clean.

Suggested structure:

app/
page.tsx
booking/
dashboard/
dashboard/bookings/
dashboard/calendar/
dashboard/customers/
dashboard/services/
dashboard/availability/
dashboard/settings/

components/
navbar/
hero/
services/
booking/
dashboard/
ui/

lib/
supabase/
booking/
utils/

types/

Do not blindly follow this exact structure if the existing project has a better structure.

Use good judgment.

# ================================================== 8. LANDING PAGE

Create a complete premium landing page.

Sections:

1. Navbar
2. Hero
3. Trust / Experience
4. Services
5. Why Captain Sultan
6. About Captain Sultan
7. How It Works
8. Service Areas
9. FAQ
10. Booking CTA
11. Footer

The page should feel like one cohesive premium experience.

# ================================================== 9. NAVBAR

Create a premium responsive navbar.

Include:

Logo

Navigation:

الرئيسية
الخدمات
عن كابتن سلطان
المناطق
الأسئلة الشائعة

Main CTA:

احجز موعدك

The booking button should be prominent.

Navbar should:

- be clean
- have subtle shadow/border
- transition smoothly while scrolling
- become slightly more compact on scroll
- work perfectly on mobile

Mobile:

- animated menu
- clean navigation
- prominent booking CTA

# ================================================== 10. HERO

Create a visually impressive hero.

Do not make it a generic centered heading.

Main headline:

"راحة تستحقها... في المكان اللي تحبه"

Supporting text:

"كابتن سلطان للمساج المنزلي يقدم لك تجربة مساج احترافية ومريحة في منزلك، مع اهتمام بالتفاصيل والالتزام بالموعد."

Primary CTA:

"احجز موعدك الآن"

Secondary CTA:

"اكتشف خدماتنا"

Hero should include a premium AI-generated/stock-style massage visual.

Visual direction:

- elegant home massage
- luxury interior
- relaxing atmosphere
- warm natural lighting
- professional massage environment
- premium wellness aesthetic

Do NOT create an AI image that looks like the actual Captain Sultan.

Use the brand colors subtly.

Hero animation:

- smooth text reveal
- image reveal
- subtle parallax
- floating decorative gold elements
- button hover animation
- elegant entrance animations

Do not over-animate.

# ================================================== 11. TRUST / EXPERIENCE

Create a premium trust section.

Highlight:

"10+ سنوات من الخبرة"

"خبرة وثقة"

Also highlight:

"الالتزام بالمواعيد"

"خدمة منزلية مريحة"

"اهتمام بالتفاصيل"

"تجربة احترافية ومنظمة"

Use elegant icons.

Use subtle animated counters or reveal animations.

# ================================================== 12. SERVICES

Section title:

"خدمات المساج"

Subtitle:

"اختار الجلسة المناسبة لك واستمتع بتجربة احترافية في مكانك."

Services:

1. المساج السويدي
   Description:
   "حركات هادئة ومريحة للاسترخاء."
   Duration:
   60 دقيقة
   Temporary price:
   500 جنيه

2. المساج العميق
   Description:
   "تدليك بضغط أكثر تركيزًا لمن يفضلون المساج القوي."
   Duration:
   60 دقيقة
   Temporary price:
   550 جنيه

3. المساج الرياضي
   Description:
   "خيار مناسب لمن يمارسون الرياضة والمجهود البدني."
   Duration:
   60 دقيقة
   Temporary price:
   550 جنيه

4. مساج الاسترخاء
   Description:
   "جلسة هادئة بإيقاع مريح تساعدك على الاسترخاء."
   Duration:
   60 دقيقة
   Temporary price:
   500 جنيه

5. مساج الجسم الكامل
   Description:
   "تجربة متكاملة لمختلف مناطق الجسم."
   Duration:
   90 دقيقة
   Temporary price:
   700 جنيه

6. مساج الظهر والكتفين
   Description:
   "جلسة مركزة على الظهر والكتفين والرقبة."
   Duration:
   45 دقيقة
   Temporary price:
   400 جنيه

7. مساج القدمين
   Description:
   "جلسة مخصصة للقدمين."
   Duration:
   30 دقيقة
   Temporary price:
   300 جنيه

8. المساج بالزيوت
   Description:
   "تجربة مريحة باستخدام زيوت المساج."
   Duration:
   60 دقيقة
   Temporary price:
   550 جنيه

IMPORTANT:

These prices are temporary.

They must NOT be hardcoded in a way that prevents future editing.

The Captain must be able to change:

- service name
- description
- price
- duration
- image
- active/inactive status

from the dashboard.

Each service card should contain:

- premium image
- service name
- description
- duration
- price
- "احجز الآن"

Service cards should have:

- large rounded image
- subtle shadow
- elegant gold accents
- smooth hover
- image zoom
- subtle lift
- entrance animation

Do not use the exact same image for every service.

# ================================================== 13. WHY CAPTAIN SULTAN

Create section:

"ليه كابتن سلطان؟"

Include:

"10+ سنوات من الخبرة"

"خدمة منزلية مريحة"

"الالتزام بالمواعيد"

"اهتمام بالتفاصيل"

"اختيار نوع المساج المناسب لك"

"تجربة احترافية ومنظمة"

Use a premium visual composition.

Do not create a boring icon grid.

# ================================================== 14. ABOUT

Section title:

"عن كابتن سلطان"

Use this copy:

"أنا كابتن سلطان، متخصص في تقديم خدمات المساج المنزلي بأسلوب يجمع بين الاحتراف والاهتمام بالتفاصيل.

أحرص في كل جلسة على فهم تفضيلات العميل واختيار أسلوب المساج المناسب له، مع الالتزام بالموعد وتوفير تجربة مريحة ومنظمة داخل المكان الذي يختاره."

Add a premium AI-generated wellness/massage image.

Do not make the AI person look like Captain Sultan.

# ================================================== 15. HOW IT WORKS

Section:

"الحجز في 3 خطوات"

Step 1:
"اختار الخدمة"

"اختار نوع المساج المناسب لك."

Step 2:
"اختار الموعد"

"حدد اليوم والوقت المناسب من المواعيد المتاحة."

Step 3:
"استمتع بتجربتك"

"الكابتن يأتي إليك في الموعد المحدد."

Connect the steps visually with a subtle animated line.

# ================================================== 16. SERVICE AREAS

Section title:

"بنوصلك لحد عندك"

Subtitle:

"متاحين في مجموعة من مناطق القاهرة والجيزة."

Areas:

الزمالك
جاردن سيتي
مصر الجديدة
المعادي
مدينة نصر
الدقي
المهندسين
القاهرة الجديدة
التجمع الخامس
الرحاب
مدينتي
الشروق
الهرم
حدائق الأهرام
6 أكتوبر
الشيخ زايد
نيو جيزة
بيفرلي هيلز
بالم هيلز
حدائق أكتوبر

Display the areas as elegant pills/cards.

Use subtle animations.

Do not make it look like a boring list.

# ================================================== 17. BOOKING EXPERIENCE

The booking system is one of the most important features.

Customer should be able to book without creating an account.

Booking flow:

STEP 1:
Choose service.

STEP 2:
Choose date.

STEP 3:
Show available time slots.

STEP 4:
Customer enters:

الاسم
رقم الموبايل
المنطقة
العنوان بالتفصيل
ملاحظات إضافية

STEP 5:
Show booking summary:

الخدمة
المدة
السعر
التاريخ
الوقت
اسم العميل
رقم الهاتف
المنطقة
العنوان

STEP 6:

Button:

"تأكيد الحجز"

After successful booking:

Show beautiful success state:

"تم حجز موعدك بنجاح"

"هنكون في انتظارك في الموعد المحدد."

The booking should automatically be confirmed.

No payment system.

No WhatsApp automation.

No reminder system.

# ================================================== 18. BOOKING AVAILABILITY

The system must prevent double booking.

Available slots must be calculated based on:

- working schedule
- existing bookings
- blocked times
- blocked dates
- service duration

If a slot is unavailable, do not show it as available.

Prevent two users from booking the same slot.

Use proper database-side protection where appropriate.

# ================================================== 19. DASHBOARD

Create a private dashboard for Captain Sultan.

Dashboard should be modern, premium and easy to use.

Main sections:

Dashboard
الحجوزات
التقويم
العملاء
الخدمات
المواعيد
الإعدادات

Use the same brand identity:

White
Navy
Gold
Cream

Do not make the dashboard look like a generic admin template.

# ================================================== 20. DASHBOARD OVERVIEW

Show statistics:

حجوزات اليوم
الحجوزات القادمة
إجمالي الحجوزات
إيرادات الحجوزات

Show:

"حجوزات اليوم"

Each booking should show:

اسم العميل
الخدمة
التاريخ
الوقت
رقم الهاتف
المنطقة
الحالة

Statuses:

مؤكد
ملغي
مكتمل

Use clean cards and subtle animations.

# ================================================== 21. BOOKINGS MANAGEMENT

Create a bookings management page.

Captain can:

- view bookings
- search bookings
- filter by date
- filter by service
- filter by status
- edit booking
- cancel booking
- mark booking completed
- create manual booking

Provide:

- list/table view
- calendar view

Calendar should make the schedule easy to understand.

# ================================================== 22. CUSTOMER MANAGEMENT

Create a simple customer management section.

Show:

اسم العميل
رقم الهاتف
المنطقة
عدد الحجوزات
آخر حجز

Clicking a customer should show booking history.

Do not turn this into a complicated CRM.

# ================================================== 23. SERVICES MANAGEMENT

Captain can manage:

- service name
- description
- price
- duration
- image
- active/inactive

Changes made in dashboard should appear on the public website.

# ================================================== 24. AVAILABILITY MANAGEMENT

Create simple schedule management.

Captain can:

- define working days
- define working hours
- manage available slots
- block a time
- block a day
- create days off

Keep this extremely simple and understandable.

# ================================================== 25. AUTHENTICATION

Only the Captain needs dashboard access.

There is NO customer account system.

Use Supabase Auth.

Create:

- login page
- protected dashboard routes
- logout
- persistent session

Keep authentication simple.

Do not add roles or permissions unless genuinely necessary.

# ================================================== 26. DATABASE

Use Supabase PostgreSQL.

Create a clean relational structure.

Main tables:

services

customers

bookings

availability

blocked_dates

admin/profile

SERVICE:

id
name
description
duration
price
image_url
active
created_at
updated_at

CUSTOMER:

id
name
phone
area
address
created_at
updated_at

BOOKING:

id
customer_id
service_id
booking_date
start_time
end_time
status
total_price
notes
created_at
updated_at

AVAILABILITY:

id
day_of_week
start_time
end_time
active

BLOCKED_DATES:

id
date
start_time
end_time
reason

Use proper foreign keys.

Use indexes where useful.

Use Row Level Security appropriately.

Public users should only access the minimum data needed to create bookings and display active services/availability.

Customer private data must never be publicly exposed.

# ================================================== 27. DATA FLOW

When a customer creates a booking:

1. Validate data.
2. Check service.
3. Check availability.
4. Check existing bookings.
5. Prevent conflict.
6. Create/find customer.
7. Create booking.
8. Return success.
9. Dashboard immediately reflects the booking.

When Captain changes service:

The public website should use the updated information.

When Captain changes availability:

The booking system should respect the new schedule.

# ================================================== 28. FORMS & VALIDATION

Use:

React Hook Form

- Zod

Validate:

Name
Phone
Area
Address
Date
Time
Service

Show friendly Arabic validation messages.

Do not use ugly browser-default validation.

# ================================================== 29. ANIMATIONS

Use Framer Motion.

Animations should include:

Hero:

- text reveal
- image reveal
- subtle parallax
- decorative floating elements

Sections:

- fade/slide on scroll
- staggered card animations

Services:

- card hover
- image zoom
- subtle lift

Buttons:

- smooth hover
- subtle movement
- gold accent

Booking:

- smooth step transitions
- progress indicator
- animated success state

Dashboard:

- animated statistics
- smooth page transitions
- hover states

Navbar:

- smooth scroll transition
- mobile menu animation

IMPORTANT:

Animations should feel expensive and premium.

Do NOT animate everything.

Do NOT use random spinning objects.

Do NOT use excessive 3D.

Do NOT make the website look like a game.

# ================================================== 30. DESIGN SYSTEM

Use:

Large premium typography
Elegant Arabic font
Generous whitespace
Subtle shadows
Thin borders
Gold accents
Navy sections
White backgrounds
Cream backgrounds

Use rounded corners consistently but do not over-round everything.

Avoid:

- cheap gradients
- excessive glassmorphism
- excessive glow
- excessive gold
- random decorative elements
- childish UI
- generic SaaS appearance
- clutter

# ================================================== 31. IMAGES

Use high-quality AI-generated or suitable royalty-free visual imagery.

Image direction:

Premium home massage
Luxury wellness
Elegant interiors
Warm lighting
Massage oils
Towels
Relaxing environment
Professional massage setup

Keep imagery consistent.

Do not use fake photos claiming to be Captain Sultan.

Do not generate recognizable real people.

Use imagery as visual storytelling.

# ================================================== 32. FOOTER

Footer should contain:

Captain Sultan logo

"كابتن سلطان للمساج المنزلي"

"خبرة وثقة"

Phone:

+20 12 82702907

Facebook:

https://www.facebook.com/share/1NQaz5scX9/

TikTok:

https://www.tiktok.com/@kaptansoltanmasegwhgame

Navigation links.

Service areas.

Copyright.

# ================================================== 33. FAQ

Add:

"هل المساج بيتم في المنزل؟"

"إزاي أحجز موعد؟"

"إيه المناطق المتاحة؟"

"هل أقدر أختار نوع المساج؟"

"هل الحجز بيتأكد تلقائيًا؟"

"هل أقدر أغير موعد الحجز؟"

Answers should be short and clear.

# ================================================== 34. CTA

Create strong CTA sections.

Use:

"احجز جلستك الآن"

"خلي راحتك توصلك لحد البيت"

"اختار موعدك"

The final CTA should be visually impressive.

Use:

Deep Navy background
Gold decorative elements
White text

This can be one of the few dark sections.

# ================================================== 35. RESPONSIVE DESIGN

The website must work perfectly on:

Mobile
Tablet
Laptop
Desktop
Large screens

Test mentally/design-wise for:

360px
390px
768px
1024px
1440px+

RTL must work correctly.

The mobile booking experience is extremely important.

# ================================================== 36. COMPONENTS

Create reusable components for:

Button
Card
Badge
Modal
Dialog
Input
Select
Date Picker
Time Slot
Booking Stepper
Toast
Table
Calendar
Stats Card
Sidebar
Navbar
Footer

Do not create unnecessary abstractions.

# ================================================== 37. SECURITY

Never expose:

Supabase service role key
private credentials
admin credentials
private customer data

Use environment variables.

Example:

NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY

Protect dashboard routes.

Use proper Supabase RLS.

# ================================================== 38. ENVIRONMENT

Create/update environment example documentation if needed.

Do not hardcode secrets.

# ================================================== 39. DEPLOYMENT

Project should be ready for Vercel deployment.

Ensure:

- production build is valid
- environment variables are documented
- Supabase integration is correct
- no local-only dependency is required
- dashboard protection works
- image handling works

Do not create unnecessary infrastructure.

# ================================================== 40. NO UNNECESSARY FEATURES

DO NOT add:

Payment gateway
WhatsApp automation
Customer accounts
Subscriptions
Memberships
Employee management
Multi-branch management
Complex CRM
Notifications
AI chatbot
AI assistant
Loyalty program
Reviews system
Inventory
Invoices
Unrelated analytics
Unrelated integrations

The product is:

PREMIUM WEBSITE

- ONLINE BOOKING
- CAPTAIN DASHBOARD

Nothing more.

# ================================================== 41. CONTENT STYLE

The website copy should feel:

Professional
Warm
Premium
Trustworthy
Simple

Avoid exaggerated marketing claims.

Do not use fake reviews.

Do not invent certifications.

Do not invent awards.

Do not invent medical claims.

Do not claim that massage treats or cures medical conditions.

# ================================================== 42. FINAL QUALITY

Before finishing:

Make sure:

- landing page is complete
- all sections are connected
- booking flow works
- available slots work
- double booking is prevented
- booking is saved
- dashboard receives bookings
- services can be edited
- prices can be edited
- availability can be edited
- dashboard authentication works
- customer data is protected
- mobile layout works
- RTL works
- animations work
- images are handled correctly
- navigation works
- CTAs work
- no obvious broken UI remains

Perform only a quick relevant sanity check.

Do NOT start a huge QA process.

Do NOT run unrelated tests.

Do NOT create fake production data.

Do NOT seed the database with fake customers/bookings.

# ================================================== 43. MOST IMPORTANT INSTRUCTION

Build the complete project now.

Do not stop at a plan.

Do not ask me to approve the design.

Do not ask me which library to use.

Do not ask me which animation to use.

Do not ask me which component to create.

Do not ask me whether to continue.

Make reasonable professional decisions and continue.

If something is unclear but can reasonably be inferred from the requirements, infer it.

If something breaks, fix it yourself.

If an implementation detail changes during development, choose the cleanest solution yourself.

I want the finished working website + dashboard, not a discussion about how to build it.

Complete the entire implementation in this task.
