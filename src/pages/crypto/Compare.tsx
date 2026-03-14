import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ExternalLink, Sparkles, Filter, X, ChevronDown, ChevronRight, Check } from 'lucide-react';
import { exchanges } from '../../data/crypto';

export default function CryptoCompare() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedExchanges, setSelectedExchanges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'score' | 'spotMaker' | 'coinsListed'>('score');
  const [filters, setFilters] = useState({
    type: 'all',
    kyc: 'all',
    feeRange: 0.5,
  });

  const toggleSelect = (id: string) => {
    setSelectedExchanges((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const sortedExchanges = [...exchanges].sort((a, b) => {
    if (sortBy === 'score') return b.score - a.score;
    if (sortBy === 'spotMaker') return a.spotMaker - b.spotMaker;
    if (sortBy === 'coinsListed') return b.coinsListed - a.coinsListed;
    return 0;
  }).filter((ex) => {
    if (filters.kyc === 'yes' && !ex.kycRequired) return false;
    if (filters.kyc === 'no' && ex.kycRequired) return false;
    if (ex.spotMaker > filters.feeRange) return false;
    return true;
  });

  // AI Recommendation
  const recommended = sortedExchanges[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-700 font-medium">Compare Exchanges</span>
          </nav>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Compare Crypto Exchanges Side by Side</h1>
          <p className="text-gray-500 mt-1">Real-time data · Updated every 5 minutes · {exchanges.length}+ exchanges</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${filterOpen ? 'fixed inset-0 z-50 bg-white lg:relative lg:z-0 p-6 lg:p-0 overflow-y-auto' : 'hidden lg:block'}`}>
            <div className="flex items-center justify-between lg:hidden mb-6">
              <h2 className="text-lg font-bold text-gray-900">Filters</h2>
              <button onClick={() => setFilterOpen(false)} className="p-2 text-gray-500"><X size={24} /></button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-6 lg:sticky lg:top-24">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900">Filters</h3>
                <button
                  onClick={() => setFilters({ type: 'all', kyc: 'all', feeRange: 0.5 })}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Clear All
                </button>
              </div>

              {/* Exchange Type */}
              <div>
                <button className="flex items-center justify-between w-full text-sm font-semibold text-gray-700 mb-2">
                  Exchange Type <ChevronDown size={14} />
                </button>
                <div className="space-y-1.5">
                  {['All', 'Centralized (CEX)', 'Decentralized (DEX)'].map((type) => (
                    <label key={type} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
                      <input
                        type="radio"
                        name="type"
                        checked={filters.type === type.toLowerCase().split(' ')[0]}
                        onChange={() => setFilters({ ...filters, type: type.toLowerCase().split(' ')[0] })}
                        className="text-blue-600"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              {/* KYC */}
              <div>
                <button className="flex items-center justify-between w-full text-sm font-semibold text-gray-700 mb-2">
                  KYC Required <ChevronDown size={14} />
                </button>
                <div className="space-y-1.5">
                  {[
                    { label: 'Any', value: 'all' },
                    { label: 'Required', value: 'yes' },
                    { label: 'Not Required', value: 'no' },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
                      <input
                        type="radio"
                        name="kyc"
                        checked={filters.kyc === opt.value}
                        onChange={() => setFilters({ ...filters, kyc: opt.value })}
                        className="text-blue-600"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Fee Range */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Max Spot Fee</span>
                  <span className="text-sm text-blue-600 font-medium">{filters.feeRange}%</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="1"
                  step="0.01"
                  value={filters.feeRange}
                  onChange={(e) => setFilters({ ...filters, feeRange: parseFloat(e.target.value) })}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>0%</span>
                  <span>1%</span>
                </div>
              </div>

              {/* Features */}
              <div>
                <button className="flex items-center justify-between w-full text-sm font-semibold text-gray-700 mb-2">
                  Features <ChevronDown size={14} />
                </button>
                <div className="space-y-1.5">
                  {['Mobile App', 'API Access', 'Staking', 'NFT', 'Futures'].map((f) => (
                    <label key={f} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
                      <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                      {f}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Mobile filter button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setFilterOpen(true)}
                className="w-full py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 flex items-center justify-center gap-2"
              >
                <Filter size={16} /> Filters
              </button>
            </div>

            {/* Sort Controls */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">{sortedExchanges.length} exchanges</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'score' | 'spotMaker' | 'coinsListed')}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="score">AI Score</option>
                  <option value="spotMaker">Lowest Fees</option>
                  <option value="coinsListed">Most Coins</option>
                </select>
              </div>
            </div>

            {/* AI Recommendation */}
            {recommended && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={18} className="text-blue-600" />
                  <h3 className="font-bold text-gray-900">AI Recommendation</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Based on your filters, <strong>{recommended.name}</strong> offers the best combination of low fees
                  {recommended.bonusActive ? ` and the highest current signup bonus` : ''}. Ideal for
                  {recommended.bestFor === 'Futures Trading' ? ' futures trading' : ' general trading'}.
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{recommended.logo}</span>
                  <div>
                    <p className="font-bold text-gray-900">{recommended.name}</p>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={12} className={j < Math.round(recommended.score / 2) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} />
                      ))}
                      <span className="text-sm text-gray-500 ml-1">{recommended.score}/10</span>
                    </div>
                  </div>
                  <Link
                    to={`/exchange/${recommended.slug}`}
                    className="ml-auto px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 text-sm"
                  >
                    View Details <ExternalLink size={12} />
                  </Link>
                </div>
              </div>
            )}

            {/* Comparison Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase w-10"></th>
                      <th className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase">Rank</th>
                      <th className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase">Exchange</th>
                      <th className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase cursor-pointer hover:text-blue-600" onClick={() => setSortBy('score')}>AI Score</th>
                      <th className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase cursor-pointer hover:text-blue-600" onClick={() => setSortBy('spotMaker')}>Spot Maker</th>
                      <th className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase">Spot Taker</th>
                      <th className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Futures Maker</th>
                      <th className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Futures Taker</th>
                      <th className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell cursor-pointer hover:text-blue-600" onClick={() => setSortBy('coinsListed')}>Coins</th>
                      <th className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Bonus</th>
                      <th className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedExchanges.map((ex, i) => {
                      const isSelected = selectedExchanges.includes(ex.id);
                      const lowestMaker = Math.min(...sortedExchanges.map((e) => e.spotMaker));
                      return (
                        <tr
                          key={ex.id}
                          className={`border-t border-gray-100 hover:bg-blue-50/30 transition-colors ${isSelected ? 'bg-blue-50/50' : ''}`}
                        >
                          <td className="px-3 py-4">
                            <button
                              onClick={() => toggleSelect(ex.id)}
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300 hover:border-blue-400'
                              }`}
                            >
                              {isSelected && <Check size={12} className="text-white" />}
                            </button>
                          </td>
                          <td className="px-3 py-4">
                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                              i === 0 ? 'bg-amber-100 text-amber-700' : 'bg-gray-50 text-gray-400'
                            }`}>
                              #{i + 1}
                            </span>
                          </td>
                          <td className="px-3 py-4">
                            <Link to={`/exchange/${ex.slug}`} className="flex items-center gap-2">
                              <span className="text-xl">{ex.logo}</span>
                              <span className="font-semibold text-gray-900 text-sm hover:text-blue-600">{ex.name}</span>
                            </Link>
                          </td>
                          <td className="px-3 py-4">
                            <div className="flex items-center gap-1">
                              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(ex.score / 10) * 100}%` }} />
                              </div>
                              <span className="text-sm font-medium text-gray-700">{ex.score}</span>
                            </div>
                          </td>
                          <td className="px-3 py-4">
                            <span className={`text-sm font-semibold ${ex.spotMaker === lowestMaker ? 'text-green-600' : 'text-gray-700'}`}>
                              {ex.spotMaker}%
                            </span>
                            {ex.spotMaker === lowestMaker && (
                              <span className="ml-1 text-xs bg-green-100 text-green-700 px-1 py-0.5 rounded">Best</span>
                            )}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-700">{ex.spotTaker}%</td>
                          <td className="px-3 py-4 text-sm text-gray-700 hidden md:table-cell">{ex.futuresMaker}%</td>
                          <td className="px-3 py-4 text-sm text-gray-700 hidden md:table-cell">{ex.futuresTaker}%</td>
                          <td className="px-3 py-4 text-sm text-gray-700 hidden lg:table-cell">{ex.coinsListed}+</td>
                          <td className="px-3 py-4 hidden lg:table-cell">
                            {ex.bonusActive ? (
                              <span className="text-xs font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded whitespace-nowrap">
                                {ex.bonus?.split(' ').slice(0, 3).join(' ')}
                              </span>
                            ) : (
                              <span className="text-sm text-gray-400">—</span>
                            )}
                          </td>
                          <td className="px-3 py-4">
                            <div className="flex gap-2">
                              <Link to={`/exchange/${ex.slug}`} className="text-xs text-blue-600 hover:underline whitespace-nowrap">
                                Review
                              </Link>
                              <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                                Open
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compare Bar */}
      {selectedExchanges.length >= 2 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {selectedExchanges.map((id) => {
                const ex = exchanges.find((e) => e.id === id);
                return ex ? (
                  <div key={id} className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
                    <span>{ex.logo}</span>
                    <span className="text-sm font-medium text-gray-900">{ex.name}</span>
                    <button onClick={() => toggleSelect(id)} className="text-gray-400 hover:text-gray-600">
                      <X size={14} />
                    </button>
                  </div>
                ) : null;
              })}
            </div>
            <button className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              Compare {selectedExchanges.length} Exchanges
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
