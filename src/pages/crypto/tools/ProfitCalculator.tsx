import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';

export default function ProfitCalculator() {
  const [buyPrice, setBuyPrice] = useState(60000);
  const [sellPrice, setSellPrice] = useState(70000);
  const [quantity, setQuantity] = useState(0.5);
  const [feePercent, setFeePercent] = useState(0.1);

  const investment = buyPrice * quantity;
  const sellValue = sellPrice * quantity;
  const buyFee = (investment * feePercent) / 100;
  const sellFee = (sellValue * feePercent) / 100;
  const totalFees = buyFee + sellFee;
  const grossProfit = sellValue - investment;
  const netProfit = grossProfit - totalFees;
  const roi = ((netProfit / investment) * 100);
  const isProfit = netProfit >= 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight size={14} />
            <span className="hover:text-blue-600 cursor-pointer">Tools</span>
            <ChevronRight size={14} />
            <span className="text-gray-700 font-medium">Profit Calculator</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp size={24} className="text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Crypto Profit Calculator</h1>
              <p className="text-gray-500">Calculate potential profit or loss from your crypto trades.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-4">Trade Details</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Buy Price (USD)</label>
                <input
                  type="number"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Sell Price (USD)</label>
                <input
                  type="number"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Quantity</label>
                <input
                  type="number"
                  step="0.001"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Trading Fee (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={feePercent}
                  onChange={(e) => setFeePercent(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-2 mt-2">
                  {[0.08, 0.1, 0.2, 0.4, 0.6].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFeePercent(f)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        feePercent === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {f}%
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className={`rounded-2xl p-8 text-center ${isProfit ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center justify-center gap-2 mb-2">
                {isProfit ? <TrendingUp size={28} className="text-green-600" /> : <TrendingDown size={28} className="text-red-600" />}
                <span className={`text-sm font-medium ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                  {isProfit ? 'Profit' : 'Loss'}
                </span>
              </div>
              <p className={`text-4xl font-bold mb-1 ${isProfit ? 'text-green-700' : 'text-red-700'}`}>
                {isProfit ? '+' : ''}${netProfit.toFixed(2)}
              </p>
              <p className={`text-sm font-medium ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                ROI: {roi.toFixed(2)}%
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Breakdown</h3>
              <div className="space-y-3">
                {[
                  { label: 'Investment', value: `$${investment.toFixed(2)}` },
                  { label: 'Sell Value', value: `$${sellValue.toFixed(2)}` },
                  { label: 'Gross Profit', value: `${grossProfit >= 0 ? '+' : ''}$${grossProfit.toFixed(2)}`, highlight: grossProfit >= 0 },
                  { label: 'Buy Fee', value: `-$${buyFee.toFixed(2)}` },
                  { label: 'Sell Fee', value: `-$${sellFee.toFixed(2)}` },
                  { label: 'Total Fees', value: `-$${totalFees.toFixed(2)}` },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-600">{row.label}</span>
                    <span className={`text-sm font-semibold ${row.label === 'Total Fees' ? 'text-red-600' : 'text-gray-900'}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-3 border-t-2 border-gray-200">
                  <span className="font-bold text-gray-900">Net Profit/Loss</span>
                  <span className={`text-lg font-bold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                    {isProfit ? '+' : ''}${netProfit.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
