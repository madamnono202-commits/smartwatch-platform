import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, TrendingUp, TrendingDown, ArrowUpDown } from 'lucide-react';
import { cryptoPrices } from '../../data/crypto';

const allCoins = [
  ...cryptoPrices,
  { symbol: 'MATIC', name: 'Polygon', price: 0.89, change: 2.8 },
  { symbol: 'UNI', name: 'Uniswap', price: 11.42, change: -0.3 },
  { symbol: 'ATOM', name: 'Cosmos', price: 9.18, change: 1.7 },
  { symbol: 'FIL', name: 'Filecoin', price: 5.67, change: -1.5 },
  { symbol: 'NEAR', name: 'NEAR Protocol', price: 7.23, change: 3.1 },
  { symbol: 'APT', name: 'Aptos', price: 12.45, change: 5.2 },
  { symbol: 'ARB', name: 'Arbitrum', price: 1.34, change: -0.9 },
  { symbol: 'OP', name: 'Optimism', price: 3.56, change: 2.4 },
  { symbol: 'INJ', name: 'Injective', price: 28.90, change: 4.1 },
  { symbol: 'STX', name: 'Stacks', price: 2.78, change: -2.1 },
  { symbol: 'IMX', name: 'Immutable X', price: 2.12, change: 1.3 },
  { symbol: 'RENDER', name: 'Render', price: 8.45, change: 6.7 },
  { symbol: 'FET', name: 'Fetch.ai', price: 2.34, change: 8.2 },
  { symbol: 'THETA', name: 'Theta', price: 1.89, change: -0.4 },
];

export default function Prices() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'marketcap' | 'price' | 'change'>('marketcap');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const filtered = allCoins
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.symbol.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      let diff = 0;
      if (sortBy === 'price') diff = a.price - b.price;
      else if (sortBy === 'change') diff = a.change - b.change;
      else diff = b.price - a.price;
      return sortDir === 'desc' ? -diff : diff;
    });

  const toggleSort = (col: 'marketcap' | 'price' | 'change') => {
    if (sortBy === col) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setSortDir('desc'); }
  };

  const globalStats = {
    marketCap: '$2.34T',
    volume24h: '$98.7B',
    btcDominance: '52.4%',
    ethDominance: '17.1%',
    activeCryptos: '24,832',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-blue-300/60 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white">Prices</span>
          </nav>
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">Cryptocurrency Prices</h1>
          <p className="text-lg text-blue-200/70 max-w-2xl mb-8">
            Track real-time prices for {allCoins.length}+ cryptocurrencies. Data refreshed every 60 seconds.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(globalStats).map(([key, val]) => (
              <div key={key} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <p className="text-xs text-blue-300/60 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                <p className="text-lg font-bold text-white mt-1">{val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search coins..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase w-12">#</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Coin</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase cursor-pointer hover:text-blue-600" onClick={() => toggleSort('price')}>
                    <span className="flex items-center gap-1">Price <ArrowUpDown size={12} /></span>
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase cursor-pointer hover:text-blue-600" onClick={() => toggleSort('change')}>
                    <span className="flex items-center gap-1">24h Change <ArrowUpDown size={12} /></span>
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">7d Chart</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Market Cap</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((coin, i) => (
                  <tr key={coin.symbol} className="border-t border-gray-100 hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-4 text-sm text-gray-400 font-medium">{i + 1}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                          {coin.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900 text-sm">{coin.name}</span>
                          <span className="text-xs text-gray-400 ml-2">{coin.symbol}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                      ${coin.price < 1 ? coin.price.toFixed(4) : coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1 text-sm font-semibold ${coin.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {coin.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {coin.change >= 0 ? '+' : ''}{coin.change}%
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <svg width="100" height="32" viewBox="0 0 100 32" className={coin.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          points={Array.from({ length: 20 }).map((_, j) => {
                            const x = (j / 19) * 100;
                            const base = 16;
                            const y = base + Math.sin(j * 0.8 + i) * 8 + (coin.change >= 0 ? -j * 0.3 : j * 0.3);
                            return `${x},${Math.max(2, Math.min(30, y))}`;
                          }).join(' ')}
                        />
                      </svg>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell text-sm text-gray-600">
                      ${(coin.price * (1000000 + Math.random() * 10000000)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </td>
                    <td className="px-4 py-4">
                      <Link
                        to={`/exchange/binance`}
                        className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                      >
                        Trade
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
