import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import AnimatedPage from '@/components/shared/AnimatedPage';
import PageHeader from '@/components/shared/PageHeader';
import { motion } from 'framer-motion';

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch('/api/gallery/images');
        if (!res.ok) throw new Error('فشل تحميل الصور');
        const data = await res.json();
        setGalleryImages(data);
      } catch (err) {
        setError(err.message || 'حدث خطأ ما');
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  return (
    <AnimatedPage>
      <Helmet>
        <title>معرض الصور | مطعم الأصالة</title>
        <meta
          name="description"
          content="استعرض صور أطباقنا الشهية وأجواء المطعم الدافئة. اكتشف ما ينتظرك في مطعم الأصالة."
        />
      </Helmet>
      <PageHeader
        title="معرض الصور"
        subtitle="استعرض صور أطباقنا الشهية وأجواء المطعم الدافئة التي تجمع بين الأصالة والراحة."
      />

      {loading && <p className="text-center py-10">جارٍ تحميل الصور...</p>}
      {error && <p className="text-center py-10 text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  alt={image.title}
                  src={image.image_url}  // ربط مباشر مع رابط الصورة من الداتا بيس
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-center font-medium px-4">{image.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </AnimatedPage>
  );
};

export default Gallery;
