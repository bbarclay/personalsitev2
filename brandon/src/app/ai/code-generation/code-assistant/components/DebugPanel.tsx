'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type Language = 'javascript' | 'python' | 'java' | 'csharp' | 'html' | 'css';

interface DebugResult {
  errorFound: boolean;
  errorMessage?: string;
  suggestion?: string;
  fixedCode?: string;
}

const DebugPanel: React.FC = () => {
  const [codeToDebug, setCodeToDebug] = useState('');
  const [language, setLanguage] = useState<Language>('javascript');
  const [errorContext, setErrorContext] = useState('');
  const [isDebugging, setIsDebugging] = useState(false);
  const [debugResult, setDebugResult] = useState<DebugResult | null>(null);

  const languages: { value: Language; label: string }[] = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' }
  ];

  const handleDebug = async () => {
    setIsDebugging(true);
    // TODO: Implement actual code debugging logic
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Example result (simulating finding an error)
    setDebugResult({
      errorFound: true,
      errorMessage: 'TypeError: Cannot read property \'name\' of undefined',
      suggestion: 'Check if the object exists before accessing its properties. You might need to add a null check or ensure the object is initialized correctly.',
      fixedCode: `function greet(user) {\n  if (user && user.name) {\n    console.log(\`Hello, \${user.name}!\`);\n  } else {\n    console.log('Hello there!');\n  }\n}\n\n// Example usage:\ngreet({ name: 'Alice' });\ngreet(null);`
    });
    setIsDebugging(false);
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
          Debug Code
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Paste your code and error message to get debugging help
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
        value={codeToDebug}
        onChange={e => setCodeToDebug(e.target.value)}
        placeholder="Paste the code snippet you want to debug..."
        className="w-full h-48 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono text-sm"
      />

      {/* Error Context Input */}
      <textarea
        value={errorContext}
        onChange={e => setErrorContext(e.target.value)}
        placeholder="Provide the error message or describe the issue..."
        className="w-full h-24 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 focus:border-transparent"
      />

      {/* Debug Button */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDebug}
          disabled={isDebugging || !codeToDebug}
          className={`px-8 py-4 rounded-xl font-semibold text-white ${
            isDebugging || !codeToDebug
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-600 to-blue-600'
          }`}
        >
          {isDebugging ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              Debugging...
            </div>
          ) : (
            'Debug Code'
          )}
        </motion.button>
      </div>

      {/* Debugging Result */}
      {debugResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700"
        >
          <h3 className="text-lg font-semibold mb-4 text-red-800 dark:text-red-200">
            Debugging Analysis
          </h3>
          {debugResult.errorFound ? (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-red-700 dark:text-red-300 mb-1">Error Message:</h4>
                <p className="text-sm text-red-600 dark:text-red-400 font-mono bg-red-100 dark:bg-red-800/30 p-2 rounded">
                  {debugResult.errorMessage}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-red-700 dark:text-red-300 mb-1">Suggestion:</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">{debugResult.suggestion}</p>
              </div>
              {debugResult.fixedCode && (
                <div>
                  <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">Suggested Fix:</h4>
                  <div className="p-4 rounded-lg bg-gray-900 border border-gray-700">
                    <SyntaxHighlighter language={language} style={vscDarkPlus} customStyle={{ background: 'transparent', padding: 0 }}>
                      {debugResult.fixedCode}
                    </SyntaxHighlighter>
                  </div>
                  <button className="mt-2 px-3 py-1 text-xs rounded-md bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300 font-medium">
                    Apply Fix
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-green-700 dark:text-green-300">No obvious errors found. The code seems syntactically correct.</p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default DebugPanel;
