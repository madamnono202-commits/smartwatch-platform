import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

export default function CryptoFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Get Daily Exchange Deals — Free</h3>
          <p className="text-blue-200 mb-6">AI-curated exchange bonuses and fee updates delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-blue-300/60 text-xs mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-bold text-white">
                Crypto<span className="text-blue-400">Compare</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">AI-powered exchange comparison. Find the best rates instantly.</p>
            <div className="flex gap-3">
              {['X', 'TG', 'YT'].map((s) => (
                <a key={s} href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center text-xs font-bold text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Exchanges</h4>
            <ul className="space-y-2 text-sm">
              {['Binance', 'Bybit', 'Coinbase', 'Kraken', 'OKX', 'KuCoin'].map((e) => (
                <li key={e}>
                  <Link to={`/exchange/${e.toLowerCase()}`} className="hover:text-blue-400 transition-colors">{e}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/blog" className="hover:text-blue-400 transition-colors">Blog</Link></li>
              <li><Link to="/learn" className="hover:text-blue-400 transition-colors">Learn</Link></li>
              <li><Link to="/glossary" className="hover:text-blue-400 transition-colors">Glossary</Link></li>
              <li><Link to="/tools/fee-calculator" className="hover:text-blue-400 transition-colors">Tools</Link></li>
              <li><Link to="/news" className="hover:text-blue-400 transition-colors">News</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-blue-400 transition-colors">Terms</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">Affiliate Disclosure</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <span>© 2026 CryptoCompare AI. All rights reserved.</span>
          <span>This site contains affiliate links. We may earn a commission.</span>
        </div>
      </div>
    </footer>
  );
}
