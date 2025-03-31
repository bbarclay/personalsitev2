'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const features = [
  {
    title: 'Natural Language Processing',
    description: 'Advanced NLP capabilities for understanding and responding to user queries naturally',
    emoji: '🧠',
    color: 'blue'
  },
  {
    title: 'Personality Customization',
    description: 'Customize your bot\'s personality, tone, and response style',
    emoji: '🎭',
    color: 'purple'
  },
  {
    title: 'Multi-turn Conversations',
    description: 'Maintain context across multiple messages for more meaningful interactions',
    emoji: '💬',
    color: 'green'
  },
  {
    title: 'Knowledge Base Integration',
    description: 'Connect to external knowledge sources for accurate and up-to-date responses',
    emoji: '📚',
    color: 'yellow'
  },
  {
    title: 'Sentiment Analysis',
    description: 'Understand and respond appropriately to user emotions',
    emoji: '❤️',
    color: 'red'
  },
  {
    title: 'Multi-language Support',
    description: 'Communicate with users in multiple languages',
    emoji: '🌍',
    color: 'cyan'
  }
];

const FeatureCard: React.FC<{
  feature: typeof features[0];
  index: number;
  colors: Record<string, string>;
}> = ({ feature, index, colors }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-lg"
      style={{
        border: `2px solid ${colors[feature.color as keyof typeof colors]}20`
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
          style={{
            background: colors[feature.color as keyof typeof colors] + '20',
            color: colors[feature.color as keyof typeof colors]
          }}
        >
          {feature.emoji}
        </div>
        <div>
          <h3
            className="text-lg font-bold mb-2"
            style={{ color: colors[feature.color as keyof typeof colors] }}
          >
            {feature.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturesPanel: React.FC = () => {
  const { colors } = useTheme();

  const themeColors = {
    blue: colors.primary,
    purple: colors.secondary,
    green: colors.accent,
    yellow: '#FFB224',
    red: '#FF4B4B',
    cyan: '#22D3EE'
  };

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-4 bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`
          }}
        >
          Powerful Features
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Our virtual assistant comes packed with advanced capabilities to provide
          the best possible user experience. Explore the features below to see
          what makes our assistant special.
        </motion.p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            feature={feature}
            index={index}
            colors={themeColors}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturesPanel;
