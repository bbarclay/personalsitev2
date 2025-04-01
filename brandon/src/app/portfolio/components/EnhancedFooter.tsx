import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUp,
  Github,
  Linkedin,
  Mail,
  Heart,
  Check
} from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const EnhancedFooter: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Footer sections data
  const footerSections: FooterSection[] = [
    {
      title: 'Navigation',
      links: [
        { label: 'About', href: '#about' },
        { label: 'Experience', href: '#experience' },
        { label: 'Skills', href: '#skills' },
        { label: 'Projects', href: '#projects' },
        { label: 'Contact', href: '#contact' }
      ]
    },
    {
      title: 'Technology',
      links: [
        { label: 'AI/ML', href: '#ai-ml' },
        { label: 'Cloud Architecture', href: '#cloud' },
        { label: 'Security', href: '#security' },
        { label: 'Full Stack', href: '#fullstack' }
      ]
    },
    {
      title: 'Connect',
      links: [
        { label: 'LinkedIn', href: 'https://linkedin.com/in/brandontbarclay' },
        { label: 'Github', href: 'https://github.com' },
        { label: 'Email', href: 'mailto:barclaybrandon@hotmail.com' },
        { label: 'Website', href: 'https://brandonbarclay.com' }
      ]
    }
  ];

  // Stats data
  const stats = [
    { label: 'Years Experience', value: '10+' },
    { label: 'Projects Completed', value: '50+' },
    { label: 'Technologies', value: '20+' },
    { label: 'Happy Clients', value: '100+' }
  ];

  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle newsletter subscription
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus('submitting');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setSubscribeStatus('success');
    setEmail('');

    setTimeout(() => {
      setSubscribeStatus('idle');
    }, 3000);
  };

  return (
    <footer className="bg-white dark:bg-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2"
            >
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">BB</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white border-2 border-white">
                Brandon Barclay
              </span>
            </motion.div>
            <p className="text-gray-600 dark:text-gray-300">
              AI/ML Engineer & Technology Leader specializing in innovative solutions.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Linkedin />, href: 'https://linkedin.com/in/brandontbarclay', label: 'LinkedIn' },
                { icon: <Github />, href: 'https://github.com', label: 'GitHub' },
                { icon: <Mail />, href: 'mailto:barclaybrandon@hotmail.com', label: 'Email' }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: linkIndex * 0.1 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400
                               transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-gray-200 dark:border-gray-700">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Stay Updated
            </h3>
            <form onSubmit={handleSubscribe} className="flex space-x-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                         focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={subscribeStatus === 'submitting'}
                className={`px-6 py-2 rounded-lg text-white font-medium ${
                  subscribeStatus === 'submitting'
                    ? 'bg-gray-400'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {subscribeStatus === 'submitting' ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : subscribeStatus === 'success' ? (
                  <Check className="w-5 h-5" />
                ) : (
                  'Subscribe'
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>by Brandon Barclay © {new Date().getFullYear()}</span>
            </div>

            <div className="flex space-x-4 text-sm text-gray-600 dark:text-gray-300">
              <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Terms of Service</a>
              <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Sitemap</a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 rounded-full bg-indigo-600 text-white shadow-lg
                     hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                     focus:ring-indigo-500"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default EnhancedFooter;
