import { Link } from 'react-router-dom';
import { ChevronRight, Coins, Info } from 'lucide-react';
import { exchanges } from '../../data/crypto';

const stakingData = [
  { coin: 'ETH', name: 'Ethereum', apy: { binance: 3.2, bybit: 3.0, coinbase: 3.1, kraken: 3.5, okx: 3.3, kucoin: 2.8 } },
  { coin: 'SOL', name: 'Solana', apy: { binance: 6.8, bybit: 7.0, coinbase: 5.5, kraken: 6.0, okx: 6.5, kucoin: 7.2 } },
  { coin: 'ADA', name: 'Cardano', apy: { binance: 2.5, bybit: 2.8, coinbase: 3.0, kraken: 3.5, okx: 2.7, kucoin: 3.0 } },
  { coin: 'DOT', name: 'Polkadot', apy: { binance: 10.0, bybit: 9.5, coinbase: 8.0, kraken: 12.0, okx: 10.5, kucoin: 9.0 } },
  { coin: 'AVAX', name: 'Avalanche', apy: { binance: 7.5, bybit: 7.0, coinbase: 6.5, kraken: 7.0, okx: 8.0, kucoin: 6.8 } },
  { coin: 'ATOM', name: 'Cosmos', apy: { binance: 12.0, bybit: 11.5, coinbase: 10.0, kraken: 13.0, okx: 12.5, kucoin: 11.0 } },
  { coin: 'MATIC', name: 'Polygon', apy: { binance: 4.5, bybit: 4.0, coinbase: 3.8, kraken: 4.2, okx: 4.8, kucoin: 4.0 } },
];

export default function Staking() {
  const exchangeList = exchanges.filter((ex) => ex.staking);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-purple-300/60 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white">Staking</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <Coins size={36} className="text-purple-300" />
            <h1 className="text-3xl lg:text-5xl font-bold text-white">Crypto Staking Rates</h1>
          </div>
          <p className="text-lg text-purple-200/70 max-w-2xl">
            Compare staking APY rates across top exchanges. Earn passive income on your crypto holdings.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 flex items-start gap-3">
          <Info size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-700">
            <strong>What is staking?</strong> Staking allows you to earn rewards by locking your crypto to help secure a blockchain network. APY rates vary by exchange and can change frequently.
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-xs text-gray-400 mb-1">Highest APY</p>
            <p className="text-2xl font-bold text-green-600">13.0%</p>
            <p className="text-xs text-gray-500 mt-1">Cosmos on Kraken</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-xs text-gray-400 mb-1">Coins Available</p>
            <p className="text-2xl font-bold text-gray-900">{stakingData.length}+</p>
            <p className="text-xs text-gray-500 mt-1">Across all exchanges</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-xs text-gray-400 mb-1">Exchanges with Staking</p>
            <p className="text-2xl font-bold text-gray-900">{exchangeList.length}</p>
            <p className="text-xs text-gray-500 mt-1">Top platforms</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-xs text-gray-400 mb-1">Avg ETH APY</p>
            <p className="text-2xl font-bold text-purple-600">3.2%</p>
            <p className="text-xs text-gray-500 mt-1">Across all platforms</p>
          </div>
        </div>

        {/* Staking Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Coin</th>
                  {exchanges.slice(0, 6).map((ex) => (
                    <th key={ex.id} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase text-center">
                      <Link to={`/exchange/${ex.slug}`} className="hover:text-blue-600">
                        {ex.logo} {ex.name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stakingData.map((row) => {
                  const apyValues = Object.values(row.apy);
                  const maxApy = Math.max(...apyValues);

                  return (
                    <tr key={row.coin} className="border-t border-gray-100 hover:bg-purple-50/30 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                            {row.coin.slice(0, 2)}
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 text-sm">{row.name}</span>
                            <span className="text-xs text-gray-400 ml-2">{row.coin}</span>
                          </div>
                        </div>
                      </td>
                      {(['binance', 'bybit', 'coinbase', 'kraken', 'okx', 'kucoin'] as const).map((exId) => {
                        const apy = row.apy[exId];
                        const isBest = apy === maxApy;
                        return (
                          <td key={exId} className="px-4 py-4 text-center">
                            <span className={`text-sm font-bold ${isBest ? 'text-green-600' : 'text-gray-700'}`}>
                              {apy}%
                            </span>
                            {isBest && (
                              <span className="block text-xs text-green-600 font-medium mt-0.5">Best</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Start Earning?</h2>
          <p className="text-gray-600 mb-6">Choose an exchange and start staking your crypto today.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {exchangeList.slice(0, 4).map((ex) => (
              <Link
                key={ex.id}
                to={`/exchange/${ex.slug}`}
                className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:shadow-md transition-all flex items-center gap-2"
              >
                {ex.logo} {ex.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
