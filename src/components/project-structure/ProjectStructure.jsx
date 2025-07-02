import React from 'react';
import { motion } from 'framer-motion';
import { structure } from '@/components/project-structure/structureData';
import TreeNode from '@/components/project-structure/TreeNode';
import { GitMerge } from 'lucide-react';

const ProjectStructure = () => {
  return (
    <motion.div
      key="structure"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
    >
      <div className="flex items-center gap-4 mb-6">
        <GitMerge className="w-8 h-8 text-blue-400" />
        <h2 className="text-3xl font-bold text-white">
          هيكل المشروع
        </h2>
      </div>
      <p className="text-gray-300 mb-8 text-right">
        هنا نظرة على كيفية تنظيم الملفات والمجلدات في هذا المشروع. انقر على المجلدات لاستكشافها.
      </p>
      <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
        {structure.map((node) => (
          <TreeNode key={node.name} node={node} level={0}/>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectStructure;