import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { cryptoBlogPosts } from '../../data/crypto';

const allPosts = [
  ...cryptoBlogPosts,
  {
    id: 4,
    title: 'Understanding Crypto Exchange Security: What to Look For',
    excerpt: 'From cold storage to insurance funds, learn how to evaluate the security of any cryptocurrency exchange.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
    category: 'Security',
    date: 'Mar 6, 2026',
    readTime: '10 min',
  },
  {
    id: 5,
    title: 'DeFi vs CeFi: Which is Right for You in 2026?',
    excerpt: 'A comprehensive comparison of decentralized and centralized finance platforms for different trading needs.',
    image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop',
    category: 'DeFi',
    date: 'Mar 4, 2026',
    readTime: '11 min',
  },
  {
    id: 6,
    title: 'Best Crypto Staking Platforms: Earn Passive Income',
    excerpt: 'Compare staking yields across major exchanges and find the best APY rates for your crypto holdings.',
    image: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=600&h=400&fit=crop',
    category: 'Staking',
    date: 'Mar 2, 2026',
    readTime: '9 min',
  },
  {
    id: 7,
    title: 'NFT Marketplace Fees Compared: OpenSea vs Blur vs Magic Eden',
    excerpt: 'We break down the fee structures of the top NFT marketplaces so you know exactly what you\'re paying.',
    image: 'https://images.unsplash.com/photo-1646463910641-afb29d251dce?w=600&h=400&fit=crop',
    category: 'NFT',
    date: 'Feb 28, 2026',
    readTime: '7 min',
  },
  {
    id: 8,
    title: 'Crypto Tax Guide 2026: What You Need to Know',
    excerpt: 'Navigate the complex world of cryptocurrency taxation with our comprehensive guide for US traders.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop',
    category: 'Learn',
    date: 'Feb 25, 2026',
    readTime: '14 min',
  },
  {
    id: 9,
    title: 'Dollar-Cost Averaging Bitcoin: Historical Performance Analysis',
    excerpt: 'We ran the numbers on DCA strategies for Bitcoin over the past 5 years. The results may surprise you.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
    category: 'Market',
    date: 'Feb 22, 2026',
    readTime: '8 min',
  },
];

const categories = ['All', 'Exchanges', 'Comparison', 'Learn', 'Security', 'DeFi', 'Staking', 'NFT', 'Market'];

export default function BlogIndex() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = allPosts
    .filter((p) => selectedCat === 'All' || p.category === selectedCat)
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  const featured = allPosts[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-700 font-medium">Blog</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Crypto Insights Blog</h1>
              <p className="text-gray-500 mt-1">AI-generated research and analysis, updated daily.</p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
              <Sparkles size={12} /> AI-Written · Verified Data
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Featured Post */}
        <Link
          to="/blog/best-crypto-exchanges-2026"
          className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all mb-10 border border-gray-100"
        >
          <div className="grid lg:grid-cols-2">
            <div className="aspect-video lg:aspect-auto overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/800x500/e5e7eb/6b7280?text=Featured'; }}
              />
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mb-3 w-fit">
                Featured · {featured.category}
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
                {featured.title}
              </h2>
              <p className="text-gray-500 mb-4">{featured.excerpt}</p>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span>{featured.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {featured.readTime}</span>
              </div>
              <span className="mt-4 text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Read Article <ArrowRight size={16} />
              </span>
            </div>
          </div>
        </Link>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCat === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative sm:ml-auto">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 pl-9 pr-4 py-2 border border-gray-200 rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <Link
              key={post.id}
              to="/blog/best-crypto-exchanges-2026"
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/e5e7eb/6b7280?text=Blog'; }}
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-700 rounded">{post.category}</span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                  <span className="text-xs text-gray-400">· {post.readTime}</span>
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">{post.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
