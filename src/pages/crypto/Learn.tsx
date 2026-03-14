import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Clock, ArrowRight, Sparkles, GraduationCap, Shield, TrendingUp, Coins, Globe } from 'lucide-react';

const topics = [
  {
    category: 'Getting Started',
    icon: <GraduationCap size={20} />,
    color: 'blue',
    articles: [
      { title: 'What is Cryptocurrency? A Complete Beginner\'s Guide', time: '12 min', slug: 'what-is-cryptocurrency' },
      { title: 'How to Buy Your First Bitcoin', time: '8 min', slug: 'how-to-buy-bitcoin' },
      { title: 'Understanding Crypto Wallets: Hot vs Cold Storage', time: '10 min', slug: 'crypto-wallets' },
      { title: 'How Crypto Exchanges Work', time: '7 min', slug: 'how-exchanges-work' },
    ],
  },
  {
    category: 'Trading',
    icon: <TrendingUp size={20} />,
    color: 'green',
    articles: [
      { title: 'Spot Trading vs Futures Trading Explained', time: '15 min', slug: 'spot-vs-futures' },
      { title: 'Understanding Order Types: Market, Limit, Stop-Loss', time: '9 min', slug: 'order-types' },
      { title: 'Technical Analysis for Crypto Beginners', time: '20 min', slug: 'technical-analysis' },
      { title: 'Dollar-Cost Averaging: The Safest Investment Strategy', time: '6 min', slug: 'dca-strategy' },
    ],
  },
  {
    category: 'DeFi',
    icon: <Globe size={20} />,
    color: 'purple',
    articles: [
      { title: 'What is DeFi? Decentralized Finance Explained', time: '11 min', slug: 'what-is-defi' },
      { title: 'Yield Farming and Liquidity Pools Guide', time: '14 min', slug: 'yield-farming' },
      { title: 'Understanding DEXs vs CEXs', time: '8 min', slug: 'dex-vs-cex' },
      { title: 'Smart Contracts: How They Work', time: '10 min', slug: 'smart-contracts' },
    ],
  },
  {
    category: 'Security',
    icon: <Shield size={20} />,
    color: 'red',
    articles: [
      { title: 'Crypto Security Best Practices', time: '12 min', slug: 'security-best-practices' },
      { title: 'How to Spot Crypto Scams', time: '8 min', slug: 'crypto-scams' },
      { title: 'Two-Factor Authentication: Essential Setup Guide', time: '5 min', slug: '2fa-guide' },
      { title: 'Protecting Your Private Keys', time: '7 min', slug: 'private-keys' },
    ],
  },
  {
    category: 'Staking & Earning',
    icon: <Coins size={20} />,
    color: 'amber',
    articles: [
      { title: 'What is Crypto Staking? How to Earn Passive Income', time: '10 min', slug: 'what-is-staking' },
      { title: 'Best Staking Coins for 2026', time: '8 min', slug: 'best-staking-coins' },
      { title: 'Understanding APY vs APR in Crypto', time: '6 min', slug: 'apy-vs-apr' },
      { title: 'Crypto Lending: Risks and Rewards', time: '11 min', slug: 'crypto-lending' },
    ],
  },
];

const colorMap: Record<string, { bg: string; text: string; icon: string; border: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-700', icon: 'bg-blue-100 text-blue-600', border: 'border-blue-200' },
  green: { bg: 'bg-green-50', text: 'text-green-700', icon: 'bg-green-100 text-green-600', border: 'border-green-200' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-700', icon: 'bg-purple-100 text-purple-600', border: 'border-purple-200' },
  red: { bg: 'bg-red-50', text: 'text-red-700', icon: 'bg-red-100 text-red-600', border: 'border-red-200' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', icon: 'bg-amber-100 text-amber-600', border: 'border-amber-200' },
};

export default function Learn() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-blue-300/60 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white">Learn</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <BookOpen size={36} className="text-blue-300" />
            <h1 className="text-3xl lg:text-5xl font-bold text-white">Crypto Learning Hub</h1>
          </div>
          <p className="text-lg text-blue-200/70 max-w-2xl mb-8">
            Free educational content to help you navigate the world of cryptocurrency. From beginner guides to advanced trading strategies.
          </p>
          <div className="flex flex-wrap gap-3">
            {topics.map((t) => (
              <a key={t.category} href={`#${t.category.toLowerCase().replace(/\s+/g, '-')}`} className="px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-sm text-white hover:bg-white/20 transition-colors">
                {t.category}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Featured Article */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-10 hover:shadow-lg transition-all group cursor-pointer">
          <div className="grid lg:grid-cols-2">
            <div className="aspect-video lg:aspect-auto overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=500&fit=crop"
                alt="Learn crypto"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/800x500/e5e7eb/6b7280?text=Learn'; }}
              />
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium w-fit mb-3">
                <Sparkles size={12} /> Featured Guide
              </span>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
                Complete Cryptocurrency Beginner&apos;s Guide 2026
              </h2>
              <p className="text-gray-500 mb-4">
                Everything you need to know to start your crypto journey. From buying your first Bitcoin to understanding DeFi, this comprehensive guide covers it all.
              </p>
              <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
                <span className="flex items-center gap-1"><Clock size={14} /> 25 min read</span>
                <span>Updated Mar 2026</span>
              </div>
              <span className="text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Start Learning <ArrowRight size={16} />
              </span>
            </div>
          </div>
        </div>

        {/* Topic Sections */}
        <div className="space-y-10">
          {topics.map((topic) => {
            const colors = colorMap[topic.color];
            return (
              <section key={topic.category} id={topic.category.toLowerCase().replace(/\s+/g, '-')}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl ${colors.icon} flex items-center justify-center`}>
                    {topic.icon}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{topic.category}</h2>
                  <span className="text-xs text-gray-400">{topic.articles.length} articles</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {topic.articles.map((article) => (
                    <div
                      key={article.slug}
                      className={`${colors.bg} border ${colors.border} rounded-xl p-5 hover:shadow-md transition-all cursor-pointer group`}
                    >
                      <h3 className={`font-semibold text-gray-900 text-sm mb-2 group-hover:${colors.text} transition-colors`}>
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock size={12} />
                        <span>{article.time} read</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
