import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ExternalLink, ChevronRight, Check, X as XIcon, Shield, Sparkles, Clock, Smartphone, Globe, Users } from 'lucide-react';
import { exchanges } from '../../data/crypto';

export default function ExchangeDetail() {
  const { slug } = useParams();
  const exchange = exchanges.find((e) => e.slug === slug) || exchanges[0];
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'fees', label: 'Fees' },
    { id: 'security', label: 'Security' },
    { id: 'proscons', label: 'Pros & Cons' },
    { id: 'reviews', label: 'User Reviews' },
    { id: 'faq', label: 'FAQ' },
  ];

  const similarExchanges = exchanges.filter((e) => e.id !== exchange.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Exchange Header */}
      <div className="relative" style={{ background: `linear-gradient(135deg, ${exchange.brandColor}15, ${exchange.brandColor}05)` }}>
        <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <ChevronRight size={14} />
              <Link to="/" className="hover:text-blue-600">Exchanges</Link>
              <ChevronRight size={14} />
              <span className="text-gray-700 font-medium">{exchange.name}</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-5xl">{exchange.logo}</span>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{exchange.name}</h1>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                      #{exchanges.indexOf(exchange) + 1} Rated
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-500">Founded {exchange.founded}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-sm text-gray-500">{exchange.hq}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{exchange.score}</div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={14} className={j < Math.round(exchange.score / 2) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">out of 10</span>
                </div>
                <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2">
                  Open Account <ExternalLink size={16} />
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 mt-6">
              {[
                { icon: <Users size={16} />, label: 'Users', value: exchange.users },
                { icon: <Clock size={16} />, label: 'Founded', value: exchange.founded.toString() },
                { icon: <Globe size={16} />, label: '24h Volume', value: exchange.volume24h },
                { icon: <Shield size={16} />, label: 'Coins', value: `${exchange.coinsListed}+` },
                { icon: <Smartphone size={16} />, label: 'Mobile App', value: exchange.mobileApp ? 'iOS & Android' : 'No' },
                { icon: <Star size={16} />, label: 'App Rating', value: `${exchange.appRating}/5` },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-200 text-sm">
                  <span className="text-gray-400">{stat.icon}</span>
                  <span className="text-gray-500">{stat.label}:</span>
                  <span className="font-semibold text-gray-900">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bonus Banner */}
      {exchange.bonusActive && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <p className="font-bold text-amber-800">🎁 Current Offer: {exchange.bonus}</p>
              <p className="text-sm text-amber-600 mt-0.5">Limited time offer for new accounts. Terms apply.</p>
            </div>
            <button className="px-5 py-2.5 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-1 whitespace-nowrap">
              Claim This Offer <ExternalLink size={14} />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 overflow-x-auto">
                <nav className="flex">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-5 py-3.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="prose prose-gray max-w-none">
                    <div className="flex items-center gap-2 mb-4 text-xs text-gray-400">
                      <Sparkles size={12} className="text-blue-500" />
                      AI-generated review · Last updated March 2026
                    </div>
                    {exchange.description.split('\n\n').map((p, i) => (
                      <p key={i} className="text-gray-600 leading-relaxed mb-4">{p}</p>
                    ))}
                    <h3 className="text-lg font-bold text-gray-900 mt-8 mb-3">Key Features</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        { label: 'Spot Trading', available: true },
                        { label: 'Futures Trading', available: exchange.futuresMaker > 0 },
                        { label: 'Staking', available: exchange.staking },
                        { label: 'NFT Marketplace', available: exchange.nft },
                        { label: 'API Access', available: exchange.apiAccess },
                        { label: 'Mobile App', available: exchange.mobileApp },
                      ].map((f) => (
                        <div key={f.label} className="flex items-center gap-2 text-sm">
                          {f.available ? (
                            <Check size={16} className="text-green-500" />
                          ) : (
                            <XIcon size={16} className="text-gray-300" />
                          )}
                          <span className={f.available ? 'text-gray-700' : 'text-gray-400'}>{f.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'fees' && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Trading Fee Schedule</h3>
                    <div className="rounded-xl overflow-hidden border border-gray-200">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Fee Type</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Maker</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Taker</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t border-gray-100">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">Spot Trading</td>
                            <td className="px-4 py-3 text-sm text-green-600 font-semibold">{exchange.spotMaker}%</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{exchange.spotTaker}%</td>
                          </tr>
                          {exchange.futuresMaker > 0 && (
                            <tr className="border-t border-gray-100">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">Futures Trading</td>
                              <td className="px-4 py-3 text-sm text-green-600 font-semibold">{exchange.futuresMaker}%</td>
                              <td className="px-4 py-3 text-sm text-gray-700">{exchange.futuresTaker}%</td>
                            </tr>
                          )}
                          <tr className="border-t border-gray-100">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">Withdrawal</td>
                            <td colSpan={2} className="px-4 py-3 text-sm text-gray-700">{exchange.withdrawalFee}</td>
                          </tr>
                          <tr className="border-t border-gray-100">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">Deposit</td>
                            <td colSpan={2} className="px-4 py-3 text-sm text-green-600 font-medium">Free (crypto)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {exchange.vipTiers && exchange.vipTiers.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-semibold text-gray-900 mb-3">VIP Fee Tiers</h4>
                        <div className="rounded-xl overflow-hidden border border-gray-200">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">Level</th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">30d Volume</th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">Maker</th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">Taker</th>
                              </tr>
                            </thead>
                            <tbody>
                              {exchange.vipTiers.map((tier, i) => (
                                <tr key={i} className="border-t border-gray-100">
                                  <td className="px-4 py-2 text-sm font-medium text-gray-900">{tier.level}</td>
                                  <td className="px-4 py-2 text-sm text-gray-600">{tier.volume}</td>
                                  <td className="px-4 py-2 text-sm text-gray-700">{tier.maker}%</td>
                                  <td className="px-4 py-2 text-sm text-gray-700">{tier.taker}%</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'security' && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Security & Compliance</h3>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield size={20} className="text-green-600" />
                        <span className="font-semibold text-green-800">Security Assessment</span>
                      </div>
                      <p className="text-sm text-green-700">{exchange.security}</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { label: '2FA Authentication', status: true },
                        { label: 'Cold Storage', status: true },
                        { label: 'Insurance Fund', status: true },
                        { label: 'Bug Bounty Program', status: true },
                        { label: 'Regular Audits', status: true },
                        { label: 'Proof of Reserves', status: exchange.id === 'kraken' || exchange.id === 'okx' },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                          {item.status ? <Check size={16} className="text-green-500" /> : <XIcon size={16} className="text-gray-300" />}
                          <span className="text-sm text-gray-700">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'proscons' && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
                        <Check size={20} className="text-green-500" /> Pros
                      </h3>
                      <ul className="space-y-3">
                        {exchange.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <Check size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">
                        <XIcon size={20} className="text-red-500" /> Cons
                      </h3>
                      <ul className="space-y-3">
                        {exchange.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <XIcon size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-gray-900">{exchange.appRating}</div>
                          <div className="flex mt-1">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <Star key={j} size={14} className={j < Math.round(exchange.appRating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} />
                            ))}
                          </div>
                          <p className="text-xs text-gray-400 mt-1">Aggregate Rating</p>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap gap-2">
                            {['Easy to use', 'Fast withdrawals', 'Good support', 'Low fees', 'Reliable'].map((tag) => (
                              <span key={tag} className="px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-600">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    {[
                      { name: 'CryptoTrader2026', rating: 5, text: `${exchange.name} has been my go-to exchange for over 2 years. Fees are competitive and the platform is reliable.`, date: 'Mar 2026' },
                      { name: 'BlockchainBeginner', rating: 4, text: `Great for getting started with crypto. The interface is clean but could use more educational resources.`, date: 'Feb 2026' },
                      { name: 'DeFiMaxi', rating: 4, text: `Solid exchange with good liquidity. Wish they had more DeFi integration but overall very satisfied.`, date: 'Feb 2026' },
                    ].map((review, i) => (
                      <div key={i} className={`py-4 ${i > 0 ? 'border-t border-gray-100' : ''}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <Star key={j} size={12} className={j < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
                            ))}
                          </div>
                          <span className="text-sm font-medium text-gray-900">{review.name}</span>
                          <span className="text-xs text-gray-400">· {review.date}</span>
                        </div>
                        <p className="text-sm text-gray-600">{review.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'faq' && (
                  <div className="space-y-3">
                    {(exchange.faqs.length > 0 ? exchange.faqs : [
                      { q: `Is ${exchange.name} safe?`, a: `${exchange.name} employs industry-standard security measures including 2FA, cold storage, and regular security audits to protect user funds.` },
                      { q: `What are ${exchange.name}'s fees?`, a: `${exchange.name} charges ${exchange.spotMaker}% maker and ${exchange.spotTaker}% taker fees for spot trading. Volume-based discounts are available.` },
                      { q: `Does ${exchange.name} require KYC?`, a: `${exchange.kycRequired ? 'Yes, KYC verification is required to trade on ' + exchange.name + '.' : 'Basic trading is available without KYC on ' + exchange.name + '. KYC unlocks higher limits.'}` },
                    ]).map((faq, i) => (
                      <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden" open={i === 0}>
                        <summary className="px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-900 flex items-center justify-between">
                          {faq.q}
                          <ChevronRight size={16} className="text-gray-400 group-open:rotate-90 transition-transform" />
                        </summary>
                        <div className="px-5 pb-4 text-sm text-gray-600">{faq.a}</div>
                      </details>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Rating Breakdown */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 lg:sticky lg:top-24">
              <h3 className="font-bold text-gray-900 mb-4">Rating Breakdown</h3>
              {[
                { label: 'Fees', score: exchange.spotMaker <= 0.1 ? 9.2 : 7.5 },
                { label: 'Security', score: 8.8 },
                { label: 'User Experience', score: 8.5 },
                { label: 'Customer Support', score: 7.2 },
                { label: 'Coin Selection', score: exchange.coinsListed > 300 ? 9.5 : 8.0 },
              ].map((item) => (
                <div key={item.label} className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-medium text-gray-900">{item.score}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{ width: `${(item.score / 10) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Similar Exchanges */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900 mb-4">Similar Exchanges</h3>
              <div className="space-y-3">
                {similarExchanges.map((ex) => (
                  <Link
                    key={ex.id}
                    to={`/exchange/${ex.slug}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-2xl">{ex.logo}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{ex.name}</p>
                      <div className="flex items-center gap-1">
                        <Star size={10} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs text-gray-500">{ex.score}/10</span>
                      </div>
                    </div>
                    <span className="text-xs text-blue-600 font-medium">Compare</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-blue-600 rounded-xl p-5 text-center">
              <h3 className="font-bold text-white mb-2">Ready to Start Trading?</h3>
              <p className="text-blue-200 text-sm mb-4">Open a {exchange.name} account in minutes.</p>
              <button className="w-full py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                Open Account <ExternalLink size={14} />
              </button>
              {exchange.bonusActive && (
                <p className="text-xs text-blue-200 mt-2">{exchange.bonus}</p>
              )}
            </div>

            {/* Data Source */}
            <div className="text-center text-xs text-gray-400">
              <Clock size={12} className="inline mr-1" />
              Last data sync: 5 minutes ago
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
