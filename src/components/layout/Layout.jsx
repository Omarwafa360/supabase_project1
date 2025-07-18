import React, { useEffect, useMemo } from 'react';
import Header from './Header'; 
import Footer from './Footer';

const Layout = ({ children, pageBackgrounds, pageTypography, currentPagePath }) => {

  const currentPageName = useMemo(() => {
    switch (currentPagePath) {
      case '/': return 'Home';
      case '/about': return 'About';
      case '/menu': return 'Menu';
      case '/gallery': return 'Gallery';
      case '/contact': return 'Contact';
      case '/booking': return 'Booking';
      case '/admin': return 'Admin';
      case '/admin-login': return 'Admin'; 
      default: return 'NotFound'; // Changed default to NotFound for unknown paths
    }
  }, [currentPagePath]);

  const currentBackground = pageBackgrounds[currentPageName] || '#ffffff';
  const currentTypography = pageTypography[currentPageName] || {
    fontFamily: 'Tajawal, sans-serif',
    fontSize: '16px',
    color: '#000000',
    fontWeight: 'normal',
    textAlign: 'right'
  };

  useEffect(() => {
    document.body.style.background = currentBackground;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';

    return () => {
      document.body.style.background = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundAttachment = '';
    };
  }, [currentBackground]);

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { typography: currentTypography });
    }
    return child;
  });

  return (
    <div className="layout-container">
      <Header />
      <main className="main-content">
        {childrenWithProps}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
