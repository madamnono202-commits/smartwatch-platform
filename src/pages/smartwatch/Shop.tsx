import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, ChevronRight, Search, SlidersHorizontal, X, Grid3X3, LayoutList } from 'lucide-react';
import { watches, categories } from '../../data/smartwatch';

export default function Shop() {
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = watches
    .filter((w) => {
      if (search && !w.name.toLowerCase().includes(search.toLowerCase()) && !w.brand.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedBrand && w.brand !== selectedBrand) return false;
      if (w.price < priceRange[0] || w.price > priceRange[1]) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const uniqueBrands = [...new Set(watches.map((w) => w.brand))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb & Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <Link to="/smartwatch" className="hover:text-teal-600">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-700 font-medium">Shop All Watches</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Shop All Watches</h1>
              <p className="text-gray-500 mt-1">{filtered.length} watches available</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900">Filters</h2>
                <button onClick={() => { setSelectedBrand(null); setPriceRange([0, 1000]); setSearch(''); }} className="text-xs text-teal-600 hover:underline">
                  Clear All
                </button>
              </div>

              {/* Search */}
              <div className="relative mb-5">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search watches..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Brand Filter */}
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Brand</h3>
                <div className="space-y-1.5">
                  {uniqueBrands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        selectedBrand === brand
                          ? 'bg-teal-50 text-teal-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {brand}
                      <span className="float-right text-xs text-gray-400">
                        {watches.filter((w) => w.brand === brand).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Price Range</h3>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Min"
                  />
                  <span className="text-gray-400 flex items-center">—</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Max"
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  {[[0, 300], [300, 500], [500, 800], [0, 1000]].map(([min, max]) => (
                    <button
                      key={`${min}-${max}`}
                      onClick={() => setPriceRange([min, max])}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200"
                    >
                      ${min}-${max}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Category</h3>
                <div className="space-y-1.5">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/smartwatch/category/${cat.slug}`}
                      className="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <SlidersHorizontal size={16} /> Filters
              </button>

              <div className="flex items-center gap-3 ml-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>

                <div className="hidden sm:flex border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 ${viewMode === 'grid' ? 'bg-teal-50 text-teal-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <Grid3X3 size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 ${viewMode === 'list' ? 'bg-teal-50 text-teal-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <LayoutList size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedBrand || search) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedBrand && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-medium">
                    {selectedBrand}
                    <button onClick={() => setSelectedBrand(null)}><X size={12} /></button>
                  </span>
                )}
                {search && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-medium">
                    &ldquo;{search}&rdquo;
                    <button onClick={() => setSearch('')}><X size={12} /></button>
                  </span>
                )}
              </div>
            )}

            {/* Products */}
            <div className={viewMode === 'grid' ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-5' : 'space-y-4'}>
              {filtered.map((watch) => (
                <Link
                  key={watch.id}
                  to={`/smartwatch/product/${watch.slug}`}
                  className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <div className={`relative bg-gray-100 overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'}`}>
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
                      className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                    >
                      <Heart size={16} className="text-gray-600" />
                    </button>
                    <button
                      onClick={(e) => e.preventDefault()}
                      className="absolute bottom-3 left-3 right-3 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 hover:bg-teal-700 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={16} /> Add to Cart
                    </button>
                  </div>
                  <div className="p-4 flex-1">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{watch.brand}</p>
                    <h3 className="font-semibold text-gray-900 mt-1 text-sm group-hover:text-teal-600 transition-colors">{watch.name}</h3>
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

            {filtered.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <Search size={48} className="mx-auto mb-3 opacity-50" />
                <p className="font-medium text-lg">No watches found</p>
                <p className="text-sm">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
