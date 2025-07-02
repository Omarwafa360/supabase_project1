
import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary mb-4">
              <ChefHat className="w-8 h-8" />
              <span>مطعم الأصالة</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              نقدم أشهى الأطباق العربية الأصيلة في أجواء عائلية دافئة ومريحة.
            </p>
          </div>

          <div>
            <p className="font-bold mb-4">روابط سريعة</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary transition-colors">عن المطعم</Link></li>
              <li><Link to="/menu" className="hover:text-primary transition-colors">قائمة الطعام</Link></li>
              <li><Link to="/gallery" className="hover:text-primary transition-colors">معرض الصور</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">تواصل معنا</Link></li>
            </ul>
          </div>
          
          <div>
            <p className="font-bold mb-4">أوقات العمل</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Clock size={16} className="text-primary"/>
                <span>السبت - الخميس: 11:00 ص - 12:00 م</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} className="text-primary"/>
                <span>الجمعة: 2:00 م - 12:00 م</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold mb-4">معلومات التواصل</p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 text-primary"/>
                <span>شارع الملك فهد، حي العليا، الرياض، المملكة العربية السعودية</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary"/>
                <a href="tel:+966111234567" dir="ltr" className="hover:text-primary transition-colors">+966 11 123 4567</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary"/>
                <a href="mailto:info@alasala-restaurant.com" className="hover:text-primary transition-colors">info@alasala-restaurant.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} مطعم الأصالة. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
