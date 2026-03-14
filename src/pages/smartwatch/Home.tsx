import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight, Heart, ShoppingCart, Shield, Truck, RotateCcw, Award, Sparkles, ArrowRight, Camera } from 'lucide-react';
import { watches, categories, blogPosts, brands } from '../../data/smartwatch';

function HeroSection() {
  return (
    <section className="relative min-h-screen lg:min-h-[680px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1920&h=1080&fit=crop"
          alt="Smartwatch lifestyle"
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/1920x1080/1a1a2e/ffffff?text=SmartWatch'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0 w-full">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 border border-teal-400/30 rounded-full text-teal-300 text-sm font-medium mb-6 backdrop-blur-sm">
            <Sparkles size={14} />
            AI-Curated Selection · Updated Weekly
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Your Perfect<br />
            <span className="text-teal-400">Smartwatch</span> Awaits
          </h1>
          <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-lg">
            Discover watches matched to your lifestyle by AI. 300+ models. Free returns. Expert reviews on every watch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link
              to="/smartwatch/quiz"
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold rounded-xl text-lg transition-all hover:shadow-lg hover:shadow-amber-500/25 text-center"
            >
              Find My Watch — AI Quiz
            </Link>
            <Link
              to="/smartwatch"
              className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl text-lg hover:bg-white/10 transition-all text-center"
            >
              Shop All Watches
            </Link>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              4.9 from 12,400 reviews
            </span>
            <span className="flex items-center gap-2">
              <RotateCcw size={14} />
              Free 30-Day Returns
            </span>
            <span className="flex items-center gap-2">
              <Shield size={14} />
              2-Year Warranty
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuizTeaser() {
  return (
    <section className="bg-gray-50 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">Not sure where to start?</h2>
            <p className="text-gray-500">Answer 3 quick questions and AI finds your perfect match.</p>
          </div>
          <div className="flex gap-4 justify-center">
            {['🏃 Fitness', '💼 Work', '🏔️ Outdoor'].map((q, i) => (
              <div
                key={i}
                className="w-28 h-36 bg-white rounded-xl shadow-lg flex items-center justify-center text-center p-3 text-sm font-medium text-gray-700 hover:shadow-xl transition-shadow hover:-translate-y-1 transform transition-transform cursor-pointer"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                {q}
              </div>
            ))}
          </div>
          <div className="text-center lg:text-right">
            <Link
              to="/smartwatch/quiz"
              className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white font-bold rounded-xl text-lg hover:bg-teal-700 transition-all hover:shadow-lg"
            >
              Start AI Quiz <ArrowRight size={20} />
            </Link>
            <p className="text-sm text-gray-400 mt-2">Takes 60 seconds</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryGrid() {
  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Shop by Category</h2>
          <a href="#" className="text-teal-600 font-medium hover:text-teal-700 transition-colors flex items-center gap-1">
            See All <ArrowRight size={16} />
          </a>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to="/smartwatch"
              className="group relative rounded-2xl overflow-hidden aspect-[4/3]"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/600x400/1a1a2e/ffffff?text=${cat.name}`; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-4 left-4 text-white font-bold text-lg">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function AITopPicks() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    el?.addEventListener('scroll', checkScroll);
    return () => el?.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">AI's Top Picks This Week</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
              <Sparkles size={12} /> Updated weekly
            </span>
            <button
              onClick={() => scroll('left')}
              className={`p-2 rounded-full border ${canScrollLeft ? 'border-gray-300 hover:bg-gray-100 text-gray-700' : 'border-gray-200 text-gray-300'}`}
              disabled={!canScrollLeft}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className={`p-2 rounded-full border ${canScrollRight ? 'border-gray-300 hover:bg-gray-100 text-gray-700' : 'border-gray-200 text-gray-300'}`}
              disabled={!canScrollRight}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {watches.map((watch) => (
            <Link
              key={watch.id}
              to={`/smartwatch/product/${watch.slug}`}
              className="group flex-shrink-0 w-64 sm:w-72 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 snap-start"
            >
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                <img
                  src={watch.image}
                  alt={watch.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/600x600/e5e7eb/6b7280?text=${watch.brand}`; }}
                />
                {watch.badge && (
                  <span className="absolute top-3 left-3 px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-md">
                    {watch.badge}
                  </span>
                )}
                <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                  <Heart size={16} className="text-gray-600" />
                </button>
                <button className="absolute bottom-3 right-3 left-3 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 hover:bg-teal-700 flex items-center justify-center gap-2">
                  <ShoppingCart size={16} /> Add to Cart
                </button>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{watch.brand}</p>
                <h3 className="font-semibold text-gray-900 mt-1 text-sm">{watch.name}</h3>
                <div className="flex items-center gap-1 mt-1.5">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} className={i < Math.floor(watch.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">({watch.reviews.toLocaleString()})</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {watch.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">${watch.originalPrice}</span>
                  )}
                  <span className={`text-lg font-bold ${watch.originalPrice ? 'text-red-600' : 'text-gray-900'}`}>
                    ${watch.price}
                  </span>
                  {watch.originalPrice && (
                    <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-medium">
                      Save ${watch.originalPrice - watch.price}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function VirtualTryOnCTA() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=800&h=600&fit=crop"
              alt="Person using virtual try-on"
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/800x600/1a1a2e/ffffff?text=Virtual+Try-On'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 to-transparent" />
          </div>
          <div>
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Exclusive Feature</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-3 mb-4">
              See It On Your Wrist Before You Buy
            </h2>
            <p className="text-lg text-gray-500 mb-6">
              Upload a photo or use your camera. Our AI maps your wrist and shows you any watch in our catalog — in real time.
            </p>
            <div className="flex items-center gap-6 mb-8">
              {['Choose Watch', 'Snap or Upload', 'See the Result'].map((step, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="text-gray-600 font-medium">{step}</span>
                  {i < 2 && <ArrowRight size={14} className="text-gray-300 ml-2" />}
                </div>
              ))}
            </div>
            <Link
              to="/smartwatch/virtual-try-on"
              className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white font-bold rounded-xl text-lg hover:bg-teal-700 transition-all hover:shadow-lg"
            >
              <Camera size={20} /> Try Virtual Try-On — Free
            </Link>
            <p className="text-sm text-gray-400 mt-3">47,000 try-ons this month</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustSignals() {
  const signals = [
    { icon: <Shield size={20} />, label: 'Secure Checkout' },
    { icon: <Truck size={20} />, label: 'Free Shipping $75+' },
    { icon: <RotateCcw size={20} />, label: '30-Day Returns' },
    { icon: <Award size={20} />, label: '2-Year Warranty' },
    { icon: <Star size={20} className="fill-current" />, label: '4.9/5 Rating' },
  ];

  return (
    <section className="py-12 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-6 lg:gap-12 mb-10">
          {signals.map((s, i) => (
            <div key={i} className="flex items-center gap-2 text-gray-600">
              <span className="text-teal-600">{s.icon}</span>
              <span className="text-sm font-medium">{s.label}</span>
            </div>
          ))}
        </div>
        <div>
          <p className="text-center text-sm text-gray-400 mb-4 font-medium uppercase tracking-wider">Brands We Carry</p>
          <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
            {brands.map((brand) => (
              <span
                key={brand}
                className="text-gray-400 hover:text-gray-700 transition-colors font-semibold text-sm cursor-pointer"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogGuides() {
  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Expert Watch Guides & Reviews</h2>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-medium">
              <Sparkles size={12} /> AI-Written · Updated Weekly
            </span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article key={post.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
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
                <span className="inline-flex items-center gap-1 text-teal-600 text-sm font-medium mt-3 group-hover:gap-2 transition-all">
                  Read More <ArrowRight size={14} />
                </span>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-teal-600 hover:text-teal-600 transition-all">
            Browse All Guides
          </button>
        </div>
      </div>
    </section>
  );
}

export default function SmartWatchHome() {
  return (
    <div>
      <HeroSection />
      <QuizTeaser />
      <CategoryGrid />
      <AITopPicks />
      <VirtualTryOnCTA />
      <TrustSignals />
      <BlogGuides />
    </div>
  );
}
