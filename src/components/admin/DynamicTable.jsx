import React, { useState, useEffect } from "react";
import api from '@/lib/api';

const DynamicTable = ({ apiEndpoint }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRow, setEditingRow] = useState(null);
  const [newRow, setNewRow] = useState(null);
  const [message, setMessage] = useState(null);

  // جلب البيانات
  useEffect(() => {
    fetchData();
  }, [apiEndpoint]);

  const fetchData = async () => {
    try {
      const json = await api.get(apiEndpoint.replace('/api', ''));
      setData(json);
      setFilteredData(json);
    } catch (err) {
      setMessage({ type: "error", text: "خطأ في تحميل البيانات" });
    }
  };

  // بحث
  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(data);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      setFilteredData(
        data.filter(row =>
          Object.values(row).some(val =>
            String(val).toLowerCase().includes(lowerSearch)
          )
        )
      );
    }
    setCurrentPage(1);
  }, [searchTerm, data]);

  // حساب الصفوف الحالية للصفحة
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  // التنقل بين الصفحات
  const goToFirst = () => setCurrentPage(1);
  const goToLast = () => setCurrentPage(Math.ceil(filteredData.length / rowsPerPage));
  const goToNext = () => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredData.length / rowsPerPage)));
  const goToPrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // تعديل - حفظ - حذف - إضافة دوال (تحتاج API)

  // هنا يمكنك تكملة إضافة/تعديل/حذف عبر استدعاءات API مع تحديث الـ state

  return (
    <div className="dynamic-table-container" style={{ maxWidth: "100%", overflow: "auto" }}>
      {/* أزرار العمليات والبحث */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <div>
          <button onClick={() => { /* إضافة */ }}>إضافة</button>
          <button onClick={() => { /* تعديل */ }} disabled={!editingRow}>تعديل</button>
          <button onClick={() => { /* حفظ */ }} disabled={!editingRow && !newRow}>حفظ</button>
          <button onClick={() => { /* حذف */ }} disabled={!editingRow}>حذف</button>
        </div>
        <input
          type="text"
          placeholder="بحث..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ flexGrow: 1, margin: "0 20px" }}
        />
        <div>
          <button onClick={goToFirst}>الأول</button>
          <button onClick={goToPrev}>السابق</button>
          <button onClick={goToNext}>التالي</button>
          <button onClick={goToLast}>الأخير</button>
        </div>
      </div>

      {/* الجدول */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {data[0] && Object.keys(data[0]).map(key => (
              <th key={key} style={{ border: "1px solid #ccc", padding: "8px" }}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map(row => (
            <tr key={row.id}>
              {Object.values(row).map((val, i) => (
                <td key={i} style={{ border: "1px solid #ccc", padding: "8px" }}>{val}</td>
              ))}
            </tr>
          ))}
          {/* صف إضافة جديد */}
          {newRow && (
            <tr>
              {Object.keys(newRow).map((key, i) => (
                <td key={i}>
                  <input
                    type="text"
                    value={newRow[key]}
                    onChange={e => setNewRow({ ...newRow, [key]: e.target.value })}
                  />
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>

      {/* رسالة تنبيه */}
      {message && (
        <div style={{ marginTop: 10, color: message.type === "error" ? "red" : "green" }}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default DynamicTable;
