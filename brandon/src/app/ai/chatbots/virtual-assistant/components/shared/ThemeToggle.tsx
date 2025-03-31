import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="p-2 rounded-lg"
      style={{
        background: colors.primary + '20',
        border: `1px solid ${colors.primary}30`,
        color: colors.text
      }}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </motion.button>
  );
}; 