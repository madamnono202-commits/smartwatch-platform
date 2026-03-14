import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Upload, Download, Share2, Search, ShoppingCart, ArrowRight, CheckCircle } from 'lucide-react';
import { watches } from '../../data/smartwatch';

export default function VirtualTryOn() {
  const [selectedWatch, setSelectedWatch] = useState(watches[0]);
  const [mode, setMode] = useState<'camera' | 'upload'>('upload');
  const [uploaded, setUploaded] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWatches = watches.filter((w) => {
    const matchesFilter = filter === 'all' || w.category === filter;
    const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase()) || w.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-teal-800 to-teal-600 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">See Any Watch on Your Wrist — Instantly</h1>
          <p className="text-teal-200 text-lg mb-8">Powered by AI. No app needed. Works in your browser.</p>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { num: 1, label: 'Choose a watch' },
              { num: 2, label: 'Upload photo or use camera' },
              { num: 3, label: 'See it on your wrist' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center font-bold">
                  {s.num}
                </span>
                <span className="text-white font-medium">{s.label}</span>
                {i < 2 && <ArrowRight size={20} className="text-teal-300/50 hidden sm:block ml-2" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Watch Selector */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Select a Watch</h2>

            {/* Search */}
            <div className="relative mb-4">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search watches to try on..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
              {[
                { label: 'All', value: 'all' },
                { label: 'Apple', value: 'apple' },
                { label: 'Samsung', value: 'samsung' },
                { label: 'Garmin', value: 'garmin' },
              ].map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    filter === f.value
                      ? 'bg-teal-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-teal-300'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Watch Grid */}
            <div className="grid grid-cols-2 gap-3 max-h-96 lg:max-h-[600px] overflow-y-auto pr-1">
              {filteredWatches.map((w) => (
                <button
                  key={w.id}
                  onClick={() => setSelectedWatch(w)}
                  className={`relative rounded-xl overflow-hidden border-2 transition-all text-left ${
                    selectedWatch.id === w.id
                      ? 'border-teal-600 shadow-lg ring-2 ring-teal-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={w.image}
                      alt={w.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/300x300/e5e7eb/6b7280?text=${w.brand}`; }}
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-xs text-gray-400">{w.brand}</p>
                    <p className="text-xs font-semibold text-gray-900 truncate">{w.name}</p>
                    <p className="text-xs font-bold text-gray-700">${w.price}</p>
                  </div>
                  {selectedWatch.id === w.id && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle size={20} className="text-teal-600 fill-teal-100" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Color Swatches */}
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Band Color</p>
              <div className="flex gap-2">
                {['#1a1a1a', '#C0C0C0', '#065F46', '#1E40AF', '#DC2626'].map((color) => (
                  <button
                    key={color}
                    className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-teal-500 transition-colors"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Try-On Area */}
          <div className="lg:col-span-2">
            {/* Selected Watch Summary */}
            <div className="bg-white rounded-xl p-4 mb-6 flex items-center gap-4 shadow-sm">
              <img
                src={selectedWatch.image}
                alt={selectedWatch.name}
                className="w-16 h-16 rounded-lg object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/200x200/e5e7eb/6b7280?text=Watch'; }}
              />
              <div className="flex-1">
                <p className="text-xs text-gray-400">{selectedWatch.brand}</p>
                <p className="font-semibold text-gray-900">{selectedWatch.name}</p>
                <p className="text-sm font-bold text-teal-600">${selectedWatch.price}</p>
              </div>
              <Link
                to={`/smartwatch/product/${selectedWatch.slug}`}
                className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-1"
              >
                <ShoppingCart size={14} /> Shop
              </Link>
            </div>

            {/* Mode Toggle */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => { setMode('camera'); setUploaded(false); }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
                  mode === 'camera'
                    ? 'bg-teal-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-teal-300'
                }`}
              >
                <Camera size={18} /> Use Camera
              </button>
              <button
                onClick={() => { setMode('upload'); setUploaded(false); }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
                  mode === 'upload'
                    ? 'bg-teal-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-teal-300'
                }`}
              >
                <Upload size={18} /> Upload Photo
              </button>
            </div>

            {/* Try-On Canvas */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {mode === 'camera' && !uploaded ? (
                <div className="aspect-video bg-gray-900 flex flex-col items-center justify-center relative">
                  <div className="absolute inset-4 border-2 border-dashed border-white/20 rounded-xl" />
                  <Camera size={48} className="text-white/30 mb-4" />
                  <p className="text-white/50 font-medium mb-1">Camera Preview</p>
                  <p className="text-white/30 text-sm mb-6">Position your wrist in the frame</p>
                  <button
                    onClick={() => setUploaded(true)}
                    className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors flex items-center gap-2"
                  >
                    <Camera size={18} /> Capture Photo
                  </button>
                </div>
              ) : mode === 'upload' && !uploaded ? (
                <div
                  className="aspect-video border-2 border-dashed border-gray-300 rounded-xl m-6 flex flex-col items-center justify-center cursor-pointer hover:border-teal-400 hover:bg-teal-50/30 transition-all"
                  onClick={() => setUploaded(true)}
                >
                  <Upload size={48} className="text-gray-300 mb-4" />
                  <p className="text-gray-600 font-medium mb-1">Drag & drop or click to upload</p>
                  <p className="text-gray-400 text-sm">Accepts JPG, PNG, WebP · Max 10MB</p>
                  <button className="mt-4 px-6 py-2.5 bg-teal-600 text-white font-medium rounded-lg text-sm hover:bg-teal-700 transition-colors">
                    Choose File
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <div className="aspect-video bg-gray-100 relative overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop&crop=face"
                      alt="Try-on result showing watch on wrist"
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/800x500/e5e7eb/6b7280?text=Try-On+Result'; }}
                    />
                    {/* Watch overlay simulation */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 lg:w-44 lg:h-44">
                      <img
                        src={selectedWatch.image}
                        alt={selectedWatch.name}
                        className="w-full h-full object-contain drop-shadow-2xl"
                        style={{ transform: 'rotate(-15deg)' }}
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/200x200/e5e7eb/6b7280?text=Watch'; }}
                      />
                    </div>
                    {/* AI Processing badge */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-teal-600/90 backdrop-blur-sm text-white text-xs font-medium rounded-lg flex items-center gap-1.5">
                      <CheckCircle size={14} /> AI Wrist Detection Active
                    </div>
                  </div>
                  <div className="p-6 flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors">
                      <Download size={16} /> Download Result
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                      <Share2 size={16} /> Share
                    </button>
                    <button
                      onClick={() => setUploaded(false)}
                      className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Camera size={16} /> Try Another Photo
                    </button>
                    <Link
                      to={`/smartwatch/product/${selectedWatch.slug}`}
                      className="ml-auto flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      <ShoppingCart size={16} /> Shop This Watch — ${selectedWatch.price}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Info */}
            {!uploaded && (
              <p className="text-center text-sm text-gray-400 mt-4">
                Your photos are processed locally in your browser. We never store or upload your images.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
