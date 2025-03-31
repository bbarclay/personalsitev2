'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

type ChartType = 'line' | 'bar' | 'pie' | 'scatter' | 'heatmap';

interface ChartOption {
  type: ChartType;
  title: string;
  icon: string;
  description: string;
}

const chartOptions: ChartOption[] = [
  {
    type: 'line',
    title: 'Line Chart',
    icon: '📈',
    description: 'Show trends and patterns over time'
  },
  {
    type: 'bar',
    title: 'Bar Chart',
    icon: '📊',
    description: 'Compare values across categories'
  },
  {
    type: 'pie',
    title: 'Pie Chart',
    icon: '🥧',
    description: 'Show proportions of a whole'
  },
  {
    type: 'scatter',
    title: 'Scatter Plot',
    icon: '⚡',
    description: 'Visualize relationships between variables'
  },
  {
    type: 'heatmap',
    title: 'Heat Map',
    icon: '🌡️',
    description: 'Display data density and patterns'
  }
];

const VisualizePanel: React.FC = () => {
  const [selectedChart, setSelectedChart] = useState<ChartType | null>(null);
  const [chartData, setChartData] = useState<any>(null);

  // Placeholder for chart preview
  const renderChartPreview = () => {
    if (!selectedChart) return null;

    return (
      <div className="aspect-video rounded-xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-gray-200 dark:border-gray-700 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">{chartOptions.find(c => c.type === selectedChart)?.icon}</div>
          <div className="text-gray-600 dark:text-gray-400">
            Chart preview will appear here
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-600"
        >
          Create Visualization
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Choose a chart type and customize your visualization
        </motion.p>
      </div>

      {/* Chart Type Selection */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {chartOptions.map((option) => (
          <motion.button
            key={option.type}
            whileHover={{ y: -5 }}
            whileTap={{ y: 0 }}
            onClick={() => setSelectedChart(option.type)}
            className={`p-4 rounded-xl text-center transition-all ${
              selectedChart === option.type
                ? 'bg-blue-100 dark:bg-blue-900/40 ring-2 ring-blue-500'
                : 'bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50'
            }`}
          >
            <div className="text-3xl mb-2">{option.icon}</div>
            <div className="font-medium text-gray-900 dark:text-gray-100 mb-1">
              {option.title}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {option.description}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Chart Preview */}
      {renderChartPreview()}

      {/* Chart Configuration */}
      {selectedChart && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Data Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                X-Axis Data
              </label>
              <select className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
                <option>Select data field</option>
                {/* Add data fields here */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Y-Axis Data
              </label>
              <select className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
                <option>Select data field</option>
                {/* Add data fields here */}
              </select>
            </div>
          </div>

          {/* Color Scheme */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Color Scheme
            </label>
            <div className="grid grid-cols-6 gap-2">
              {['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899'].map((color) => (
                <button
                  key={color}
                  className="w-full aspect-square rounded-lg border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                  style={{ background: color }}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-teal-600"
            >
              Generate Visualization
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl font-semibold border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Reset
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* AI Suggestions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 border border-blue-100 dark:border-blue-800"
      >
        <div className="flex items-center gap-3 text-blue-700 dark:text-blue-300">
          <div className="text-xl">💡</div>
          <div className="font-medium">AI Suggestion</div>
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Based on your data, a {selectedChart || 'line'} chart might be the best choice to visualize these patterns. 
          Consider grouping by time intervals for better insights.
        </p>
      </motion.div>
    </div>
  );
};

export default VisualizePanel;
