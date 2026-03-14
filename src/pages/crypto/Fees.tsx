import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ExternalLink, Info } from 'lucide-react';
import { exchanges } from '../../data/crypto';

export default function Fees() {
  const [feeType, setFeeType] = useState<'spot' | 'futures' | 'withdrawal'>('spot');

  const sorted = [...exchanges].sort((a, b) => {
    if (feeType === 'spot') return a.spotMaker - b.spotMaker;
    if (feeType === 'futures') return a.futuresMaker - b.futuresMaker;
    return a.spotMaker - b.spotMaker;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-blue-300/60 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white">Fee Comparison</span>
          </nav>
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">Exchange Fee Comparison</h1>
          <p className="text-lg text-blue-200/70 max-w-2xl">
            Compare maker, taker, and withdrawal fees across all major cryptocurrency exchanges. Updated every 6 hours.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Fee Type Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { id: 'spot' as const, label: 'Spot Trading Fees' },
            { id: 'futures' as const, label: 'Futures Trading Fees' },
            { id: 'withdrawal' as const, label: 'Withdrawal Fees' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFeeType(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                feeType === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <Info size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-700">
            <strong>How fees work:</strong> Maker fees are charged when you add liquidity (limit orders). Taker fees are charged when you remove liquidity (market orders). Most exchanges offer VIP tiers with reduced fees for high-volume traders.
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Exchange</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                    {feeType === 'spot' ? 'Spot Maker' : feeType === 'futures' ? 'Futures Maker' : 'BTC Withdrawal'}
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                    {feeType === 'spot' ? 'Spot Taker' : feeType === 'futures' ? 'Futures Taker' : 'ETH Withdrawal'}
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Score</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Fee Discount</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase"></th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((ex, i) => {
                  const makerFee = feeType === 'spot' ? ex.spotMaker : feeType === 'futures' ? ex.futuresMaker : ex.spotMaker;
                  const takerFee = feeType === 'spot' ? ex.spotTaker : feeType === 'futures' ? ex.futuresTaker : ex.spotTaker;
                  const isLowest = i === 0;

                  return (
                    <tr key={ex.id} className="border-t border-gray-100 hover:bg-blue-50/30 transition-colors">
                      <td className="px-4 py-4">
                        <Link to={`/exchange/${ex.slug}`} className="flex items-center gap-3">
                          <span className="text-2xl">{ex.logo}</span>
                          <div>
                            <span className="font-semibold text-gray-900 text-sm hover:text-blue-600 transition-colors">{ex.name}</span>
                            {isLowest && (
                              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded">Lowest</span>
                            )}
                          </div>
                        </Link>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-sm font-bold ${isLowest ? 'text-green-600' : 'text-gray-900'}`}>
                          {feeType === 'withdrawal' ? ex.withdrawalFee : `${makerFee}%`}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm font-semibold text-gray-700">
                          {feeType === 'withdrawal' ? ex.withdrawalFee : `${takerFee}%`}
                        </span>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(ex.score / 10) * 100}%` }} />
                          </div>
                          <span className="text-xs font-medium text-gray-600">{ex.score}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell text-xs text-gray-500">
                        {ex.id === 'binance' ? '25% with BNB' : ex.id === 'okx' ? 'Volume tiers' : 'VIP tiers available'}
                      </td>
                      <td className="px-4 py-4">
                        <Link
                          to={`/exchange/${ex.slug}`}
                          className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap flex items-center gap-1"
                        >
                          Details <ExternalLink size={12} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fee Savings Calculator */}
        <div className="mt-10 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">How much could you save?</h2>
          <p className="text-sm text-gray-600 mb-6">
            Switching from a high-fee exchange to a low-fee exchange can save hundreds or even thousands per year.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-5 text-center">
              <p className="text-sm text-gray-500 mb-1">Monthly Volume: $10,000</p>
              <p className="text-2xl font-bold text-green-600">Save $36/yr</p>
              <p className="text-xs text-gray-400 mt-1">OKX vs Coinbase</p>
            </div>
            <div className="bg-white rounded-xl p-5 text-center">
              <p className="text-sm text-gray-500 mb-1">Monthly Volume: $50,000</p>
              <p className="text-2xl font-bold text-green-600">Save $192/yr</p>
              <p className="text-xs text-gray-400 mt-1">OKX vs Coinbase</p>
            </div>
            <div className="bg-white rounded-xl p-5 text-center">
              <p className="text-sm text-gray-500 mb-1">Monthly Volume: $100,000</p>
              <p className="text-2xl font-bold text-green-600">Save $384/yr</p>
              <p className="text-xs text-gray-400 mt-1">OKX vs Coinbase</p>
            </div>
          </div>
          <div className="text-center mt-6">
            <Link to="/tools/fee-calculator" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
              Try our Fee Calculator for exact savings →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
