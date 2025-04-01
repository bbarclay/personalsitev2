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
      id: 'language',
      title: 'Language',
      description: 'Select your preferred writing language',
      icon: '🌍',
      component: (
        <select className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
          <option>Chinese</option>
        </select>
      )
    },
    {
      id: 'writing-style',
      title: 'Default Writing Style',
      description: 'Choose your preferred writing style for new stories',
      icon: '✍️',
      component: (
        <div className="grid grid-cols-2 gap-2">
          {['Descriptive', 'Concise', 'Formal', 'Casual'].map(style => (
            <button
              key={style}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {style}
            </button>
          ))}
        </div>
      )
    },
    {
      id: 'auto-save',
      title: 'Auto-Save',
      description: 'Automatically save your work while writing',
      icon: '💾',
      component: (
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" defaultChecked />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Enabled</span>
        </label>
      )
    },
    {
      id: 'theme',
      title: 'Word Count Display',
      description: 'Show word count while writing',
      icon: '📊',
      component: (
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="word-count"
              className="form-radio text-purple-600"
              defaultChecked
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">Always show</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="word-count"
              className="form-radio text-purple-600"
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">Hide while writing</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="word-count"
              className="form-radio text-purple-600"
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">Show on demand</span>
          </label>
        </div>
      )
    },
    {
      id: 'export',
      title: 'Export Format',
      description: 'Default format for exporting stories',
      icon: '📤',
      component: (
        <select className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md">
          <option>Plain Text (.txt)</option>
          <option>Rich Text (.rtf)</option>
          <option>PDF Document (.pdf)</option>
          <option>Markdown (.md)</option>
        </select>
      )
    },
    {
      id: 'backup',
      title: 'Auto Backup',
      description: 'Automatically backup your stories',
      icon: '🔄',
      component: (
        <div className="space-y-3">
          <select className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md">
            <option>Every hour</option>
            <option>Every 12 hours</option>
            <option>Daily</option>
            <option>Weekly</option>
          </select>
          <button className="w-full px-4 py-2 text-sm bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800/40">
            Backup Now
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
          className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600"
        >
          Settings
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Customize your story generation experience
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
                  background: 'linear-gradient(to bottom right, from-pink-600 to-purple-600)',
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
        className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-600 to-purple-600"
      >
        Save Changes
      </motion.button>
    </div>
  );
};

export default SettingsPanel;
