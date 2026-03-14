import { Link, useParams } from 'react-router-dom';
import { Star, Heart, ShoppingCart, ChevronRight } from 'lucide-react';
import { watches, categories } from '../../data/smartwatch';

export default function Category() {
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug);
  const categoryWatches = watches.filter((w) => w.category === slug);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Category Not Found</h1>
          <Link to="/smartwatch/shop" className="text-teal-600 hover:underline">Browse All Watches</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-64 lg:h-80 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/1920x400/1a1a2e/ffffff?text=${category.name}`; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-3">
              <Link to="/smartwatch" className="hover:text-white">Home</Link>
              <ChevronRight size={14} />
              <Link to="/smartwatch/shop" className="hover:text-white">Shop</Link>
              <ChevronRight size={14} />
              <span className="text-white">{category.name}</span>
            </nav>
            <h1 className="text-3xl lg:text-4xl font-bold text-white">{category.name}</h1>
            <p className="text-white/70 mt-1">{categoryWatches.length} watches</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {categoryWatches.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryWatches.map((watch) => (
              <Link
                key={watch.id}
                to={`/smartwatch/product/${watch.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={watch.image}
                    alt={watch.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/400x400/e5e7eb/6b7280?text=${watch.brand}`; }}
                  />
                  {watch.badge && (
                    <span className="absolute top-3 left-3 px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-md">
                      {watch.badge}
                    </span>
                  )}
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart size={16} className="text-gray-600" />
                  </button>
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="absolute bottom-3 left-3 right-3 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={16} /> Add to Cart
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{watch.brand}</p>
                  <h3 className="font-semibold text-gray-900 mt-1">{watch.name}</h3>
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p className="font-medium text-lg">No watches in this category yet.</p>
            <Link to="/smartwatch/shop" className="text-teal-600 hover:underline mt-2 inline-block">Browse All Watches</Link>
          </div>
        )}

        {/* Other Categories */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Other Categories</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.filter((c) => c.slug !== slug).map((cat) => (
              <Link
                key={cat.slug}
                to={`/smartwatch/category/${cat.slug}`}
                className="group relative rounded-xl overflow-hidden aspect-[4/3]"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/600x400/1a1a2e/ffffff?text=${cat.name}`; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white font-bold">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
