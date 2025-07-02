import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ExperienceForm = ({ experience, addExperience, removeItem, updateItem }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Briefcase className="w-6 h-6" />
          الخبرة المهنية
        </h2>
        <Button onClick={addExperience} className="bg-blue-500 hover:bg-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          إضافة خبرة
        </Button>
      </div>
      <div className="space-y-4">
        {experience.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-lg p-4 border border-white/10"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-white">خبرة #{index + 1}</h3>
              <Button
                onClick={() => removeItem('experience', exp.id)}
                variant="ghost"
                size="sm"
                className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2">المنصب</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateItem('experience', exp.id, 'position', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="مطور ويب أول"
                />
              </div>
              <div>
                <label className="block text-white mb-2">الشركة</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateItem('experience', exp.id, 'company', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="شركة التقنية المتقدمة"
                />
              </div>
              <div>
                <label className="block text-white mb-2">تاريخ البداية</label>
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => updateItem('experience', exp.id, 'startDate', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="يناير 2020"
                />
              </div>
              <div>
                <label className="block text-white mb-2">تاريخ النهاية</label>
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => updateItem('experience', exp.id, 'endDate', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="حتى الآن"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-white mb-2">وصف المهام</label>
              <textarea
                value={exp.description}
                onChange={(e) => updateItem('experience', exp.id, 'description', e.target.value)}
                rows={3}
                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="اذكر أهم المهام والإنجازات في هذا المنصب..."
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExperienceForm;