// src/components/Header.jsx
import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChefHat, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "الرئيسية", path: "/" },
  { name: "عن المطعم", path: "/about" },
  { name: "قائمة الطعام", path: "/menu" },
  { name: "معرض الصور", path: "/gallery" },
  { name: "تواصل معنا", path: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeLinkClass = "text-primary font-bold";
  const normalLinkClass = "text-foreground/80 hover:text-primary transition-colors";

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <ChefHat className="w-8 h-8" />
            <span>مطعم الأصالة</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => (isActive ? activeLinkClass : normalLinkClass)}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Booking Button */}
          <div className="hidden md:block">
            <Button asChild>
              <Link to="/booking">احجز طاولة</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-foreground">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-background border-t border-border"
        >
          <nav className="flex flex-col items-center gap-4 p-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `text-lg ${isActive ? activeLinkClass : normalLinkClass}`}
              >
                {link.name}
              </NavLink>
            ))}
            <Button asChild className="mt-4 w-full">
              <Link to="/booking" onClick={() => setIsMenuOpen(false)}>احجز طاولة</Link>
            </Button>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
