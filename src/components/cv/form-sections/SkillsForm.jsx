import React from 'react';
import { motion } from 'framer-motion';
import { Award, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SkillsForm = ({ skills, addSkill, removeItem, updateItem }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Award className="w-6 h-6" />
          المهارات
        </h2>
        <Button onClick={addSkill} className="bg-purple-500 hover:bg-purple-600">
          <Plus className="w-4 h-4 mr-2" />
          إضافة
        </Button>
      </div>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-lg p-4 border border-white/10"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-white">مهارة #{index + 1}</h3>
              <Button
                onClick={() => removeItem('skills', skill.id)}
                variant="ghost"
                size="sm"
                className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-white mb-2">اسم المهارة</label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateItem('skills', skill.id, 'name', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="JavaScript, التصميم..."
                />
              </div>
              <div>
                <label className="block text-white mb-2">المستوى</label>
                <select
                  value={skill.level}
                  onChange={(e) => updateItem('skills', skill.id, 'level', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="مبتدئ">مبتدئ</option>
                  <option value="متوسط">متوسط</option>
                  <option value="متقدم">متقدم</option>
                  <option value="خبير">خبير</option>
                </select>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillsForm;