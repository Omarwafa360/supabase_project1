import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import AnimatedPage from "../components/shared/AnimatedPage";
import PageHeader from "../components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { motion } from "framer-motion";
import { useTheme } from '@/context/ThemeContext';
import { supabase } from '@/supabaseClient';

const Menu = () => {
  const { pageBackgrounds, pageTypography } = useTheme();
  const bg = pageBackgrounds.Menu || '#ffffff';
  const typography = pageTypography.Menu || {};

  const [menuCategories, setMenuCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMenu() {
      try {
        // جلب التصنيفات
        const { data: categories, error: catError } = await supabase.from('menu_categories').select('*');
        if (catError) throw catError;
        // جلب الأصناف
        const { data: items, error: itemsError } = await supabase.from('menu_items').select('*');
        if (itemsError) throw itemsError;
        // ربط الأصناف بالتصنيفات
        const categoriesWithItems = (categories || []).map(category => ({
          ...category,
          items: (items || []).filter(item => item.category_id === category.id)
        }));
        setMenuCategories(categoriesWithItems);
      } catch (err) {
        setError(err.message || 'حدث خطأ ما');
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  const pageStyle = {
    background: bg,
    fontFamily: typography.fontFamily || 'sans-serif',
    color: typography.color || '#000',
    fontSize: typography.fontSize,
    fontWeight: typography.fontWeight,
    textAlign: typography.textAlign,
    minHeight: '100vh',
  };

  if (loading) {
    return (
      <AnimatedPage style={pageStyle}>
        <div className="text-center text-lg">جاري تحميل القائمة...</div>
      </AnimatedPage>
    );
  }

  if (error) {
    return (
      <AnimatedPage style={pageStyle}>
        <div className="text-center text-red-500 text-lg">خطأ: {error}</div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage style={pageStyle}>
      <Helmet>
        <title>قائمة الطعام | مطعم الأصالة</title>
        <meta
          name="description"
          content="استعرض قائمة مطعم الأصالة المتنوعة من الأطباق الشرقية الأصيلة."
        />
      </Helmet>

      <PageHeader
        title="قائمة الطعام"
        subtitle="استمتع بتجربة طعام لا تُنسى مع أطباقنا الشهية."
      />

      <div className="space-y-12">
        {menuCategories.map((category) => (
          <section key={category.id} className="menu-category">
            <h2 className="text-4xl font-bold text-center mb-8 text-primary">
              {category.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items &&
                category.items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                      {item.image_url && (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <CardHeader>
                        <CardTitle className="text-2xl font-semibold">
                          {item.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          {item.description}
                        </p>
                        <p className="text-primary text-xl font-bold">
                          {item.price} ر.س
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </section>
        ))}
      </div>
    </AnimatedPage>
  );
};

export default Menu;
