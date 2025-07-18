import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AdminLayout from '@/components/admin/AdminLayout';
import TablesManager from '@/components/admin/TablesManager';
import AppearanceManager from '@/components/admin/AppearanceManager';
import TypographyManager from '@/components/admin/TypographyManager';
import DragDropManager from '@/components/admin/DragDropManager';
import UsersManager from '@/components/admin/UsersManager';
import { useTheme } from '@/context/ThemeContext';

const Admin = () => {
  const { pageBackgrounds, pageTypography } = useTheme();
  const bg = pageBackgrounds.Admin || '#ffffff';
  const typography = {
    fontFamily: 'sans-serif',
    color: '#000',
    fontSize: '16px',
    fontWeight: 'normal',
    textAlign: 'left',
    ...pageTypography.Admin
  };

  const [activeTab, setActiveTab] = useState("tables");
  const [currentUserRole, setCurrentUserRole] = useState(localStorage.getItem("userRole") || "guest");
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin-login");
    }
  }, [navigate]);

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "tables":
        return <TablesManager />;
      case "appearance":
        return <AppearanceManager />;
      case "typography":
        return <TypographyManager />;
      case "dragdrop":
        return <DragDropManager />;
      case "users":
        return <UsersManager />;
      default:
        return <TablesManager />;
    }
  };

  return (
    <>
      <Helmet>
        <title>لوحة الإدارة | مطعم كوكو</title>
        <meta name="description" content="لوحة التحكم الشاملة لإدارة مطعم كوكو" />
      </Helmet>

      <div
        style={{
          background: bg,
          fontFamily: typography.fontFamily,
          color: typography.color,
          fontSize: typography.fontSize,
          fontWeight: typography.fontWeight,
          textAlign: typography.textAlign,
          minHeight: '100vh',
        }}
      >
        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} currentUserRole={currentUserRole}>
          {renderActiveComponent()}
        </AdminLayout>
      </div>
    </>
  );
};

export default Admin;
