'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

type Sentiment = 'positive' | 'negative' | 'neutral';

interface SentimentResult {
  sentiment: Sentiment;
  score: number;
  keywords: string[];
}

const AnalyzePanel: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SentimentResult | null>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // TODO: Implement actual sentiment analysis logic
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Example result
    const score = Math.random();
    let sentiment: Sentiment;
    if (score > 0.6) sentiment = 'positive';
    else if (score < 0.4) sentiment = 'negative';
    else sentiment = 'neutral';
    
    setResult({
      sentiment,
      score: Math.round(score * 100),
      keywords: ['example', 'analysis', 'text']
    });
    setIsAnalyzing(false);
  };

  const getSentimentColor = (sentiment: Sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 dark:text-green-400';
      case 'negative': return 'text-red-600 dark:text-red-400';
      case 'neutral': return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getSentimentBgColor = (sentiment: Sentiment) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 dark:bg-green-900/40';
      case 'negative': return 'bg-red-100 dark:bg-red-900/40';
      case 'neutral': return 'bg-gray-100 dark:bg-gray-900/40';
    }
  };

  const getSentimentIcon = (sentiment: Sentiment) => {
    switch (sentiment) {
      case 'positive': return '😊';
      case 'negative': return '😠';
      case 'neutral': return '😐';
    }
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
          Analyze Sentiment
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Enter text below to analyze its emotional tone
        </motion.p>
      </div>

      {/* Input Area */}
      <textarea
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        placeholder="Paste or type your text here..."
        className="w-full h-48 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
      />

      {/* Analyze Button */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAnalyze}
          disabled={isAnalyzing || !inputText}
          className={`px-8 py-4 rounded-xl font-semibold text-white ${
            isAnalyzing || !inputText
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-yellow-600 to-orange-600'
          }`}
        >
          {isAnalyzing ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              Analyzing...
            </div>
          ) : (
            'Analyze Sentiment'
          )}
        </motion.button>
      </div>

      {/* Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-xl ${getSentimentBgColor(result.sentiment)} border border-gray-200 dark:border-gray-700`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-xl font-semibold ${getSentimentColor(result.sentiment)}`}>
              Sentiment Result
            </h3>
            <span className={`text-3xl ${getSentimentColor(result.sentiment)}`}>
              {getSentimentIcon(result.sentiment)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sentiment Score */}
            <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Overall Sentiment
              </div>
              <div className={`text-2xl font-bold capitalize ${getSentimentColor(result.sentiment)}`}>
                {result.sentiment}
              </div>
            </div>

            {/* Confidence Score */}
            <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Confidence Score
              </div>
              <div className={`text-2xl font-bold ${getSentimentColor(result.sentiment)}`}>
                {result.score}%
              </div>
            </div>
          </div>

          {/* Keywords */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Key Sentiment Words
            </h4>
            <div className="flex flex-wrap gap-2">
              {result.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className={`px-3 py-1 rounded-full text-sm ${getSentimentBgColor(result.sentiment)} ${getSentimentColor(result.sentiment)}`}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AnalyzePanel;
