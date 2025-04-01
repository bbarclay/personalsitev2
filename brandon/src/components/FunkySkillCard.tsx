import React from 'react';
import { motion } from 'framer-motion';

interface FunkySkillCardProps {
  title: string;
  skills: string[];
  icon: string;
  position: { [key: string]: string };
  color: string;
  small?: boolean;
}

export const FunkySkillCard = ({ 
  title, 
  skills, 
  icon, 
  position, 
  color,
  small = false
}: FunkySkillCardProps) => {
  return (
    <motion.div
      className={`absolute z-20 ${small ? 'w-44' : 'w-56'} transform -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-hidden backdrop-blur-md expertise-card`}
      style={position}
      whileHover={{ 
        scale: 1.05,
        rotate: [0, -2, 2, 0],
        transition: { duration: 0.3 }
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`h-full bg-gradient-to-br ${color} p-4 border border-white/10`}>
        <div className="flex items-center gap-3 mb-2">
          <div className="text-2xl">{icon}</div>
          <h3 className="font-semibold text-white">{title}</h3>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {skills.map((skill, i) => (
            <motion.span 
              key={skill} 
              className="skill-tag text-xs py-1 px-2 bg-white/10 rounded-full text-white/90"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
      
      {/* Pulsing highlight effect */}
      <motion.div 
        className="absolute inset-0 bg-white/5 pointer-events-none"
        animate={{ 
          opacity: [0, 0.1, 0],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          ease: "easeInOut",
          repeatType: "reverse" 
        }}
      />
    </motion.div>
  );
};
