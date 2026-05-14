import React from 'react';
import { Table, Tag, Typography, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';

const { Title } = Typography;

interface ScheduleItem {
  key: string;
  time: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
}

const ScheduleTable: React.FC = () => {
  const navigate = useNavigate();

  const scheduleData: ScheduleItem[] = [
    { key: '1', time: '17:00 - 18:30', mon: 'MMA', tue: 'No-Gi', wed: 'Gi', thu: 'No-Gi', fri: 'No-Gi' },
    { key: '2', time: '18:00 - 19:30', mon: 'Основи', tue: 'No-Gi', wed: 'Основи', thu: 'No-Gi', fri: 'Open Mat' },
    { key: '3', time: '19:30 - 21:00', mon: 'Напреднали', tue: 'Напреднали', wed: 'Напреднали', thu: 'Напреднали', fri: 'Спаринг' },
  ];

  const columns: ColumnsType<ScheduleItem> = [
    { title: 'Час', dataIndex: 'time', key: 'time', fixed: 'left', width: 140 },
    { title: 'Пон', dataIndex: 'mon', key: 'mon' },
    { title: 'Вт', dataIndex: 'tue', key: 'tue' },
    { title: 'Ср', dataIndex: 'wed', key: 'wed' },
    { title: 'Чет', dataIndex: 'thu', key: 'thu' },
    { title: 'Пет', dataIndex: 'fri', key: 'fri' },
  ];

  return (
    <section style={{ padding: '60px 10%', background: '#fff', minHeight: '100vh' }}>
      <Button
        icon={<ArrowLeft size={16} />}
        onClick={() => navigate('/')}
        style={{ marginBottom: 32 }}
      >
        Назад
      </Button>

      <div style={{ textAlign: 'center', marginBottom: 48 }}>
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
  );
};

export default ScheduleTable;
