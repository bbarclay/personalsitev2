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
      id: 'resolution',
      title: 'Default Resolution',
      description: 'Set the default image size for generation',
      icon: '📏',
      component: (
        <select className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
          <option>1024x1024</option>
          <option>512x512</option>
          <option>2048x2048</option>
        </select>
      )
    },
    {
      id: 'quality',
      title: 'Image Quality',
      description: 'Adjust the balance between generation speed and image quality',
      icon: '🌟',
      component: (
        <div className="space-y-2">
          <input type="range" min="1" max="5" defaultValue="3" className="w-full" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Faster</span>
            <span>Balanced</span>
            <span>Higher Quality</span>
          </div>
        </div>
      )
    },
    {
      id: 'format',
      title: 'Default Format',
      description: 'Choose the default file format for saving images',
      icon: '💾',
      component: (
        <div className="grid grid-cols-3 gap-2">
          {['PNG', 'JPEG', 'WEBP'].map(format => (
            <button
              key={format}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {format}
            </button>
          ))}
        </div>
      )
    },
    {
      id: 'privacy',
      title: 'Privacy Settings',
      description: 'Control how your generated images are handled',
      icon: '🔒',
      component: (
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox text-purple-600" />
            <span className="text-gray-700 dark:text-gray-300">Allow use for model training</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox text-purple-600" defaultChecked />
            <span className="text-gray-700 dark:text-gray-300">Save images to gallery automatically</span>
          </label>
        </div>
      )
    },
    {
      id: 'watermark',
      title: 'Watermark',
      description: 'Add a custom watermark to generated images',
      icon: '💧',
      component: (
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox text-purple-600" />
            <span className="text-gray-700 dark:text-gray-300">Enable watermark</span>
          </label>
          <input
            type="text"
            placeholder="Enter watermark text"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50"
          />
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
          className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
        >
          Settings
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Configure your image generation preferences
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
                  background: 'linear-gradient(to bottom right, from-purple-600 to-pink-600)',
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
        className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600"
      >
        Save Changes
      </motion.button>
    </div>
  );
};

export default SettingsPanel;
