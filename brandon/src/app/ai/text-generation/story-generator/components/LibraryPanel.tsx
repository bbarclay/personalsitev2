'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SavedStory {
  id: string;
  title: string;
  summary: string;
  genre: string;
  created: string;
  lastModified: string;
  wordCount: number;
  tags: string[];
}

// Example saved stories for demonstration
const savedStories: SavedStory[] = [
  {
    id: '1',
    title: 'The Crystal Key',
    summary: 'A young mage discovers an ancient artifact that holds the power to unlock forgotten realms...',
    genre: 'Fantasy',
    created: '2024-03-25',
    lastModified: '2024-03-28',
    wordCount: 2500,
    tags: ['magic', 'adventure', 'artifacts']
  },
  {
    id: '2',
    title: 'Echoes of Tomorrow',
    summary: 'In a dystopian future, a resistance fighter uncovers a conspiracy that spans decades...',
    genre: 'Sci-Fi',
    created: '2024-03-20',
    lastModified: '2024-03-27',
    wordCount: 3200,
    tags: ['dystopia', 'resistance', 'conspiracy']
  },
  {
    id: '3',
    title: 'The Last Letter',
    summary: 'A mysterious letter arrives 50 years too late, revealing long-buried family secrets...',
    genre: 'Mystery',
    created: '2024-03-15',
    lastModified: '2024-03-26',
    wordCount: 1800,
    tags: ['family', 'secrets', 'letters']
  }
];

const LibraryPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'created' | 'modified' | 'wordCount'>('modified');
  const [selectedStory, setSelectedStory] = useState<SavedStory | null>(null);

  const filteredStories = savedStories.filter(story =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedStories = [...filteredStories].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'created':
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      case 'modified':
        return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
      case 'wordCount':
        return b.wordCount - a.wordCount;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600"
        >
          Your Stories
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Browse and manage your collection of stories
        </motion.p>
      </div>

      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="modified">Last Modified</option>
            <option value="created">Date Created</option>
            <option value="title">Title</option>
            <option value="wordCount">Word Count</option>
          </select>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 gap-4">
        {sortedStories.map((story) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setSelectedStory(story)}
            className={`p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 cursor-pointer transition-all ${
              selectedStory?.id === story.id
                ? 'ring-2 ring-purple-500'
                : 'hover:shadow-lg'
            }`}
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  {story.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {story.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {story.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {story.wordCount} words
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Last modified: {story.lastModified}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {sortedStories.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No stories found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or create a new story
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default LibraryPanel;
