import React, { useState, useEffect } from 'react';
import { supabase } from '@/supabaseClient';

const PAGE_SIZE = 10; // عدد الصفوف لكل صفحة

function TablesManager() {
  const [tableName, setTableName] = useState('home_hero'); // اسم الجدول المحدد
  const [data, setData] = useState([]); // بيانات الجدول
  const [filteredData, setFilteredData] = useState([]); // بيانات بعد البحث
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [editRowId, setEditRowId] = useState(null); // الصف الذي تحت التعديل
  const [newRow, setNewRow] = useState(null); // صف جديد أثناء الإضافة
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // جلب بيانات الجدول من Supabase
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: tableData, error: fetchError } = await supabase.from(tableName).select('*');
      if (fetchError) throw fetchError;
      setData(tableData || []);
      setFilteredData(tableData || []);
      setCurrentPage(1);
    } catch (error) {
      setError(error.message);
      setData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    setSearchTerm('');
    setEditRowId(null);
    setNewRow(null);
  }, [tableName]);

  // البحث داخل البيانات
  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(data);
    } else {
      const filtered = data.filter(row =>
        Object.values(row).some(val =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredData(filtered);
      setCurrentPage(1);
    }
  }, [searchTerm, data]);

  // الصفوف المعروضة حسب الصفحة
  const pageCount = Math.ceil(filteredData.length / PAGE_SIZE) || 1;
  const currentPageData = filteredData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // التنقل بين الصفحات
  const goFirst = () => setCurrentPage(1);
  const goPrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goNext = () => setCurrentPage(prev => Math.min(prev + 1, pageCount));
  const goLast = () => setCurrentPage(pageCount);

  // التعامل مع تعديل الصفوف
  const handleEdit = (id) => {
    setEditRowId(id);
    setNewRow(null);
  };

  const handleCancelEdit = () => {
    setEditRowId(null);
    setNewRow(null);
    setError(null);
  };

  // حفظ تعديل أو إضافة
  const handleSave = async () => {
    setError(null);
    try {
      if (newRow) {
        // إضافة جديد
        const { error: insertError } = await supabase.from(tableName).insert([newRow]);
        if (insertError) throw insertError;
        setMessage('تمت الإضافة بنجاح');
      } else if (editRowId !== null) {
        // تحديث موجود
        const row = data.find(r => r.id === editRowId);
        const { error: updateError } = await supabase.from(tableName).update(row).eq('id', editRowId);
        if (updateError) throw updateError;
        setMessage('تم التحديث بنجاح');
      } else {
        setError('لا يوجد صف للحفظ');
        return;
      }
      fetchData();
      setEditRowId(null);
      setNewRow(null);
    } catch (error) {
      setError(error.message);
    }
  };

  // حذف صف
  const handleDelete = async () => {
    if (!editRowId) {
      setError('اختر صفًا للحذف');
      return;
    }
    if (!window.confirm('هل أنت متأكد من الحذف؟')) return;

    setError(null);
    try {
      const { error: deleteError } = await supabase.from(tableName).delete().eq('id', editRowId);
      if (deleteError) throw deleteError;
      setMessage('تم الحذف بنجاح');
      fetchData();
      setEditRowId(null);
    } catch (error) {
      setError(error.message);
    }
  };

  // إضافة صف جديد
  const handleAdd = () => {
    setNewRow({});
    setEditRowId(null);
    setError(null);
  };

  // الطباعة
  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write('<html><head><title>طباعة الجدول</title></head><body>');
    printWindow.document.write('<pre>' + JSON.stringify(filteredData, null, 2) + '</pre>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  // تحديث قيم الحقول في صف جديد أو تعديل
  const handleFieldChange = (field, value) => {
    if (newRow) {
      setNewRow(prev => ({ ...prev, [field]: value }));
    } else if (editRowId !== null) {
      setData(prev => prev.map(row => row.id === editRowId ? { ...row, [field]: value } : row));
    }
  };

  // تغيير الجدول
  const handleTableChange = (e) => {
    setTableName(e.target.value);
  };

  // عرض رسالة نجاح أو خطأ مؤقتة
  useEffect(() => {
    if (!message && !error) return;
    const timer = setTimeout(() => {
      setMessage(null);
      setError(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, error]);

  // استخراج رؤوس الأعمدة (من أول صف إذا موجود)
  const columns = data.length > 0 ? Object.keys(data[0]).filter(col => col !== 'id') : [];

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h2>إدارة الجداول</h2>

      {/* اختيار الجدول */}
      <select value={tableName} onChange={handleTableChange} style={{ marginBottom: 10 }}>
        <option value="home_hero">home_hero</option>
        <option value="home_services">home_services</option>
        <option value="home_menu_preview">home_menu_preview</option>
        <option value="home_testimonials">home_testimonials</option>
        <option value="contactus_email">contactus_email</option>
        <option value="about_story">about_story</option>
        <option value="about_values">about_values</option>
        <option value="about_team">about_team</option>
        <option value="menu_categories">menu_categories</option>
        <option value="menu_items">menu_items</option>
        <option value="gallery_images">gallery_images</option>
        <option value="contactus_information">contactus_information</option>
        <option value="booking_requests">booking_requests</option>
      </select>

      {/* أزرار العمليات + التنقل + البحث */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        {/* اليسار - أزرار العمليات */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleAdd} disabled={loading}>إضافة</button>
          <button
            onClick={() => (editRowId !== null || newRow) ? handleSave() : alert('اختر صف للتعديل أو إضافة صف جديد')}
            disabled={loading}
          >
            حفظ
          </button>
          <button onClick={handleDelete} disabled={loading}>حذف</button>
          <button onClick={handleCancelEdit} disabled={loading}>إلغاء</button>
        </div>

        {/* الوسط - البحث */}
        <input
          type="text"
          placeholder="بحث..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ flexGrow: 1, maxWidth: 300, margin: '0 20px', padding: '5px' }}
          disabled={loading}
        />

        {/* اليمين - أزرار التنقل والطباعة */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={goFirst} disabled={currentPage === 1 || loading}>الأول</button>
          <button onClick={goPrev} disabled={currentPage === 1 || loading}>السابق</button>
          <span>{currentPage} / {pageCount}</span>
          <button onClick={goNext} disabled={currentPage === pageCount || loading}>التالي</button>
          <button onClick={goLast} disabled={currentPage === pageCount || loading}>الأخير</button>
          <button onClick={handlePrint} disabled={loading}>طباعة</button>
        </div>
      </div>

      {/* الجدول */}
      <div style={{ overflowX: 'auto' }}>
        {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
        {message && <div style={{ color: 'green', marginBottom: 10 }}>{message}</div>}
        {currentPageData.length === 0 && !loading && !error && (
          <div style={{ textAlign: 'center', color: '#888', margin: '20px 0' }}>لا توجد بيانات متاحة لهذا الجدول.</div>
        )}
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            minWidth: '600px',
          }}
        >
          <thead>
            <tr>
              <th>م</th>
              {columns.map(col => (
                <th key={col}>{col}</th>
              ))}
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((row, idx) => (
              <tr key={row.id || idx} style={{ background: editRowId === row.id ? '#ffeeba' : 'white' }}>
                <td>{(currentPage - 1) * PAGE_SIZE + idx + 1}</td>
                {columns.map(col => (
                  <td key={col}>
                    {editRowId === row.id ? (
                      <input
                        type="text"
                        value={row[col] || ''}
                        onChange={e => handleFieldChange(col, e.target.value)}
                        style={{ width: '100%' }}
                      />
                    ) : (
                      row[col]
                    )}
                  </td>
                ))}
                <td>
                  {editRowId === row.id ? (
                    <button onClick={handleSave} disabled={loading}>حفظ</button>
                  ) : (
                    <button onClick={() => handleEdit(row.id)} disabled={loading}>تعديل</button>
                  )}
                </td>
              </tr>
            ))}
            {newRow && (
              <tr style={{ background: '#e3fcec' }}>
                <td>جديد</td>
                {columns.map(col => (
                  <td key={col}>
                    <input
                      type="text"
                      value={newRow[col] || ''}
                      onChange={e => handleFieldChange(col, e.target.value)}
                      style={{ width: '100%' }}
                    />
                  </td>
                ))}
                <td>
                  <button onClick={handleSave} disabled={loading}>حفظ</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TablesManager;
