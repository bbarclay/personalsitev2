'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Setting {
  id: string;
  title: string;
  description: string;
  icon: string;
  component: React.ReactNode;
}

const SettingsPanel: React.FC = () => {
  const settings: Setting[] = [
    {
      id: 'model',
      title: 'Analysis Model',
      description: 'Choose the AI model for sentiment analysis',
      icon: '🧠',
      component: (
        <select className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
          <option>General Purpose Model</option>
          <option>Social Media Optimized</option>
          <option>Product Review Focused</option>
          <option>Financial News Model</option>
        </select>
      )
    },
    {
      id: 'thresholds',
      title: 'Sentiment Thresholds',
      description: 'Adjust the score thresholds for positive/negative/neutral classification',
      icon: '⚖️',
      component: (
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">Positive Threshold</label>
            <input type="range" min="50" max="100" defaultValue="60" className="w-full" />
            <div className="text-xs text-gray-500 text-right">60%</div>
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">Negative Threshold</label>
            <input type="range" min="0" max="50" defaultValue="40" className="w-full" />
            <div className="text-xs text-gray-500 text-right">40%</div>
          </div>
        </div>
      )
    },
    {
      id: 'language',
      title: 'Language Detection',
      description: 'Configure language handling for analysis',
      icon: '🌍',
      component: (
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox text-yellow-600" defaultChecked />
            <span className="text-gray-700 dark:text-gray-300">Auto-detect language</span>
          </label>
          <select className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
            <option>Default Language: English</option>
            <option>Default Language: Spanish</option>
            {/* Add more languages */}
          </select>
        </div>
      )
    },
    {
      id: 'history',
      title: 'History Settings',
      description: 'Manage how analysis history is stored',
      icon: '📜',
      component: (
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox text-yellow-600" defaultChecked />
            <span className="text-gray-700 dark:text-gray-300">Save analysis history</span>
          </label>
          <select className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
            <option>Keep history for 30 days</option>
            <option>Keep history for 90 days</option>
            <option>Keep history indefinitely</option>
          </select>
          <button className="w-full px-4 py-2 text-sm bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800/40">
            Clear History Now
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-orange-600"
        >
          Settings
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Configure your sentiment analysis preferences
        </motion.p>
      </div>

      {/* Settings Grid */}
      <div className="grid gap-6">
        {settings.map((setting, index) => (
          <motion.div
            key={setting.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700"
          >
            <div className="flex gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{
                  background: 'linear-gradient(to bottom right, from-yellow-600 to-orange-600)',
                  opacity: 0.1
                }}
              >
                {setting.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100">
                  {setting.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {setting.description}
                </p>
                {setting.component}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Save Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-yellow-600 to-orange-600"
      >
        Save Changes
      </motion.button>
    </div>
  );
};

export default SettingsPanel;
