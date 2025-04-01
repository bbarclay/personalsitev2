import React from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  delay?: number;
}

export const TypewriterText = ({ text, delay = 0.5 }: TypewriterTextProps) => {
  const characters = Array.from(text);
  
  return (
    <div className="inline-flex">
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.01, delay: delay + index * 0.03 }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};
