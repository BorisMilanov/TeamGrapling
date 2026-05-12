import React from 'react';
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router';
import AppHeader from '../components/AppHeader';

const { Content, Footer } = Layout;

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />
      <Content style={{ padding: '24px 50px' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: '80vh',
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Developed with React + TS
      </Footer>
    </Layout>
  );
};

export default MainLayout;