import { BrowserRouter, Routes, Route } from 'react-router';
import MainLayout from './layouts/MainLayout';

// Simple placeholder components for your routes
import BJJHomePage from './pages/BJJHomePage';
const Graphic = () => <h2>Graphic Gallery</h2>;
const Price = () => <h2>Pricing Table</h2>;
const About = () => <h2>About the Team</h2>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BJJHomePage />}>
          <Route index element={<BJJHomePage />} />
          <Route path="graphic" element={<Graphic />} />
          <Route path="price" element={<Price />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;