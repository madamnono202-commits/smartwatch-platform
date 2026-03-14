import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ExternalLink, ChevronRight, Search } from 'lucide-react';
import { exchanges } from '../../data/crypto';

export default function Exchanges() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'fees' | 'coins'>('score');

  const filtered = exchanges
    .filter((ex) => ex.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'score') return b.score - a.score;
      if (sortBy === 'fees') return a.spotMaker - b.spotMaker;
      if (sortBy === 'coins') return b.coinsListed - a.coinsListed;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-blue-300/60 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white">Exchanges</span>
          </nav>
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">All Crypto Exchanges</h1>
          <p className="text-lg text-blue-200/70 max-w-2xl">
            Browse and compare {exchanges.length}+ cryptocurrency exchanges. AI-verified reviews updated in real time.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search exchanges..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'score' | 'fees' | 'coins')}
            className="px-4 py-3 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="score">Sort by Score</option>
            <option value="fees">Sort by Lowest Fees</option>
            <option value="coins">Sort by Most Coins</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((ex, i) => (
            <Link
              key={ex.id}
              to={`/exchange/${ex.slug}`}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{ex.logo}</span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{ex.name}</h3>
                      <p className="text-xs text-gray-400">Founded {ex.founded} · {ex.hq}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-bold rounded ${
                    i === 0 ? 'bg-amber-100 text-amber-700' : i === 1 ? 'bg-gray-100 text-gray-600' : i === 2 ? 'bg-orange-100 text-orange-700' : 'bg-gray-50 text-gray-400'
                  }`}>
                    #{i + 1}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={14} className={j < Math.round(ex.score / 2) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{ex.score}/10</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {ex.features.map((f) => (
                    <span key={f} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">{f}</span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-400">Spot Fee</p>
                    <p className="text-sm font-bold text-gray-900">{ex.spotMaker}%</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-400">Coins</p>
                    <p className="text-sm font-bold text-gray-900">{ex.coinsListed}+</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-400">KYC</p>
                    <p className="text-sm font-bold text-gray-900">{ex.kycRequired ? 'Yes' : 'No'}</p>
                  </div>
                </div>

                {ex.bonusActive && (
                  <div className="px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                    <span className="text-sm font-semibold text-amber-700">{ex.bonus}</span>
                  </div>
                )}

                <div className="flex gap-3">
                  <span className="flex-1 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg group-hover:bg-blue-700 transition-colors text-center flex items-center justify-center gap-1">
                    View Review <ChevronRight size={14} />
                  </span>
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1"
                  >
                    <ExternalLink size={14} /> Visit
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
