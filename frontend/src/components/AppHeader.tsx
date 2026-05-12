import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router';
import { 
  HomeOutlined, 
  FormatPainterOutlined, 
  TagOutlined, 
  InfoCircleOutlined 
} from '@ant-design/icons';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: '/', icon: <HomeOutlined />, label: 'Home' },
    { key: '/graphic', icon: <FormatPainterOutlined />, label: 'Graphic' },
    { key: '/price', icon: <TagOutlined />, label: 'Price' },
    { key: '/about', icon: <InfoCircleOutlined />, label: 'About' },
  ];

  return (
    <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', display: 'flex', alignItems: 'center' }}>
      <div style={{ color: 'white', fontWeight: 'bold', marginRight: '30px' }}>Traning Dojo</div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={(info) => navigate(info.key)}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  );
};

export default AppHeader;