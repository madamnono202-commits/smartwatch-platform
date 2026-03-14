import { Link } from 'react-router-dom';
import { Home, Search, TrendingUp } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <div className="w-24 h-24 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <TrendingUp size={48} className="text-blue-600" />
        </div>
        <h1 className="text-6xl lg:text-8xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-xl lg:text-2xl font-bold text-gray-700 mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all hover:shadow-lg"
          >
            <Home size={18} /> Go Home
          </Link>
          <Link
            to="/compare"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
          >
            <Search size={18} /> Compare Exchanges
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm">
          <Link to="/exchanges" className="text-blue-600 hover:underline">Exchanges</Link>
          <span className="text-gray-300">·</span>
          <Link to="/prices" className="text-blue-600 hover:underline">Prices</Link>
          <span className="text-gray-300">·</span>
          <Link to="/blog" className="text-blue-600 hover:underline">Blog</Link>
          <span className="text-gray-300">·</span>
          <Link to="/contact" className="text-blue-600 hover:underline">Contact</Link>
        </div>
      </div>
    </div>
  );
}
