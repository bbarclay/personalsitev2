import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface LoadingEffectProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export const LoadingEffect: React.FC<LoadingEffectProps> = ({ 
  message = 'Loading...', 
  size = 'medium' 
}) => {
  const { colors } = useTheme();
  
  const dotVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: 'loop' as const
      }
    }
  };
  
  const containerSizes = {
    small: 'h-8',
    medium: 'h-16',
    large: 'h-24'
  };
  
  const dotSizes = {
    small: 'w-2 h-2',
    medium: 'w-4 h-4',
    large: 'w-6 h-6'
  };
  
  const textSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-xl'
  };
  
  const dotColors = [
    colors.primary,
    colors.secondary,
    colors.accent,
    colors.neon
  ];

  return (
    <div className={`flex flex-col items-center justify-center ${containerSizes[size]}`}>
      <div className="flex justify-center space-x-2 mb-3">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            variants={dotVariants}
            initial="initial"
            animate="animate"
            custom={i}
            className={`rounded-full ${dotSizes[size]}`}
            style={{ 
              backgroundColor: dotColors[i],
              animationDelay: `${i * 0.15}s`
            }}
          />
        ))}
      </div>
      
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className={`${textSizes[size]} font-medium`}
        style={{ color: colors.text }}
      >
        {message}
      </motion.div>
    </div>
  );
}; 