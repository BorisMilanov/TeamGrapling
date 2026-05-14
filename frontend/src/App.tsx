import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';

import BJJHomePage from './pages/BJJHomePage';
import ScheduleTable from './pages/ScheduleTable';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CalendarPage from './pages/CalendarPage';
import ProtectedRoute from './components/ProtectedRoute';

const Price: React.FC = () => <h2 style={{ padding: 40 }}>Pricing Table</h2>;
const About: React.FC = () => <h2 style={{ padding: 40 }}>About the Team</h2>;

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BJJHomePage />} />
        <Route path="/graphic" element={<ScheduleTable />} />
        <Route path="/price" element={<Price />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <CalendarPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
