import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-700 font-medium">Privacy Policy</span>
          </nav>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-gray-500 mt-1">Last updated: March 1, 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-10 prose prose-sm max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mt-0">1. Information We Collect</h2>
          <p className="text-gray-600">We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, fill out a form, or contact us. This information may include your name, email address, and any other information you choose to provide.</p>
          <p className="text-gray-600">We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and information about how you interact with our website.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">2. How We Use Your Information</h2>
          <p className="text-gray-600">We use the information we collect to:</p>
          <ul className="text-gray-600 space-y-1">
            <li>Provide, maintain, and improve our services</li>
            <li>Send you newsletters and marketing communications (with your consent)</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Monitor and analyze trends, usage, and activities</li>
            <li>Detect, investigate, and prevent security incidents</li>
            <li>Personalize and improve your experience</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8">3. Cookies and Tracking</h2>
          <p className="text-gray-600">We use cookies and similar tracking technologies to track activity on our website. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">4. Affiliate Links</h2>
          <p className="text-gray-600">Our website contains affiliate links to cryptocurrency exchanges and other services. When you click these links and make a purchase or sign up, we may earn a commission. This does not affect our editorial content or exchange ratings. We use cookies to track affiliate referrals.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">5. Third-Party Services</h2>
          <p className="text-gray-600">We may use third-party services such as Google Analytics to monitor and analyze the use of our website. These third parties have their own privacy policies addressing how they use such information.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">6. Data Security</h2>
          <p className="text-gray-600">We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no internet transmission is ever fully secure or error-free.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">7. Your Rights</h2>
          <p className="text-gray-600">You have the right to access, correct, or delete your personal information. You can also opt out of receiving marketing communications from us at any time by clicking the unsubscribe link in any email.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">8. Contact Us</h2>
          <p className="text-gray-600">If you have any questions about this Privacy Policy, please <Link to="/contact" className="text-blue-600 hover:underline">contact us</Link>.</p>
        </div>
      </div>
    </div>
  );
}
