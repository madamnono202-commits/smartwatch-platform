import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, Menu, X, TrendingUp } from 'lucide-react';

const announcements = [
  '🎁 Bybit is offering $100 for new signups · Claim Now →',
  '🔥 Bitcoin hits new all-time high — Compare exchange fees now',
  '⚡ New: AI-powered exchange recommendations — Try it free',
];

export default function CryptoHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIdx((i) => (i + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Compare', href: '/compare' },
    { label: 'Exchanges', href: '/exchanges' },
    { label: 'Prices', href: '/prices' },
    { label: 'Fees', href: '/fees' },
    { label: 'Blog', href: '/blog' },
    { label: 'Tools', href: '/tools/fee-calculator' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      {announcementVisible && (
        <div className="bg-blue-700 text-white text-center py-2 px-4 text-xs sm:text-sm relative z-50">
          <span className="transition-opacity duration-500">{announcements[announcementIdx]}</span>
          <button
            onClick={() => setAnnouncementVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-white border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <TrendingUp className="w-7 h-7 text-blue-600 group-hover:text-blue-700 transition-colors" />
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                Crypto<span className="text-blue-600">Compare</span>
                <span className="text-blue-400 text-xs ml-0.5">AI</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    location.pathname === link.href ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                <Search size={20} />
              </button>
              <button className="hidden sm:block p-2 text-gray-500 hover:text-blue-600 transition-colors relative">
                <Bell size={20} />
              </button>
              <button className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Log In
              </button>
              <button className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Sign Up
              </button>
              <button
                className="lg:hidden p-2 text-gray-500"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
            <nav className="px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100 mt-4 flex gap-3">
                <button className="flex-1 py-3 border border-gray-200 font-medium rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                  Log In
                </button>
                <button className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  Sign Up
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
