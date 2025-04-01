'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface StoryTemplate {
  id: string;
  title: string;
  description: string;
  genre: string;
  icon: string;
  color: string;
  prompt: string;
  structure: string[];
}

const templates: StoryTemplate[] = [
  {
    id: 'heroes-journey',
    title: 'Hero\'s Journey',
    description: 'The classic monomyth structure for epic adventures',
    genre: 'Fantasy/Adventure',
    icon: '⚔️',
    color: 'from-amber-500 to-orange-500',
    prompt: 'A reluctant hero must leave their ordinary world to face extraordinary challenges...',
    structure: [
      'Ordinary World',
      'Call to Adventure',
      'Meeting the Mentor',
      'Crossing the Threshold',
      'Tests and Trials',
      'Approaching the Cave',
      'The Ordeal',
      'The Return'
    ]
  },
  {
    id: 'mystery-solver',
    title: 'Mystery Solver',
    description: 'A structured approach to crafting engaging mysteries',
    genre: 'Mystery',
    icon: '🔍',
    color: 'from-indigo-500 to-blue-500',
    prompt: 'A detective discovers a puzzling clue that leads to an unexpected truth...',
    structure: [
      'The Crime',
      'The Investigation Begins',
      'Red Herrings',
      'Key Evidence',
      'The Twist',
      'The Resolution'
    ]
  },
  {
    id: 'love-story',
    title: 'Love Story',
    description: 'A romantic journey of two hearts coming together',
    genre: 'Romance',
    icon: '💝',
    color: 'from-pink-500 to-rose-500',
    prompt: 'Two unlikely souls cross paths and discover an undeniable connection...',
    structure: [
      'First Meeting',
      'Growing Connection',
      'Complication',
      'Internal Struggle',
      'Resolution',
      'Happy Ever After'
    ]
  },
  {
    id: 'time-loop',
    title: 'Time Loop',
    description: 'A character relives the same day with a twist',
    genre: 'Sci-Fi',
    icon: '🔄',
    color: 'from-cyan-500 to-teal-500',
    prompt: 'Every morning they wake up to the same day, but something is different each time...',
    structure: [
      'The Loop Begins',
      'Understanding the Rules',
      'Failed Attempts',
      'Pattern Recognition',
      'Personal Growth',
      'Breaking Free'
    ]
  },
  {
    id: 'ghost-story',
    title: 'Ghost Story',
    description: 'A spine-chilling tale of supernatural encounters',
    genre: 'Horror',
    icon: '👻',
    color: 'from-violet-500 to-purple-500',
    prompt: 'Strange occurrences lead to the discovery of a haunting presence...',
    structure: [
      'First Signs',
      'Growing Dread',
      'Supernatural Contact',
      'Dark Secret',
      'Confrontation',
      'The Aftermath'
    ]
  }
];

const TemplatesPanel: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<StoryTemplate | null>(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600"
        >
          Story Templates
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Choose from our curated collection of story structures to kickstart your writing
        </motion.p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedTemplate(template)}
            className={`cursor-pointer p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 transition-all ${
              selectedTemplate?.id === template.id
                ? 'ring-2 ring-purple-500'
                : 'hover:shadow-lg'
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{
                  background: `linear-gradient(to bottom right, ${template.color})`,
                  color: 'white'
                }}
              >
                {template.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100">
                  {template.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {template.description}
                </p>
                <div className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  {template.genre}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Template Details */}
      {selectedTemplate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Story Structure
          </h3>
          <div className="space-y-4">
            {selectedTemplate.structure.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-white"
                  style={{
                    background: `linear-gradient(to bottom right, ${selectedTemplate.color})`
                  }}
                >
                  {index + 1}
                </div>
                <div className="text-gray-700 dark:text-gray-300">{step}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              Suggested Prompt
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {selectedTemplate.prompt}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 w-full py-3 rounded-xl font-semibold text-white"
            style={{
              background: `linear-gradient(to right, ${selectedTemplate.color})`
            }}
          >
            Use This Template
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default TemplatesPanel;
