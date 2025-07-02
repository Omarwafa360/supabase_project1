import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LanguagesForm = ({ languages, addLanguage, removeItem, updateItem }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Globe className="w-6 h-6" />
            اللغات
        </h2>
        <Button onClick={addLanguage} className="bg-orange-500 hover:bg-orange-600">
          <Plus className="w-4 h-4 mr-2" />
          إضافة
        </Button>
      </div>
      <div className="space-y-4">
        {languages.map((lang, index) => (
          <motion.div
            key={lang.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-lg p-4 border border-white/10"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-white">لغة #{index + 1}</h3>
              <Button
                onClick={() => removeItem('languages', lang.id)}
                variant="ghost"
                size="sm"
                className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-white mb-2">اسم اللغة</label>
                <input
                  type="text"
                  value={lang.name}
                  onChange={(e) => updateItem('languages', lang.id, 'name', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="العربية, الإنجليزية..."
                />
              </div>
              <div>
                <label className="block text-white mb-2">المستوى</label>
                <select
                  value={lang.level}
                  onChange={(e) => updateItem('languages', lang.id, 'level', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="مبتدئ">مبتدئ</option>
                  <option value="متوسط">متوسط</option>
                  <option value="متقدم">متقدم</option>
                  <option value="لغة أم">لغة أم</option>
                </select>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LanguagesForm;