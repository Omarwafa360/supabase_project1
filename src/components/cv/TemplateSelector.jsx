import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TemplateSelector = ({ templates, selectedTemplate, setSelectedTemplate, generateCV }) => {
  return (
    <>
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <FileText className="w-6 h-6" />
          اختر القالب
        </h2>
        <div className="space-y-3">
          {templates.map(template => (
            <motion.div
              key={template.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTemplate(template.id)}
              className={`p-4 rounded-lg cursor-pointer border-2 transition-all ${
                selectedTemplate === template.id
                  ? 'border-white bg-white/20'
                  : 'border-white/30 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className={`w-full h-20 rounded-lg bg-gradient-to-r ${template.color} mb-3`} />
              <h3 className="text-white font-semibold">{template.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={generateCV}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl text-lg shadow-lg"
        >
          <FileText className="w-5 h-5 mr-2" />
          إنشاء السيرة الذاتية
        </Button>
      </motion.div>
    </>
  );
};

export default TemplateSelector;