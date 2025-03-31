'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ImageStyle {
  id: string;
  name: string;
  description: string;
  icon: string;
  previewUrl: string;
  tags: string[];
}

const styles: ImageStyle[] = [
  {
    id: 'photorealistic',
    name: 'Photorealistic',
    description: 'Creates images that look like real photographs',
    icon: '📷',
    previewUrl: 'https://via.placeholder.com/300/FF5733/FFFFFF?text=Photo',
    tags: ['realistic', 'photo', 'detailed']
  },
  {
    id: 'cartoon',
    name: 'Cartoon',
    description: 'Generates images in a cartoonish, illustrated style',
    icon: '✏️',
    previewUrl: 'https://via.placeholder.com/300/33FF57/FFFFFF?text=Cartoon',
    tags: ['illustration', 'drawing', 'fun']
  },
  {
    id: 'painting',
    name: 'Painting',
    description: 'Mimics various painting styles like oil, watercolor, etc.',
    icon: '🎨',
    previewUrl: 'https://via.placeholder.com/300/3357FF/FFFFFF?text=Painting',
    tags: ['artistic', 'brushstrokes', 'classic']
  },
  {
    id: 'pixel-art',
    name: 'Pixel Art',
    description: 'Creates images in a retro, pixelated style',
    icon: '👾',
    previewUrl: 'https://via.placeholder.com/300/FFFF33/000000?text=Pixel',
    tags: ['retro', '8-bit', 'gaming']
  },
  {
    id: '3d-render',
    name: '3D Render',
    description: 'Generates images that look like 3D models',
    icon: '🧊',
    previewUrl: 'https://via.placeholder.com/300/FF33FF/FFFFFF?text=3D',
    tags: ['cgi', 'digital', 'modern']
  },
  {
    id: 'anime',
    name: 'Anime',
    description: 'Creates images in Japanese animation style',
    icon: '🌸',
    previewUrl: 'https://via.placeholder.com/300/33FFFF/000000?text=Anime',
    tags: ['manga', 'japanese', 'animation']
  }
];

const StylesPanel: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState<ImageStyle | null>(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
        >
          Explore Styles
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Discover different artistic styles for your image generation
        </motion.p>
      </div>

      {/* Styles Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {styles.map((style) => (
          <motion.div
            key={style.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedStyle(style)}
            className={`cursor-pointer rounded-xl overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 ${
              selectedStyle?.id === style.id ? 'ring-2 ring-rose-500' : ''
            }`}
          >
            <img
              src={style.previewUrl}
              alt={`${style.name} style preview`}
              className="w-full aspect-video object-cover"
            />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{style.icon}</span>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  {style.name}
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {style.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {style.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded text-xs bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Style Action */}
      {selectedStyle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 flex justify-between items-center"
        >
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Selected Style: <span className="font-medium">{selectedStyle.name}</span>
          </div>
          <button className="px-4 py-2 rounded-lg bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-300 font-medium">
            Use This Style
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default StylesPanel;
