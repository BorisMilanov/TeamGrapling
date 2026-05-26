import React, { useRef, useEffect, useState } from 'react';
import {
  Layout, Menu, Button, Row, Col, Typography, Card, Table,
  Space, Divider, ConfigProvider, Tag, Dropdown, Grid,
} from 'antd';

const { useBreakpoint } = Grid;
import type { ColumnsType } from 'antd/es/table';
import { Users, ShieldCheck, Trophy, MapPin, Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MenuOutlined, CloseOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { authStorage } from '../services/authApi';
import herohomeImage from '../assets/herohome.jpg';
import { scheduleData, type ScheduleItem } from '../data/scheduleData';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;


function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function revealStyle(isVisible: boolean, delay = 0): React.CSSProperties {
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
  };
}

const BJJHomePage: React.FC = () => {
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scheduleHover, setScheduleHover] = useState(false);
  const [user, setUser] = useState(authStorage.getUser);

  const handleLogout = () => {
    authStorage.clear();
    setUser(null);
  };

  const { ref: benefitsRef, isVisible: benefitsVisible } = useScrollReveal();
  const { ref: scheduleRef, isVisible: scheduleVisible } = useScrollReveal();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();

  const columns: ColumnsType<ScheduleItem> = [
    { title: 'Час', dataIndex: 'time', key: 'time', fixed: 'left', width: 130 },
    { title: 'Пон', dataIndex: 'mon', key: 'mon' },
    { title: 'Вт', dataIndex: 'tue', key: 'tue' },
    { title: 'Ср', dataIndex: 'wed', key: 'wed' },
    { title: 'Чет', dataIndex: 'thu', key: 'thu' },
    { title: 'Пет', dataIndex: 'fri', key: 'fri' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const navItems = [

    ...(user ? [{ key: 'calendar-link', label: 'Календар' }, { key: 'members-link', label: 'Членове' }] : [ { key: 'hero', label: 'Начало' },
    { key: 'schedule', label: 'График' },
    { key: 'contact', label: 'Контакти' },]),
    ...(user?.role === 'admin' ? [

      { key: 'admin-members', label: 'Членове (админ)' },
      { key: 'admin-calendar', label: 'Календар (админ)' },

    ] : []),
  ];

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#1890ff', borderRadius: 8 } }}>
      <Layout style={{ minHeight: '100vh', background: '#fff' }}>

        {/* ── HEADER ── */}
        <Header style={{
          position: 'fixed', zIndex: 1000, width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 50px', background: '#001529', height: 64,
        }}>
          <div
            style={{ color: 'white', fontWeight: 'bold', fontSize: 20, cursor: 'pointer' }}
            onClick={() => scrollTo('hero')}
          >
            OSSU <span style={{ color: '#1890ff' }}>BJJ</span>
          </div>

          {/* Desktop nav */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Menu
              theme="dark" mode="horizontal"
              defaultSelectedKeys={['hero']}
              items={navItems}
              onClick={(e) => {
                  if (e.key === 'calendar-link') navigate('/calendar');
                  else if (e.key === 'members-link') navigate('/members');
                  else if (e.key === 'admin-calendar') navigate('/admin/calendar');
                  else if (e.key === 'admin-members') navigate('/admin/members');
                  else scrollTo(e.key);
                }}
              style={{ minWidth: 300, borderBottom: 'none', justifyContent: 'flex-end' }}
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
                <Button
                  type="text"
                  icon={<UserOutlined />}
                  style={{ color: 'white', fontWeight: 600 }}
                >
                  {user.firstName}
                </Button>
              </Dropdown>
            ) : (
              <Space>
                <Button type="text" style={{ color: 'white' }} onClick={() => navigate('/login')}>Влез</Button>
                {/* <Button type="primary" onClick={() => navigate('/register')}>Регистрация</Button> */}
              </Space>
            )}
          </div>

          {/* Mobile hamburger */}
          <div
            className="mobile-burger"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: 'white', fontSize: 22, cursor: 'pointer', display: 'none' }}
          >
            {mobileOpen ? <CloseOutlined /> : <MenuOutlined />}
          </div>
        </Header>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div style={{
            position: 'fixed', top: 64, left: 0, width: '100%',
            background: '#001529', zIndex: 999, borderTop: '1px solid #002140',
          }}>
            <Menu
              theme="dark" mode="vertical"
              items={navItems}
              onClick={(e) => {
                  if (e.key === 'calendar-link') navigate('/calendar');
                  else if (e.key === 'members-link') navigate('/members');
                  else if (e.key === 'admin-calendar') navigate('/admin/calendar');
                  else if (e.key === 'admin-members') navigate('/admin/members');
                  else scrollTo(e.key);
                }}
              style={{ borderRight: 'none' }}
            />
          </div>
        )}

        <Content style={{ marginTop: 64 }}>

          {/* ── HERO ── */}
          <div id="hero" style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${herohomeImage})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            height: '90vh', display: 'flex', alignItems: 'center',
            justifyContent: 'center', textAlign: 'center', color: 'white', padding: '0 20px',
          }}>
            <div style={{ maxWidth: 800 }}>
              <Title style={{ color: 'white', fontSize: 'clamp(32px,5vw,60px)', marginBottom: 24 }}>
                ПРОМЕНИ ЖИВОТА СИ С <br />
                <span style={{ color: '#1890ff' }}>БРАЗИЛСКО ЖИУ-ЖИЦУ</span>
              </Title>
              <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.2rem', marginBottom: 40 }}>
                Добре дошли в най-гостоприемната зала за бойни изкуства.
                Започни своето пътешествие днес!
              </Paragraph>
              <Space
                direction={isMobile ? 'vertical' : 'horizontal'}
                size="large"
                style={isMobile ? { display: 'flex', alignItems: 'center', width: '100%' } : undefined}
              >
                <Button type="primary" size="large" style={{ height: 50, padding: '0 40px', ...(isMobile && { width: 240 }) }}>
                  ЗАПИШИ СЕ СЕГА
                </Button>
                <Button ghost size="large" style={{ height: 50, ...(isMobile && { width: 240 }) }} onClick={() => scrollTo('schedule')}>
                  График на тренировките
                </Button>
              </Space>
            </div>
          </div>

          {/* ── BENEFITS ── */}
          <section id="programs" style={{ padding: '90px 10%' }}>
            <div ref={benefitsRef}>
              <Row gutter={[32, 32]} justify="center">
                {[
                  { icon: <ShieldCheck size={40} />, title: 'Самозащита', text: 'Реални умения за реални ситуации.', delay: 0 },
                  { icon: <Trophy size={40} />, title: 'Успех', text: 'Изгради шампионска нагласа в живота.', delay: 120 },
                  { icon: <Users size={40} />, title: 'Общност', text: 'Намери приятели за цял живот на татамито.', delay: 240 },
                ].map((item, i) => (
                  <Col xs={24} md={8} key={i}>
                    <div style={revealStyle(benefitsVisible, item.delay)}>
                      <Card bordered={false} style={{ textAlign: 'center', background: '#fafafa', borderRadius: 16 }}>
                        <div style={{ color: '#1890ff', marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
                          {item.icon}
                        </div>
                        <Title level={3}>{item.title}</Title>
                        <Paragraph type="secondary">{item.text}</Paragraph>
                      </Card>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </section>

          {/* ── SCHEDULE (GRAPHIC) — clickable, scroll-reveal ── */}
          <section
            id="schedule"
            ref={scheduleRef}
            onClick={() => navigate('/graphic')}
            onMouseEnter={() => setScheduleHover(true)}
            onMouseLeave={() => setScheduleHover(false)}
            style={{
              ...revealStyle(scheduleVisible),
              padding: '70px 10%',
              background: scheduleHover ? '#f0f7ff' : '#fff',
              cursor: 'pointer',
              transition: [
                `opacity 0.65s ease`,
                `transform 0.65s ease`,
                `background 0.3s ease`,
              ].join(', '),
              outline: scheduleHover ? '2px solid #1890ff' : '2px solid transparent',
              outlineOffset: -2,
              borderRadius: 0,
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <Tag color="blue"  style={{ fontSize: 22, padding: '14px 24px', marginBottom: 12 }}>График</Tag>
              <Title level={2}>График на тренировките</Title>
              {scheduleHover && (
                <Text type="secondary" style={{ fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  Виж пълния график <ArrowRight size={16} />
                </Text>
              )}
            </div>
            <Table
              dataSource={scheduleData}
              columns={columns}
              pagination={false}
              bordered
              scroll={{ x: 700 }}
              style={{
                boxShadow: scheduleHover ? '0 8px 24px rgba(24,144,255,0.15)' : '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'box-shadow 0.3s ease',
                pointerEvents: 'none',
              }}
            />
          </section>

          {/* ── CTA ── */}
          <section
            id="contact"
            style={{
              ...revealStyle(ctaVisible),
              padding: '100px 20px',
              background: '#001529',
              textAlign: 'center',
            }}
          >
            <div ref={ctaRef}>
              <Title level={2} style={{ color: 'white', marginBottom: 24 }}>
                Не знаеш откъде да започнеш?
              </Title>
              <Paragraph style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, marginBottom: 32 }}>
                Ела на място, разгледай залата и направи първата си тренировка безплатно.
              </Paragraph>
              <Button type="primary" size="middle" icon={<CheckCircle2 size={20} />} style={{ height: 54, display: 'flex', alignItems: 'center', margin: '0 auto' }}>
                ЗАПИШИ СЕ СЕГА
              </Button>
            </div>
          </section>
        </Content>

        {/* ── FOOTER ── */}
        <Footer style={{ background: '#f5f5f5', padding: '60px 10%' }}>
          <Row gutter={[40, 40]}>
            <Col xs={24} md={10}>
              <Title level={4}>OSSU BJJ BULGARIA</Title>
              <Paragraph type="secondary">
                Ние вярваме, че Бразилското Жиу-Жицу е за всеки – независимо от възраст,
                пол или атлетични възможности. Присъедини се към нас и открий своята сила.
              </Paragraph>
            </Col>
            <Col xs={24} md={7}>
              <Title level={4}>Локация</Title>
              <Space direction="vertical">
                <Text><MapPin size={16} style={{ marginRight: 8 }} />София, бул. "Витоша" 100</Text>
                <Text><Phone size={16} style={{ marginRight: 8 }} />+359 88 000 0000</Text>
              </Space>
            </Col>
            <Col xs={24} md={7}>
              <Title level={4}>Социални мрежи</Title>
            </Col>
          </Row>
          <Divider />
          <div style={{ textAlign: 'center', color: '#8c8c8c' }}>
            © {new Date().getFullYear()} OSSU BJJ Academy. Designed with Honor.
          </div>
        </Footer>
      </Layout>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-burger { display: block !important; }
        }
      `}</style>
    </ConfigProvider>
  );
};

export default BJJHomePage;
