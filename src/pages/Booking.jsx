import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import AnimatedPage from '@/components/shared/AnimatedPage';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const Booking = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    reservationDate: '',
    reservationTime: '',
    guestsCount: '',
    specialNotes: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // تحقق من تعبئة الحقول المطلوبة
    const { fullName, phoneNumber, email, reservationDate, reservationTime, guestsCount } = formData;
    if (!fullName || !phoneNumber || !email || !reservationDate || !reservationTime || !guestsCount) {
      toast({
        title: 'يرجى تعبئة جميع الحقول المطلوبة',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await fetch('/api/booking/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: 'تم إرسال طلب الحجز بنجاح!',
          description: 'سنتواصل معك قريبًا لتأكيد الحجز.',
        });
        // إعادة تعيين الحقول
        setFormData({
          fullName: '',
          phoneNumber: '',
          email: '',
          reservationDate: '',
          reservationTime: '',
          guestsCount: '',
          specialNotes: '',
        });
      } else {
        toast({
          title: 'حدث خطأ!',
          description: 'لم نتمكن من إرسال طلب الحجز. حاول مرة أخرى.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'حدث خطأ!',
        description: 'لم نتمكن من إرسال طلب الحجز. حاول مرة أخرى.',
        variant: 'destructive',
      });
    }
  };

  return (
    <AnimatedPage>
      <Helmet>
        <title>احجز طاولتك | مطعم الأصالة</title>
        <meta name="description" content="احجز طاولتك في مطعم الأصالة بسهولة وسرعة. استمتع بأفضل الأجواء وأشهى الأطباق." />
      </Helmet>

      <PageHeader
        title="احجز طاولتك"
        subtitle="املأ النموذج التالي لحجز طاولتك في مطعم الأصالة."
      />

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6 rtl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="fullName">الاسم الكامل *</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="اسمك الكامل"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="phoneNumber">رقم الهاتف *</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="رقم هاتفك"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">البريد الإلكتروني *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@mail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="reservationDate">تاريخ الحجز *</Label>
            <Input
              id="reservationDate"
              name="reservationDate"
              type="date"
              value={formData.reservationDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="reservationTime">وقت الحجز *</Label>
            <Input
              id="reservationTime"
              name="reservationTime"
              type="time"
              value={formData.reservationTime}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="guestsCount">عدد الضيوف *</Label>
            <Input
              id="guestsCount"
              name="guestsCount"
              type="number"
              min="1"
              max="50"
              value={formData.guestsCount}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="specialNotes">ملاحظات إضافية</Label>
          <Textarea
            id="specialNotes"
            name="specialNotes"
            placeholder="إذا كان لديك ملاحظات خاصة، اكتبها هنا..."
            rows={4}
            value={formData.specialNotes}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" className="w-full">إرسال طلب الحجز</Button>
      </form>
    </AnimatedPage>
  );
};

export default Booking;
