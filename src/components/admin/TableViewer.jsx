import React, { useEffect, useState } from 'react';

const TableViewer = ({ tableName, onBack }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTableData() {
      try {
        const res = await fetch(`/api/admin/tables/${tableName}`);
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error('فشل في تحميل البيانات:', err);
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTableData();
  }, [tableName]);

  return (
    <div>
      <button onClick={onBack} className="mb-4 text-blue-600 underline">
        العودة إلى البحث
      </button>

      <h2 className="text-xl font-bold mb-2">جدول: {tableName}</h2>

      {loading ? (
        <p>جاري التحميل...</p>
      ) : data.length === 0 ? (
        <p>لا توجد بيانات</p>
      ) : (
        <div className="overflow-auto">
          <table className="table-auto w-full border">
            <thead>
              <tr>
                {Object.keys(data[0]).map((col) => (
                  <th key={col} className="border px-2 py-1 bg-gray-100">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val, j) => (
                    <td key={j} className="border px-2 py-1">
                      {String(val)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TableViewer;
