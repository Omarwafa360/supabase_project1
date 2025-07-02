import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import * as icons from 'lucide-react';
import { cn } from '@/lib/utils';

const layoutClasses = {
  'icon-top': 'flex-col',
  'icon-bottom': 'flex-col-reverse',
  'icon-left': 'flex-row-reverse items-center gap-4',
  'icon-right': 'flex-row items-center gap-4',
};

const LogoPreview = forwardRef(({ config }, ref) => {
  const {
    text,
    textColor,
    fontFamily,
    fontSize,
    icon,
    iconColor,
    iconSize,
    backgroundColor,
    padding,
    borderRadius,
    layout,
  } = config;

  const LucideIcon = icons[icon] || icons.Smile;

  const fontStyle = {
    fontFamily: `${fontFamily}, sans-serif`,
    fontSize: `${fontSize}px`,
    color: textColor,
  };

  return (
    <motion.div
      ref={ref}
      className={cn("flex justify-center items-center", layoutClasses[layout])}
      style={{
        backgroundColor: backgroundColor,
        padding: `${padding}px`,
        borderRadius: `${borderRadius}px`,
      }}
      animate={{
        backgroundColor: backgroundColor,
        padding: `${padding}px`,
        borderRadius: `${borderRadius}px`,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.div
        animate={{
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          color: iconColor,
        }}
      >
        <LucideIcon className="w-full h-full" />
      </motion.div>
      <motion.h2 style={fontStyle} animate={fontStyle}>
        {text}
      </motion.h2>
    </motion.div>
  );
});

LogoPreview.displayName = 'LogoPreview';

export default LogoPreview;