import React from 'react';
import { Layout, Menu, Button, Row, Col, Typography, Card, Table, Space, Divider, ConfigProvider, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Users, ShieldCheck, Trophy, MapPin, Phone, CheckCircle2 } from 'lucide-react';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

// Дефиниране на интерфейс за данните в графика
interface ScheduleItem {
  key: string;
  time: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
}

const BJJHomePage: React.FC = () => {
  // Данни за графика с типизация
  const scheduleData: ScheduleItem[] = [
    { key: '1', time: '18:00 - 19:30', mon: 'Основи', tue: 'No-Gi', wed: 'Основи', thu: 'No-Gi', fri: 'Open Mat' },
    { key: '2', time: '19:30 - 21:00', mon: 'Напреднали', tue: 'Напреднали', wed: 'Напреднали', thu: 'Напреднали', fri: 'Спаринг' },
  ];

  // Типизиране на колоните на Ant Design Table
  const columns: ColumnsType<ScheduleItem> = [
    { title: 'Час', dataIndex: 'time', key: 'time', fixed: 'left', width: 120 },
    { title: 'Пон', dataIndex: 'mon', key: 'mon' },
    { title: 'Вт', dataIndex: 'tue', key: 'tue' },
    { title: 'Ср', dataIndex: 'wed', key: 'wed' },
    { title: 'Чет', dataIndex: 'thu', key: 'thu' },
    { title: 'Пет', dataIndex: 'fri', key: 'fri' },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
        },
      }}
    >
      <Layout style={{ minHeight: '100vh', background: '#fff' }}>
        {/* Навигация */}
        <Header style={{ 
          position: 'fixed', 
          zIndex: 10, 
          width: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0 50px',
          background: '#001529' 
        }}>
          <div style={{ color: 'white', fontWeight: 'bold', fontSize: '20px', marginRight: '40px' }}>
            OSSU <span style={{ color: '#1890ff' }}>BJJ</span>
          </div>
          <Menu 
            theme="dark" 
            mode="horizontal" 
            defaultSelectedKeys={['1']} 
            style={{ flex: 1, minWidth: 0 }}
            items={[
              { key: '1', label: 'Начало' },
              { key: '2', label: 'Програми' },
              { key: '3', label: 'График' },
              { key: '4', label: 'Контакти' },
            ]}
          />
       
        </Header>

        <Content style={{ marginTop: 64 }}>
          {/* Hero Секция */}
          <div style={{ 
            background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?q=80&w=2070") center/cover',
            height: '70vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: 'white',
            padding: '0 20px'
          }}>
            <div style={{ maxWidth: '800px' }}>
              <Title style={{ color: 'white', fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: '24px' }}>
                ПРОМЕНИ ЖИВОТА СИ С <br/> 
                <span style={{ color: '#1890ff' }}>БРАЗИЛСКО ЖИУ-ЖИЦУ</span>
              </Title>
              <Paragraph style={{ color: 'white', fontSize: '1.2rem', marginBottom: '40px' }}>
                Добре дошли в най-гостоприемната зала за бойни изкуства. 
                Започни своето пътешествие днес!
              </Paragraph>
              <Space size="large" wrap>
                <Button type="primary" size="large" style={{ height: '50px', padding: '0 40px' }}>
                  ГРАБНИ БЕЗПЛАТЕН ПАС
                </Button>
                <Button ghost size="large" style={{ height: '50px' }}>
                  ВИЖ ПРОГРАМИТЕ
                </Button>
              </Space>
            </div>
          </div>

          {/* Предимства */}
          <section style={{ padding: '80px 10%' }}>
            <Row gutter={[32, 32]} justify="center">
              {[
                { icon: <ShieldCheck size={40} />, title: 'Самозащита', text: 'Реални умения за реални ситуации.' },
                { icon: <Trophy size={40} />, title: 'Успех', text: 'Изгради шампионска нагласа в живота.' },
                { icon: <Users size={40} />, title: 'Общност', text: 'Намери приятели за цял живот на татамито.' }
              ].map((item, index) => (
                <Col xs={24} md={8} key={index}>
                  <Card bordered={false} style={{ textAlign: 'center', background: '#fafafa', borderRadius: '16px' }}>
                    <div style={{ color: '#1890ff', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                      {item.icon}
                    </div>
                    <Title level={3}>{item.title}</Title>
                    <Paragraph type="secondary">{item.text}</Paragraph>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>

          {/* График */}
          <section style={{ padding: '60px 10%', background: '#fff' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <Tag color="blue">SCHEDULE</Tag>
              <Title level={2}>График на тренировките</Title>
            </div>
            <Table 
              dataSource={scheduleData} 
              columns={columns} 
              pagination={false} 
              bordered 
              scroll={{ x: 700 }}
              style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
            />
          </section>

          {/* Call to Action */}
          <section style={{ 
            padding: '100px 20px', 
            background: '#001529', 
            textAlign: 'center',
            borderRadius: '0' 
          }}>
            <Title level={2} style={{ color: 'white', marginBottom: '24px' }}>
              Не знаеш откъде да започнеш?
            </Title>
            <Paragraph style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', marginBottom: '32px' }}>
              Ела на място, разгледай залата и направи първата си тренировка безплатно.
            </Paragraph>
            <Button type="primary" size="large" icon={<CheckCircle2 size={20} />} style={{ height: '54px', padding: '0 40px' }}>
              ЗАПИШИ СЕ СЕГА
            </Button>
          </section>
        </Content>

        {/* Футър */}
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
                <Text><MapPin size={16} style={{ marginRight: 8 }} /> София, бул. "Витоша" 100</Text>
                <Text><Phone size={16} style={{ marginRight: 8 }} /> +359 88 000 0000</Text>
              </Space>
            </Col>
            <Col xs={24} md={7}>
              <Title level={4}>Социални мрежи</Title>
              <Space size="large">
                {/* <a href="#" style={{ color: '#1890ff' }}><Facebook size={28} /></a>

                <a href="#" style={{ color: '#E1306C' }}><Instagram size={28} /></a> */}
              </Space>
            </Col>
          </Row>
          <Divider />
          <div style={{ textAlign: 'center', color: '#8c8c8c' }}>
            © {new Date().getFullYear()} OSSU BJJ Academy. Designed with Honor.
          </div>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default BJJHomePage;