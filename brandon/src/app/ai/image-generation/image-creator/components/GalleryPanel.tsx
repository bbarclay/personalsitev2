'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SavedImage {
  id: string;
  prompt: string;
  style: string;
  date: string;
  imageUrl: string;
}

const sampleImages: SavedImage[] = [
  {
    id: '1',
    prompt: 'A futuristic cityscape at sunset',
    style: 'Photorealistic',
    date: '2024-03-29',
    imageUrl: 'https://via.placeholder.com/300/FF0000/FFFFFF?text=Image1'
  },
  {
    id: '2',
    prompt: 'A cute cartoon cat wearing a wizard hat',
    style: 'Cartoon',
    date: '2024-03-28',
    imageUrl: 'https://via.placeholder.com/300/00FF00/FFFFFF?text=Image2'
  },
  {
    id: '3',
    prompt: 'Impressionist painting of a rainy street',
    style: 'Painting',
    date: '2024-03-27',
    imageUrl: 'https://via.placeholder.com/300/0000FF/FFFFFF?text=Image3'
  },
  {
    id: '4',
    prompt: 'Pixel art character for a retro game',
    style: 'Pixel Art',
    date: '2024-03-26',
    imageUrl: 'https://via.placeholder.com/300/FFFF00/000000?text=Image4'
  }
];

const GalleryPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<SavedImage | null>(null);

  const filteredImages = sampleImages.filter(img =>
    img.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    img.style.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
        >
          Image Gallery
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Browse and manage your generated images
        </motion.p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search gallery..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔍
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((img) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedImage(img)}
            className={`cursor-pointer rounded-xl overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 ${
              selectedImage?.id === img.id ? 'ring-2 ring-pink-500' : ''
            }`}
          >
            <img
              src={img.imageUrl}
              alt={img.prompt}
              className="w-full aspect-square object-cover"
            />
            <div className="p-3">
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate mb-1" title={img.prompt}>
                {img.prompt}
              </p>
              <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                <span>{img.style}</span>
                <span>{img.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-4xl mb-4">🖼️</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No images found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or create a new image.
          </p>
        </motion.div>
      )}

      {/* Actions */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 flex justify-between items-center"
        >
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Selected: <span className="font-medium">{selectedImage.prompt}</span>
          </div>
          <div className="space-x-4">
            <button className="px-4 py-2 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 font-medium">
              Download
            </button>
            <button className="px-4 py-2 rounded-lg bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300 font-medium">
              Edit
            </button>
            <button className="px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 font-medium">
              Delete
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GalleryPanel;
