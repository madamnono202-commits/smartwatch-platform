import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingCart, User, Menu, X, Watch } from 'lucide-react';

const announcements = [
  '🚚 Free shipping on orders over $75 · New: Apple Watch Series 10 — Shop Now →',
  '🎁 Use code WATCH10 for 10% off your first order',
  '⭐ Rated 4.9/5 by 12,400+ customers — See Reviews',
];

export default function SmartWatchHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIdx((i) => (i + 1) % announcements.length);
    }, 5000);
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
    { label: 'Shop', href: '/smartwatch/shop' },
    { label: 'Brands', href: '/smartwatch/shop' },
    { label: 'Quiz', href: '/smartwatch/quiz' },
    { label: 'Try It On', href: '/smartwatch/virtual-try-on' },
    { label: 'Blog', href: '/smartwatch/blog' },
    { label: 'Cart', href: '/smartwatch/cart' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      {announcementVisible && (
        <div className="bg-teal-800 text-white text-center py-2 px-4 text-xs sm:text-sm relative z-50">
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
        className={`sticky top-0 z-40 bg-white transition-all duration-300 ${
          scrolled ? 'shadow-md backdrop-blur-md bg-white/95' : 'border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/smartwatch" className="flex items-center gap-2 group">
              <Watch className="w-7 h-7 text-teal-600 group-hover:text-teal-700 transition-colors" />
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                Watch<span className="text-teal-600">Hub</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm font-medium transition-colors hover:text-teal-600 ${
                    location.pathname === link.href ? 'text-teal-600' : 'text-gray-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button className="p-2 text-gray-500 hover:text-teal-600 transition-colors">
                <Search size={20} />
              </button>
              <button className="hidden sm:block p-2 text-gray-500 hover:text-teal-600 transition-colors relative">
                <Heart size={20} />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-teal-600 text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </button>
              <button className="hidden sm:block p-2 text-gray-500 hover:text-teal-600 transition-colors">
                <User size={20} />
              </button>
              <button className="p-2 text-gray-500 hover:text-teal-600 transition-colors relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-teal-600 text-white text-xs rounded-full flex items-center justify-center">
                  1
                </span>
              </button>
              <button
                className="lg:hidden p-2 text-gray-500 hover:text-teal-600 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl animate-in slide-in-from-top">
            <nav className="px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100 mt-4">
                <Link
                  to="/smartwatch/quiz"
                  className="block w-full text-center py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Find My Watch — AI Quiz
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
