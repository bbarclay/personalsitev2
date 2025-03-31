'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

type Genre = 'fantasy' | 'sci-fi' | 'mystery' | 'romance' | 'horror' | 'adventure';
type Length = 'short' | 'medium' | 'long';
type Style = 'descriptive' | 'dialogue-heavy' | 'action-packed' | 'poetic' | 'minimalist';

interface StoryOptions {
  genre: Genre;
  length: Length;
  style: Style;
  prompt: string;
}

const CreatePanel: React.FC = () => {
  const [options, setOptions] = useState<StoryOptions>({
    genre: 'fantasy',
    length: 'medium',
    style: 'descriptive',
    prompt: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStory, setGeneratedStory] = useState<string | null>(null);

  const genres: { value: Genre; label: string; icon: string }[] = [
    { value: 'fantasy', label: 'Fantasy', icon: '🧙‍♂️' },
    { value: 'sci-fi', label: 'Science Fiction', icon: '🚀' },
    { value: 'mystery', label: 'Mystery', icon: '🔍' },
    { value: 'romance', label: 'Romance', icon: '💝' },
    { value: 'horror', label: 'Horror', icon: '👻' },
    { value: 'adventure', label: 'Adventure', icon: '🌄' }
  ];

  const lengths: { value: Length; label: string; description: string }[] = [
    { value: 'short', label: 'Short', description: '~500 words' },
    { value: 'medium', label: 'Medium', description: '~1500 words' },
    { value: 'long', label: 'Long', description: '~3000 words' }
  ];

  const styles: { value: Style; label: string; icon: string }[] = [
    { value: 'descriptive', label: 'Descriptive', icon: '🎨' },
    { value: 'dialogue-heavy', label: 'Dialogue-Heavy', icon: '💭' },
    { value: 'action-packed', label: 'Action-Packed', icon: '💥' },
    { value: 'poetic', label: 'Poetic', icon: '🎭' },
    { value: 'minimalist', label: 'Minimalist', icon: '⚪' }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    // TODO: Implement actual story generation logic
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGeneratedStory("Once upon a time in a realm beyond imagination...");
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8">
      {/* Genre Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Choose Genre
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {genres.map(genre => (
            <button
              key={genre.value}
              onClick={() => setOptions(prev => ({ ...prev, genre: genre.value }))}
              className={`p-4 rounded-xl transition-all ${
                options.genre === genre.value
                  ? 'bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300 ring-2 ring-pink-500'
                  : 'bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50'
              }`}
            >
              <div className="text-2xl mb-2">{genre.icon}</div>
              <div className="font-medium">{genre.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Length Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Story Length
        </h3>
        <div className="flex gap-4">
          {lengths.map(length => (
            <button
              key={length.value}
              onClick={() => setOptions(prev => ({ ...prev, length: length.value }))}
              className={`flex-1 p-4 rounded-xl transition-all ${
                options.length === length.value
                  ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 ring-2 ring-purple-500'
                  : 'bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50'
              }`}
            >
              <div className="font-medium mb-1">{length.label}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {length.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Writing Style */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Writing Style
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {styles.map(style => (
            <button
              key={style.value}
              onClick={() => setOptions(prev => ({ ...prev, style: style.value }))}
              className={`p-3 rounded-xl transition-all ${
                options.style === style.value
                  ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 ring-2 ring-indigo-500'
                  : 'bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50'
              }`}
            >
              <div className="text-xl mb-1">{style.icon}</div>
              <div className="font-medium text-sm">{style.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Prompt Input */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Story Prompt
        </h3>
        <textarea
          value={options.prompt}
          onChange={e => setOptions(prev => ({ ...prev, prompt: e.target.value }))}
          placeholder="Describe your story idea or provide a prompt..."
          className="w-full h-32 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        />
      </div>

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
              : 'bg-gradient-to-r from-pink-600 to-purple-600'
          }`}
        >
          {isGenerating ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              Generating Story...
            </div>
          ) : (
            'Generate Story'
          )}
        </motion.button>
      </div>

      {/* Generated Story */}
      {generatedStory && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Your Generated Story
          </h3>
          <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
            {generatedStory}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default CreatePanel;
