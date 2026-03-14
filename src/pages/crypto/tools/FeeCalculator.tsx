import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calculator, ArrowRight } from 'lucide-react';
import { exchanges } from '../../../data/crypto';

export default function FeeCalculator() {
  const [tradeAmount, setTradeAmount] = useState(1000);
  const [selectedExchange, setSelectedExchange] = useState('all');
  const [tradeType, setTradeType] = useState<'spot' | 'futures'>('spot');

  const results = exchanges
    .filter((ex) => selectedExchange === 'all' || ex.id === selectedExchange)
    .map((ex) => {
      const makerFee = tradeType === 'spot' ? ex.spotMaker : ex.futuresMaker;
      const takerFee = tradeType === 'spot' ? ex.spotTaker : ex.futuresTaker;
      const makerCost = (tradeAmount * makerFee) / 100;
      const takerCost = (tradeAmount * takerFee) / 100;
      return { ...ex, makerCost, takerCost };
    })
    .sort((a, b) => a.makerCost - b.makerCost);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight size={14} />
            <span className="hover:text-blue-600 cursor-pointer">Tools</span>
            <ChevronRight size={14} />
            <span className="text-gray-700 font-medium">Fee Calculator</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calculator size={24} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Exchange Fee Calculator</h1>
              <p className="text-gray-500">Compare exact trading fees across exchanges for any trade size.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Input */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 lg:sticky lg:top-24 h-fit">
            <h2 className="font-bold text-gray-900 mb-4">Calculate Fees</h2>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Trade Amount (USD)</label>
                <input
                  type="number"
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-2 mt-2">
                  {[100, 500, 1000, 5000, 10000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setTradeAmount(amt)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        tradeAmount === amt ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      ${amt.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Trade Type</label>
                <div className="flex gap-2">
                  {[
                    { id: 'spot' as const, label: 'Spot' },
                    { id: 'futures' as const, label: 'Futures' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTradeType(t.id)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        tradeType === t.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Exchange</label>
                <select
                  value={selectedExchange}
                  onChange={(e) => setSelectedExchange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Exchanges</option>
                  {exchanges.map((ex) => (
                    <option key={ex.id} value={ex.id}>{ex.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            <h2 className="font-bold text-gray-900 mb-4">
              Fee Comparison for ${tradeAmount.toLocaleString()} {tradeType} trade
            </h2>

            <div className="space-y-3">
              {results.map((ex, i) => (
                <div
                  key={ex.id}
                  className={`bg-white rounded-xl border p-5 transition-all hover:shadow-md ${
                    i === 0 ? 'border-green-200 ring-1 ring-green-100' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{ex.logo}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-900">{ex.name}</h3>
                          {i === 0 && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded">Cheapest</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400">Maker: {tradeType === 'spot' ? ex.spotMaker : ex.futuresMaker}% · Taker: {tradeType === 'spot' ? ex.spotTaker : ex.futuresTaker}%</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-400">Maker Fee</p>
                          <p className={`text-lg font-bold ${i === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                            ${ex.makerCost.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Taker Fee</p>
                          <p className="text-lg font-bold text-gray-700">${ex.takerCost.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {i > 0 && (
                    <p className="text-xs text-amber-600 mt-2">
                      You'd pay ${(ex.makerCost - results[0].makerCost).toFixed(2)} more than {results[0].name}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link to="/fees" className="text-blue-600 font-medium hover:text-blue-700 flex items-center justify-center gap-1">
                View full fee comparison <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
