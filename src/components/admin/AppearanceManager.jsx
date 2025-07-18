import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

const colorPalette = [
  '#ffffff',
  'linear-gradient(to right, #ff7e5f, #feb47b)',
  'linear-gradient(to right, #6a11cb, #2575fc)',
  'linear-gradient(to right, #43cea2, #185a9d)',
  'linear-gradient(to right, #f7971e, #ffd200)',
  'linear-gradient(to right, #ff512f, #dd2476)',
  'linear-gradient(to right, #00c6ff, #0072ff)',
];

const textColorPalette = [
  '#000000', // أسود
  '#ffffff', // أبيض
  '#333333', // رمادي غامق
  '#666666', // رمادي متوسط
  '#2c3e50', // أزرق غامق
  '#8b4513', // بني
  '#006400', // أخضر غامق
  '#800080', // بنفسجي
  '#ff6b6b', // أحمر فاتح
  '#4ecdc4', // فيروزي
];

const fontFamilies = [
  { name: 'تجول', value: 'Tajawal, sans-serif' },
  { name: 'أريال', value: 'Arial, sans-serif' },
  { name: 'تايمز', value: 'Times New Roman, serif' },
  { name: 'جورجيا', value: 'Georgia, serif' },
  { name: 'فردانا', value: 'Verdana, sans-serif' },
  { name: 'كوريير', value: 'Courier New, monospace' },
  { name: 'كاليبري', value: 'Calibri, sans-serif' },
  { name: 'كامبريا', value: 'Cambria, serif' },
  { name: 'طحوما', value: 'Tahoma, sans-serif' },
  { name: 'أميري', value: 'Amiri, serif' },
  { name: 'نوتو', value: 'Noto Sans Arabic, sans-serif' },
];

const pages = [
  { key: 'Home', name: 'الصفحة الرئيسية' },
  { key: 'About', name: 'حول الموقع' },
  { key: 'Menu', name: 'القائمة' },
  { key: 'Gallery', name: 'المعرض' },
  { key: 'Contact', name: 'اتصل بنا' },
  { key: 'Booking', name: 'الحجز' },
  { key: 'Admin', name: 'الإدارة' },
];

const AppearanceManager = () => {
  const { 
    pageBackgrounds, 
    pageTypography,
    setThemeForPage,
    setTypographyForPage 
  } = useTheme();
  
  const [selectedPage, setSelectedPage] = useState('Home');

  const handleBackgroundChange = (color) => {
    setThemeForPage(selectedPage, color);
  };

  const handleTextColorChange = (color) => {
    const currentTypography = pageTypography[selectedPage] || {};
    setTypographyForPage(selectedPage, {
      ...currentTypography,
      color: color
    });
  };

  const handleFontFamilyChange = (fontFamily) => {
    const currentTypography = pageTypography[selectedPage] || {};
    setTypographyForPage(selectedPage, {
      ...currentTypography,
      fontFamily: fontFamily
    });
  };

  const currentTypography = pageTypography[selectedPage] || {
    fontFamily: 'Tajawal, sans-serif',
    fontSize: '16px',
    color: '#000000',
    fontWeight: 'normal',
    textAlign: 'right'
  };
  
  const currentBackground = pageBackgrounds[selectedPage] || '#ffffff';

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">تخصيص مظهر الصفحات</h2>
      
      {/* اختيار الصفحة */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <label className="block font-semibold mb-2">اختر الصفحة:</label>
        <select
          value={selectedPage}
          onChange={e => setSelectedPage(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {pages.map(page => (
            <option key={page.key} value={page.key}>{page.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* تخصيص الخلفية */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">تخصيص الخلفية</h3>
          
          {/* لوحة ألوان الخلفية */}
          <div>
            <label className="block font-medium mb-2">اختر لون الخلفية:</label>
            <div className="flex flex-wrap gap-2">
              {colorPalette.map((color, idx) => (
                <button
                  key={idx}
                  style={{
                    background: color,
                    width: 40,
                    height: 40,
                    border: currentBackground === color ? '3px solid #004aad' : '1px solid #ccc',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                  title={color}
                  onClick={() => handleBackgroundChange(color)}
                />
              ))}
            </div>
          </div>

          {/* منتقي لون مخصص للخلفية */}
          <div>
            <label className="block font-medium mb-2">أو اختر لون مخصص:</label>
            <input
              type="color"
              onChange={e => handleBackgroundChange(e.target.value)}
              value={
                currentBackground && !currentBackground.startsWith('linear-gradient')
                  ? currentBackground
                  : '#ffffff'
              }
              className="w-16 h-10 border rounded cursor-pointer"
            />
          </div>
        </div>

        {/* تخصيص النص */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">تخصيص النص</h3>
          
          {/* لوحة ألوان النص */}
          <div>
            <label className="block font-medium mb-2">اختر لون النص:</label>
            <div className="flex flex-wrap gap-2">
              {textColorPalette.map((color, idx) => (
                <button
                  key={idx}
                  style={{
                    backgroundColor: color,
                    width: 40,
                    height: 40,
                    border: currentTypography.color === color ? '3px solid #004aad' : '1px solid #ccc',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                  title={color}
                  onClick={() => handleTextColorChange(color)}
                />
              ))}
            </div>
          </div>

          {/* منتقي لون مخصص للنص */}
          <div>
            <label className="block font-medium mb-2">أو اختر لون نص مخصص:</label>
            <input
              type="color"
              onChange={e => handleTextColorChange(e.target.value)}
              value={currentTypography.color}
              className="w-16 h-10 border rounded cursor-pointer"
            />
          </div>

          {/* اختيار نوع الخط */}
          <div>
            <label className="block font-medium mb-2">اختر نوع الخط:</label>
            <select
              value={currentTypography.fontFamily}
              onChange={e => handleFontFamilyChange(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {fontFamilies.map(font => (
                <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* معاينة النتيجة */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">معاينة مباشرة للصفحة المختارة</h3>
        <div
          style={{
            background: currentBackground,
            color: currentTypography.color,
            fontFamily: currentTypography.fontFamily,
            padding: '2rem',
            border: '1px solid #eee',
            borderRadius: '12px',
            minHeight: '120px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <h4 className="text-xl font-bold mb-3">عنوان تجريبي</h4>
          <p className="mb-3">
            هذا نص تجريبي لمعاينة شكل النص مع الخلفية المختارة. يمكنك رؤية كيف يبدو اللون والخط معاً.
          </p>
          <p className="text-sm opacity-75">
            الخط المستخدم: {fontFamilies.find(f => f.value === currentTypography.fontFamily)?.name || 'تجول'}
          </p>
        </div>
      </div>

      {/* معلومات إضافية */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">ملاحظات:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• يمكنك تخصيص كل صفحة بشكل منفصل</li>
          <li>• تأكد من التباين الجيد بين لون الخلفية والنص لسهولة القراءة</li>
          <li>• الإعدادات تُحفظ تلقائياً عند التغيير</li>
          <li>• يمكنك استخدام الخطوط العربية للنصوص العربية</li>
        </ul>
      </div>
    </div>
  );
};

export default AppearanceManager;