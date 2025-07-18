import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import AnimatedPage from "@/components/shared/AnimatedPage";
import PageHeader from "@/components/shared/PageHeader";
import { motion } from "framer-motion";
import { useTheme } from '@/context/ThemeContext';
import { supabase } from '@/supabaseClient';

const Gallery = () => {
  const { pageBackgrounds, pageTypography } = useTheme();
  const bg = pageBackgrounds.Gallery || '#ffffff';
  const typography = pageTypography.Gallery || {};

  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const { data, error } = await supabase.from('gallery_images').select('*');
        if (error) throw error;
        setGalleryImages(data || []);
      } catch (err) {
        setError(err.message || 'حدث خطأ ما');
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
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
        <title>معرض الصور | مطعم الأصالة</title>
        <meta
          name="description"
          content="استعرض أجمل صور مطعم الأصالة وأطباقه الشهية وأجوائه الرائعة."
        />
      </Helmet>

      <PageHeader
        title="معرض الصور"
        subtitle="لحظات من الجمال واللذة في مطعم الأصالة."
      />

      {loading && (
        <div className="text-center text-lg">جاري تحميل الصور...</div>
      )}

      {error && (
        <div className="text-center text-red-600 font-semibold">{error}</div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-lg shadow-lg group"
            >
              <img
                src={image.image_url}
                alt={image.title}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white text-center p-4">
                  <h3 className="text-xl font-semibold">{image.title}</h3>
                  <p className="text-sm">{image.description}</p>
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
