import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, DollarSign } from 'lucide-react';

const historicalBTCPrices = [
  { month: 'Apr 2025', price: 58000 }, { month: 'May 2025', price: 62000 }, { month: 'Jun 2025', price: 59000 },
  { month: 'Jul 2025', price: 64000 }, { month: 'Aug 2025', price: 61000 }, { month: 'Sep 2025', price: 66000 },
  { month: 'Oct 2025', price: 63000 }, { month: 'Nov 2025', price: 68000 }, { month: 'Dec 2025', price: 65000 },
  { month: 'Jan 2026', price: 67000 }, { month: 'Feb 2026', price: 64000 }, { month: 'Mar 2026', price: 67432 },
];

export default function DCACalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState(500);
  const [months, setMonths] = useState(12);
  const [coin, setCoin] = useState('BTC');

  const totalInvested = monthlyAmount * months;
  const priceData = historicalBTCPrices.slice(-months);

  let totalCoins = 0;
  const purchases = priceData.map((p) => {
    const coins = monthlyAmount / p.price;
    totalCoins += coins;
    return { ...p, coins, totalCoins, totalSpent: monthlyAmount * (priceData.indexOf(p) + 1) };
  });

  const currentPrice = 67432;
  const currentValue = totalCoins * currentPrice;
  const profit = currentValue - totalInvested;
  const roi = ((profit / totalInvested) * 100);
  const avgPrice = totalInvested / totalCoins;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight size={14} />
            <span className="hover:text-blue-600 cursor-pointer">Tools</span>
            <ChevronRight size={14} />
            <span className="text-gray-700 font-medium">DCA Calculator</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <DollarSign size={24} className="text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">DCA Calculator</h1>
              <p className="text-gray-500">Backtest dollar-cost averaging strategies with historical data.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Inputs */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 h-fit lg:sticky lg:top-24">
            <h2 className="font-bold text-gray-900 mb-4">DCA Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Monthly Investment</label>
                <input
                  type="number"
                  value={monthlyAmount}
                  onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-2 mt-2">
                  {[100, 250, 500, 1000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setMonthlyAmount(amt)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        monthlyAmount === amt ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Period (months)</label>
                <select
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[3, 6, 9, 12].map((m) => (
                    <option key={m} value={m}>{m} months</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Cryptocurrency</label>
                <select
                  value={coin}
                  onChange={(e) => setCoin(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="BTC">Bitcoin (BTC)</option>
                  <option value="ETH">Ethereum (ETH)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">Total Invested</p>
                <p className="text-xl font-bold text-gray-900">${totalInvested.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">Current Value</p>
                <p className="text-xl font-bold text-green-600">${currentValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              </div>
              <div className={`rounded-xl border p-4 text-center ${profit >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <p className="text-xs text-gray-400 mb-1">Profit/Loss</p>
                <p className={`text-xl font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {profit >= 0 ? '+' : ''}${profit.toFixed(0)}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">ROI</p>
                <p className={`text-xl font-bold ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>{roi.toFixed(1)}%</p>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-2">DCA Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Average Buy Price</span>
                  <span className="font-semibold text-gray-900">${avgPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Total {coin} Accumulated</span>
                  <span className="font-semibold text-gray-900">{totalCoins.toFixed(6)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Current {coin} Price</span>
                  <span className="font-semibold text-gray-900">${currentPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Purchases Made</span>
                  <span className="font-semibold text-gray-900">{purchases.length}</span>
                </div>
              </div>

              <h4 className="font-semibold text-gray-900 mb-3">Purchase History</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-3 py-2 font-semibold text-gray-500 text-xs uppercase">Date</th>
                      <th className="px-3 py-2 font-semibold text-gray-500 text-xs uppercase">Price</th>
                      <th className="px-3 py-2 font-semibold text-gray-500 text-xs uppercase">{coin} Bought</th>
                      <th className="px-3 py-2 font-semibold text-gray-500 text-xs uppercase">Total {coin}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchases.map((p, i) => (
                      <tr key={i} className="border-t border-gray-100">
                        <td className="px-3 py-2 text-gray-700">{p.month}</td>
                        <td className="px-3 py-2 text-gray-700">${p.price.toLocaleString()}</td>
                        <td className="px-3 py-2 text-gray-700">{p.coins.toFixed(6)}</td>
                        <td className="px-3 py-2 font-medium text-gray-900">{p.totalCoins.toFixed(6)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
