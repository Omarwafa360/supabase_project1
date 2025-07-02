import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const TreeNode = ({ node, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isFolder = node.type === 'folder';

  const handleToggle = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <div
        className={`flex items-center py-1 px-2 rounded-md text-left ${isFolder ? 'cursor-pointer hover:bg-white/10' : ''}`}
        onClick={handleToggle}
        style={{ paddingLeft: `${level * 1.5}rem` }}
      >
        {isFolder ? (
          <ChevronRight
            className={`w-4 h-4 mr-1 transition-transform shrink-0 ${isOpen ? 'rotate-90' : ''}`}
          />
        ) : (
          <span className="w-4 h-4 mr-1 shrink-0"></span>
        )}
        <span className="mr-2 shrink-0">{node.icon}</span>
        <span>{node.name}</span>
      </div>
      <AnimatePresence>
        {isOpen && isFolder && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {node.children.map((childNode) => (
              <TreeNode key={childNode.name} node={childNode} level={level + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TreeNode;