import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import AnimatedPage from '@/components/shared/AnimatedPage';
import PageHeader from '@/components/shared/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { supabase } from '@/supabaseClient';

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const Home = () => {
  const { pageBackgrounds, pageTypography } = useTheme();
  const bg = pageBackgrounds?.Home || '#ffffff';
  const typography = pageTypography?.Home || {};

  const [heroImages, setHeroImages] = useState([]);
  const [[page, direction], setPage] = useState([0, 0]);
  const interactionRef = useRef(false);
  const timeoutRef = useRef(null);

  const [services, setServices] = useState([]);
  const [menuPreview, setMenuPreview] = useState(null);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: heroData, error: heroError } = await supabase.from('home_hero').select('*');
        if (heroError) throw heroError;
        setHeroImages(heroData || []);

        const { data: servicesData, error: servicesError } = await supabase.from('home_services').select('*');
        if (servicesError) throw servicesError;
        setServices(servicesData || []);

        const { data: menuData, error: menuError } = await supabase.from('home_menu_preview').select('*');
        if (menuError) throw menuError;
        setMenuPreview(menuData?.[0] || null);

        const { data: testimonialsData, error: testimonialsError } = await supabase.from('home_testimonials').select('*');
        if (testimonialsError) throw testimonialsError;
        setTestimonials(testimonialsData || []);
      } catch (error) {
        console.error('Supabase fetch error:', error.message);
      }
    };

    fetchData();
  }, []);

  const imageIndex = heroImages.length > 0 ? ((page % heroImages.length) + heroImages.length) % heroImages.length : 0;

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
    interactionRef.current = true;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      interactionRef.current = false;
      autoPlay();
    }, 10000);
  };

  const autoPlay = () => {
    if (!interactionRef.current) {
      setPage(([prevPage]) => [prevPage + 1, 1]);
    }
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      autoPlay();
    }, 5000);

    return () => clearTimeout(timeoutRef.current);
  }, [page]);

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
      }}
    >
      <Helmet>
        <title>{heroImages[imageIndex]?.title || 'مطعم الأصالة'}</title>
        <meta
          name="description"
          content={heroImages[imageIndex]?.description || 'أفضل الأطباق الشرقية'}
        />
      </Helmet>

      <PageHeader
        title={heroImages[imageIndex]?.title || 'مرحبًا بكم في مطعم الأصالة'}
        subtitle={heroImages[imageIndex]?.description || 'ألذ الأطباق الشرقية بانتظاركم'}
      />

      {/* Hero Carousel */}
      <section
        className="hero-section mt-6"
        style={{ position: 'relative', width: '100%', height: '70vh', overflow: 'hidden' }}
      >
        <AnimatePresence initial={false} custom={direction}>
          {heroImages.length > 0 && (
            <motion.img
              key={page}
              src={heroImages[imageIndex]?.image_url || ''}
              alt={heroImages[imageIndex]?.title || 'Hero Image'}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                width: '90vw',
                height: '70vh',
                objectFit: 'cover',
                borderRadius: 10,
                margin: 'auto',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              draggable={false}
            />
          )}
        </AnimatePresence>

        {heroImages.length > 1 && (
          <>
            <button
              onClick={() => paginate(-1)}
              aria-label="السابق"
              style={{
                position: 'absolute',
                top: '50%',
                left: 20,
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: 40,
                height: 40,
                cursor: 'pointer',
                fontSize: 24,
                zIndex: 10,
              }}
            >
              ‹
            </button>
            <button
              onClick={() => paginate(1)}
              aria-label="التالي"
              style={{
                position: 'absolute',
                top: '50%',
                right: 20,
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: 40,
                height: 40,
                cursor: 'pointer',
                fontSize: 24,
                zIndex: 10,
              }}
            >
              ›
            </button>
          </>
        )}
      </section>

      {/* Services Section */}
      {services.length > 0 && (
        <section className="services-section grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 px-4 md:px-0">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="service-icon mb-4">
                <img src={service.icon_url || ''} alt={service.service_title || 'Service Icon'} className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">{service.service_title}</h3>
              <p className="text-center text-muted-foreground">{service.service_description}</p>
            </motion.div>
          ))}
        </section>
      )}

      {/* Menu Preview Section */}
      {menuPreview && (
        <section className="menu-preview-section mt-16 text-center px-4 md:px-0">
          <h2 className="text-3xl font-bold mb-6">{menuPreview.title}</h2>
          <img
            src={menuPreview.image_url || ''}
            alt={menuPreview.title || 'Menu Preview'}
            className="mx-auto rounded-lg shadow-md max-w-full h-auto"
          />
          <a
            href={menuPreview.menu_link || '#'}
            className="mt-6 inline-block text-primary font-semibold underline hover:text-primary-dark transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            استعرض القائمة كاملة
          </a>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="testimonials-section mt-20 px-4 md:px-0">
          <h2 className="text-3xl font-bold mb-10 text-center">آراء العملاء</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="testimonial-card p-6 border rounded-lg shadow-md bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.client_image || ''}
                    alt={testimonial.client_name || 'Client'}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{testimonial.client_name}</h3>
                    <div className="text-yellow-400">{'⭐'.repeat(testimonial.rating)}</div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">{testimonial.comment}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </AnimatedPage>
  );
};

export default Home;
