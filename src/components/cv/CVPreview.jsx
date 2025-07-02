import React from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, GraduationCap, Award, Phone, Mail, MapPin, Globe } from 'lucide-react';

const CVPreview = ({ formData, selectedTemplate }) => {
  const templateStyles = {
    modern: 'bg-gradient-to-br from-blue-50 to-purple-50 border-l-4 border-blue-500',
    classic: 'bg-white border border-gray-300',
    creative: 'bg-gradient-to-br from-pink-50 to-orange-50 border-l-4 border-pink-500',
    professional: 'bg-gradient-to-br from-green-50 to-teal-50 border-l-4 border-green-500'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`max-w-4xl mx-auto p-8 rounded-xl shadow-2xl ${templateStyles[selectedTemplate]} text-gray-800`}
    >
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{formData.personalInfo.fullName}</h1>
        <p className="text-xl text-gray-600 mb-4">{formData.personalInfo.title}</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {formData.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {formData.personalInfo.email}
            </div>
          )}
          {formData.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {formData.personalInfo.phone}
            </div>
          )}
          {formData.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {formData.personalInfo.location}
            </div>
          )}
          {formData.personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              {formData.personalInfo.website}
            </div>
          )}
        </div>
      </div>

      {formData.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-6 h-6" />
            نبذة شخصية
          </h2>
          <p className="text-gray-700 leading-relaxed">{formData.personalInfo.summary}</p>
        </div>
      )}

      {formData.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Briefcase className="w-6 h-6" />
            الخبرة المهنية
          </h2>
          <div className="space-y-4">
            {formData.experience.map(exp => (
              <div key={exp.id} className="border-r-2 border-gray-300 pr-4">
                <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                <p className="text-gray-600 font-medium">{exp.company}</p>
                <p className="text-sm text-gray-500 mb-2">{exp.startDate} - {exp.endDate}</p>
                <p className="text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {formData.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            التعليم
          </h2>
          <div className="space-y-4">
            {formData.education.map(edu => (
              <div key={edu.id} className="border-r-2 border-gray-300 pr-4">
                <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-gray-600 font-medium">{edu.institution}</p>
                <p className="text-sm text-gray-500 mb-2">{edu.year}</p>
                <p className="text-gray-700">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {formData.skills.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-6 h-6" />
              المهارات
            </h2>
            <div className="space-y-2">
              {formData.skills.map(skill => (
                <div key={skill.id} className="flex justify-between items-center">
                  <span className="text-gray-700">{skill.name}</span>
                  <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">{skill.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {formData.languages.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">اللغات</h2>
            <div className="space-y-2">
              {formData.languages.map(lang => (
                <div key={lang.id} className="flex justify-between items-center">
                  <span className="text-gray-700">{lang.name}</span>
                  <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CVPreview;