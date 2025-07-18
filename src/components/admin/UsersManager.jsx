import React, { useState, useEffect } from 'react';
import { supabase } from '@/supabaseClient';
import { useTheme } from '@/context/ThemeContext';

const UsersManager = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState(null);
  const [message, setMessage] = useState(null);
  const { pageTypography } = useTheme();
  const typography = pageTypography.Admin || {};

  // جلب المستخدمين من Supabase
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        setMessage({ type: 'error', text: 'خطأ في جلب المستخدمين: ' + error.message });
      } else {
        setUsers(data || []);
      }
    };
    fetchUsers();
  }, []);

  // إضافة أو تحديث مستخدم
  const handleSave = async () => {
    if (newUser) {
      if (!newUser.username || !newUser.password || !newUser.role) {
        setMessage({ type: 'error', text: 'الرجاء تعبئة جميع الحقول المطلوبة للمستخدم الجديد.' });
        return;
      }
      const userToAdd = { ...newUser, lastLogin: new Date().toLocaleString() };
      const { data, error } = await supabase.from('users').insert([userToAdd]);
      if (error) {
        setMessage({ type: 'error', text: 'خطأ في إضافة المستخدم: ' + error.message });
      } else {
        setUsers([...users, ...(data || [])]);
        setMessage({ type: 'success', text: 'تم إضافة المستخدم بنجاح.' });
        setNewUser(null);
      }
    } else if (editingUser) {
      const { id, ...updateFields } = editingUser;
      const { data, error } = await supabase.from('users').update(updateFields).eq('id', id).select();
      if (error) {
        setMessage({ type: 'error', text: 'خطأ في تحديث المستخدم: ' + error.message });
      } else {
        setUsers(users.map(user => user.id === id ? (data ? data[0] : editingUser) : user));
        setMessage({ type: 'success', text: 'تم تحديث المستخدم بنجاح.' });
        setEditingUser(null);
      }
    }
  };

  // حذف مستخدم
  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      const { error } = await supabase.from('users').delete().eq('id', id);
      if (error) {
        setMessage({ type: 'error', text: 'خطأ في حذف المستخدم: ' + error.message });
      } else {
        setUsers(users.filter(user => user.id !== id));
        setMessage({ type: 'success', text: 'تم حذف المستخدم بنجاح.' });
        setEditingUser(null);
        setNewUser(null);
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser({ ...user });
    setNewUser(null);
    setMessage(null);
  };

  const handleAdd = () => {
    setNewUser({ username: '', password: '', role: 'editor', email: '' });
    setEditingUser(null);
    setMessage(null);
  };

  const handleCancel = () => {
    setEditingUser(null);
    setNewUser(null);
    setMessage(null);
  };

  const handleChange = (e, field) => {
    if (newUser) {
      setNewUser({ ...newUser, [field]: e.target.value });
    } else if (editingUser) {
      setEditingUser({ ...editingUser, [field]: e.target.value });
    }
  };

  return (
    <div className="p-6 w-full" style={typography}>
      <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: typography.fontFamily, color: typography.color }}>
        إدارة المستخدمين
      </h2>

      {message && (
        <div className={`p-3 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
             style={{ fontFamily: typography.fontFamily }}>
          {message.text}
        </div>
      )}

      <div className="mb-4 flex space-x-2 space-x-reverse">
        <button onClick={handleAdd} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                style={{ fontFamily: typography.fontFamily }}>
          إضافة مستخدم جديد
        </button>
        {(editingUser || newUser) && (
          <>
            <button onClick={handleSave} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    style={{ fontFamily: typography.fontFamily }}>
              حفظ
            </button>
            <button onClick={handleCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    style={{ fontFamily: typography.fontFamily }}>
              إلغاء
            </button>
          </>
        )}
        {editingUser && (
          <button onClick={() => handleDelete(editingUser.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  style={{ fontFamily: typography.fontFamily }}>
            حذف
          </button>
        )}
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full bg-white border border-gray-200 table-auto">
          <thead>
            <tr>
              {['ID', 'اسم المستخدم', 'كلمة المرور', 'الصلاحية', 'البريد الإلكتروني', 'آخر تسجيل دخول', 'إجراءات'].map((title, i) => (
                <th key={i} className="py-2 px-4 border-b text-right" style={{ fontFamily: typography.fontFamily, color: typography.color }}>
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b" style={{ fontFamily: typography.fontFamily }}>{user.id}</td>
                <td className="py-2 px-4 border-b" style={{ fontFamily: typography.fontFamily }}>
                  {editingUser && editingUser.id === user.id ? (
                    <input type="text" value={editingUser.username} onChange={(e) => handleChange(e, 'username')}
                      className="border rounded px-2 py-1 w-full" style={{ fontFamily: typography.fontFamily }} />
                  ) : user.username}
                </td>
                <td className="py-2 px-4 border-b" style={{ fontFamily: typography.fontFamily }}>
                  {editingUser && editingUser.id === user.id ? (
                    <input type="text" value={editingUser.password} onChange={(e) => handleChange(e, 'password')}
                      className="border rounded px-2 py-1 w-full" style={{ fontFamily: typography.fontFamily }} />
                  ) : user.password}
                </td>
                <td className="py-2 px-4 border-b" style={{ fontFamily: typography.fontFamily }}>
                  {editingUser && editingUser.id === user.id ? (
                    <select value={editingUser.role} onChange={(e) => handleChange(e, 'role')}
                      className="border rounded px-2 py-1 w-full" style={{ fontFamily: typography.fontFamily }}>
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  ) : user.role}
                </td>
                <td className="py-2 px-4 border-b" style={{ fontFamily: typography.fontFamily }}>
                  {editingUser && editingUser.id === user.id ? (
                    <input type="email" value={editingUser.email} onChange={(e) => handleChange(e, 'email')}
                      className="border rounded px-2 py-1 w-full" style={{ fontFamily: typography.fontFamily }} />
                  ) : user.email}
                </td>
                <td className="py-2 px-4 border-b" style={{ fontFamily: typography.fontFamily }}>{user.lastLogin}</td>
                <td className="py-2 px-4 border-b">
                  {editingUser && editingUser.id === user.id ? (
                    <button onClick={handleSave} className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                      style={{ fontFamily: typography.fontFamily }}>حفظ</button>
                  ) : (
                    <button onClick={() => handleEdit(user)} className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                      style={{ fontFamily: typography.fontFamily }}>تعديل</button>
                  )}
                </td>
              </tr>
            ))}
            {newUser && (
              <tr className="bg-blue-50">
                <td className="py-2 px-4 border-b" style={{ fontFamily: typography.fontFamily }}>جديد</td>
                <td className="py-2 px-4 border-b">
                  <input type="text" placeholder="اسم المستخدم" value={newUser.username}
                    onChange={(e) => handleChange(e, 'username')}
                    className="border rounded px-2 py-1 w-full" style={{ fontFamily: typography.fontFamily }} />
                </td>
                <td className="py-2 px-4 border-b">
                  <input type="text" placeholder="كلمة المرور" value={newUser.password}
                    onChange={(e) => handleChange(e, 'password')}
                    className="border rounded px-2 py-1 w-full" style={{ fontFamily: typography.fontFamily }} />
                </td>
                <td className="py-2 px-4 border-b">
                  <select value={newUser.role} onChange={(e) => handleChange(e, 'role')}
                    className="border rounded px-2 py-1 w-full" style={{ fontFamily: typography.fontFamily }}>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </td>
                <td className="py-2 px-4 border-b">
                  <input type="email" placeholder="البريد الإلكتروني" value={newUser.email}
                    onChange={(e) => handleChange(e, 'email')}
                    className="border rounded px-2 py-1 w-full" style={{ fontFamily: typography.fontFamily }} />
                </td>
                <td className="py-2 px-4 border-b" style={{ fontFamily: typography.fontFamily }}>الآن</td>
                <td className="py-2 px-4 border-b">
                  <button onClick={handleSave} className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                    style={{ fontFamily: typography.fontFamily }}>حفظ</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManager;
