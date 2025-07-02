import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const PersonalInfoForm = ({ personalInfo, updatePersonalInfo }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
    >
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <User className="w-6 h-6" />
        المعلومات الشخصية
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white mb-2">الاسم الكامل *</label>
          <input
            type="text"
            value={personalInfo.fullName}
            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="أدخل اسمك الكامل"
          />
        </div>
        <div>
          <label className="block text-white mb-2">المسمى الوظيفي</label>
          <input
            type="text"
            value={personalInfo.title}
            onChange={(e) => updatePersonalInfo('title', e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="مطور ويب، مصمم جرافيك..."
          />
        </div>
        <div>
          <label className="block text-white mb-2">البريد الإلكتروني *</label>
          <input
            type="email"
            value={personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="example@email.com"
          />
        </div>
        <div>
          <label className="block text-white mb-2">رقم الهاتف</label>
          <input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="+966 50 123 4567"
          />
        </div>
        <div>
          <label className="block text-white mb-2">الموقع</label>
          <input
            type="text"
            value={personalInfo.location}
            onChange={(e) => updatePersonalInfo('location', e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="الرياض، السعودية"
          />
        </div>
        <div>
          <label className="block text-white mb-2">الموقع الإلكتروني</label>
          <input
            type="url"
            value={personalInfo.website}
            onChange={(e) => updatePersonalInfo('website', e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="https://mywebsite.com"
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-white mb-2">نبذة شخصية</label>
        <textarea
          value={personalInfo.summary}
          onChange={(e) => updatePersonalInfo('summary', e.target.value)}
          rows={4}
          className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="اكتب نبذة مختصرة عن خبراتك وأهدافك المهنية..."
        />
      </div>
    </motion.div>
  );
};

export default PersonalInfoForm;