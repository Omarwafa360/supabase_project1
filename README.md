# supabase_project1

مشروع مطعم الأصالة - واجهة أمامية متكاملة مع ربط مباشر بقاعدة بيانات [Supabase](https://supabase.com/)

## وصف المشروع

تطبيق ويب تفاعلي لمطعم، يعرض:
- سلايدر أبطال (Hero Carousel)
- خدمات المطعم
- نظرة على القائمة
- آراء العملاء
- صفحات إضافية: القائمة، الحجوزات، المعرض، التواصل، عن المطعم، لوحة الإدارة

جميع البيانات تُجلب ديناميكيًا من قاعدة بيانات Supabase.

---

## ربط Supabase

تم الربط مع قاعدة البيانات عبر ملف `src/supabaseClient.js`:
- **Project URL:** https://mhanotwqgboxaltelaaq.supabase.co
- **API Key (anon public):** موجودة مباشرة في الكود (آمن للاستخدام في الواجهة الأمامية)

---

## الجداول الأساسية في Supabase
- `home_hero`: بيانات السلايدر الرئيسي
- `home_services`: خدمات المطعم
- `home_menu_preview`: نظرة على القائمة
- `home_testimonials`: آراء العملاء

يمكنك إضافة جداول أخرى حسب الحاجة (القائمة، الحجوزات، إلخ).

---

## خطوات التشغيل محليًا

1. **تثبيت الحزم:**
   ```bash
   npm install
   ```
2. **تشغيل التطبيق:**
   ```bash
   npm run dev
   ```
3. **تعديل بيانات Supabase:**
   إذا أردت تغيير بيانات الاتصال، عدل ملف `src/supabaseClient.js`.

---

## رفع المشروع على GitHub

```bash
echo "# supabase_project1" >> README.md
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Omarwafa360/supabase_project1.git
git push -u origin main
```

---

## ملاحظات
- تأكد من وجود الجداول والبيانات في Supabase كما هو موضح أعلاه.
- المشروع يدعم التخصيص الكامل للثيم والألوان عبر لوحة الإدارة (عند تفعيلها).
- إذا واجهت أي مشكلة في الاتصال بـ Supabase، تحقق من بيانات الاتصال أو صلاحيات الجداول.

---

بالتوفيق! 🚀
