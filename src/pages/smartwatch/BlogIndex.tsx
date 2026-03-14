import { Link } from 'react-router-dom';
import { ChevronRight, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { blogPosts } from '../../data/smartwatch';

const allPosts = [
  ...blogPosts,
  {
    id: 4,
    title: 'How to Choose the Right Smartwatch Band',
    excerpt: 'Silicone, leather, or metal? We break down the best band options for every activity and style.',
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&h=400&fit=crop',
    category: 'Guide',
    date: 'Mar 6, 2026',
  },
  {
    id: 5,
    title: 'Smartwatch Health Features That Actually Work',
    excerpt: 'Which health sensors are accurate and which are gimmicks? We tested ECG, SpO2, and more.',
    image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=600&h=400&fit=crop',
    category: 'Health',
    date: 'Mar 3, 2026',
  },
  {
    id: 6,
    title: 'Best Budget Smartwatches Under $300 in 2026',
    excerpt: 'Great smartwatches don\'t have to break the bank. Here are our top affordable picks.',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&h=400&fit=crop',
    category: 'Budget',
    date: 'Feb 28, 2026',
  },
];

export default function SmartWatchBlogIndex() {
  const featured = allPosts[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <Link to="/smartwatch" className="hover:text-teal-600">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-700 font-medium">Blog</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Watch Guides & Reviews</h1>
              <p className="text-gray-500 mt-1">Expert reviews, buying guides, and smartwatch news.</p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-medium">
              <Sparkles size={12} /> AI-Written · Updated Weekly
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Featured Post */}
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all mb-10 border border-gray-100 cursor-pointer">
          <div className="grid lg:grid-cols-2">
            <div className="aspect-video lg:aspect-auto overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/800x500/e5e7eb/6b7280?text=Blog'; }}
              />
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 text-xs font-medium rounded-full mb-3 w-fit">
                Featured · {featured.category}
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors mb-3">
                {featured.title}
              </h2>
              <p className="text-gray-500 mb-4">{featured.excerpt}</p>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span>{featured.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Clock size={14} /> 8 min read</span>
              </div>
              <span className="mt-4 text-teal-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Read Article <ArrowRight size={16} />
              </span>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPosts.slice(1).map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 cursor-pointer"
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
                  <span className="text-xs font-medium px-2 py-1 bg-teal-50 text-teal-700 rounded">{post.category}</span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-teal-600 transition-colors mb-2">{post.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
