import React from 'react';
import { motion } from 'framer-motion';

interface SkillBadgeProps {
  skill: string;
  color: 'blue' | 'purple' | 'pink' | 'green';
  delay?: number;
}

const colorClasses = {
  blue: "bg-blue-900/50 text-blue-300 border-blue-500/30",
  purple: "bg-purple-900/50 text-purple-300 border-purple-500/30",
  pink: "bg-pink-900/50 text-pink-300 border-pink-500/30",
  green: "bg-green-900/50 text-green-300 border-green-500/30",
};

export const SkillBadge = ({ skill, color, delay = 0 }: SkillBadgeProps) => {
  return (
    <motion.span
      className={`inline-flex px-2 py-1 rounded text-xs border ${colorClasses[color]}`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 } 
      }}
    >
      {skill}
    </motion.span>
  );
};
