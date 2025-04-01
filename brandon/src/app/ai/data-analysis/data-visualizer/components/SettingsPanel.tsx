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
      id: 'theme',
      title: 'Chart Theme',
      description: 'Choose the default color theme for your visualizations',
      icon: '🎨',
      component: (
        <div className="grid grid-cols-3 gap-2">
          {['Light', 'Dark', 'Auto'].map(theme => (
            <button
              key={theme}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme}
            </button>
          ))}
        </div>
      )
    },
    {
      id: 'animation',
      title: 'Animation Settings',
      description: 'Configure chart animation preferences',
      icon: '✨',
      component: (
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox text-blue-600" defaultChecked />
            <span className="text-gray-700 dark:text-gray-300">Enable animations</span>
          </label>
          <div className="space-y-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">Animation Duration</label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              defaultValue="0.5"
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Fast</span>
              <span>Slow</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'export',
      title: 'Export Settings',
      description: 'Configure default export options',
      icon: '📤',
      component: (
        <div className="space-y-4">
          <select className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
            <option>PNG Image</option>
            <option>SVG Vector</option>
            <option>PDF Document</option>
          </select>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox text-blue-600" defaultChecked />
              <span className="text-sm text-gray-700 dark:text-gray-300">Include title</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox text-blue-600" defaultChecked />
              <span className="text-sm text-gray-700 dark:text-gray-300">Include legend</span>
            </label>
          </div>
        </div>
      )
    },
    {
      id: 'data',
      title: 'Data Handling',
      description: 'Set default data processing options',
      icon: '🔢',
      component: (
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox text-blue-600" defaultChecked />
            <span className="text-gray-700 dark:text-gray-300">Auto-format numbers</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox text-blue-600" defaultChecked />
            <span className="text-gray-700 dark:text-gray-300">Handle missing values</span>
          </label>
          <select className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
            <option>Decimal Point (.)</option>
            <option>Comma (,)</option>
          </select>
        </div>
      )
    },
    {
      id: 'autosave',
      title: 'Auto-Save',
      description: 'Configure automatic saving options',
      icon: '💾',
      component: (
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox text-blue-600" defaultChecked />
            <span className="text-gray-700 dark:text-gray-300">Enable auto-save</span>
          </label>
          <select className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
            <option>Every minute</option>
            <option>Every 5 minutes</option>
            <option>Every 10 minutes</option>
          </select>
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
          className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-600"
        >
          Settings
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Customize your visualization experience
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
                  background: 'linear-gradient(to bottom right, from-blue-600 to-teal-600)',
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
        className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-teal-600"
      >
        Save Changes
      </motion.button>
    </div>
  );
};

export default SettingsPanel;
