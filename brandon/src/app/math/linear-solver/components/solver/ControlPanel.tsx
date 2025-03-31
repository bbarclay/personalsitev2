import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { SizeSelector } from '@/components/math-shared/SizeSelector';
import { ExampleSelector, ExampleSystem } from '@/components/math-shared/ExampleSelector';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Label } from '@/components/ui/label';

/**
 * Props for the ControlPanel component
 */
interface ControlPanelProps {
  /** Size of the matrix (n for n×n matrix) */
  matrixSize: number;
  /** Array of example systems that can be loaded */
  examples: ExampleSystem[];
  /** Whether the system is currently being solved */
  isLoading: boolean;
  /** Handler for changing the matrix size */
  onSizeChange: (value: string) => void;
  /** Handler for loading an example system */
  onExampleSelect: (example: ExampleSystem) => void;
  /** Handler for solving the system */
  onSolve: () => void;
}

/**
 * ControlPanel component
 * Provides controls for:
 * - Selecting the matrix size
 * - Loading example systems
 * - Triggering the solution process
 */
const ControlPanel: React.FC<ControlPanelProps> = ({
  matrixSize,
  examples,
  isLoading,
  onSizeChange,
  onExampleSelect,
  onSolve
}) => {
  const [showTips, setShowTips] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle size change from the selector
  const handleSizeChange = (value: string) => {
    onSizeChange(value);
  };

  return (
    <Card className="glass-card p-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 space-y-6">
        {/* Title with animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Matrix Control Center
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Configure your system of equations
          </p>
        </motion.div>

        {/* Matrix size selector with visual representation */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Matrix Size</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-blue-500 cursor-help">ⓘ</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Choose the number of equations in your system</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SizeSelector 
              value={matrixSize.toString()}
              onChange={handleSizeChange}
              options={Array.from({length: 5}, (_, i) => (i + 2).toString())}
            />
          </motion.div>
          
          {/* Visual size indicator */}
          <div className="flex justify-center items-center space-x-2">
            {Array.from({length: parseInt(matrixSize.toString())}).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-sm opacity-80"
              />
            ))}
            <span className="text-sm text-gray-500">× {matrixSize}</span>
          </div>
        </div>

        {/* Example system selector */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Example Systems</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-blue-500 cursor-help">ⓘ</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Try pre-defined example systems to learn different scenarios</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExampleSelector 
              examples={examples} 
              onSelectExample={onExampleSelect}
              className="w-full"
            />
          </motion.div>
        </div>

        {/* Solve button with enhanced visuals */}
        <div className="space-y-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={onSolve} 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl text-lg py-6"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2 text-2xl"
                  >
                    ⚡
                  </motion.div>
                  Solving...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span className="mr-2 text-2xl">⚡</span> Solve System
                </div>
              )}
            </Button>
          </motion.div>

          {/* Tips toggle */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTips(!showTips)}
              className="w-full text-blue-500 hover:text-blue-600 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30"
            >
              {showTips ? 'Hide Tips' : 'Show Tips'} 💡
            </Button>
          </motion.div>
        </div>

        {/* Tips panel */}
        <AnimatePresence>
          {showTips && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
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
                    <span className="text-xl mr-3">🎯</span>
                    <span>Start with a 2×2 system to understand the basics</span>
                  </li>
                  <li className="flex items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <span className="text-xl mr-3">🔍</span>
                    <span>Try different example systems to see patterns</span>
                  </li>
                  <li className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-xl mr-3">📝</span>
                    <span>Watch the step-by-step solution process</span>
                  </li>
                  <li className="flex items-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                    <span className="text-xl mr-3">⚡</span>
                    <span>Use the animation controls to understand each step</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status badges */}
        <div className="flex flex-wrap gap-2 justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
              {matrixSize} Equations
            </Badge>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
              {matrixSize} Variables
            </Badge>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
              Step-by-Step Solution
            </Badge>
          </motion.div>
        </div>
      </div>
    </Card>
  );
};

export default ControlPanel;