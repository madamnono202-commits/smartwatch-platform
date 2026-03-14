import { Link } from 'react-router-dom';
import { ChevronRight, Shield, Sparkles, Users, Globe, Award, TrendingUp } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-blue-300/60 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white">About</span>
          </nav>
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">About CryptoCompare AI</h1>
          <p className="text-lg text-blue-200/70 max-w-2xl">
            We help millions of traders find the best cryptocurrency exchanges, tools, and resources — powered by artificial intelligence.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            CryptoCompare AI was founded with a simple mission: make cryptocurrency accessible to everyone. We believe that finding the right exchange shouldn&apos;t require hours of research. Our AI-powered platform analyzes real-time data from dozens of exchanges to give you unbiased, data-driven recommendations in seconds.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you&apos;re a first-time buyer looking for the easiest platform or an experienced trader seeking the lowest fees, we provide the tools and information you need to make smart decisions.
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: <Users size={24} />, stat: '2M+', label: 'Monthly Visitors' },
            { icon: <Globe size={24} />, stat: '50+', label: 'Exchanges Reviewed' },
            { icon: <TrendingUp size={24} />, stat: '98%', label: 'Data Accuracy' },
            { icon: <Award size={24} />, stat: '4.9/5', label: 'User Rating' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mx-auto mb-3">
                {item.icon}
              </div>
              <p className="text-2xl font-bold text-gray-900">{item.stat}</p>
              <p className="text-sm text-gray-500">{item.label}</p>
            </div>
          ))}
        </section>

        {/* How It Works */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How Our AI Works</h2>
          <div className="space-y-4">
            {[
              { icon: <Shield size={20} />, title: 'Data Collection', desc: 'We pull real-time data from exchange APIs every 60 seconds — fees, volumes, coin listings, and security metrics.' },
              { icon: <Sparkles size={20} />, title: 'AI Analysis', desc: 'Our machine learning models analyze 50+ factors per exchange to generate unbiased scores and personalized recommendations.' },
              { icon: <TrendingUp size={20} />, title: 'Your Results', desc: 'Get instant, tailored recommendations based on your trading style, experience level, and geographic location.' },
            ].map((step, i) => (
              <div key={i} className="flex gap-4 bg-white rounded-xl border border-gray-200 p-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                  {step.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Affiliate Disclosure */}
        <section className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 className="font-bold text-gray-900 mb-2">Affiliate Disclosure</h2>
          <p className="text-sm text-gray-600">
            CryptoCompare AI may earn a commission when you sign up for an exchange through our links. This does not affect our reviews or rankings — our AI scoring is completely independent. We only recommend exchanges we have thoroughly vetted. See our full <Link to="/privacy" className="text-blue-600 hover:underline">privacy policy</Link> and <Link to="/terms" className="text-blue-600 hover:underline">terms of service</Link> for details.
          </p>
        </section>
      </div>
    </div>
  );
}
