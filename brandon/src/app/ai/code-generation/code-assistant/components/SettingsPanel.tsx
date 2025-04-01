'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Settings {
  model: 'fast' | 'balanced' | 'advanced';
  maxTokens: number;
  comments: boolean;
  typescript: boolean;
  linting: boolean;
  autoFormat: boolean;
  theme: 'light' | 'dark' | 'system';
  editorFont: string;
  indentSize: number;
}

const SettingsPanel: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    model: 'balanced',
    maxTokens: 2048,
    comments: true,
    typescript: true,
    linting: true,
    autoFormat: true,
    theme: 'system',
    editorFont: 'JetBrains Mono',
    indentSize: 2
  });

  const fontOptions = [
    'JetBrains Mono',
    'Fira Code',
    'Source Code Pro',
    'Consolas',
    'Monaco'
  ];

  const handleSettingChange = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600"
        >
          Settings
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Configure your code assistant preferences
        </motion.p>
      </div>

      {/* Settings Grid */}
      <div className="grid gap-6">
        {/* AI Model */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            AI Model
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {['fast', 'balanced', 'advanced'].map(model => (
              <button
                key={model}
                onClick={() => handleSettingChange('model', model as Settings['model'])}
                className={`p-3 rounded-lg border transition-all ${
                  settings.model === model
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-300'
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                <div className="font-medium capitalize">{model}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {model === 'fast' && 'Faster, simpler responses'}
                  {model === 'balanced' && 'Good balance of speed/quality'}
                  {model === 'advanced' && 'Most capable, but slower'}
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Code Generation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Code Generation
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Maximum Response Length
              </label>
              <input
                type="range"
                min="512"
                max="4096"
                step="512"
                value={settings.maxTokens}
                onChange={e => handleSettingChange('maxTokens', parseInt(e.target.value))}
                className="w-full mt-2"
              />
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {settings.maxTokens} tokens
              </div>
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.comments}
                  onChange={e => handleSettingChange('comments', e.target.checked)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Include explanatory comments
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.typescript}
                  onChange={e => handleSettingChange('typescript', e.target.checked)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  TypeScript type annotations
                </span>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Editor Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Editor Preferences
          </h3>
          <div className="grid gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Editor Font
              </label>
              <select
                value={settings.editorFont}
                onChange={e => handleSettingChange('editorFont', e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50"
              >
                {fontOptions.map(font => (
                  <option key={font} value={font}>{font}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Indent Size
              </label>
              <select
                value={settings.indentSize}
                onChange={e => handleSettingChange('indentSize', parseInt(e.target.value))}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50"
              >
                {[2, 4, 8].map(size => (
                  <option key={size} value={size}>{size} spaces</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Additional Features
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.linting}
                onChange={e => handleSettingChange('linting', e.target.checked)}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Enable code linting
              </span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.autoFormat}
                onChange={e => handleSettingChange('autoFormat', e.target.checked)}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Auto-format generated code
              </span>
            </label>
          </div>
        </motion.div>
      </div>

      {/* Save Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-600 to-blue-600"
      >
        Save Changes
      </motion.button>
    </div>
  );
};

export default SettingsPanel;
