import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import AnimatedPage from '@/components/shared/AnimatedPage';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Admin = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // جلب الرسائل من API
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/contact/messages');
      if (!response.ok) throw new Error('فشل في جلب الرسائل');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // حذف رسالة
  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه الرسالة؟')) return;
    try {
      const response = await fetch(`/api/contact/messages/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('فشل في حذف الرسالة');
      toast({
        title: 'تم الحذف',
        description: 'تم حذف الرسالة بنجاح',
      });
      // تحديث القائمة بعد الحذف
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (error) {
      toast({
        title: 'خطأ',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <AnimatedPage>
      <Helmet>
        <title>لوحة الإدارة | مطعم الأصالة</title>
        <meta name="description" content="إدارة رسائل التواصل الخاصة بمطعم الأصالة." />
      </Helmet>

      <PageHeader
        title="لوحة الإدارة"
        subtitle="إدارة رسائل التواصل الواردة"
      />

      <div className="overflow-x-auto">
        {loading ? (
          <p>جاري التحميل...</p>
        ) : (
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">الاسم</th>
                <th className="border border-gray-300 px-4 py-2">البريد الإلكتروني</th>
                <th className="border border-gray-300 px-4 py-2">الهاتف</th>
                <th className="border border-gray-300 px-4 py-2">الموضوع</th>
                <th className="border border-gray-300 px-4 py-2">الرسالة</th>
                <th className="border border-gray-300 px-4 py-2">التاريخ</th>
                <th className="border border-gray-300 px-4 py-2">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {messages.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">لا توجد رسائل</td>
                </tr>
              ) : (
                messages.map(({ id, name, email, phone, subject, message, created_at }) => (
                  <tr key={id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{name}</td>
                    <td className="border border-gray-300 px-4 py-2">{email}</td>
                    <td className="border border-gray-300 px-4 py-2">{phone}</td>
                    <td className="border border-gray-300 px-4 py-2">{subject}</td>
                    <td className="border border-gray-300 px-4 py-2 max-w-xs truncate" title={message}>{message}</td>
                    <td className="border border-gray-300 px-4 py-2">{new Date(created_at).toLocaleString('ar-EG')}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(id)}>
                        حذف
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </AnimatedPage>
  );
};

export default Admin;
