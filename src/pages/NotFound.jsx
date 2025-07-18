import React from 'react';
import { Helmet } from 'react-helmet';
import AnimatedPage from '@/components/shared/AnimatedPage';
import PageHeader from '@/components/shared/PageHeader';
import { useTheme } from '@/context/ThemeContext';

const NotFound = () => {
  const { pageTypography, pageBackgrounds } = useTheme();
  const typography = pageTypography.NotFound || {};
  const bg = pageBackgrounds.NotFound || '#ffffff';

  return (
    <AnimatedPage
      style={{
        background: bg,
        fontFamily: typography.fontFamily || 'sans-serif',
        color: typography.color || '#000',
        fontSize: typography.fontSize,
        fontWeight: typography.fontWeight,
        textAlign: typography.textAlign,
        minHeight: '100vh',
        padding: '2rem',
      }}
    >
      <Helmet>
        <title>صفحة غير موجودة | مطعم الأصالة</title>
        <meta
          name="description"
          content="الصفحة التي تحاول الوصول إليها غير موجودة. الرجاء التحقق من الرابط والمحاولة مرة أخرى."
        />
      </Helmet>
      <PageHeader
        title="خطأ 404"
        subtitle="عذرًا، الصفحة التي تبحث عنها غير موجودة."
      />
      <div className="text-center mt-12">
        <p className="text-lg font-semibold">لا يمكننا العثور على الصفحة التي طلبتها.</p>
        <p className="mt-4">
          الرجاء التحقق من الرابط أو العودة إلى الصفحة الرئيسية.
        </p>
      </div>
    </AnimatedPage>
  );
};

export default NotFound;
