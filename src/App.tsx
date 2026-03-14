import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';

// Landing
import Landing from './pages/Landing';

// Crypto
import CryptoHeader from './components/crypto/Header';
import CryptoFooter from './components/crypto/Footer';
import CryptoHome from './pages/crypto/Home';
import CryptoCompare from './pages/crypto/Compare';
import ExchangeDetail from './pages/crypto/ExchangeDetail';
import BlogPost from './pages/crypto/BlogPost';
import Exchanges from './pages/crypto/Exchanges';
import Prices from './pages/crypto/Prices';
import Fees from './pages/crypto/Fees';
import Offers from './pages/crypto/Offers';
import CryptoBlogIndex from './pages/crypto/BlogIndex';
import FeeCalculator from './pages/crypto/tools/FeeCalculator';
import ProfitCalculator from './pages/crypto/tools/ProfitCalculator';
import DCACalculator from './pages/crypto/tools/DCACalculator';
import Converter from './pages/crypto/tools/Converter';
import Staking from './pages/crypto/Staking';
import News from './pages/crypto/News';
import Learn from './pages/crypto/Learn';
import Glossary from './pages/crypto/Glossary';

// SmartWatch
import SmartWatchHeader from './components/smartwatch/Header';
import SmartWatchFooter from './components/smartwatch/Footer';
import SmartWatchHome from './pages/smartwatch/Home';
import ProductDetail from './pages/smartwatch/ProductDetail';
import VirtualTryOn from './pages/smartwatch/VirtualTryOn';
import StyleFinderQuiz from './pages/smartwatch/StyleFinderQuiz';
import Shop from './pages/smartwatch/Shop';
import Cart from './pages/smartwatch/Cart';
import Category from './pages/smartwatch/Category';
import SmartWatchBlogIndex from './pages/smartwatch/BlogIndex';

// Shared
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

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

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Landing Page */}
        <Route path="/landing" element={<Landing />} />

        {/* CryptoCompare AI Platform */}
        <Route path="/" element={<CryptoLayout />}>
          <Route index element={<CryptoHome />} />
          <Route path="compare" element={<CryptoCompare />} />
          <Route path="exchange/:slug" element={<ExchangeDetail />} />
          <Route path="exchanges" element={<Exchanges />} />
          <Route path="prices" element={<Prices />} />
          <Route path="fees" element={<Fees />} />
          <Route path="offers" element={<Offers />} />
          <Route path="blog" element={<CryptoBlogIndex />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="tools/fee-calculator" element={<FeeCalculator />} />
          <Route path="tools/profit-calculator" element={<ProfitCalculator />} />
          <Route path="tools/dca-calculator" element={<DCACalculator />} />
          <Route path="tools/converter" element={<Converter />} />
          <Route path="staking" element={<Staking />} />
          <Route path="news" element={<News />} />
          <Route path="learn" element={<Learn />} />
          <Route path="glossary" element={<Glossary />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
        </Route>

        {/* SmartWatch E-Commerce Platform */}
        <Route path="/smartwatch" element={<SmartWatchLayout />}>
          <Route index element={<SmartWatchHome />} />
          <Route path="product/:slug" element={<ProductDetail />} />
          <Route path="virtual-try-on" element={<VirtualTryOn />} />
          <Route path="quiz" element={<StyleFinderQuiz />} />
          <Route path="shop" element={<Shop />} />
          <Route path="cart" element={<Cart />} />
          <Route path="category/:slug" element={<Category />} />
          <Route path="blog" element={<SmartWatchBlogIndex />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
