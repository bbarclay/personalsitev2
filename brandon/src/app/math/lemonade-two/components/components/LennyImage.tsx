'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LennyImageProps {
  className?: string;
  animate?: boolean;
}

const LennyImage: React.FC<LennyImageProps> = ({ className = "w-24 h-24", animate = true }) => {
  const image = (
    <img
      src="/images/lenny.svg"
      alt="Lenny"
      className={`${className} drop-shadow-xl`}
      style={{ objectFit: 'contain' }}
    />
  );

  if (!animate) return image;

  return (
    <motion.div
      animate={{
        y: [0, -6, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {image}
    </motion.div>
  );
};

export default LennyImage;