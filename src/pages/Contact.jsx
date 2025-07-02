import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import AnimatedPage from '@/components/shared/AnimatedPage';
import PageHeader from '@/components/shared/PageHeader';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    // تحقق من تعبئة الحقول المطلوبة (يمكن تطويره لاحقًا)
    const { name, phone, email, subject, message } = formData;
    if (!name || !phone || !email || !subject || !message) {
      setStatusMessage('يرجى تعبئة جميع الحقول المطلوبة.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusMessage('✅ تم إرسال الرسالة بنجاح.');
        setFormData({
          name: '',
          phone: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        const errorData = await response.json();
        setStatusMessage(errorData.message || 'حدث خطأ أثناء إرسال الرسالة.');
      }
    } catch (error) {
      setStatusMessage('حدث خطأ في الاتصال بالخادم.');
      console.error('Contact form submission error:', error);
    }

    setIsSubmitting(false);
  };

  return (
    <AnimatedPage>
      <Helmet>
        <title>تواصل معنا | مطعم الأصالة</title>
        <meta name="description" content="اتصل بنا لطلب المعلومات أو الحجز أو لأي استفسار آخر." />
      </Helmet>

      <PageHeader
        title="تواصل معنا"
        subtitle="يسعدنا استلام استفساراتكم وملاحظاتكم عبر النموذج أدناه."
      />

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6 p-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-semibold">الاسم الكامل *</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full border rounded px-3 py-2"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block mb-1 font-semibold">رقم الهاتف *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full border rounded px-3 py-2"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-semibold">البريد الإلكتروني *</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full border rounded px-3 py-2"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="subject" className="block mb-1 font-semibold">الموضوع *</label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="w-full border rounded px-3 py-2"
            value={formData.subject}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-1 font-semibold">الرسالة *</label>
          <textarea
            id="message"
            name="message"
            className="w-full border rounded px-3 py-2 h-32 resize-none"
            value={formData.message}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        {statusMessage && (
          <p className={`text-center font-semibold ${statusMessage.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
            {statusMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition disabled:opacity-50"
        >
          {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
        </button>
      </form>
    </AnimatedPage>
  );
};

export default Contact;
