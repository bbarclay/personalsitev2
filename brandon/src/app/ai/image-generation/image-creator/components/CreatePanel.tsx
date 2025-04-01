'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

type ImageStyle = 'photorealistic' | 'cartoon' | 'painting' | 'pixel-art' | '3d-render';
type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

interface ImageOptions {
  prompt: string;
  negativePrompt?: string;
  style: ImageStyle;
  aspectRatio: AspectRatio;
  resolution: number;
}

const CreatePanel: React.FC = () => {
  const [options, setOptions] = useState<ImageOptions>({
    prompt: '',
    style: 'photorealistic',
    aspectRatio: '1:1',
    resolution: 1024
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const styles: { value: ImageStyle; label: string; icon: string }[] = [
    { value: 'photorealistic', label: 'Photo', icon: '📷' },
    { value: 'cartoon', label: 'Cartoon', icon: '✏️' },
    { value: 'painting', label: 'Painting', icon: '🎨' },
    { value: 'pixel-art', label: 'Pixel Art', icon: '👾' },
    { value: '3d-render', label: '3D Render', icon: '🧊' }
  ];

  const aspectRatios: { value: AspectRatio; label: string; icon: string }[] = [
    { value: '1:1', label: 'Square', icon: '⬛' },
    { value: '16:9', label: 'Wide', icon: '▬' },
    { value: '9:16', label: 'Tall', icon: '▮' },
    { value: '4:3', label: 'Landscape', icon: '▭' },
    { value: '3:4', label: 'Portrait', icon: '▯' }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    // TODO: Implement actual image generation logic
    await new Promise(resolve => setTimeout(resolve, 3000));
    // Placeholder image URL
    setGeneratedImage('https://via.placeholder.com/1024');
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
        >
          Create Your Image
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Describe the image you want to create
        </motion.p>
      </div>

      {/* Prompt Input */}
      <textarea
        value={options.prompt}
        onChange={e => setOptions(prev => ({ ...prev, prompt: e.target.value }))}
        placeholder="Enter your image description (e.g., 'A futuristic cityscape at sunset')"
        className="w-full h-32 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />

      {/* Negative Prompt (Optional) */}
      <textarea
        value={options.negativePrompt}
        onChange={e => setOptions(prev => ({ ...prev, negativePrompt: e.target.value }))}
        placeholder="Negative prompt (optional - things to avoid)"
        className="w-full h-16 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />

      {/* Style Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Image Style
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {styles.map(style => (
            <button
              key={style.value}
              onClick={() => setOptions(prev => ({ ...prev, style: style.value }))}
              className={`p-3 rounded-xl transition-all ${
                options.style === style.value
                  ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 ring-2 ring-purple-500'
                  : 'bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50'
              }`}
            >
              <div className="text-xl mb-1">{style.icon}</div>
              <div className="font-medium text-sm">{style.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Aspect Ratio & Resolution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Aspect Ratio
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {aspectRatios.map(ratio => (
              <button
                key={ratio.value}
                onClick={() => setOptions(prev => ({ ...prev, aspectRatio: ratio.value }))}
                className={`p-2 rounded-lg transition-all ${
                  options.aspectRatio === ratio.value
                    ? 'bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300 ring-2 ring-pink-500'
                    : 'bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
              >
                <div className="text-lg">{ratio.icon}</div>
                <div className="text-xs mt-1">{ratio.label}</div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Resolution
          </h3>
          <input
            type="range"
            min="512"
            max="2048"
            step="256"
            value={options.resolution}
            onChange={e => setOptions(prev => ({ ...prev, resolution: parseInt(e.target.value) }))}
            className="w-full"
          />
          <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-1">
            {options.resolution} x {options.resolution}
          </div>
        </div>
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
              : 'bg-gradient-to-r from-purple-600 to-pink-600'
          }`}
        >
          {isGenerating ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              Generating Image...
            </div>
          ) : (
            'Generate Image'
          )}
        </motion.button>
      </div>

      {/* Generated Image */}
      {generatedImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Generated Image
          </h3>
          <img
            src={generatedImage}
            alt="Generated AI image"
            className="w-full rounded-lg"
          />
          <div className="mt-4 flex justify-end gap-4">
            <button className="px-4 py-2 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 font-medium">
              Download
            </button>
            <button className="px-4 py-2 rounded-lg bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300 font-medium">
              Save to Gallery
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CreatePanel;
