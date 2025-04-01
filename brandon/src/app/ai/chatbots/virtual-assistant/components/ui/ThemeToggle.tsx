import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, colors } = useTheme();
  
  const springVariants = {
    dark: {
      rotate: [0, 15, -15, 10, -10, 0],
      scale: [1, 1.2, 0.9, 1.1, 0.95, 1],
    },
    light: {
      rotate: [0, -15, 15, -10, 10, 0],
      scale: [1, 1.2, 0.9, 1.1, 0.95, 1],
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={theme === 'dark' ? 'dark' : 'light'}
      variants={springVariants}
      transition={{
        duration: 0.5,
        ease: "easeInOut"
      }}
      onClick={toggleTheme}
      className="p-3 rounded-full"
      style={{
        background: theme === 'dark' ? 
          `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)` : 
          `linear-gradient(135deg, ${colors.accent}20, ${colors.primary}20)`,
        border: `2px solid ${theme === 'dark' ? colors.primary : colors.accent}`,
        boxShadow: `0 0 15px ${theme === 'dark' ? colors.primary : colors.accent}40`
      }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {theme === 'dark' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 45 }}
            transition={{ duration: 0.3 }}
            style={{ color: colors.primary }}
          >
            ☀️
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: 45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: -45 }}
            transition={{ duration: 0.3 }}
            style={{ color: colors.accent }}
          >
            🌙
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}; 