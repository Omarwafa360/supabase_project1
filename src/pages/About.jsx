import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import AnimatedPage from '@/components/shared/AnimatedPage';
import PageHeader from '@/components/shared/PageHeader';
import { useTheme } from '@/context/ThemeContext';
import { supabase } from '@/supabaseClient'; // تصحيح المسار

const About = () => {
  const { pageBackgrounds, pageTypography } = useTheme();
  const bg = pageBackgrounds.About;
  const typography = pageTypography.About;

  const [story, setStory] = useState([]);
  const [values, setValues] = useState([]);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    async function fetchAboutData() {
      try {
        // جلب قصة المطعم
        const { data: storyData, error: storyError } = await supabase
          .from('about_story')
          .select('*');
        if (storyError) throw storyError;
        setStory(storyData || []);

        // جلب القيم والمبادئ
        const { data: valuesData, error: valuesError } = await supabase
          .from('about_values')
          .select('*');
        if (valuesError) throw valuesError;
        setValues(valuesData || []);

        // جلب فريق العمل
        const { data: teamData, error: teamError } = await supabase
          .from('about_team')
          .select('*');
        if (teamError) throw teamError;
        setTeam(teamData || []);
      } catch (error) {
        console.error('خطأ في جلب بيانات صفحة عن المطعم:', error.message);
      }
    }
    fetchAboutData();
  }, []);

  return (
    <AnimatedPage
      style={{
        background: bg,
        fontFamily: typography.fontFamily,
        color: typography.color,
        fontSize: typography.fontSize,
        fontWeight: typography.fontWeight,
        textAlign: typography.textAlign,
        minHeight: '100vh',
      }}
    >
      <Helmet>
        <title>عن المطعم | مطعم الأصالة</title>
        <meta name="description" content="تعرف على قصة مطعم الأصالة وقيمه وفريق العمل المميز." />
      </Helmet>

      <PageHeader
        title="عن المطعم"
        subtitle="تعرف على قصة مطعم الأصالة وقيمه وفريق العمل المميز."
      />

      <section className="space-y-8">
        {story.length > 0 ? (
          story.map((section) => (
            <div key={section.id} className="flex flex-col md:flex-row gap-6 items-center">
              <img src={section.image_url} alt="قصة المطعم" className="w-full md:w-1/2 rounded-lg object-cover" />
              <p className="text-lg md:w-1/2">{section.paragraph}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">لا توجد قصة لعرضها حالياً.</p>
        )}
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">قيمنا ومبادئنا</h2>
        {values.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.id} className="text-center p-6 border rounded-lg shadow-sm hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">لا توجد قيم لعرضها حالياً.</p>
        )}
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">فريق العمل</h2>
        {team.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.id} className="text-center p-4 border rounded-lg shadow-sm hover:shadow-lg transition">
                <img src={member.image_url} alt={member.name} className="w-32 h-32 mx-auto rounded-full object-cover mb-4" />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="italic text-sm mb-2">{member.title}</p>
                <p>{member.bio}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">لا يوجد أعضاء فريق لعرضهم حالياً.</p>
        )}
      </section>
    </AnimatedPage>
  );
};

export default About;
