'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Visualization {
  id: string;
  title: string;
  description: string;
  type: string;
  created: string;
  thumbnail: string;
  tags: string[];
}

const sampleVisualizations: Visualization[] = [
  {
    id: '1',
    title: 'Monthly Revenue Trends',
    description: 'Line chart showing revenue patterns over the past year',
    type: 'Line Chart',
    created: '2024-03-28',
    thumbnail: '📈',
    tags: ['revenue', 'trends', 'monthly']
  },
  {
    id: '2',
    title: 'Customer Distribution',
    description: 'Pie chart showing customer segments by region',
    type: 'Pie Chart',
    created: '2024-03-27',
    thumbnail: '📊',
    tags: ['customers', 'segments', 'regional']
  },
  {
    id: '3',
    title: 'Product Performance Matrix',
    description: 'Heat map showing product performance metrics',
    type: 'Heat Map',
    created: '2024-03-26',
    thumbnail: '🌡️',
    tags: ['products', 'performance', 'metrics']
  }
];

const GalleryPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVisualization, setSelectedVisualization] = useState<Visualization | null>(null);

  const filteredVisualizations = sampleVisualizations.filter(viz =>
    viz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    viz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    viz.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-600"
        >
          Visualization Gallery
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Browse and manage your saved visualizations
        </motion.p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search visualizations..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔍
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVisualizations.map((viz) => (
          <motion.div
            key={viz.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedVisualization(viz)}
            className={`cursor-pointer rounded-xl overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 ${
              selectedVisualization?.id === viz.id ? 'ring-2 ring-cyan-500' : ''
            }`}
          >
            {/* Preview */}
            <div className="aspect-video bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 flex items-center justify-center">
              <span className="text-5xl">{viz.thumbnail}</span>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                {viz.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {viz.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {viz.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-full text-xs bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta */}
              <div className="mt-4 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                <span>{viz.type}</span>
                <span>Created: {viz.created}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredVisualizations.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-4xl mb-4">🖼️</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No visualizations found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or create a new visualization
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-teal-600"
          >
            Create New Visualization
          </motion.button>
        </motion.div>
      )}

      {/* Actions */}
      {filteredVisualizations.length > 0 && (
        <div className="flex justify-between gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-teal-600"
          >
            Create New
          </motion.button>
          <div className="space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl font-semibold bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-300"
              disabled={!selectedVisualization}
            >
              Edit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl font-semibold border-2 border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              disabled={!selectedVisualization}
            >
              Delete
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPanel;
