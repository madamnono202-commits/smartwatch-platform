import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, ChevronRight, Check, X as XIcon, Shield, Truck, RotateCcw, Sparkles, Camera, Plus, Minus, Share2 } from 'lucide-react';
import { watches } from '../../data/smartwatch';

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} className={i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
      ))}
    </div>
  );
}

const relatedAccessories = [
  { name: 'Sport Band — Midnight', price: 49, image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=200&h=200&fit=crop' },
  { name: 'Magnetic Charger USB-C', price: 29, image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=200&h=200&fit=crop' },
];

const userReviews = [
  { name: 'Michael R.', rating: 5, date: 'Feb 28, 2026', title: 'Best watch I\'ve ever owned', text: 'The Ultra 2 has completely changed my outdoor adventures. GPS is incredibly accurate and battery lasts an entire weekend of hiking.', verified: true, helpful: 42 },
  { name: 'Sarah K.', rating: 5, date: 'Feb 15, 2026', title: 'Worth every penny', text: 'Upgraded from Series 8 and the difference is night and day. The Action Button alone is worth the upgrade for quick workout starts.', verified: true, helpful: 31 },
  { name: 'David L.', rating: 4, date: 'Feb 5, 2026', title: 'Almost perfect', text: 'Fantastic watch for running and swimming. Only downside is the size — it can be a bit bulky for dress occasions. Performance is unmatched though.', verified: true, helpful: 18 },
  { name: 'Emma T.', rating: 5, date: 'Jan 22, 2026', title: 'Diving companion', text: 'Used the depth gauge on multiple dives now. Accuracy is spot on. The Oceanic+ app integration makes this a legitimate dive computer.', verified: false, helpful: 27 },
];

export default function ProductDetail() {
  const { slug } = useParams();
  const watch = watches.find((w) => w.slug === slug) || watches[0];
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedBand, setSelectedBand] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [wishlisted, setWishlisted] = useState(false);

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: `Reviews (${watch.reviews})` },
    { id: 'faq', label: 'FAQ' },
  ];

  const specGroups = watch.specs ? [
    { group: 'Display', items: [{ label: 'Display', value: watch.specs.display }] },
    { group: 'Performance', items: [
      { label: 'Processor', value: watch.specs.processor || 'N/A' },
      { label: 'Storage', value: watch.specs.storage || 'N/A' },
    ]},
    { group: 'Battery', items: [{ label: 'Battery Life', value: watch.specs.battery }] },
    { group: 'Connectivity', items: [
      { label: 'GPS', value: watch.specs.gps },
      { label: 'Connectivity', value: watch.specs.connectivity || 'N/A' },
    ]},
    { group: 'Sensors', items: [{ label: 'Sensors', value: watch.specs.sensors || 'N/A' }] },
    { group: 'Physical', items: [
      { label: 'Water Resistance', value: watch.specs.waterResistance },
      { label: 'Weight', value: watch.specs.weight || 'N/A' },
      { label: 'Dimensions', value: watch.specs.dimensions || 'N/A' },
    ]},
    { group: 'Software', items: [{ label: 'Operating System', value: watch.specs.os }] },
  ] : [];

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-400">
          <Link to="/smartwatch" className="hover:text-teal-600 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="hover:text-teal-600 transition-colors cursor-pointer">Shop</span>
          <ChevronRight size={14} />
          <span className="hover:text-teal-600 transition-colors cursor-pointer">{watch.brand}</span>
          <ChevronRight size={14} />
          <span className="text-gray-700 font-medium">{watch.name}</span>
        </nav>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Gallery */}
          <div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4">
              <img
                src={watch.images[selectedImage]}
                alt={watch.name}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/600x600/e5e7eb/6b7280?text=${watch.brand}`; }}
              />
              <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                <Share2 size={18} className="text-gray-600" />
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {watch.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-teal-600 shadow-md' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${watch.name} view ${i + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/200x200/e5e7eb/6b7280?text=View'; }}
                  />
                </button>
              ))}
              <Link
                to="/smartwatch/virtual-try-on"
                className="flex-shrink-0 w-20 h-20 rounded-xl border-2 border-dashed border-teal-300 flex flex-col items-center justify-center gap-1 text-teal-600 hover:bg-teal-50 transition-colors"
              >
                <Camera size={16} />
                <span className="text-xs font-medium">Try On</span>
              </Link>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <Link to="/smartwatch" className="text-teal-600 text-sm font-medium hover:underline">{watch.brand}</Link>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-1">{watch.name} — {watch.subtitle}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-3">
              <StarRating rating={watch.rating} size={16} />
              <span className="text-sm text-gray-500">{watch.rating} ({watch.reviews.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mt-4">
              {watch.originalPrice && (
                <span className="text-xl text-gray-400 line-through">${watch.originalPrice}</span>
              )}
              <span className={`text-3xl font-bold ${watch.originalPrice ? 'text-red-600' : 'text-gray-900'}`}>
                ${watch.price}
              </span>
              {watch.originalPrice && (
                <span className="px-2 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded">
                  Save ${watch.originalPrice - watch.price}
                </span>
              )}
            </div>

            {/* Variant Selectors */}
            <div className="space-y-5 mt-6">
              {/* Size */}
              {watch.sizes.length > 1 && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Case Size</label>
                  <div className="flex gap-2">
                    {watch.sizes.map((size, i) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(i)}
                        className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
                          selectedSize === i
                            ? 'border-teal-600 bg-teal-50 text-teal-700'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Color: <span className="text-gray-500">{watch.colors[selectedColor]}</span>
                </label>
                <div className="flex gap-3">
                  {watch.colors.map((color, i) => {
                    const colorMap: Record<string, string> = {
                      'Natural Titanium': '#C4B5A0', 'Black Titanium': '#2D2D2D', 'White Titanium': '#E8E8E8',
                      'Silver': '#C0C0C0', 'Black': '#1a1a1a', 'Slate Gray': '#708090',
                      'Midnight': '#191970', 'Starlight': '#F5E6D3', 'Rose Gold': '#B76E79', 'Jet Black': '#0A0A0A',
                      'Graphite': '#383838', 'Soft Gold': '#D4AF37', 'Platinum': '#E5E4E2',
                      'Whitestone': '#F5F5F0', 'French Gray': '#BDBDBD',
                    };
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(i)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor === i ? 'border-teal-600 ring-2 ring-teal-200' : 'border-gray-200 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: colorMap[color] || '#888' }}
                        title={color}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Band */}
              {watch.bands.length > 1 && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Band</label>
                  <select
                    value={selectedBand}
                    onChange={(e) => setSelectedBand(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {watch.bands.map((band, i) => (
                      <option key={band} value={i}>{band} +$0</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Stock */}
            <div className="mt-4">
              {watch.inStock ? (
                watch.stockCount <= 5 ? (
                  <span className="text-amber-600 text-sm font-medium">Only {watch.stockCount} left — order soon!</span>
                ) : (
                  <span className="text-green-600 text-sm font-medium flex items-center gap-1"><Check size={14} /> In Stock</span>
                )
              ) : (
                <span className="text-gray-500 text-sm font-medium">Out of Stock</span>
              )}
            </div>

            {/* CTA */}
            <div className="mt-6 space-y-3">
              <div className="flex gap-3">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-50 transition-colors">
                    <Minus size={16} />
                  </button>
                  <span className="px-4 text-sm font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-50 transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
                <button className="flex-1 py-4 bg-teal-600 text-white font-bold rounded-xl text-lg hover:bg-teal-700 transition-all hover:shadow-lg flex items-center justify-center gap-2">
                  <ShoppingCart size={20} /> Add to Cart
                </button>
              </div>
              <button className="w-full py-3.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors">
                Buy Now
              </button>
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className="w-full py-2 text-sm text-gray-500 hover:text-teal-600 transition-colors flex items-center justify-center gap-1"
              >
                <Heart size={16} className={wishlisted ? 'fill-red-500 text-red-500' : ''} />
                {wishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}
              </button>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-5 gap-3 mt-6 p-4 bg-gray-50 rounded-xl">
              {[
                { icon: '🖥️', label: watch.specs?.display?.split(',')[0] || 'OLED' },
                { icon: '🔋', label: watch.specs?.battery?.split('(')[0] || '18h' },
                { icon: '💧', label: watch.specs?.waterResistance?.split('(')[0] || '50m' },
                { icon: '📍', label: 'GPS' },
                { icon: '📱', label: watch.specs?.os || 'watchOS' },
              ].map((spec, i) => (
                <div key={i} className="text-center">
                  <span className="text-lg">{spec.icon}</span>
                  <p className="text-xs text-gray-500 mt-1 truncate">{spec.label}</p>
                </div>
              ))}
            </div>

            {/* Delivery */}
            <div className="mt-4 p-4 bg-gray-50 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck size={16} className="text-teal-600" />
                Ships in 2–3 days. Free delivery on orders $75+
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <RotateCcw size={16} className="text-teal-600" />
                Free 30-day returns
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield size={16} className="text-teal-600" />
                2-year warranty included
              </div>
            </div>
          </div>
        </div>

        {/* AI Review Summary */}
        <div className="mt-12 border-l-4 border-teal-500 bg-teal-50/50 rounded-r-2xl p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={20} className="text-teal-600" />
            <h3 className="text-lg font-bold text-gray-900">AI Review Summary</h3>
            <span className="text-xs text-gray-400 ml-auto">Updated Mar 2026</span>
          </div>
          <p className="text-gray-600 mb-4">{watch.aiSummary}</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-green-700 mb-2">Pros</h4>
              <ul className="space-y-1.5">
                {watch.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-orange-700 mb-2">Cons</h4>
              <ul className="space-y-1.5">
                {watch.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <XIcon size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm text-teal-700 font-medium">
            Who is this for? {watch.idealFor}
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="flex gap-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-teal-600 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose prose-gray max-w-none">
                {watch.description.split('\n\n').map((p, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed mb-4">{p}</p>
                ))}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-6">
                {specGroups.map((group) => (
                  <div key={group.group}>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">{group.group}</h3>
                    <div className="bg-gray-50 rounded-xl overflow-hidden">
                      {group.items.map((item, i) => (
                        <div key={i} className={`flex px-4 py-3 ${i > 0 ? 'border-t border-gray-100' : ''}`}>
                          <span className="w-40 text-sm font-medium text-gray-500">{item.label}</span>
                          <span className="text-sm text-gray-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                {/* Sentiment Summary */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900">{watch.rating}</div>
                      <StarRating rating={watch.rating} />
                      <p className="text-xs text-gray-400 mt-1">{watch.reviews.toLocaleString()} reviews</p>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const pct = star === 5 ? 72 : star === 4 ? 18 : star === 3 ? 6 : star === 2 ? 3 : 1;
                        return (
                          <div key={star} className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 w-3">{star}</span>
                            <Star size={10} className="text-amber-400 fill-amber-400" />
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-xs text-gray-400 w-8">{pct}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Great GPS', 'Durable', 'Long Battery', 'Bright Display', 'Heavy', 'Expensive'].map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-6">
                  {userReviews.map((review, i) => (
                    <div key={i} className="border-b border-gray-100 pb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <StarRating rating={review.rating} />
                        <span className="font-semibold text-sm text-gray-900">{review.title}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                        <span>{review.name}</span>
                        {review.verified && (
                          <span className="flex items-center gap-1 text-green-600">
                            <Check size={10} /> Verified Purchase
                          </span>
                        )}
                        <span>· {review.date}</span>
                      </div>
                      <p className="text-sm text-gray-600">{review.text}</p>
                      <button className="text-xs text-gray-400 mt-2 hover:text-gray-600 transition-colors">
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-4">
                {watch.faqs.map((faq, i) => (
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

        {/* Frequently Bought Together */}
        <div className="mt-8 border-t border-gray-100 pt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Bought Together</h2>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl">
              <img src={watch.image} alt={watch.name} className="w-20 h-20 rounded-lg object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/200x200/e5e7eb/6b7280?text=Watch'; }} />
              <div>
                <p className="font-medium text-sm text-gray-900">{watch.name}</p>
                <p className="text-sm text-gray-500">${watch.price}</p>
              </div>
            </div>
            {relatedAccessories.map((acc, i) => (
              <div key={i} className="flex items-center gap-4">
                <Plus size={20} className="text-gray-300" />
                <div className="p-4 border border-gray-200 rounded-xl">
                  <img src={acc.image} alt={acc.name} className="w-20 h-20 rounded-lg object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/200x200/e5e7eb/6b7280?text=Accessory'; }} />
                  <div className="mt-2">
                    <p className="font-medium text-sm text-gray-900">{acc.name}</p>
                    <p className="text-sm text-gray-500">${acc.price}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="ml-auto p-4 bg-teal-50 rounded-xl text-center">
              <p className="text-sm text-gray-500">Bundle Price</p>
              <p className="text-2xl font-bold text-gray-900">${watch.price + 49 + 29}</p>
              <button className="mt-2 px-6 py-2 bg-teal-600 text-white font-medium rounded-lg text-sm hover:bg-teal-700 transition-colors">
                Add Bundle to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12 border-t border-gray-100 pt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {watches.filter((w) => w.id !== watch.id).slice(0, 4).map((w) => (
              <Link key={w.id} to={`/smartwatch/product/${w.slug}`} className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all">
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={w.image}
                    alt={w.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/400x400/e5e7eb/6b7280?text=${w.brand}`; }}
                  />
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-400">{w.brand}</p>
                  <p className="text-sm font-semibold text-gray-900 mt-0.5">{w.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <StarRating rating={w.rating} size={10} />
                    <span className="text-xs text-gray-400">({w.reviews})</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900 mt-1">${w.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
