import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface BotPart {
  id: string;
  name: string;
  options: {
    id: string;
    name: string;
    emoji: string;
    description: string;
  }[];
}

const botParts: BotPart[] = [
  {
    id: 'head',
    name: 'Head Module',
    options: [
      { id: 'standard', name: 'Standard', emoji: '🤖', description: 'All-purpose AI processor with basic learning capabilities' },
      { id: 'advanced', name: 'Advanced', emoji: '🧠', description: 'Enhanced neural network with multilingual support' },
      { id: 'premium', name: 'Premium', emoji: '✨', description: 'Quantum computing core with advanced pattern recognition' }
    ]
  },
  {
    id: 'personality',
    name: 'Personality Core',
    options: [
      { id: 'friendly', name: 'Friendly', emoji: '😊', description: 'Approachable and helpful disposition' },
      { id: 'professional', name: 'Professional', emoji: '👔', description: 'Formal and business-oriented interactions' },
      { id: 'witty', name: 'Witty', emoji: '😏', description: 'Humorous and engaging conversational style' }
    ]
  },
  {
    id: 'voice',
    name: 'Voice Module',
    options: [
      { id: 'synthetic', name: 'Synthetic', emoji: '🔊', description: 'Classic robotic voice with customizable pitch' },
      { id: 'natural', name: 'Natural', emoji: '🗣️', description: 'Human-like speech patterns with emotional inflection' },
      { id: 'adaptive', name: 'Adaptive', emoji: '🎭', description: 'Context-aware voice that matches user tone' }
    ]
  }
];

export const BotBuilder3D: React.FC = () => {
  const { colors } = useTheme();
  const [selectedParts, setSelectedParts] = useState<Record<string, string>>({
    head: 'standard',
    personality: 'friendly',
    voice: 'synthetic'
  });
  const [activeTab, setActiveTab] = useState<string>('head');
  const [rotationY, setRotationY] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  
  // Auto-rotate effect
  useEffect(() => {
    let rotateInterval: NodeJS.Timeout;
    
    if (isRotating) {
      rotateInterval = setInterval(() => {
        setRotationY(prev => (prev + 5) % 360);
      }, 100);
    }
    
    return () => {
      if (rotateInterval) clearInterval(rotateInterval);
    };
  }, [isRotating]);
  
  const handlePartSelect = (partId: string, optionId: string) => {
    setSelectedParts(prev => ({
      ...prev,
      [partId]: optionId
    }));
  };
  
  const getSelectedOption = (partId: string) => {
    const part = botParts.find(p => p.id === partId);
    if (!part) return null;
    
    return part.options.find(o => o.id === selectedParts[partId]) || part.options[0];
  };
  
  const botPartColors = {
    head: colors.primary,
    personality: colors.secondary,
    voice: colors.accent
  };
  
  const toggleRotation = () => {
    setIsRotating(!isRotating);
  };

  return (
    <div className="space-y-8">
      {/* 3D Bot Viewer */}
      <div 
        className="relative h-64 rounded-xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}20, ${colors.neon}20)`,
          border: `2px solid ${colors.primary}`
        }}
      >
        <motion.div
          animate={{ rotateY: rotationY }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative w-32 h-32">
            {/* Head */}
            <motion.div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 text-5xl"
              whileHover={{ scale: 1.1 }}
              style={{ filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.2))' }}
            >
              {getSelectedOption('head')?.emoji}
            </motion.div>
            
            {/* Body */}
            <motion.div
              className="absolute top-12 left-1/2 transform -translate-x-1/2 text-6xl"
              whileHover={{ scale: 1.1 }}
            >
              {getSelectedOption('personality')?.emoji}
            </motion.div>
            
            {/* Voice */}
            <motion.div
              className="absolute top-24 left-1/2 transform -translate-x-1/2 text-3xl"
              whileHover={{ scale: 1.1 }}
              animate={{
                scale: [1, 1.1, 1],
                transition: { repeat: Infinity, duration: 2 }
              }}
            >
              {getSelectedOption('voice')?.emoji}
            </motion.div>
          </div>
        </motion.div>
        
        {/* Rotation Control */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleRotation}
          className="absolute bottom-4 right-4 p-2 rounded-full"
          style={{
            background: colors.neon + '40',
            color: colors.neon,
            border: `1px solid ${colors.neon}`
          }}
        >
          {isRotating ? '⏹️' : '🔄'}
        </motion.button>
      </div>
      
      {/* Part Selection Tabs */}
      <div className="flex border-b" style={{ borderColor: colors.accent + '40' }}>
        {botParts.map((part) => (
          <motion.button
            key={part.id}
            whileHover={{ y: -2 }}
            whileTap={{ y: 1 }}
            className="px-4 py-2 border-b-2"
            style={{
              borderColor: activeTab === part.id ? botPartColors[part.id as keyof typeof botPartColors] : 'transparent',
              color: activeTab === part.id ? botPartColors[part.id as keyof typeof botPartColors] : colors.text
            }}
            onClick={() => setActiveTab(part.id)}
          >
            {part.name}
          </motion.button>
        ))}
      </div>
      
      {/* Options for selected part */}
      <div className="space-y-4">
        {botParts.find(p => p.id === activeTab)?.options.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 rounded-lg cursor-pointer flex items-center"
            style={{
              background: selectedParts[activeTab] === option.id ? 
                botPartColors[activeTab as keyof typeof botPartColors] + '20' : 
                colors.background,
              border: `1px solid ${selectedParts[activeTab] === option.id ? 
                botPartColors[activeTab as keyof typeof botPartColors] : 
                colors.text + '30'}`
            }}
            onClick={() => handlePartSelect(activeTab, option.id)}
          >
            <div className="text-3xl mr-4">{option.emoji}</div>
            <div>
              <div className="font-bold" style={{ color: colors.text }}>
                {option.name}
                {selectedParts[activeTab] === option.id && 
                  <span className="ml-2 text-sm" style={{ color: botPartColors[activeTab as keyof typeof botPartColors] }}>
                    (Selected)
                  </span>
                }
              </div>
              <div className="text-sm" style={{ color: colors.text + 'CC' }}>
                {option.description}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Bot Specifications */}
      <div 
        className="p-4 rounded-lg"
        style={{
          background: colors.background,
          border: `1px solid ${colors.neon}`,
          boxShadow: `0 0 15px ${colors.neon}20`
        }}
      >
        <h3 
          className="text-lg font-bold mb-2"
          style={{ color: colors.neon }}
        >
          Bot Specifications
        </h3>
        <div className="space-y-2">
          {Object.entries(selectedParts).map(([partId, optionId]) => {
            const part = botParts.find(p => p.id === partId);
            const option = part?.options.find(o => o.id === optionId);
            
            return (
              <div key={partId} className="flex justify-between">
                <span style={{ color: botPartColors[partId as keyof typeof botPartColors] }}>
                  {part?.name}:
                </span>
                <span className="font-medium" style={{ color: colors.text }}>
                  {option?.emoji} {option?.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}; 