import React from 'react';
import { useTheme } from '@/context/ThemeContext'; // استيراد useTheme

const tabs = [
  { key: 'tables', label: 'الجداول' },
  { key: 'appearance', label: 'المظهر' },
  { key: 'typography', label: 'الخطوط' },
  { key: 'dragdrop', label: 'السحب والإفلات' },
  { key: 'users', label: 'المسؤولين' },
];

// أضف currentUserRole كـ prop
const AdminLayout = ({ activeTab, setActiveTab, children, currentUserRole }) => {
  const { pageTypography } = useTheme();
  const typography = pageTypography.Admin || {};

  // تصفية التبويبات لإخفاء 'typography' و 'dragdrop'
  const filteredTabs = tabs.filter(tab => tab.key !== 'typography' && tab.key !== 'dragdrop');

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav
        style={{
          display: 'flex',
          backgroundColor: '#004aad',
          padding: '10px 20px',
          color: 'white',
          justifyContent: 'space-around',
          fontFamily: typography.fontFamily || 'Tajawal, sans-serif',
          fontSize: typography.fontSize || '16px',
          fontWeight: typography.fontWeight || 'bold',
          textAlign: typography.textAlign || 'right',
        }}
      >
        {filteredTabs.map((tab) => (
          <div
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              cursor: 'pointer',
              borderBottom: activeTab === tab.key ? '3px solid #ffcc00' : 'none',
              paddingBottom: '5px',
              fontFamily: typography.fontFamily || 'Tajawal, sans-serif',
              fontSize: typography.fontSize || '16px',
              fontWeight: 'bold',
              textAlign: typography.textAlign || 'right',
              color: 'white',
            }}
          >
            {tab.label}
          </div>
        ))}
      </nav>
      <main style={{ flexGrow: 1, overflow: 'auto', padding: '20px', backgroundColor: '#f7f9fc' }}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
