import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowDownUp, RefreshCw } from 'lucide-react';
import { cryptoPrices } from '../../../data/crypto';

const fiatCurrencies = [
  { symbol: 'USD', name: 'US Dollar', rate: 1 },
  { symbol: 'EUR', name: 'Euro', rate: 0.92 },
  { symbol: 'GBP', name: 'British Pound', rate: 0.79 },
  { symbol: 'JPY', name: 'Japanese Yen', rate: 149.5 },
  { symbol: 'AUD', name: 'Australian Dollar', rate: 1.53 },
  { symbol: 'CAD', name: 'Canadian Dollar', rate: 1.36 },
];

const allCurrencies = [
  ...cryptoPrices.map((c) => ({ symbol: c.symbol, name: c.name, priceUsd: c.price, isCrypto: true })),
  ...fiatCurrencies.map((f) => ({ symbol: f.symbol, name: f.name, priceUsd: 1 / f.rate, isCrypto: false })),
];

export default function Converter() {
  const [fromAmount, setFromAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('BTC');
  const [toCurrency, setToCurrency] = useState('USD');

  const fromData = allCurrencies.find((c) => c.symbol === fromCurrency);
  const toData = allCurrencies.find((c) => c.symbol === toCurrency);

  const fromUsd = fromData ? fromAmount * fromData.priceUsd : 0;
  const toAmount = toData ? fromUsd / toData.priceUsd : 0;
  const rate = fromData && toData ? fromData.priceUsd / toData.priceUsd : 0;

  const swap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight size={14} />
            <span className="hover:text-blue-600 cursor-pointer">Tools</span>
            <ChevronRight size={14} />
            <span className="text-gray-700 font-medium">Converter</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
              <RefreshCw size={24} className="text-teal-600" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Crypto Converter</h1>
              <p className="text-gray-500">Convert between cryptocurrencies and fiat currencies in real time.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          {/* From */}
          <div className="space-y-2 mb-4">
            <label className="text-sm font-medium text-gray-700">From</label>
            <div className="flex gap-3">
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(Number(e.target.value))}
                className="flex-1 px-4 py-4 border border-gray-200 rounded-xl text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="px-4 py-4 border border-gray-200 rounded-xl font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 min-w-[120px]"
              >
                <optgroup label="Crypto">
                  {cryptoPrices.map((c) => (
                    <option key={c.symbol} value={c.symbol}>{c.symbol} - {c.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Fiat">
                  {fiatCurrencies.map((f) => (
                    <option key={f.symbol} value={f.symbol}>{f.symbol} - {f.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center my-4">
            <button
              onClick={swap}
              className="p-3 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors group"
            >
              <ArrowDownUp size={20} className="text-blue-600 group-hover:rotate-180 transition-transform duration-300" />
            </button>
          </div>

          {/* To */}
          <div className="space-y-2 mb-6">
            <label className="text-sm font-medium text-gray-700">To</label>
            <div className="flex gap-3">
              <div className="flex-1 px-4 py-4 border border-gray-200 rounded-xl bg-gray-50">
                <p className="text-2xl font-semibold text-gray-900">
                  {toAmount < 0.000001
                    ? toAmount.toExponential(4)
                    : toAmount < 1
                    ? toAmount.toFixed(6)
                    : toAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="px-4 py-4 border border-gray-200 rounded-xl font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 min-w-[120px]"
              >
                <optgroup label="Fiat">
                  {fiatCurrencies.map((f) => (
                    <option key={f.symbol} value={f.symbol}>{f.symbol} - {f.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Crypto">
                  {cryptoPrices.map((c) => (
                    <option key={c.symbol} value={c.symbol}>{c.symbol} - {c.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          {/* Rate */}
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500">
              1 {fromCurrency} = {rate < 1 ? rate.toFixed(6) : rate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {toCurrency}
            </p>
            <p className="text-xs text-gray-400 mt-1">Rates updated every 60 seconds from CoinGecko</p>
          </div>
        </div>

        {/* Quick Convert Table */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Quick Convert Table — {fromCurrency} to {toCurrency}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-2 font-semibold text-gray-500 text-xs uppercase">{fromCurrency}</th>
                  <th className="px-4 py-2 font-semibold text-gray-500 text-xs uppercase">{toCurrency}</th>
                </tr>
              </thead>
              <tbody>
                {[0.001, 0.01, 0.1, 0.5, 1, 5, 10].map((amt) => {
                  const converted = amt * rate;
                  return (
                    <tr key={amt} className="border-t border-gray-100">
                      <td className="px-4 py-2 font-medium text-gray-900">{amt} {fromCurrency}</td>
                      <td className="px-4 py-2 text-gray-700">
                        {converted < 1 ? converted.toFixed(6) : converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {toCurrency}
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
  );
}
