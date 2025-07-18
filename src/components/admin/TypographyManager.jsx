import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

const TypographyManager = () => {
  const { pageTypography, setTypographyForPage } = useTheme();
  const [selectedPage, setSelectedPage] = useState("Home");
  const [currentTypography, setCurrentTypography] = useState({});

  const pages = Object.keys(pageTypography);

  useEffect(() => {
    setCurrentTypography(pageTypography[selectedPage] || {});
  }, [selectedPage, pageTypography]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTypography(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setTypographyForPage(selectedPage, currentTypography);
    alert(`تم حفظ إعدادات الخطوط لصفحة ${selectedPage} بنجاح!`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">تخصيص الخطوط</h2>

      <div className="mb-4">
        <label htmlFor="pageSelect" className="block font-semibold mb-2">اختر الصفحة:</label>
        <select
          id="pageSelect"
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        >
          {pages.map(page => (
            <option key={page} value={page}>{page}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="fontFamily" className="block font-semibold mb-2">نوع الخط (Font Family):</label>
          <input
            type="text"
            id="fontFamily"
            name="fontFamily"
            value={currentTypography.fontFamily || ''}
            onChange={handleChange}
            placeholder="مثال: Arial, sans-serif أو 'Tajawal', sans-serif"
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="fontSize" className="block font-semibold mb-2">حجم الخط (Font Size):</label>
          <input
            type="text"
            id="fontSize"
            name="fontSize"
            value={currentTypography.fontSize || ''}
            onChange={handleChange}
            placeholder="مثال: 16px أو 1.2rem"
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="color" className="block font-semibold mb-2">لون الخط (Color):</label>
          <input
            type="text"
            id="color"
            name="color"
            value={currentTypography.color || ''}
            onChange={handleChange}
            placeholder="مثال: #000000 أو red"
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="fontWeight" className="block font-semibold mb-2">وزن الخط (Font Weight):</label>
          <input
            type="text"
            id="fontWeight"
            name="fontWeight"
            value={currentTypography.fontWeight || ''}
            onChange={handleChange}
            placeholder="مثال: normal, bold, 500, 700"
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="textAlign" className="block font-semibold mb-2">محاذاة النص (Text Align):</label>
          <select
            id="textAlign"
            name="textAlign"
            value={currentTypography.textAlign || ''}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">اختر</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="center">Center</option>
            <option value="justify">Justify</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        حفظ إعدادات الخطوط
      </button>
    </div>
  );
};

export default TypographyManager;
