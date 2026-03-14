import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Minus, Plus, X, ShoppingCart, Shield, Truck, RotateCcw, Tag, ArrowRight } from 'lucide-react';
import { watches } from '../../data/smartwatch';

interface CartItem {
  watch: typeof watches[0];
  quantity: number;
  color: string;
  size: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { watch: watches[0], quantity: 1, color: watches[0].colors[0], size: watches[0].sizes[0] },
    { watch: watches[5], quantity: 2, color: watches[5].colors[0], size: watches[5].sizes[0] },
  ]);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const updateQuantity = (index: number, delta: number) => {
    setCartItems((items) =>
      items.map((item, i) =>
        i === index ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeItem = (index: number) => {
    setCartItems((items) => items.filter((_, i) => i !== index));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.watch.price * item.quantity, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal >= 75 ? 0 : 9.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'WATCH10') {
      setPromoApplied(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <Link to="/smartwatch" className="hover:text-teal-600">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-700 font-medium">Shopping Cart</span>
          </nav>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Shopping Cart ({cartItems.length})</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl border border-gray-200 p-5 flex gap-5">
                  <Link to={`/smartwatch/product/${item.watch.slug}`} className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={item.watch.image}
                      alt={item.watch.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/200x200/e5e7eb/6b7280?text=${item.watch.brand}`; }}
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">{item.watch.brand}</p>
                        <Link to={`/smartwatch/product/${item.watch.slug}`} className="font-semibold text-gray-900 hover:text-teal-600 transition-colors">
                          {item.watch.name}
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">{item.color} · {item.size}</p>
                      </div>
                      <button
                        onClick={() => removeItem(index)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button onClick={() => updateQuantity(index, -1)} className="p-2 hover:bg-gray-50 transition-colors">
                          <Minus size={14} />
                        </button>
                        <span className="px-4 text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(index, 1)} className="p-2 hover:bg-gray-50 transition-colors">
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="text-right">
                        {item.watch.originalPrice && (
                          <span className="text-sm text-gray-400 line-through mr-2">${(item.watch.originalPrice * item.quantity).toFixed(2)}</span>
                        )}
                        <span className="text-lg font-bold text-gray-900">${(item.watch.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Promo Code */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={16} className="text-gray-500" />
                  <h3 className="font-medium text-gray-900">Promo Code</h3>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code (try WATCH10)"
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    onClick={applyPromo}
                    className="px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-sm text-green-600 font-medium mt-2">WATCH10 applied — 10% off!</p>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                    <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Discount (WATCH10)</span>
                      <span className="font-medium text-green-600">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Estimated Tax</span>
                    <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full py-4 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-all hover:shadow-lg flex items-center justify-center gap-2 text-lg">
                  Checkout <ArrowRight size={20} />
                </button>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Shield size={14} className="text-teal-600" /> Secure SSL checkout
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Truck size={14} className="text-teal-600" /> Free shipping on orders $75+
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <RotateCcw size={14} className="text-teal-600" /> 30-day free returns
                  </div>
                </div>

                <div className="mt-4 flex justify-center gap-2">
                  {['Visa', 'MC', 'Amex', 'PayPal'].map((m) => (
                    <span key={m} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-500 font-medium">{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Browse our collection and find your perfect smartwatch.</p>
            <Link
              to="/smartwatch/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-all"
            >
              <ShoppingCart size={20} /> Shop Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
