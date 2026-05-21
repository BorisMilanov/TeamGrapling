import React, { useEffect, useState } from 'react';
import {
  Layout, Calendar, Badge, Typography, ConfigProvider,
  Menu, Button, Space, Dropdown,
} from 'antd';
import type { BadgeProps, CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { authStorage } from '../services/authApi';
import { calendarApi, type CalendarEvent } from '../services/calendarApi';

const { Header, Content } = Layout;
const { Title } = Typography;

const SEMINAR_COLOR = 'purple';

const CalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(authStorage.getUser);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    calendarApi.getAll().then(setEvents).catch(() => {});
  }, []);

  const handleLogout = () => {
    authStorage.clear();
    setUser(null);
    navigate('/');
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type !== 'date') return info.originNode;
    const dayEvents = events.filter(ev => dayjs(ev.date).isSame(current, 'day'));
    if (!dayEvents.length) return null;
    return (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {dayEvents.map((ev) =>
          ev.type === 'seminar' ? (
            <li key={ev.id}>
              <Badge color={SEMINAR_COLOR} text={ev.title} />
            </li>
          ) : (
            <li key={ev.id}>
              <Badge status={ev.type as BadgeProps['status']} text={ev.title} />
            </li>
          )
        )}
      </ul>
    );
  };

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#1890ff', borderRadius: 8 } }}>
      <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
        <Header style={{
          position: 'fixed', zIndex: 1000, width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 50px', background: '#001529', height: 64,
        }}>
          <div
            style={{ color: 'white', fontWeight: 'bold', fontSize: 20, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            OSSU <span style={{ color: '#1890ff' }}>BJJ</span>
          </div>

          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={['/calendar']}
            items={[
              { key: '/calendar', label: 'Календар' },
            ]}
            onClick={(e) => navigate(e.key)}
            style={{ flex: 1, minWidth: 0, justifyContent: 'flex-end', borderBottom: 'none', marginRight: 16 }}
          />

          {user ? (
            <Dropdown
              menu={{
                items: [
                  { key: 'logout', label: 'Изход', icon: <LogoutOutlined />, onClick: handleLogout },
                ],
              }}
              placement="bottomRight"
            >
              <Button type="text" icon={<UserOutlined />} style={{ color: 'white', fontWeight: 600 }}>
                {user.firstName}
              </Button>
            </Dropdown>
          ) : (
            <Space>
              <Button type="text" style={{ color: 'white' }} onClick={() => navigate('/login')}>Влез</Button>
              <Button type="primary" onClick={() => navigate('/register')}>Регистрация</Button>
            </Space>
          )}
        </Header>

        <Content style={{ marginTop: 64, padding: '40px 10%' }}>
          <div style={{
            background: '#fff',
            borderRadius: 16,
            padding: '32px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}>
            <Title level={3} style={{ marginBottom: 24 }}>
              График на тренировките
            </Title>
            <div style={{ marginBottom: 16, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <Badge color={SEMINAR_COLOR} text="Семинар" />
              <Badge status="success" text="Основи (Gi)" />
              <Badge status="warning" text="No-Gi" />
<Badge status="error" text="Отменено" />
            </div>
            <Calendar cellRender={cellRender} />
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default CalendarPage;
