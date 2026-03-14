import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, Star, RotateCcw, ChevronRight } from 'lucide-react';
import { watches } from '../../data/smartwatch';

const steps = [
  {
    question: "What will you primarily use this watch for?",
    type: 'icon-grid' as const,
    options: [
      { label: 'Fitness', icon: '🏃', value: 'fitness' },
      { label: 'Work', icon: '💼', value: 'work' },
      { label: 'Style', icon: '👔', value: 'style' },
      { label: 'Outdoor', icon: '🏔️', value: 'outdoor' },
      { label: 'All-Purpose', icon: '⌚', value: 'all' },
    ],
  },
  {
    question: "What's your budget?",
    type: 'single' as const,
    options: [
      { label: 'Under $100', value: 'budget-low' },
      { label: '$100 – $200', value: 'budget-mid-low' },
      { label: '$200 – $400', value: 'budget-mid' },
      { label: '$400 – $700', value: 'budget-high' },
      { label: '$700+', value: 'budget-premium' },
    ],
  },
  {
    question: "Which features matter most?",
    type: 'multi' as const,
    options: [
      { label: 'Heart Rate', value: 'hr' },
      { label: 'GPS', value: 'gps' },
      { label: 'Sleep Tracking', value: 'sleep' },
      { label: 'Contactless Pay', value: 'nfc' },
      { label: 'LTE', value: 'lte' },
      { label: 'Music', value: 'music' },
      { label: 'Long Battery', value: 'battery' },
    ],
  },
  {
    question: "Which phone do you use?",
    type: 'single' as const,
    options: [
      { label: 'iPhone 📱', value: 'iphone' },
      { label: 'Android 📱', value: 'android' },
      { label: 'Both', value: 'both' },
      { label: 'Not Sure', value: 'unsure' },
    ],
  },
  {
    question: "What's your style?",
    type: 'image-grid' as const,
    options: [
      { label: 'Classic', value: 'classic', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=300&h=300&fit=crop' },
      { label: 'Sport', value: 'sport', image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8b2cda?w=300&h=300&fit=crop' },
      { label: 'Minimal', value: 'minimal', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop' },
      { label: 'Bold', value: 'bold', image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=300&h=300&fit=crop' },
      { label: 'Smart/Tech', value: 'tech', image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop' },
    ],
  },
];

export default function StyleFinderQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [multiSelect, setMultiSelect] = useState<string[]>([]);

  const step = steps[currentStep];

  const handleSelect = (value: string) => {
    if (step.type === 'multi') {
      setMultiSelect((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    } else {
      setAnswers({ ...answers, [currentStep]: value });
      if (currentStep < steps.length - 1) {
        setTimeout(() => setCurrentStep(currentStep + 1), 300);
      } else {
        triggerResults();
      }
    }
  };

  const handleMultiNext = () => {
    setAnswers({ ...answers, [currentStep]: multiSelect });
    setMultiSelect([]);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      triggerResults();
    }
  };

  const triggerResults = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
    }, 1800);
  };

  const goBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setMultiSelect([]);
    setShowResults(false);
    setLoading(false);
  };

  // Generate "AI-matched" results
  const results = [
    { ...watches[0], matchScore: 98, reasons: ['Perfect for your outdoor lifestyle', 'Best-in-class GPS & battery', 'Premium build matches your style'] },
    { ...watches[2], matchScore: 94, reasons: ['Incredible battery life', 'Top outdoor GPS', 'Great for fitness'] },
    { ...watches[4], matchScore: 89, reasons: ['Best everyday smartwatch', 'Seamless phone integration', 'Health tracking leader'] },
    { ...watches[1], matchScore: 85, reasons: ['Great value', 'Rotating bezel design', 'Strong health features'] },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-teal-400/30 rounded-full" />
            <div className="absolute inset-0 border-4 border-transparent border-t-teal-400 rounded-full animate-spin" />
            <Sparkles className="absolute inset-0 m-auto text-teal-400" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">AI is finding your perfect matches...</h2>
          <p className="text-teal-300/70">Analyzing 300+ watches based on your preferences</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    const topPick = results[0];
    const runners = results.slice(1);

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-800 to-teal-600 py-12 lg:py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-teal-200 text-sm mb-4">
              <Sparkles size={14} /> AI Style Finder Results
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Your Perfect Matches</h1>
            <p className="text-teal-200">Based on your preferences, here are our top recommendations</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 -mt-8">
          {/* Top Pick */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-amber-50 px-6 py-3 flex items-center gap-2">
              <span className="text-amber-600 font-bold text-sm">🏆 AI's #1 Pick For You</span>
              <span className="ml-auto px-3 py-1 bg-amber-500 text-white font-bold rounded-full text-sm">
                {topPick.matchScore}% match
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-8 p-6 lg:p-8">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={topPick.image}
                  alt={topPick.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x600/e5e7eb/6b7280?text=Watch'; }}
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-sm text-gray-400 font-medium">{topPick.brand}</p>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">{topPick.name}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className={i < Math.floor(topPick.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">{topPick.rating} ({topPick.reviews.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  {topPick.originalPrice && <span className="text-lg text-gray-400 line-through">${topPick.originalPrice}</span>}
                  <span className="text-2xl font-bold text-gray-900">${topPick.price}</span>
                </div>
                <div className="mt-5">
                  <p className="text-sm font-semibold text-teal-700 mb-2">Why AI picked this for you:</p>
                  <ul className="space-y-1.5">
                    {topPick.reasons.map((r, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-3 mt-6">
                  <Link
                    to={`/smartwatch/product/${topPick.slug}`}
                    className="flex-1 py-3 bg-teal-600 text-white font-semibold rounded-xl text-center hover:bg-teal-700 transition-colors"
                  >
                    View Details
                  </Link>
                  <button className="px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-teal-600 hover:text-teal-600 transition-all">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Runner-ups */}
          <h3 className="text-lg font-bold text-gray-900 mb-4">Runner-ups</h3>
          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {runners.map((w) => (
              <Link
                key={w.id}
                to={`/smartwatch/product/${w.slug}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={w.image}
                    alt={w.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/e5e7eb/6b7280?text=Watch'; }}
                  />
                  <span className="absolute top-3 right-3 px-2 py-1 bg-teal-600 text-white text-xs font-bold rounded-md">
                    {w.matchScore}% match
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-400">{w.brand}</p>
                  <p className="font-semibold text-gray-900 text-sm mt-0.5">{w.name}</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">${w.price}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center pb-12">
            <button
              onClick={resetQuiz}
              className="inline-flex items-center gap-2 text-teal-600 font-medium hover:text-teal-700 transition-colors"
            >
              <RotateCcw size={16} /> Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={goBack}
            className={`flex items-center gap-1 text-sm text-teal-300/70 hover:text-teal-200 transition-colors ${currentStep === 0 ? 'invisible' : ''}`}
          >
            <ArrowLeft size={16} /> Back
          </button>
          <span className="text-sm text-teal-300/70">Step {currentStep + 1} of {steps.length}</span>
          <Link to="/smartwatch" className="text-sm text-teal-300/70 hover:text-teal-200 transition-colors">Skip</Link>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 bg-white/10 rounded-full mb-10 overflow-hidden">
          <div
            className="h-full bg-teal-400 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-white">{step.question}</h2>
        </div>

        {/* Options */}
        <div className={`grid gap-3 ${
          step.type === 'icon-grid' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5' :
          step.type === 'image-grid' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5' :
          step.type === 'multi' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' :
          'grid-cols-1 sm:grid-cols-2'
        }`}>
          {step.options.map((option) => {
            const isSelected = step.type === 'multi'
              ? multiSelect.includes(option.value)
              : answers[currentStep] === option.value;

            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`relative rounded-xl border-2 transition-all duration-200 overflow-hidden ${
                  isSelected
                    ? 'border-teal-400 bg-teal-400/20 shadow-lg shadow-teal-500/20'
                    : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {step.type === 'image-grid' && 'image' in option && (
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={option.image}
                      alt={option.label}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/300x300/1a1a2e/ffffff?text=${option.label}`; }}
                    />
                    <div className="absolute inset-0 bg-black/30" />
                  </div>
                )}
                <div className={`${step.type === 'image-grid' ? 'absolute bottom-0 left-0 right-0 p-3' : 'p-4'} text-center`}>
                  {step.type === 'icon-grid' && 'icon' in option && (
                    <span className="text-3xl mb-2 block">{option.icon}</span>
                  )}
                  <span className={`font-medium ${step.type === 'image-grid' ? 'text-white text-sm' : 'text-white text-sm lg:text-base'}`}>
                    {option.label}
                  </span>
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-teal-400 rounded-full flex items-center justify-center">
                    <ChevronRight size={12} className="text-teal-900" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Multi-select Next button */}
        {step.type === 'multi' && (
          <div className="text-center mt-8">
            <button
              onClick={handleMultiNext}
              disabled={multiSelect.length === 0}
              className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${
                multiSelect.length > 0
                  ? 'bg-teal-500 text-white hover:bg-teal-400'
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              Continue <ArrowRight size={18} />
            </button>
            <p className="text-xs text-teal-300/50 mt-2">Select all that apply</p>
          </div>
        )}
      </div>
    </div>
  );
}
