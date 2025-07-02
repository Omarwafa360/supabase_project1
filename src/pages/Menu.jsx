import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import AnimatedPage from '@/components/shared/AnimatedPage';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

const Menu = () => {
  const [menuCategories, setMenuCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch('/api/menu/categories');
        if (!res.ok) throw new Error('فشل تحميل القائمة');
        const data = await res.json();
        setMenuCategories(data);
      } catch (err) {
        setError(err.message || 'حدث خطأ ما');
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  return (
    <AnimatedPage>
      <Helmet>
        <title>قائمة الطعام | مطعم الأصالة</title>
        <meta
          name="description"
          content="اكتشف قائمة طعامنا الشاملة من المقبلات والأطباق الرئيسية والمشروبات. أطباق عربية أصيلة بنكهات استثنائية."
        />
      </Helmet>
      <PageHeader
        title="قائمة الطعام"
        subtitle="اكتشف مجموعة متنوعة من الأطباق العربية الأصيلة المحضرة بأجود المكونات وأفضل الطرق التقليدية."
      />

      {loading && <p className="text-center py-10">جارٍ تحميل القائمة...</p>}
      {error && <p className="text-center py-10 text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="space-y-16">
          {menuCategories.map((category, categoryIndex) => (
            <motion.section
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
            >
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  {/* إذا كان عندك أي أيقونات، تحتاج ترجعها هنا بطريقة مناسبة */}
                  {/* مثلا: <category.icon className="w-8 h-8 text-primary" /> */}
                  <h2 className="text-3xl font-bold">{category.name}</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                  >
                    <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <div className="relative">
                        <img
                          className="w-full h-48 object-cover"
                          alt={item.name}
                          src={item.image_url} // رابط الصورة من الباك إند
                        />
                        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full font-bold">
                          {item.price}
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{item.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      )}
    </AnimatedPage>
  );
};

export default Menu;
