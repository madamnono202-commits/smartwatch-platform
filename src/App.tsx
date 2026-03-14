import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';

// Crypto
import CryptoHeader from './components/crypto/Header';
import CryptoFooter from './components/crypto/Footer';
import CryptoHome from './pages/crypto/Home';
import CryptoCompare from './pages/crypto/Compare';
import ExchangeDetail from './pages/crypto/ExchangeDetail';
import BlogPost from './pages/crypto/BlogPost';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function CryptoLayout() {
  return (
    <div className="min-h-screen bg-white">
      <CryptoHeader />
      <main>
        <Outlet />
      </main>
      <CryptoFooter />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* CryptoCompare AI Platform */}
        <Route path="/" element={<CryptoLayout />}>
          <Route index element={<CryptoHome />} />
          <Route path="compare" element={<CryptoCompare />} />
          <Route path="exchange/:slug" element={<ExchangeDetail />} />
          <Route path="blog/:slug" element={<BlogPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
