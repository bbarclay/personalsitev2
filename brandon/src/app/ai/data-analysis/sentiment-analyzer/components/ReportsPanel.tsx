'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

type ReportType = 'summary' | 'detailed' | 'comparison';
type TimeFrame = 'last-day' | 'last-week' | 'last-month' | 'custom';

interface ReportOptions {
  type: ReportType;
  timeFrame: TimeFrame;
  customStartDate?: string;
  customEndDate?: string;
  includeKeywords: boolean;
  includeScoreDistribution: boolean;
}

const ReportsPanel: React.FC = () => {
  const [options, setOptions] = useState<ReportOptions>({
    type: 'summary',
    timeFrame: 'last-week',
    includeKeywords: true,
    includeScoreDistribution: true
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    // TODO: Implement actual report generation logic
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGeneratedReport("Sentiment analysis report generated successfully...");
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-orange-600"
        >
          Generate Reports
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Create detailed reports based on your sentiment analysis history
        </motion.p>
      </div>

      {/* Report Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Report Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Report Type
          </label>
          <select
            value={options.type}
            onChange={e => setOptions(prev => ({ ...prev, type: e.target.value as ReportType }))}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50"
          >
            <option value="summary">Summary Report</option>
            <option value="detailed">Detailed Analysis</option>
            <option value="comparison">Comparison Report</option>
          </select>
        </div>

        {/* Time Frame */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Time Frame
          </label>
          <select
            value={options.timeFrame}
            onChange={e => setOptions(prev => ({ ...prev, timeFrame: e.target.value as TimeFrame }))}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50"
          >
            <option value="last-day">Last 24 Hours</option>
            <option value="last-week">Last 7 Days</option>
            <option value="last-month">Last 30 Days</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        {/* Custom Date Range */}
        {options.timeFrame === 'custom' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={options.customStartDate}
                onChange={e => setOptions(prev => ({ ...prev, customStartDate: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={options.customEndDate}
                onChange={e => setOptions(prev => ({ ...prev, customEndDate: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50"
              />
            </div>
          </>
        )}

        {/* Include Options */}
        <div className="md:col-span-2 space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options.includeKeywords}
              onChange={e => setOptions(prev => ({ ...prev, includeKeywords: e.target.checked }))}
              className="form-checkbox text-amber-600"
            />
            <span className="text-gray-700 dark:text-gray-300">Include keyword analysis</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options.includeScoreDistribution}
              onChange={e => setOptions(prev => ({ ...prev, includeScoreDistribution: e.target.checked }))}
              className="form-checkbox text-amber-600"
            />
            <span className="text-gray-700 dark:text-gray-300">Include score distribution chart</span>
          </label>
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className={`px-8 py-4 rounded-xl font-semibold text-white ${
            isGenerating
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-yellow-600 to-orange-600'
          }`}
        >
          {isGenerating ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              Generating Report...
            </div>
          ) : (
            'Generate Report'
          )}
        </motion.button>
      </div>

      {/* Generated Report Preview */}
      {generatedReport && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Generated Report
          </h3>
          <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-gray-600 dark:text-gray-400">
            {/* Placeholder for report content/chart */}
            Report preview will appear here. {generatedReport}
          </div>
          <div className="mt-4 flex justify-end gap-4">
            <button className="px-4 py-2 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300 font-medium">
              Download PDF
            </button>
            <button className="px-4 py-2 rounded-lg bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-300 font-medium">
              Share Report
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ReportsPanel;
