'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { ThemeToggle } from './shared/ThemeToggle';

const SettingsPanel: React.FC = () => {
  const { colors, theme } = useTheme();

  const settings = [
    {
      title: 'Theme',
      description: 'Customize the appearance of your virtual assistant interface',
      icon: '🎨',
      component: <ThemeToggle />
    },
    {
      title: 'Language',
      description: 'Select your preferred interaction language',
      icon: '🌍',
      component: (
        <select
          className="mt-2 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500"
          defaultValue="en"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="zh">中文</option>
        </select>
      )
    },
    {
      title: 'Notification Sound',
      description: 'Enable or disable sound notifications',
      icon: '🔔',
      component: (
        <label className="relative inline-flex items-center cursor-pointer mt-2">
          <input type="checkbox" className="sr-only peer" defaultChecked />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Enabled</span>
        </label>
      )
    },
    {
      title: 'Response Speed',
      description: 'Adjust how quickly the assistant responds',
      icon: '⚡',
      component: (
        <div className="mt-2">
          <input 
            type="range" 
            min="1" 
            max="5" 
            defaultValue="3"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>Slower</span>
            <span>Balanced</span>
            <span>Faster</span>
          </div>
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
          className="text-3xl font-bold mb-4 bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`
          }}
        >
          Settings & Preferences
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Customize your virtual assistant experience to match your preferences.
        </motion.p>
      </div>

      {/* Settings Grid */}
      <div className="grid gap-6">
        {settings.map((setting, index) => (
          <motion.div
            key={setting.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-lg"
            style={{
              border: `2px solid ${colors.primary}20`
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{
                  background: colors.primary + '20',
                  color: colors.primary
                }}
              >
                {setting.icon}
              </div>
              <div className="flex-1">
                <h3
                  className="text-lg font-bold mb-1"
                  style={{ color: colors.primary }}
                >
                  {setting.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {setting.description}
                </p>
                {setting.component}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Reset Button */}
      <div className="flex justify-center mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-xl font-bold text-white"
          style={{ background: colors.secondary }}
        >
          Reset to Default Settings
        </motion.button>
      </div>
    </div>
  );
};

export default SettingsPanel;
