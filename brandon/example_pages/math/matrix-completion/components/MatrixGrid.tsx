'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MatrixCell } from '../types';

interface MatrixGridProps {
  matrix: MatrixCell[][] | number[][] | null;
  isCompleted?: boolean;
}

export const MatrixGrid: React.FC<MatrixGridProps> = ({ matrix, isCompleted = false }) => {
  if (!matrix || matrix.length === 0 || !matrix[0]) return (
    <div className="flex items-center justify-center h-48 bg-gray-900 rounded-lg">
      <p className="text-gray-400">No matrix data available</p>
    </div>
  );

  return (
    <div className="grid gap-1" style={{
      gridTemplateColumns: `repeat(${matrix[0].length}, minmax(0, 1fr))`
    }}>
      {matrix.map((row, i) =>
        row.map((cell, j) => {
          const value = isCompleted ? (cell as number) : (cell as MatrixCell).value;
          const isKnown = isCompleted ? true : (cell as MatrixCell).isKnown;
          const confidence = isCompleted ? 1 : (cell as MatrixCell).confidence;

          return (
            <motion.div
              key={`${i}-${j}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                backgroundColor: isKnown
                  ? 'hsl(var(--primary))'
                  : isCompleted
                    ? confidence > 0.8
                      ? 'hsl(var(--success))'
                      : 'hsl(var(--warning))'
                    : 'hsl(var(--muted))'
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              transition={{
                delay: (i * row.length + j) * 0.02,
                duration: 0.3,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
              className={`
                w-12 h-12 flex items-center justify-center rounded-lg
                shadow-lg backdrop-blur-sm text-lg border
                ${isKnown 
                  ? 'bg-primary border-primary-foreground font-bold' 
                  : isCompleted 
                    ? 'bg-card border-border' 
                    : 'bg-muted border-muted-foreground'
                }
                ${isCompleted && !isKnown ? 'animate-pulse' : ''}
              `}
            >
              <div className="relative">
                {isKnown || isCompleted ? (
                  <span className={`font-semibold ${isKnown ? 'text-primary-foreground' : 'text-foreground'}`}>
                    {value.toFixed(1)}
                  </span>
                ) : (
                  <span className="text-muted-foreground text-xl font-light">?</span>
                )}
                {!isKnown && isCompleted && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-success"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.8, 1]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </div>
            </motion.div>
          );
        })
      )}
    </div>
  );
};