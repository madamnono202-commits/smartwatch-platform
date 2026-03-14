import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-700 font-medium">Terms of Service</span>
          </nav>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Terms of Service</h1>
          <p className="text-gray-500 mt-1">Last updated: March 1, 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-10 prose prose-sm max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mt-0">1. Acceptance of Terms</h2>
          <p className="text-gray-600">By accessing and using CryptoCompare AI, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, you should not use our website.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">2. Description of Service</h2>
          <p className="text-gray-600">CryptoCompare AI provides cryptocurrency exchange comparison tools, educational content, market data, and related information. Our platform uses AI to analyze and rank exchanges based on publicly available data.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">3. Not Financial Advice</h2>
          <p className="text-gray-600">The information provided on this website is for general informational and educational purposes only. It should not be considered as financial, investment, or trading advice. Cryptocurrency trading involves significant risk. Always do your own research and consult with a qualified financial advisor before making investment decisions.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">4. Affiliate Relationships</h2>
          <p className="text-gray-600">CryptoCompare AI participates in affiliate programs with cryptocurrency exchanges. We may earn commissions when users sign up through our referral links. These relationships do not influence our AI-generated ratings or editorial content.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">5. Accuracy of Information</h2>
          <p className="text-gray-600">While we strive to provide accurate and up-to-date information, we make no warranties or representations about the accuracy, reliability, or completeness of the information on our website. Exchange fees, features, and policies may change without notice.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">6. User Conduct</h2>
          <p className="text-gray-600">You agree not to use our website for any unlawful purpose or in any way that could damage, disable, or impair the website. You agree not to attempt to gain unauthorized access to any part of the website.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">7. Intellectual Property</h2>
          <p className="text-gray-600">All content on this website, including text, graphics, logos, and software, is the property of CryptoCompare AI and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">8. Limitation of Liability</h2>
          <p className="text-gray-600">CryptoCompare AI shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our website or services. This includes but is not limited to losses from cryptocurrency trading decisions made based on information found on our website.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">9. Changes to Terms</h2>
          <p className="text-gray-600">We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the website constitutes acceptance of the modified terms.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">10. Contact</h2>
          <p className="text-gray-600">For questions about these Terms of Service, please <Link to="/contact" className="text-blue-600 hover:underline">contact us</Link>.</p>
        </div>
      </div>
    </div>
  );
}
