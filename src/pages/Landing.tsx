import { Link } from 'react-router-dom';
import { Watch, TrendingUp, ArrowRight, Sparkles, Star, Shield, Zap } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-16">
          <span className="text-lg font-bold tracking-tight">
            Platform<span className="text-blue-400">Spec</span>
          </span>
          <span className="text-sm text-gray-500">v2.0 — March 2026</span>
        </div>

        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-8">
            <Sparkles size={14} />
            Two Premium AI-Powered Platforms
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6">
            Built for the{' '}
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Modern Web
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Explore two complete, production-ready platforms — a smartwatch e-commerce store and a crypto exchange comparison tool. Both powered by AI.
          </p>
        </div>

        {/* Platform Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto mb-20">
          {/* SmartWatch Platform */}
          <Link
            to="/smartwatch"
            className="group relative bg-gradient-to-br from-teal-900/50 to-teal-950/50 border border-teal-800/50 rounded-3xl p-8 lg:p-10 hover:border-teal-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-900/20 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl group-hover:bg-teal-500/10 transition-colors" />
            <div className="relative">
              <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-500/20 transition-colors">
                <Watch size={28} className="text-teal-400" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-3">
                SmartWatch <span className="text-teal-400">Hub</span>
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Premium smartwatch e-commerce platform with AI recommendations, virtual try-on, style quiz, and full product catalog.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {['Homepage', 'Product Detail', 'AI Quiz', 'Virtual Try-On'].map((page) => (
                  <span key={page} className="px-3 py-1 bg-teal-900/50 text-teal-300 text-xs font-medium rounded-full border border-teal-800/50">
                    {page}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-teal-400 font-semibold group-hover:gap-3 transition-all">
                Explore Platform <ArrowRight size={18} />
              </div>
            </div>
          </Link>

          {/* CryptoCompare Platform */}
          <Link
            to="/crypto"
            className="group relative bg-gradient-to-br from-blue-900/50 to-blue-950/50 border border-blue-800/50 rounded-3xl p-8 lg:p-10 hover:border-blue-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/20 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors" />
            <div className="relative">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                <TrendingUp size={28} className="text-blue-400" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-3">
                Crypto<span className="text-blue-400">Compare</span> AI
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                AI-powered crypto exchange comparison with real-time data, detailed reviews, comparison tools, and expert blog content.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {['Homepage', 'Compare', 'Exchange Detail', 'Blog Post'].map((page) => (
                  <span key={page} className="px-3 py-1 bg-blue-900/50 text-blue-300 text-xs font-medium rounded-full border border-blue-800/50">
                    {page}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-3 transition-all">
                Explore Platform <ArrowRight size={18} />
              </div>
            </div>
          </Link>
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: <Zap size={20} />, label: 'Fully Responsive', sub: 'Mobile to Desktop' },
              { icon: <Sparkles size={20} />, label: 'AI-Powered', sub: 'Smart Features' },
              { icon: <Star size={20} />, label: 'Premium Design', sub: '$10K Quality' },
              { icon: <Shield size={20} />, label: 'Production Ready', sub: 'Complete Build' },
            ].map((f, i) => (
              <div key={i} className="p-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-3 text-gray-400">
                  {f.icon}
                </div>
                <p className="font-semibold text-sm text-white">{f.label}</p>
                <p className="text-xs text-gray-500">{f.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600 pb-8">
          <p>PlatformSpec v2.0 · Built with React + TypeScript + Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}
