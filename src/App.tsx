import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';

// Landing
import Landing from './pages/Landing';

// SmartWatch
import SmartWatchHeader from './components/smartwatch/Header';
import SmartWatchFooter from './components/smartwatch/Footer';
import SmartWatchHome from './pages/smartwatch/Home';
import ProductDetail from './pages/smartwatch/ProductDetail';
import StyleFinderQuiz from './pages/smartwatch/StyleFinderQuiz';
import VirtualTryOn from './pages/smartwatch/VirtualTryOn';

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

function SmartWatchLayout() {
  return (
    <div className="min-h-screen bg-white">
      <SmartWatchHeader />
      <main>
        <Outlet />
      </main>
      <SmartWatchFooter />
    </div>
  );
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
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* SmartWatch Platform */}
        <Route path="/smartwatch" element={<SmartWatchLayout />}>
          <Route index element={<SmartWatchHome />} />
          <Route path="product/:slug" element={<ProductDetail />} />
          <Route path="virtual-try-on" element={<VirtualTryOn />} />
        </Route>
        {/* Quiz has its own layout (full-screen) */}
        <Route path="/smartwatch/quiz" element={<StyleFinderQuiz />} />

        {/* CryptoCompare Platform */}
        <Route path="/crypto" element={<CryptoLayout />}>
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
