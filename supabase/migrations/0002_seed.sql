-- Initial content required for the site to function: the 8 launch services
-- and a default weekly working schedule. Prices/duration are editable from
-- the dashboard afterwards. No fake customers or bookings are seeded.

insert into public.services (name, description, duration, price, image_url, active, sort_order) values
  ('المساج السويدي', 'حركات هادئة ومريحة للاسترخاء.', 60, 500, 'https://images.unsplash.com/photo-1620733723572-11c53f73a416?auto=format&fit=crop&w=1000&q=80', true, 1),
  ('المساج العميق', 'تدليك بضغط أكثر تركيزًا لمن يفضلون المساج القوي.', 60, 550, 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1000&q=80', true, 2),
  ('المساج الرياضي', 'خيار مناسب لمن يمارسون الرياضة والمجهود البدني.', 60, 550, 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1000&q=80', true, 3),
  ('مساج الاسترخاء', 'جلسة هادئة بإيقاع مريح تساعدك على الاسترخاء.', 60, 500, 'https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=1000&q=80', true, 4),
  ('مساج الجسم الكامل', 'تجربة متكاملة لمختلف مناطق الجسم.', 90, 700, 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1000&q=80', true, 5),
  ('مساج الظهر والكتفين', 'جلسة مركزة على الظهر والكتفين والرقبة.', 45, 400, 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80', true, 6),
  ('مساج القدمين', 'جلسة مخصصة للقدمين.', 30, 300, 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=1000&q=80', true, 7),
  ('المساج بالزيوت', 'تجربة مريحة باستخدام زيوت المساج.', 60, 550, 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80', true, 8);

-- Default working schedule: every day, 10:00 - 22:00. Editable from the dashboard.
insert into public.availability (day_of_week, start_time, end_time, active) values
  (0, '10:00', '22:00', true),
  (1, '10:00', '22:00', true),
  (2, '10:00', '22:00', true),
  (3, '10:00', '22:00', true),
  (4, '10:00', '22:00', true),
  (5, '10:00', '22:00', true),
  (6, '10:00', '22:00', true);
