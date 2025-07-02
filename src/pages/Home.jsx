import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AnimatedPage from '@/components/shared/AnimatedPage';
import PageHeader from '@/components/shared/PageHeader';
import { motion } from 'framer-motion';

const Home = () => {
  const [hero, setHero] = useState(null);
  const [services, setServices] = useState([]);
  const [menuPreview, setMenuPreview] = useState(null);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    // جلب بيانات home_hero
    fetch('/api/home/hero')
      .then(res => res.json())
      .then(data => setHero(data))
      .catch(console.error);

    // جلب بيانات home_services
    fetch('/api/home/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(console.error);

    // جلب بيانات home_menu_preview
    fetch('/api/home/menu_preview')
      .then(res => res.json())
      .then(data => setMenuPreview(data))
      .catch(console.error);

    // جلب بيانات home_testimonials
    fetch('/api/home/testimonials')
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(console.error);
  }, []);

  return (
    <AnimatedPage>
      <Helmet>
        <title>{hero?.title || 'مطعم الأصالة'}</title>
        <meta name="description" content={hero?.description || 'أفضل الأطباق الشرقية'} />
      </Helmet>

      <PageHeader title={hero?.title || 'مرحبًا بكم في مطعم الأصالة'} subtitle={hero?.description || 'ألذ الأطباق الشرقية بانتظاركم'} />

      {/* قسم الهيرو */}
      {hero && (
        <section className="hero-section">
          <img src={hero.image_url} alt={hero.title} className="w-full h-auto rounded-lg" />
        </section>
      )}

      {/* قسم الخدمات */}
      {services.length > 0 && (
        <section className="services-section grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {services.map(service => (
            <motion.div key={service.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="service-icon mb-4">
                <img src={service.icon_url} alt={service.service_title} className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-center">{service.service_title}</h3>
              <p className="text-center text-muted-foreground">{service.service_description}</p>
            </motion.div>
          ))}
        </section>
      )}

      {/* قسم عرض القائمة */}
      {menuPreview && (
        <section className="menu-preview-section mt-10 text-center">
          <h2 className="text-3xl font-bold mb-4">{menuPreview.title}</h2>
          <img src={menuPreview.image_url} alt={menuPreview.title} className="mx-auto rounded-lg" />
          <a href={menuPreview.menu_link} className="mt-4 inline-block text-primary font-semibold underline">
            استعرض القائمة كاملة
          </a>
        </section>
      )}

      {/* قسم التقييمات */}
      {testimonials.length > 0 && (
        <section className="testimonials-section mt-10">
          <h2 className="text-3xl font-bold mb-6 text-center">آراء العملاء</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <motion.div key={testimonial.id} className="testimonial-card p-6 border rounded-lg shadow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <div className="flex items-center mb-4">
                  <img src={testimonial.client_image} alt={testimonial.client_name} className="w-16 h-16 rounded-full mr-4" />
                  <div>
                    <h3 className="font-semibold">{testimonial.client_name}</h3>
                    <div className="text-yellow-400">
                      {'⭐'.repeat(testimonial.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">{testimonial.comment}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </AnimatedPage>
  );
};

export default Home;
