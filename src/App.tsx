import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './Layout/Layout';
import Projects from './pages/Projects';
import About from './pages/About';

function AppRoutes() {
  const location = useLocation();
  let currentPageName = '';
  if (location.pathname === '/projects' || location.pathname === '/projects/') currentPageName = 'Projects';
  else if (location.pathname === '/projects/about') currentPageName = 'About';

  return (
    <Layout currentPageName={currentPageName}>
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="about" element={<About />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return <AppRoutes />;
}
