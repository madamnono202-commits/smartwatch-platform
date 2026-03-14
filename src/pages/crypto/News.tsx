import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, TrendingUp } from 'lucide-react';

const newsItems = [
  {
    id: 1,
    title: 'Bitcoin Surges Past $67,000 as Institutional Demand Grows',
    excerpt: 'BTC reaches new yearly highs as spot Bitcoin ETFs see record inflows exceeding $2.4 billion in a single week.',
    source: 'CoinDesk',
    time: '2 hours ago',
    category: 'Market',
    image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=250&fit=crop',
    trending: true,
  },
  {
    id: 2,
    title: 'Ethereum Layer 2 Solutions Hit Record TVL of $45 Billion',
    excerpt: 'Arbitrum, Optimism, and Base lead the L2 scaling race as DeFi activity surges across rollup networks.',
    source: 'The Block',
    time: '4 hours ago',
    category: 'DeFi',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop',
    trending: true,
  },
  {
    id: 3,
    title: 'SEC Approves First Spot Solana ETF in Historic Decision',
    excerpt: 'Following the success of Bitcoin and Ethereum ETFs, regulators greenlight the first Solana-based exchange-traded fund.',
    source: 'Bloomberg',
    time: '6 hours ago',
    category: 'Regulation',
    image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=250&fit=crop',
    trending: false,
  },
  {
    id: 4,
    title: 'Binance Launches Zero-Fee Trading for 5 New BTC Pairs',
    excerpt: 'The world\'s largest exchange expands its zero-fee trading program to attract more retail traders.',
    source: 'CryptoSlate',
    time: '8 hours ago',
    category: 'Exchange',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=250&fit=crop',
    trending: false,
  },
  {
    id: 5,
    title: 'DeFi Protocol Aave Reaches $30 Billion in Total Value Locked',
    excerpt: 'The leading lending protocol hits a new milestone as institutional borrowing increases on Ethereum mainnet.',
    source: 'DeFi Llama',
    time: '10 hours ago',
    category: 'DeFi',
    image: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&h=250&fit=crop',
    trending: false,
  },
  {
    id: 6,
    title: 'Crypto Tax Regulations Tighten: What Traders Need to Know for 2026',
    excerpt: 'New reporting requirements from the IRS will affect how cryptocurrency gains and losses are reported this tax season.',
    source: 'Forbes',
    time: '12 hours ago',
    category: 'Regulation',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=250&fit=crop',
    trending: false,
  },
  {
    id: 7,
    title: 'NFT Market Sees Revival with Gaming and Utility Tokens Leading Recovery',
    excerpt: 'After a prolonged bear market, NFT trading volumes surge 300% led by blockchain gaming assets.',
    source: 'Decrypt',
    time: '14 hours ago',
    category: 'NFT',
    image: 'https://images.unsplash.com/photo-1646463910641-afb29d251dce?w=400&h=250&fit=crop',
    trending: false,
  },
  {
    id: 8,
    title: 'Cardano Smart Contracts Hit 10,000 DApps Milestone',
    excerpt: 'The Cardano ecosystem reaches a significant development milestone as developer activity accelerates.',
    source: 'CoinTelegraph',
    time: '16 hours ago',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop',
    trending: false,
  },
];

const categories = ['All', 'Market', 'DeFi', 'Regulation', 'Exchange', 'NFT', 'Technology'];

export default function News() {
  const [selectedCat, setSelectedCat] = useState('All');

  const filtered = newsItems.filter((n) => selectedCat === 'All' || n.category === selectedCat);
  const trending = newsItems.filter((n) => n.trending);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-700 font-medium">News</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Crypto News</h1>
              <p className="text-gray-500 mt-1">Stay informed with the latest cryptocurrency news and market updates.</p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" /> Live Updates
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Trending */}
        <div className="mb-10">
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4">
            <TrendingUp size={20} className="text-red-500" /> Trending Now
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {trending.map((item) => (
              <article
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 cursor-pointer"
              >
                <div className="grid sm:grid-cols-2">
                  <div className="aspect-video sm:aspect-auto overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x250/e5e7eb/6b7280?text=News'; }}
                    />
                  </div>
                  <div className="p-5 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded">{item.category}</span>
                      <span className="text-xs text-gray-400">{item.time}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{item.excerpt}</p>
                    <span className="text-xs text-gray-400 mt-2">Source: {item.source}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCat === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Feed */}
        <div className="space-y-4">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="group bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex gap-4">
                <div className="hidden sm:block w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/200x200/e5e7eb/6b7280?text=News'; }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded">{item.category}</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={10} /> {item.time}</span>
                    <span className="text-xs text-gray-400">· {item.source}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{item.excerpt}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
