'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FactorialVisualizationProps {
  steps: { step: number; value: number; operation: string }[];
  currentStep: number;
  type: 'bars' | 'spiral';
  maxSafeNumber: number;
}

const FactorialVisualization: React.FC<FactorialVisualizationProps> = ({
  steps,
  currentStep,
  type,
  maxSafeNumber
}) => {
  // Get the current visible steps
  const visibleSteps = steps.slice(0, currentStep + 1);
  
  // Find the maximum value for scaling
  const maxValue = Math.max(...visibleSteps.map(step => step.value));
  
  // For very large numbers, we'll use log scale
  const useLogScale = maxValue > 1000000;
  
  const getScaledHeight = (value: number) => {
    if (useLogScale) {
      return (Math.log10(value + 1) / Math.log10(maxValue + 1)) * 100;
    }
    return (value / maxValue) * 100;
  };
  
  if (type === 'bars') {
    return (
      <div className="h-[300px] flex items-end justify-center gap-1 p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
        {visibleSteps.length === 0 ? (
          <div className="text-gray-400 dark:text-gray-500">No data to display</div>
        ) : (
          visibleSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ 
                height: `${getScaledHeight(step.value)}%`,
                backgroundColor: index === currentStep ? 'rgb(147, 51, 234)' : 'rgb(168, 85, 247, 0.5)'
              }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-[40px] rounded-t-md flex-1"
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium">
                {step.step === 0 ? '0!' : `${step.step}!`}
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs">
                {step.value > 1000000 
                  ? step.value.toExponential(2) 
                  : step.value.toLocaleString()}
              </div>
            </motion.div>
          ))
        )}
      </div>
    );
  }
  
  // Spiral visualization
  return (
    <div className="h-[300px] relative bg-gray-50 dark:bg-gray-800/30 rounded-lg overflow-hidden">
      <svg width="100%" height="100%" viewBox="-150 -150 300 300">
        {visibleSteps.map((step, index) => {
          // Calculate spiral position
          const angle = index * 0.5 * Math.PI;
          const radius = 10 + index * 10;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          // Calculate size based on value (log scale for large numbers)
          const size = useLogScale 
            ? 5 + (Math.log10(step.value) / Math.log10(maxValue)) * 20
            : 5 + (step.value / maxValue) * 20;
            
          return (
            <g key={index}>
              {/* Line connecting to previous point */}
              {index > 0 && (
                <motion.line
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  x1={Math.cos((index-1) * 0.5 * Math.PI) * (10 + (index-1) * 10)}
                  y1={Math.sin((index-1) * 0.5 * Math.PI) * (10 + (index-1) * 10)}
                  x2={x}
                  y2={y}
                  stroke={index === currentStep ? 'rgb(147, 51, 234)' : 'rgb(168, 85, 247, 0.5)'}
                  strokeWidth="2"
                />
              )}
              
              {/* Circle for the factorial value */}
              <motion.circle
                initial={{ r: 0 }}
                animate={{ 
                  r: size,
                  fill: index === currentStep ? 'rgb(147, 51, 234)' : 'rgb(168, 85, 247, 0.5)'
                }}
                cx={x}
                cy={y}
              />
              
              {/* Text label */}
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize={size * 0.7}
                fontWeight={index === currentStep ? 'bold' : 'normal'}
              >
                {step.step === 0 ? '0!' : `${step.step}!`}
              </motion.text>
              
              {/* Value label */}
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                x={x}
                y={y + size + 10}
                textAnchor="middle"
                fill="currentColor"
                fontSize="10"
              >
                {step.value > 1000000 
                  ? step.value.toExponential(2) 
                  : step.value.toLocaleString()}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default FactorialVisualization;
