'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface DataSource {
  id: string;
  name: string;
  type: 'csv' | 'json' | 'excel' | 'api';
  icon: string;
  description: string;
}

const dataSources: DataSource[] = [
  {
    id: 'csv',
    name: 'CSV File',
    type: 'csv',
    icon: '📄',
    description: 'Import data from a comma-separated values file'
  },
  {
    id: 'json',
    name: 'JSON Data',
    type: 'json',
    icon: '{ }',
    description: 'Import structured data in JSON format'
  },
  {
    id: 'excel',
    name: 'Excel File',
    type: 'excel',
    icon: '📊',
    description: 'Import data from Excel spreadsheets'
  },
  {
    id: 'api',
    name: 'API Endpoint',
    type: 'api',
    icon: '🔌',
    description: 'Connect to a live data source via API'
  }
];

const DataPanel: React.FC = () => {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [dataPreview, setDataPreview] = useState<any[] | null>(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-600"
        >
          Data Management
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Import and manage your data for visualization
        </motion.p>
      </div>

      {/* Data Source Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dataSources.map((source) => (
          <motion.button
            key={source.id}
            whileHover={{ y: -5 }}
            whileTap={{ y: 0 }}
            onClick={() => setSelectedSource(source.id)}
            className={`p-6 rounded-xl text-left transition-all ${
              selectedSource === source.id
                ? 'bg-teal-100 dark:bg-teal-900/40 ring-2 ring-teal-500'
                : 'bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">{source.icon}</div>
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                  {source.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {source.description}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Data Import Interface */}
      {selectedSource && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border-2 border-dashed border-gray-300 dark:border-gray-600">
            <div className="text-center">
              <div className="text-4xl mb-4">📥</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Drop your file here
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                or click to browse your computer
              </p>
              <button className="px-4 py-2 rounded-lg bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-300 font-medium hover:bg-teal-200 dark:hover:bg-teal-800/40">
                Choose File
              </button>
            </div>
          </div>

          {/* Data Validation Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Data Validation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox text-teal-600" />
                <span className="text-gray-700 dark:text-gray-300">
                  Auto-detect data types
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox text-teal-600" />
                <span className="text-gray-700 dark:text-gray-300">
                  Remove empty rows
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox text-teal-600" />
                <span className="text-gray-700 dark:text-gray-300">
                  Standardize headers
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox text-teal-600" />
                <span className="text-gray-700 dark:text-gray-300">
                  Handle missing values
                </span>
              </label>
            </div>
          </div>

          {/* Data Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Data Preview
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    {/* Sample headers */}
                    {['Column 1', 'Column 2', 'Column 3'].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {/* Sample rows */}
                  {[1, 2, 3].map((row) => (
                    <tr key={row}>
                      {[1, 2, 3].map((cell) => (
                        <td
                          key={cell}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                        >
                          Sample data
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-teal-600"
            >
              Import Data
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl font-semibold border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DataPanel;
