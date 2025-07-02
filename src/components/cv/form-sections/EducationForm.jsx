import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EducationForm = ({ education, addEducation, removeItem, updateItem }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <GraduationCap className="w-6 h-6" />
          التعليم
        </h2>
        <Button onClick={addEducation} className="bg-green-500 hover:bg-green-600">
          <Plus className="w-4 h-4 mr-2" />
          إضافة تعليم
        </Button>
      </div>
      <div className="space-y-4">
        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-lg p-4 border border-white/10"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-white">تعليم #{index + 1}</h3>
              <Button
                onClick={() => removeItem('education', edu.id)}
                variant="ghost"
                size="sm"
                className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2">الدرجة العلمية</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateItem('education', edu.id, 'degree', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="بكالوريوس علوم الحاسب"
                />
              </div>
              <div>
                <label className="block text-white mb-2">المؤسسة التعليمية</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateItem('education', edu.id, 'institution', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="جامعة الملك سعود"
                />
              </div>
              <div>
                <label className="block text-white mb-2">سنة التخرج</label>
                <input
                  type="text"
                  value={edu.year}
                  onChange={(e) => updateItem('education', edu.id, 'year', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="2020"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-white mb-2">تفاصيل إضافية</label>
              <textarea
                value={edu.description}
                onChange={(e) => updateItem('education', edu.id, 'description', e.target.value)}
                rows={2}
                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="المعدل التراكمي، التخصص الفرعي، الأنشطة..."
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EducationForm;