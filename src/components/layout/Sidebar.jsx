import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Shield, HeartPulse, UserCircle, Baby } from 'lucide-react';

const navItems = [
  { to: '/', text: 'لوحة التحكم', icon: Home },
  { to: '/vaccinations', text: 'التطعيمات', icon: Shield },
  { to: '/health-tips', text: 'نصائح طبية', icon: HeartPulse },
];

const Sidebar = () => {
  return (
    <motion.aside
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="hidden md:flex flex-col w-64 bg-card border-l border-border h-screen sticky top-0 p-4"
    >
      <div className="flex items-center gap-3 mb-10 p-2">
        <Baby className="h-10 w-10 text-primary" />
        <span className="text-xl font-bold">صحة طفلي</span>
      </div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-muted-foreground hover:text-foreground hover:bg-accent ${
                isActive ? 'bg-primary/10 text-primary font-bold' : ''
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.text}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto">
        <NavLink
            to="/profile"
            onClick={(e) => {
              e.preventDefault();
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-muted-foreground hover:text-foreground hover:bg-accent cursor-not-allowed"
          >
            <UserCircle className="h-5 w-5" />
            <span>الملف الشخصي</span>
          </NavLink>
      </div>
    </motion.aside>
  );
};

export default Sidebar;