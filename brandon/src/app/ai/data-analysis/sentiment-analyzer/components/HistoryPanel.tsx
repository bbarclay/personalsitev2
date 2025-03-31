'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

type Sentiment = 'positive' | 'negative' | 'neutral';

interface HistoryEntry {
  id: string;
  textSnippet: string;
  sentiment: Sentiment;
  score: number;
  date: string;
}

const sampleHistory: HistoryEntry[] = [
  {
    id: '1',
    textSnippet: 'The product is amazing, I love it!',
    sentiment: 'positive',
    score: 95,
    date: '2024-03-29 10:30 AM'
  },
  {
    id: '2',
    textSnippet: 'Customer service was terrible, very disappointed.',
    sentiment: 'negative',
    score: 88,
    date: '2024-03-28 02:15 PM'
  },
  {
    id: '3',
    textSnippet: 'The delivery was on time as expected.',
    sentiment: 'neutral',
    score: 70,
    date: '2024-03-28 09:00 AM'
  },
  {
    id: '4',
    textSnippet: 'Great experience overall, would recommend.',
    sentiment: 'positive',
    score: 92,
    date: '2024-03-27 05:45 PM'
  }
];

const HistoryPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<Sentiment | 'all'>('all');

  const filteredHistory = sampleHistory.filter(entry => {
    const matchesSearch = entry.textSnippet.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || entry.sentiment === filter;
    return matchesSearch && matchesFilter;
  });

  const getSentimentColor = (sentiment: Sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 dark:text-green-400';
      case 'negative': return 'text-red-600 dark:text-red-400';
      case 'neutral': return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getSentimentBgColor = (sentiment: Sentiment) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 dark:bg-green-900/40';
      case 'negative': return 'bg-red-100 dark:bg-red-900/40';
      case 'neutral': return 'bg-gray-100 dark:bg-gray-900/40';
    }
  };

  const getSentimentIcon = (sentiment: Sentiment) => {
    switch (sentiment) {
      case 'positive': return '😊';
      case 'negative': return '😠';
      case 'neutral': return '😐';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-orange-600"
        >
          Analysis History
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Review your past sentiment analyses
        </motion.p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search history..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {(['all', 'positive', 'negative', 'neutral'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium capitalize ${
                filter === f
                  ? 'bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {filteredHistory.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl ${getSentimentBgColor(entry.sentiment)} border border-gray-200 dark:border-gray-700`}
          >
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm text-gray-700 dark:text-gray-300 italic mb-2">
                  "{entry.textSnippet}"
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {entry.date}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className={`text-center px-3 py-1 rounded-full text-sm font-medium ${getSentimentBgColor(entry.sentiment)} ${getSentimentColor(entry.sentiment)}`}>
                  {getSentimentIcon(entry.sentiment)} {entry.sentiment}
                </div>
                <div className={`text-lg font-bold ${getSentimentColor(entry.sentiment)}`}>
                  {entry.score}%
                </div>
                <button className="text-gray-400 hover:text-red-500">
                  🗑️
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredHistory.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-4xl mb-4">📜</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No history found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filter, or perform a new analysis.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default HistoryPanel;
