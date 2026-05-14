import React from 'react';
import { Typography, Button, Space } from 'antd';
import herohomeImage from '../assets/herohome.jpg';

const { Title, Paragraph } = Typography;

const HeroSection: React.FC = () => {
  return (
<div style={{
  backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${herohomeImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: '70vh',
  width: '100%', 
  display: 'flex',
  flexDirection: 'column', 
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: 'white',
  padding: '0 20px',
  margin: '0' 
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
            ЗАПИШИ СЕ СЕГА
          </Button>
          <Button ghost size="large" style={{ height: '50px' }}>
           График на тренировките
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default HeroSection;