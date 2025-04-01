'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type Language = 'javascript' | 'python' | 'java' | 'csharp' | 'html' | 'css';

interface GenerationOptions {
  language: Language;
  prompt: string;
  context?: string;
}

const GeneratePanel: React.FC = () => {
  const [options, setOptions] = useState<GenerationOptions>({
    language: 'javascript',
    prompt: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  const languages: { value: Language; label: string }[] = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    // TODO: Implement actual code generation logic
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Example generated code
    let code = '';
    switch (options.language) {
      case 'javascript':
        code = `function greet(name) {\n  console.log(\`Hello, \${name}!\`);\n}\ngreet('World');`;
        break;
      case 'python':
        code = `def greet(name):\n  print(f"Hello, {name}!")\n\ngreet("World")`;
        break;
      default:
        code = `// Generated code for ${options.language}`;
    }
    setGeneratedCode(code);
    setIsGenerating(false);
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
          Generate Code
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Describe the code you want to generate
        </motion.p>
      </div>

      {/* Language Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Programming Language
        </label>
        <select
          value={options.language}
          onChange={e => setOptions(prev => ({ ...prev, language: e.target.value as Language }))}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50"
        >
          {languages.map(lang => (
            <option key={lang.value} value={lang.value}>{lang.label}</option>
          ))}
        </select>
      </div>

      {/* Prompt Input */}
      <textarea
        value={options.prompt}
        onChange={e => setOptions(prev => ({ ...prev, prompt: e.target.value }))}
        placeholder="Enter your code generation prompt (e.g., 'Create a function to calculate factorial')"
        className="w-full h-32 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />

      {/* Context Input (Optional) */}
      <textarea
        value={options.context}
        onChange={e => setOptions(prev => ({ ...prev, context: e.target.value }))}
        placeholder="Provide context (optional - e.g., existing code, requirements)"
        className="w-full h-24 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />

      {/* Generate Button */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGenerate}
          disabled={isGenerating || !options.prompt}
          className={`px-8 py-4 rounded-xl font-semibold text-white ${
            isGenerating || !options.prompt
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-600 to-blue-600'
          }`}
        >
          {isGenerating ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              Generating Code...
            </div>
          ) : (
            'Generate Code'
          )}
        </motion.button>
      </div>

      {/* Generated Code */}
      {generatedCode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-4 rounded-xl bg-gray-900 border border-gray-700"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-200">
            Generated Code
          </h3>
          <SyntaxHighlighter language={options.language} style={vscDarkPlus} customStyle={{ background: 'transparent', padding: 0 }}>
            {generatedCode}
          </SyntaxHighlighter>
          <div className="mt-4 flex justify-end gap-4">
            <button className="px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300 font-medium">
              Copy Code
            </button>
            <button className="px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-medium">
              Explain Code
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GeneratePanel;
