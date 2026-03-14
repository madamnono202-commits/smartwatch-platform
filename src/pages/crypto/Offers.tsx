import { Link } from 'react-router-dom';
import { ChevronRight, ExternalLink, Clock, Gift, Star } from 'lucide-react';
import { exchanges } from '../../data/crypto';

export default function Offers() {
  const activeOffers = exchanges.filter((ex) => ex.bonusActive);
  const expiredOffers = exchanges.filter((ex) => !ex.bonusActive);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-amber-600 via-amber-500 to-orange-500 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-amber-200/60 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white">Offers & Bonuses</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <Gift size={36} className="text-white" />
            <h1 className="text-3xl lg:text-5xl font-bold text-white">Exclusive Exchange Offers</h1>
          </div>
          <p className="text-lg text-amber-100/80 max-w-2xl">
            Claim signup bonuses, referral rewards, and limited-time promotions from top crypto exchanges. Updated hourly.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Active Offers */}
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Active Offers</h2>
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">{activeOffers.length} Active</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {activeOffers.map((ex) => (
            <div
              key={ex.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{ex.logo}</span>
                    <div>
                      <h3 className="font-bold text-gray-900">{ex.name}</h3>
                      <div className="flex items-center gap-1 mt-0.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} size={10} className={j < Math.round(ex.score / 2) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">{ex.score}/10</span>
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Active
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Gift size={16} className="text-amber-600" />
                    <span className="font-bold text-amber-800 text-lg">{ex.bonus}</span>
                  </div>
                  <p className="text-sm text-amber-600 mt-1">Available for new account signups. Minimum deposit may apply.</p>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Clock size={14} /> Limited time</span>
                  <span>Spot Fee: {ex.spotMaker}%</span>
                  <span>{ex.coinsListed}+ coins</span>
                </div>

                <div className="flex gap-3">
                  <Link
                    to={`/exchange/${ex.slug}`}
                    className="flex-1 py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors text-center flex items-center justify-center gap-2"
                  >
                    Claim Offer <ExternalLink size={14} />
                  </Link>
                  <Link
                    to={`/exchange/${ex.slug}`}
                    className="px-5 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Review
                  </Link>
                </div>
                <p className="text-xs text-gray-400 mt-3 text-center">Affiliate link — we earn a commission at no cost to you. Terms apply.</p>
              </div>
            </div>
          ))}
        </div>

        {/* Expired / No Offers */}
        {expiredOffers.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-4">No Current Offers</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {expiredOffers.map((ex) => (
                <div key={ex.id} className="bg-white rounded-xl border border-gray-200 p-5 opacity-75">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{ex.logo}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{ex.name}</h3>
                      <p className="text-xs text-gray-400">{ex.score}/10 Score</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">No active promotions at this time.</p>
                  <Link to={`/exchange/${ex.slug}`} className="text-sm text-blue-600 hover:underline">
                    View Exchange →
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Newsletter CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Never Miss an Offer</h2>
          <p className="text-blue-200 mb-6">Get notified when new exchange bonuses become available.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
