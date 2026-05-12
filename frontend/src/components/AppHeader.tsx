import React, { useState } from 'react';
import { Layout, Menu, Button, Drawer, Grid } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router';

const { Header } = Layout;
const { useBreakpoint } = Grid;

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const menuItems = [
    { key: '/', label: 'Home' },
    { key: '/graphic', label: 'Graphic' },
    { key: '/price', label: 'Price' },
    { key: '/about', label: 'About' },
  ];

  const handleNavigation = (key: string) => {
    navigate(key);
    setIsDrawerVisible(false);
  };

  return (
    <Header
      style={{
        position: 'fixed',
        zIndex: 100,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        // Fix: Desktop gets 111px, Mobile gets 20px
        padding: screens.md ? '0 111px' : '0 20px',
        background: '#001529', // Standard AntD Dark
        transition: 'padding 0.3s'
      }}
    >
      {/* Logo Section */}
      <div 
        style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        TEAM GRAPLING
      </div>

      {/* Desktop Navigation */}
      {screens.md ? (
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={(e) => navigate(e.key)}
          style={{ flex: 1, minWidth: 0, justifyContent: 'end', borderBottom: 'none' }}
        />
      ) : (
        /* Mobile Hamburger Button */
        <Button
          type="text"
          icon={<MenuOutlined style={{ color: 'white', fontSize: '1.2rem' }} />}
          onClick={() => setIsDrawerVisible(true)}
        />
      )}

      {/* Mobile Fullscreen Menu */}
      <Drawer
        title="NAVIGATION"
        placement="right"
        onClose={() => setIsDrawerVisible(false)}
        open={isDrawerVisible}
        styles={{ body: { padding: 0 } }}
        width="100vw"
      >
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={(e) => handleNavigation(e.key)}
          style={{ borderInlineEnd: 'none' }}
        />
      </Drawer>
    </Header>
  );
};

export default AppHeader;