import React, { useState } from 'react';
import { MatrixInputGrid } from '@/components/math-shared/MatrixInputGrid';
import { VectorInput } from '@/components/math-shared/VectorInput';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

/**
 * Props for the MatrixInput component
 */
interface MatrixInputProps {
  /** Size of the matrix (n for n×n matrix) */
  matrixSize: number;
  /** Matrix A as a 2D array of strings */
  matrixA: string[][];
  /** Vector b as an array of strings */
  vectorB: string[];
  /** Handler for changes to the matrix */
  onMatrixChange: (rowIndex: number, colIndex: number, value: string) => void;
  /** Handler for changes to the vector */
  onVectorChange: (rowIndex: number, value: string) => void;
}

/**
 * MatrixInput component
 * Provides the UI for entering the coefficient matrix and right-hand side vector
 */
const MatrixInput: React.FC<MatrixInputProps> = ({
  matrixSize,
  matrixA,
  vectorB,
  onMatrixChange,
  onVectorChange
}) => {
  const [hoveredCell, setHoveredCell] = useState<{row: number, col: number} | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    const numericValue = value === '' ? '0' : value;
    const newMatrix = [...matrixA];
    if (!newMatrix[rowIndex]) {
      newMatrix[rowIndex] = [];
    }
    newMatrix[rowIndex][colIndex] = isNaN(parseFloat(numericValue)) ? '0' : numericValue;
    onMatrixChange(rowIndex, colIndex, value);
  };

  return (
    <div className="space-y-6">
      {/* Help toggle button with fun animation */}
      <motion.div 
        className="flex justify-end"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowHelp(!showHelp)}
          className="text-blue-500 hover:text-blue-600 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30"
        >
          {showHelp ? 'Hide Help' : 'Show Help'} 💡
        </Button>
      </motion.div>

      {/* Help panel with fun design */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card p-6 relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h4 className="font-bold text-xl mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Quick Tips
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-xl mr-3">⌨️</span>
                  <span>Use Tab to navigate between cells</span>
                </li>
                <li className="flex items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <span className="text-xl mr-3">🔢</span>
                  <span>Enter fractions as decimals or use "/" (e.g., 1/2)</span>
                </li>
                <li className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-xl mr-3">👆</span>
                  <span>Hover over cells to see their position</span>
                </li>
                <li className="flex items-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <span className="text-xl mr-3">🎯</span>
                  <span>Try the example systems to learn more</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Matrix input section with enhanced visuals */}
      <div className="flex flex-col-reverse md:flex-row gap-6">
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Matrix A
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="ml-2 text-blue-500 cursor-help">ⓘ</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter the coefficients of your system of equations</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h3>
            <div className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              {matrixSize} × {matrixSize} matrix
            </div>
          </div>
          
          <div className="relative">
            {/* Matrix grid with enhanced visuals */}
            <div className="glass-card p-6 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <MatrixInputGrid 
                  size={matrixSize} 
                  matrix={matrixA} 
                  onChange={handleCellChange}
                  onCellHover={setHoveredCell}
                />
              </div>
            </div>

            {/* Position indicator with animation */}
            {hoveredCell && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 right-4 text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg"
              >
                Row {hoveredCell.row + 1}, Column {hoveredCell.col + 1}
              </motion.div>
            )}
          </div>
        </motion.div>
        
        <motion.div 
          className="w-full md:w-1/4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Vector b
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="ml-2 text-purple-500 cursor-help">ⓘ</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter the constants on the right-hand side of your equations</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h3>
            <div className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              {matrixSize} × 1 vector
            </div>
          </div>
          
          <div className="glass-card p-6 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <VectorInput 
                size={matrixSize} 
                vector={vectorB} 
                onChange={onVectorChange}
              />
            </div>
          </div>

          {/* Visual connection between A and b with animation */}
          <div className="hidden md:block absolute -left-8 top-1/2 transform -translate-y-1/2">
            <motion.svg 
              width="16" 
              height="40" 
              viewBox="0 0 16 40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <path 
                d="M1 0 L1 40" 
                stroke="#cbd5e1" 
                strokeWidth="2" 
                strokeDasharray="4 2"
                className="animate-dash"
              />
              <path 
                d="M1 20 L12 20" 
                stroke="#cbd5e1" 
                strokeWidth="2"
              />
              <motion.circle 
                cx="12" 
                cy="20" 
                r="3" 
                fill="#cbd5e1"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MatrixInput;