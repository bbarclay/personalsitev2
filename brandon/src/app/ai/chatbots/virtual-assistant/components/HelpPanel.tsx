'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface FAQ {
  question: string;
  answer: string;
  category: 'getting-started' | 'features' | 'troubleshooting' | 'advanced';
}

const faqs: FAQ[] = [
  {
    question: 'How do I start using the Virtual Assistant?',
    answer: 'Begin by going to the Chat tab and choosing a personality for your assistant in the Bot Lab. Then, proceed through the Training Arena to teach it specific skills.',
    category: 'getting-started'
  },
  {
    question: 'Can I customize the assistant\'s responses?',
    answer: 'Yes! In the Bot Lab, you can adjust the assistant\'s personality traits, tone of voice, and response style to match your preferences.',
    category: 'features'
  },
  {
    question: 'What languages are supported?',
    answer: 'The Virtual Assistant currently supports multiple languages including English, Spanish, French, German, and Chinese. You can change the language in Settings.',
    category: 'features'
  },
  {
    question: 'Why isn\'t the assistant responding?',
    answer: 'Check your internet connection and make sure you\'ve completed the initial setup in the Bot Lab. If problems persist, try resetting the assistant in Settings.',
    category: 'troubleshooting'
  },
  {
    question: 'How do I train custom responses?',
    answer: 'Use the Training Arena to create custom response patterns. You can define triggers, responses, and context rules for more accurate interactions.',
    category: 'advanced'
  },
  {
    question: 'Can I backup my assistant\'s training?',
    answer: 'Yes, in Settings you can export your assistant\'s training data and configurations for backup or transfer to another device.',
    category: 'advanced'
  }
];

const categoryInfo = {
  'getting-started': {
    title: 'Getting Started',
    icon: '🚀',
    color: 'blue'
  },
  'features': {
    title: 'Features',
    icon: '✨',
    color: 'purple'
  },
  'troubleshooting': {
    title: 'Troubleshooting',
    icon: '🔧',
    color: 'yellow'
  },
  'advanced': {
    title: 'Advanced Usage',
    icon: '🎓',
    color: 'green'
  }
};

const HelpPanel: React.FC = () => {
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<FAQ['category'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const themeColors = {
    blue: colors.primary,
    purple: colors.secondary,
    yellow: '#FFB224',
    green: colors.accent
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-4 bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`
          }}
        >
          Help & Documentation
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Find answers to common questions and learn how to make the most of your virtual assistant.
        </motion.p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium ${
              selectedCategory === 'all'
                ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All
          </motion.button>
          {(Object.entries(categoryInfo) as [FAQ['category'], typeof categoryInfo[keyof typeof categoryInfo]][]).map(([category, info]) => (
            <motion.button
              key={category}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                selectedCategory === category
                  ? `bg-${info.color}-100 dark:bg-${info.color}-900/40 text-${info.color}-600 dark:text-${info.color}-300`
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <span>{info.icon}</span>
              {info.title}
            </motion.button>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, index) => (
          <motion.div
            key={faq.question}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-lg"
            style={{
              border: `2px solid ${themeColors[categoryInfo[faq.category].color as keyof typeof themeColors]}20`
            }}
          >
            <div className="flex gap-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-lg shrink-0"
                style={{
                  background: themeColors[categoryInfo[faq.category].color as keyof typeof themeColors] + '20',
                  color: themeColors[categoryInfo[faq.category].color as keyof typeof themeColors]
                }}
              >
                {categoryInfo[faq.category].icon}
              </div>
              <div>
                <h3 
                  className="font-bold mb-2"
                  style={{
                    color: themeColors[categoryInfo[faq.category].color as keyof typeof themeColors]
                  }}
                >
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contact Support */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center pt-8"
      >
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Couldn't find what you're looking for?
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-xl font-bold text-white"
          style={{ background: colors.secondary }}
        >
          Contact Support
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HelpPanel;
