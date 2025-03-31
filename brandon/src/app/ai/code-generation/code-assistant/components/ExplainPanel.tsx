'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type Language = 'javascript' | 'python' | 'java' | 'csharp' | 'html' | 'css';

const ExplainPanel: React.FC = () => {
  const [codeToExplain, setCodeToExplain] = useState('');
  const [language, setLanguage] = useState<Language>('javascript');
  const [isExplaining, setIsExplaining] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);

  const languages: { value: Language; label: string }[] = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' }
  ];

  const handleExplain = async () => {
    setIsExplaining(true);
    // TODO: Implement actual code explanation logic
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Example explanation
    setExplanation(`This code snippet defines a function called 'greet' that takes one argument 'name'.\n\nInside the function:\n- It uses console.log() to print a greeting message to the console.\n- It uses a template literal (\`) to embed the 'name' variable within the string.\n\nFinally, the code calls the 'greet' function with the argument 'World', which will print "Hello, World!" to the console.`);
    setIsExplaining(false);
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
          Explain Code
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Paste your code below to get an explanation
        </motion.p>
      </div>

      {/* Language Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Programming Language
        </label>
        <select
          value={language}
          onChange={e => setLanguage(e.target.value as Language)}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50"
        >
          {languages.map(lang => (
            <option key={lang.value} value={lang.value}>{lang.label}</option>
          ))}
        </select>
      </div>

      {/* Code Input Area */}
      <textarea
        value={codeToExplain}
        onChange={e => setCodeToExplain(e.target.value)}
        placeholder="Paste your code snippet here..."
        className="w-full h-48 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
      />

      {/* Explain Button */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExplain}
          disabled={isExplaining || !codeToExplain}
          className={`px-8 py-4 rounded-xl font-semibold text-white ${
            isExplaining || !codeToExplain
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-600 to-blue-600'
          }`}
        >
          {isExplaining ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              Explaining...
            </div>
          ) : (
            'Explain Code'
          )}
        </motion.button>
      </div>

      {/* Explanation Output */}
      {explanation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700"
        >
          <h3 className="text-lg font-semibold mb-4 text-blue-800 dark:text-blue-200">
            Code Explanation
          </h3>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="whitespace-pre-line">{explanation}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ExplainPanel;
