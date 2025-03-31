import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface AnimatedRobotProps {
  mood?: 'happy' | 'thinking' | 'excited' | 'explaining';
  message?: string;
}

export const AnimatedRobot: React.FC<AnimatedRobotProps> = ({ 
  mood = 'happy',
  message
}) => {
  const { colors } = useTheme();
  const [isHovering, setIsHovering] = useState(false);

  const robotVariants = {
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        yoyo: Infinity
      }
    }
  };

  const expressions = {
    happy: '(^‿^)',
    thinking: '(・・?)',
    excited: '(★‿★)',
    explaining: '(￣▽￣)ノ'
  };

  return (
    <div className="relative">
      <motion.div
        className="cursor-pointer"
        variants={robotVariants}
        whileHover="hover"
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
        style={{
          background: colors.primary,
          borderRadius: '50%',
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          boxShadow: `0 0 20px ${colors.neon}`,
          position: 'relative'
        }}
      >
        <div style={{ color: colors.background }}>
          {expressions[mood]}
        </div>
        
        {/* Antenna */}
        <motion.div
          style={{
            position: 'absolute',
            top: '-20px',
            left: '50%',
            width: '4px',
            height: '20px',
            background: colors.accent,
            transformOrigin: 'bottom'
          }}
          animate={{
            rotate: [-5, 5],
            transition: {
              duration: 1,
              repeat: Infinity,
              repeatType: 'reverse'
            }
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-5px',
              left: '-3px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: colors.neon
            }}
          />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {(isHovering || message) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute left-24 top-0"
            style={{
              background: colors.background,
              color: colors.text,
              padding: '12px 20px',
              borderRadius: '12px',
              boxShadow: `0 4px 12px rgba(0,0,0,0.1)`,
              border: `2px solid ${colors.accent}`,
              minWidth: '200px',
              zIndex: 10
            }}
          >
            <div className="text-sm">
              {message || "Hey! I'm your AI guide! Click me for help! 🚀"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 