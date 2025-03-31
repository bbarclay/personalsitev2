"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const AnimatedEquation = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation variants
  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // The equation: e^(iπ) + 1 = 0
  const equation = [
    { char: 'e', delay: 0 },
    { char: 'i', delay: 0.1, sup: true },
    { char: 'π', delay: 0.2, sup: true },
    { char: '+', delay: 0.3 },
    { char: '1', delay: 0.4 },
    { char: '=', delay: 0.5 },
    { char: '0', delay: 0.6 }
  ];

  return (
    <div className="flex justify-center items-center my-8 py-4">
      <div className="text-4xl sm:text-5xl md:text-6xl font-serif flex items-center">
        {equation.map((item, index) => (
          <motion.span
            key={index}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            variants={charVariants}
            transition={{ 
              duration: 0.5, 
              delay: item.delay + 0.5,
              type: "spring",
              stiffness: 100
            }}
            className={`mx-1 ${
              item.char === '+' || item.char === '=' ? 'mx-3' : ''
            } ${
              item.sup ? 'text-2xl sm:text-3xl md:text-4xl relative -top-4' : ''
            }`}
          >
            {item.char}
          </motion.span>
        ))}
      </div>
    </div>
  );
};
