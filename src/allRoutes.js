export const allRoutes = [
  { path: '/', name: 'الرئيسية', authRequired: false },
  { path: '/about', name: 'عن المطعم', authRequired: false },
  { path: '/menu', name: 'القائمة', authRequired: false },
  { path: '/gallery', name: 'المعرض', authRequired: false },
  { path: '/booking', name: 'الحجوزات', authRequired: false },
  { path: '/contact', name: 'التواصل', authRequired: false },
  { path: '/admin', name: 'لوحة الإدارة', authRequired: true }, // صفحة خاصة بالمشرف
];
