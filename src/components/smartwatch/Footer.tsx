import { Link } from 'react-router-dom';
import { Watch, Instagram, Youtube } from 'lucide-react';

export default function SmartWatchFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter */}
      <div className="bg-teal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Get Personalized Watch Deals</h3>
          <p className="text-teal-200 mb-6">Subscribe and we'll send you weekly AI-curated deals matched to your style.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <button className="px-6 py-3 bg-white text-teal-800 font-semibold rounded-lg hover:bg-teal-50 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-teal-300/60 text-xs mt-3">No spam — 1 email/week</p>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/smartwatch" className="flex items-center gap-2 mb-4">
              <Watch className="w-6 h-6 text-teal-400" />
              <span className="text-lg font-bold text-white">
                Watch<span className="text-teal-400">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">AI-powered smartwatch shopping. Find your perfect match.</p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Youtube size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current" width="18" height="18"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.18 8.18 0 004.76 1.52V6.84a4.84 4.84 0 01-1-.15z"/></svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/smartwatch/shop" className="hover:text-teal-400 transition-colors">All Watches</Link></li>
              <li><Link to="/smartwatch/shop" className="hover:text-teal-400 transition-colors">Deals</Link></li>
              <li><Link to="/smartwatch/shop" className="hover:text-teal-400 transition-colors">New Arrivals</Link></li>
              <li><Link to="/smartwatch/shop" className="hover:text-teal-400 transition-colors">Brands</Link></li>
              <li><Link to="/smartwatch/quiz" className="hover:text-teal-400 transition-colors">Style Quiz</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-teal-400 transition-colors">Shipping</Link></li>
              <li><Link to="/contact" className="hover:text-teal-400 transition-colors">Returns</Link></li>
              <li><Link to="/contact" className="hover:text-teal-400 transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-teal-400 transition-colors">Contact</Link></li>
              <li><Link to="/smartwatch/cart" className="hover:text-teal-400 transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-teal-400 transition-colors">About</Link></li>
              <li><Link to="/smartwatch/blog" className="hover:text-teal-400 transition-colors">Blog</Link></li>
              <li><Link to="/smartwatch/blog" className="hover:text-teal-400 transition-colors">Guides</Link></li>
              <li><Link to="/about" className="hover:text-teal-400 transition-colors">Affiliate Program</Link></li>
              <li><Link to="/contact" className="hover:text-teal-400 transition-colors">Press</Link></li>
            </ul>
          </div>

          {/* Newsletter Mini */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-gray-400 mb-3">Get the latest watch news and deals.</p>
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 mb-2"
            />
            <button className="w-full py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>© 2026 WatchHub. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-3">
            {['Visa', 'MC', 'Amex', 'PayPal', 'Apple Pay'].map((m) => (
              <div key={m} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-400 font-medium">
                {m}
              </div>
            ))}
            <div className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs font-medium flex items-center gap-1">
              🔒 SSL
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
