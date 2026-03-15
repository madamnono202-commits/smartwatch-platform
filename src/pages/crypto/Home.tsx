import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ExternalLink, Sparkles, ArrowRight, Shield, Calculator, TrendingUp, DollarSign, ChevronRight } from 'lucide-react';
import { exchanges, cryptoPrices, cryptoBlogPosts } from '../../data/crypto';

function PriceTicker() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => prev - 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const items = [...cryptoPrices, ...cryptoPrices, ...cryptoPrices];

  return (
    <div className="bg-gray-800 text-white py-3 overflow-hidden">
      <div
        className="flex gap-8 whitespace-nowrap transition-none"
        style={{ transform: `translateX(${offset}px)` }}
      >
        {items.map((coin, i) => (
          <span key={`${coin.symbol}-${i}`} className="flex items-center gap-2 text-sm">
            <span className="font-semibold">{coin.symbol}</span>
            <span className="text-gray-300">${coin.price.toLocaleString()}</span>
            <span className={coin.change >= 0 ? 'text-green-400' : 'text-red-400'}>
              {coin.change >= 0 ? '▲' : '▼'}{Math.abs(coin.change)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[640px] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mb-6">
              <Sparkles size={14} />
              AI-Powered · Updated Every 5 Minutes
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Find the Best Crypto Exchange —{' '}
              <span className="text-blue-400">Instantly</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              Real-time fees, bonuses & ratings for 15+ exchanges. Fully automated by AI. Always up to date.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                to="/compare"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-lg transition-all hover:shadow-lg hover:shadow-blue-600/25 text-center"
              >
                Compare Exchanges Now
              </Link>
              <Link
                to="/prices"
                className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl text-lg hover:bg-white/10 transition-all text-center"
              >
                See Live Prices
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              {[
                { icon: <TrendingUp size={14} />, label: '15+ Exchanges' },
                { icon: <Sparkles size={14} />, label: 'Updated Every 5min' },
                { icon: <Shield size={14} />, label: '100K+ Users' },
                { icon: <DollarSign size={14} />, label: 'Free to Use' },
              ].map((stat, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span className="text-blue-400">{stat.icon}</span>
                  {stat.label}
                </span>
              ))}
            </div>
          </div>

          {/* Animated comparison card mockup */}
          <div className="lg:col-span-2 hidden lg:block">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-semibold">Live Comparison</span>
                <span className="text-green-400 text-xs flex items-center gap-1">● Live</span>
              </div>
              {exchanges.slice(0, 4).map((ex, i) => (
                <div key={ex.id} className={`flex items-center gap-3 py-3 ${i > 0 ? 'border-t border-white/10' : ''}`}>
                  <span className="text-lg">{ex.logo}</span>
                  <div className="flex-1">
                    <span className="text-white text-sm font-medium">{ex.name}</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} size={10} className={j < Math.round(ex.score / 2) ? 'text-amber-400 fill-amber-400' : 'text-gray-600'} />
                        ))}
                      </div>
                      <span className="text-gray-400 text-xs">{ex.score}/10</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-white text-sm font-bold">{ex.spotMaker}%</span>
                    <p className="text-gray-400 text-xs">maker fee</p>
                  </div>
                  {ex.bonusActive && (
                    <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-medium rounded">
                      Bonus
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExchangeTable() {
  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Top Exchanges Right Now</h2>
            <p className="text-gray-500 mt-1">Automatically ranked by AI every hour</p>
          </div>
          <Link to="/compare" className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
            View Full Comparison <ArrowRight size={16} />
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Desktop Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Exchange</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Spot Fee</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Signup Bonus</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Coins</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">KYC</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody>
                {exchanges.map((ex, i) => (
                  <tr
                    key={ex.id}
                    className="border-t border-gray-100 hover:bg-blue-50/30 transition-colors cursor-pointer group"
                  >
                    <td className="px-4 py-4">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                        i === 0 ? 'bg-amber-100 text-amber-700' : i === 1 ? 'bg-gray-100 text-gray-600' : i === 2 ? 'bg-orange-100 text-orange-700' : 'bg-gray-50 text-gray-400'
                      }`}>
                        #{i + 1}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <Link to={`/exchange/${ex.slug}`} className="flex items-center gap-3">
                        <span className="text-2xl">{ex.logo}</span>
                        <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{ex.name}</span>
                      </Link>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} size={12} className={j < Math.round(ex.score / 2) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
                          ))}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{ex.score}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-sm font-semibold ${ex.spotMaker <= 0.1 ? 'text-green-600' : 'text-gray-700'}`}>
                        {ex.spotMaker}%
                      </span>
                      {ex.spotMaker <= 0.1 && (
                        <span className="ml-1 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Low</span>
                      )}
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      {ex.bonusActive ? (
                        <span className="text-sm font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">
                          {ex.bonus}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell text-sm text-gray-700">{ex.coinsListed}+</td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        ex.kycRequired ? 'bg-yellow-50 text-yellow-700' : 'bg-green-50 text-green-700'
                      }`}>
                        {ex.kycRequired ? 'Required' : 'Optional'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap flex items-center gap-1">
                        Open Account <ExternalLink size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function EditorsChoice() {
  const featured = exchanges.slice(0, 3);

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Editor's Choice Exchanges</h2>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
            <Sparkles size={12} /> AI-verified reviews
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((ex) => (
            <div
              key={ex.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
            >
              <div className="relative">
                <div className="absolute top-0 left-0 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-br-xl z-10">
                  Best for {ex.bestFor}
                </div>
              </div>
              <div className="p-6 pt-10 text-center">
                <span className="text-5xl mb-4 block">{ex.logo}</span>
                <h3 className="text-xl font-bold text-gray-900">{ex.name}</h3>
                <p className="text-sm text-gray-400">Founded {ex.founded}</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={14} className={j < Math.round(ex.score / 2) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{ex.score}/10</span>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {ex.features.map((f) => (
                    <span key={f} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">{f}</span>
                  ))}
                </div>

                {ex.bonusActive && (
                  <div className="mt-4 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                    <span className="text-sm font-semibold text-amber-700">{ex.bonus}</span>
                  </div>
                )}

                <Link
                  to={`/exchange/${ex.slug}`}
                  className="mt-5 w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  Visit Exchange <ExternalLink size={14} />
                </Link>
                <p className="text-xs text-gray-400 mt-2">Affiliate Link</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Latest Crypto Insights</h2>
          <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
            <Sparkles size={12} /> AI-Written · Updated Daily
          </span>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {cryptoBlogPosts.map((post) => (
            <Link
              key={post.id}
              to="/blog"
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/e5e7eb/6b7280?text=Blog'; }}
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-700 rounded">{post.category}</span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                  <span className="text-xs text-gray-400">· {post.readTime}</span>
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">{post.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/blog" className="inline-flex items-center gap-1 text-blue-600 font-medium hover:text-blue-700 transition-colors">
            Read All Articles <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ToolsSection() {
  const tools = [
    { icon: <Calculator size={24} />, name: 'Fee Calculator', desc: 'Compare trading fees across exchanges for any trade size.', href: '/tools/fee-calculator' },
    { icon: <TrendingUp size={24} />, name: 'Profit Calculator', desc: 'Calculate potential profits from your crypto trades.', href: '/tools/profit-calculator' },
    { icon: <DollarSign size={24} />, name: 'DCA Calculator', desc: 'Plan your dollar-cost averaging strategy over time.', href: '/tools/dca-calculator' },
    { icon: <Shield size={24} />, name: 'Currency Converter', desc: 'Convert between 100+ cryptocurrencies in real time.', href: '/tools/converter' },
  ];

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-8">Free Crypto Tools</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              to={tool.href}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all group cursor-pointer border border-gray-100 block"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {tool.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{tool.name}</h3>
              <p className="text-sm text-gray-500">{tool.desc}</p>
              <span className="inline-flex items-center gap-1 text-blue-600 text-sm font-medium mt-3 group-hover:gap-2 transition-all">
                Use Tool <ChevronRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CryptoHome() {
  return (
    <div>
      <HeroSection />
      <PriceTicker />
      <ExchangeTable />
      <EditorsChoice />
      <BlogSection />
      <ToolsSection />
    </div>
  );
}
