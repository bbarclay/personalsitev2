import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { StepVisualizer } from '@/components/math-shared/StepVisualizer';
import { SolutionDisplay } from '@/components/math-shared/SolutionDisplay';
import { EliminationStep } from '../../utils/linearSolverUtils';

/**
 * Props for the SolutionViewer component
 */
interface SolutionViewerProps {
  /** Array of steps in the elimination process */
  stepsHistory: EliminationStep[];
  /** Current step index */
  currentStepIndex: number;
  /** Final solution vector (if available) */
  solutionX: number[] | null;
  /** Whether the animation is currently playing */
  isPlaying: boolean;
  /** Current animation speed */
  animationSpeed: number;
  /** Error message (if any) */
  error: string | null;
  /** Handler for playing the animation */
  onPlay: () => void;
  /** Handler for pausing the animation */
  onPause: () => void;
  /** Handler for resetting to the first step */
  onReset: () => void;
  /** Handler for stepping through the solution */
  onStep: () => void;
  /** Handler for changing the animation speed */
  onSpeedChange: (speed: number) => void;
}

/**
 * SolutionViewer component
 * Displays the solution steps and controls for the Gaussian elimination process
 * Shows either:
 * - An error message if there was a problem
 * - Step-by-step visualization of the elimination process
 * - Final solution when reaching the last step
 */
const SolutionViewer: React.FC<SolutionViewerProps> = ({
  stepsHistory: steps,
  currentStepIndex,
  solutionX: solution,
  isPlaying,
  animationSpeed,
  error,
  onPlay,
  onPause,
  onReset,
  onStep,
  onSpeedChange
}) => {
  const [showExplanation, setShowExplanation] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  
  const currentStep = currentStepIndex + 1;
  const totalSteps = steps.length;

  // Show celebration when solution is reached
  React.useEffect(() => {
    if (currentStep === totalSteps && totalSteps > 0) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [currentStep, totalSteps]);

  // Toggle play/pause
  const handlePlayPause = () => {
    isPlaying ? onPause() : onPlay();
  };

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <span className="text-2xl mr-3">⚠️</span>
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with step counter and controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Step {currentStep} of {totalSteps}
              </h3>
              <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                {isPlaying ? 'Playing' : 'Paused'}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowExplanation(!showExplanation)}
                      className="text-blue-500 hover:text-blue-600 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                    >
                      {showExplanation ? 'Hide Explanation' : 'Show Explanation'} 💡
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle step explanation</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Progress bar with animation */}
          <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
          </div>
        </div>
      </motion.div>

      {/* Step visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <StepVisualizer 
            stepData={steps[currentStep - 1]}
            stepIndex={currentStep - 1}
            totalSteps={totalSteps}
            matrixSize={steps[0]?.matrix.length || 0}
          />
        </div>
      </motion.div>

      {/* Controls with enhanced visuals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 space-y-4">
          {/* Playback controls */}
          <div className="flex items-center justify-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onReset}
                variant="outline"
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="text-xl mr-2">🔄</span> Reset
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handlePlayPause}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-6 text-lg"
              >
                <span className="text-2xl mr-2">
                  {isPlaying ? '⏸️' : '▶️'}
                </span>
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
            </motion.div>
          </div>

          {/* Speed control */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Speed:</span>
            <Slider
              defaultValue={[animationSpeed]}
              max={3}
              step={0.5}
              onValueChange={(value) => onSpeedChange(value[0])}
              className="flex-1"
            />
            <span className="text-sm text-gray-500">
              {isPlaying ? '⚡' : '🐌'} {isPlaying ? 'Fast' : 'Slow'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Solution display with celebration */}
      {currentStep === totalSteps && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-6 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                Solution Found! 🎉
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Here's the solution to your system of equations
              </p>
            </div>

            <SolutionDisplay 
              solution={solution}
              error={null}
            />
          </div>
        </motion.div>
      )}

      {/* Celebration overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-500/20"></div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="relative text-6xl"
            >
              🎉
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SolutionViewer; 