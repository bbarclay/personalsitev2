import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLinearSolver } from '../../utils/linearSolverUtils';
import { exampleSystems } from '../../utils/exampleSystems';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MatrixInputGrid } from '@/components/math-shared/MatrixInputGrid';
import { VectorInput } from '@/components/math-shared/VectorInput';
import { StepVisualizer } from '@/components/math-shared/StepVisualizer';
import { SolutionDisplay } from '@/components/math-shared/SolutionDisplay';
import './fun-solver.css';

/**
 * FunSolverInterface - A completely redesigned interactive interface for the linear system solver.
 * Features a more intuitive, engaging, and fun design with:
 * 1. Colorful, playful UI elements
 * 2. Clear visual hierarchy and flow
 * 3. Better access to controls and options
 * 4. Improved feedback for users
 */
const FunSolverInterface: React.FC = () => {
  const {
    // Matrix and solution state
    matrixSize,
    matrixA,
    vectorB,
    solutionX,
    
    // Solution steps and visualization state
    stepsHistory: steps,
    currentStepIndex,
    setCurrentStepIndex,
    isPlaying,
    error,
    isLoading,
    animationSpeed,
    
    // Event handlers
    handleSizeChange,
    handleMatrixInputChange,
    handleVectorInputChange,
    performGaussianElimination: solveSystem,
    handlePlay,
    handlePause,
    handleReset,
    handleStep,
    setAnimationSpeed,
    loadExample,
  } = useLinearSolver();

  // Local UI state
  const [activeSection, setActiveSection] = useState<'setup' | 'solution'>('setup');
  const [showHints, setShowHints] = useState(true);
  const [hoveredCell, setHoveredCell] = useState<{row: number, col: number} | null>(null);
  const [showExamples, setShowExamples] = useState(false);
  
  // Auto-switch to solution view when solution becomes available
  useEffect(() => {
    if (steps.length > 0 && !error) {
      setActiveSection('solution');
    }
  }, [steps.length, error]);

  // Current step and total steps
  const currentStep = currentStepIndex + 1;
  const totalSteps = steps.length;

  // Toggle play/pause
  const togglePlayPause = () => {
    isPlaying ? handlePause() : handlePlay();
  };

  // Handle solve button click
  const handleSolve = () => {
    if (matrixA.length === 0 || vectorB.length === 0) {
      return;
    }
    solveSystem();
  };

  return (
    <div className="relative">
      {/* Top Action Bar - Always visible */}
      <motion.div 
        className="sticky top-0 z-30 p-4 mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl shadow-md"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Matrix size selector */}
          <div className="flex items-center gap-2">
            <Label className="text-sm font-bold">Matrix Size:</Label>
            <div className="flex gap-1">
              {['2', '3', '4', '5', '6'].map((size) => (
                <motion.button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold ${
                    matrixSize.toString() === size 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Examples button */}
          <motion.button
            onClick={() => setShowExamples(!showExamples)}
            className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg shadow-md"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-2 text-xl">��</span>
            Example Problems
          </motion.button>
          
          {/* View switcher */}
          <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <motion.button
              onClick={() => setActiveSection('setup')}
              className={`px-4 py-2 rounded-lg ${
                activeSection === 'setup' 
                  ? 'bg-white dark:bg-gray-800 shadow-md' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">✏️</span>
              Setup
            </motion.button>
            <motion.button
              onClick={() => setActiveSection('solution')}
              className={`px-4 py-2 rounded-lg ${
                activeSection === 'solution' 
                  ? 'bg-white dark:bg-gray-800 shadow-md' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={steps.length === 0}
            >
              <span className="mr-2">✨</span>
              Solution
            </motion.button>
          </div>
          
          {/* Solve button - most prominent */}
          <motion.button
            onClick={handleSolve}
            disabled={isLoading}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg font-bold rounded-xl shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-2 text-xl"
                >
                  ⚡
                </motion.div>
                Solving...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <span className="mr-2 text-xl">⚡</span> Solve It!
              </div>
            )}
          </motion.button>
        </div>
        
        {/* Example selector dropdown */}
        <AnimatePresence>
          {showExamples && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="mb-3 font-bold text-lg">Example Systems:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {exampleSystems.map((example, idx) => (
                    <motion.div
                      key={idx}
                      className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        loadExample(example);
                        setShowExamples(false);
                        setActiveSection('setup');
                      }}
                    >
                      <div className="font-bold mb-1 text-blue-600 dark:text-blue-400">{example.name}</div>
                      <div className="text-sm text-gray-500">{example.description}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {activeSection === 'setup' ? (
          <motion.div
            key="setup"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-6 rounded-xl shadow-lg"
          >
            {/* Matrix Input Section */}
            <div className="relative">
              {/* Hints toggle */}
              <div className="absolute top-0 right-0 z-10">
                <motion.button
                  onClick={() => setShowHints(!showHints)}
                  className="inline-flex items-center text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showHints ? 'Hide Hints' : 'Show Hints'} 
                  <span className="ml-1">{showHints ? '👁️' : '💡'}</span>
                </motion.button>
              </div>
              
              {/* Introduction text */}
              <motion.div 
                className="mb-6 text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-2">
                  Enter Your System of Equations
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Fill in the coefficients (A) and constants (b) for your system Ax = b
                </p>
              </motion.div>
              
              {/* Hints panel */}
              <AnimatePresence>
                {showHints && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 overflow-hidden"
                  >
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-100 dark:border-blue-800/30">
                      <div className="flex gap-4 flex-wrap">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">👉</span>
                          <span>Enter coefficients for your equations</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">🔢</span>
                          <span>Use Tab to navigate between cells</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">📚</span>
                          <span>Try example problems to learn</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Interactive matrix input */}
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                {/* Matrix A */}
                <motion.div 
                  className="flex-1 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl shadow-md"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mr-2">Matrix A</h3>
                      <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                        Coefficients
                      </Badge>
                    </div>
                    <div className="text-sm bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm">
                      {matrixSize} × {matrixSize}
                    </div>
                  </div>
                  
                  <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-lg shadow-inner relative">
                    <MatrixInputGrid 
                      size={matrixSize} 
                      matrix={matrixA} 
                      onChange={handleMatrixInputChange}
                      onCellHover={setHoveredCell}
                    />
                    
                    {/* Position indicator */}
                    {hoveredCell && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-2 right-2 text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full"
                      >
                        A[{hoveredCell.row + 1},{hoveredCell.col + 1}]
                      </motion.div>
                    )}
                  </div>
                </motion.div>
                
                {/* Equals sign with animation */}
                <motion.div 
                  className="hidden lg:flex items-center justify-center self-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-4xl font-bold text-gray-400 dark:text-gray-500 px-4">=</div>
                </motion.div>
                
                {/* Vector b */}
                <motion.div 
                  className="lg:w-1/4 p-6 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl shadow-md"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <h3 className="text-2xl font-bold text-pink-600 dark:text-pink-400 mr-2">Vector b</h3>
                      <Badge variant="outline" className="bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300">
                        Constants
                      </Badge>
                    </div>
                    <div className="text-sm bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm">
                      {matrixSize} × 1
                    </div>
                  </div>
                  
                  <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-lg shadow-inner">
                    <VectorInput 
                      size={matrixSize} 
                      vector={vectorB} 
                      onChange={handleVectorInputChange}
                    />
                  </div>
                </motion.div>
              </div>
              
              {/* Interactive equations visualization */}
              <motion.div
                className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-lg font-bold mb-3">Your System of Equations:</h3>
                <div className="space-y-2 font-mono text-lg">
                  {Array.from({ length: matrixSize }).map((_, rowIndex) => (
                    <div key={rowIndex} className="flex flex-wrap items-center">
                      {Array.from({ length: matrixSize }).map((_, colIndex) => (
                        <React.Fragment key={colIndex}>
                          <span className={`transition-colors duration-200 ${hoveredCell?.row === rowIndex && hoveredCell?.col === colIndex ? 'text-blue-600 dark:text-blue-400 font-bold' : ''}`}>
                            {matrixA[rowIndex][colIndex] || '0'}
                          </span>
                          <span className="mx-1">×</span>
                          <span className="text-green-600 dark:text-green-400">x{colIndex + 1}</span>
                          {colIndex < matrixSize - 1 && <span className="mx-2">+</span>}
                        </React.Fragment>
                      ))}
                      <span className="mx-3">=</span>
                      <span className="text-pink-600 dark:text-pink-400 font-bold">{vectorB[rowIndex] || '0'}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="solution"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="space-y-6"
          >
            {/* Error display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg"
              >
                <div className="flex items-center">
                  <span className="text-3xl mr-3">⚠️</span>
                  <div>
                    <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-1">Oops! There's a problem</h3>
                    <p className="text-red-600 dark:text-red-300">{error}</p>
                  </div>
                </div>
              </motion.div>
            )}
            
            {!error && steps.length > 0 && (
              <>
                {/* Solution visualization */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-6 rounded-xl shadow-lg"
                >
                  {/* Header with step counter and controls */}
                  <div className="flex flex-wrap items-center justify-between mb-6">
                    <div className="flex items-center">
                      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 mr-3">
                        Step {currentStep} of {totalSteps}
                      </h3>
                      <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                        {isPlaying ? '▶️ Playing' : '⏸️ Paused'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.button
                              onClick={handleReset}
                              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <span className="text-xl">🔄</span>
                            </motion.button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Restart animation</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <motion.button
                        onClick={togglePlayPause}
                        className="p-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg shadow-md"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-xl mr-1">{isPlaying ? '⏸️' : '▶️'}</span>
                        {isPlaying ? 'Pause' : 'Play'}
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="relative h-3 bg-gray-100 dark:bg-gray-700 rounded-full mb-6 overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  
                  {/* Step visualization */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl mb-6">
                    {currentStep <= totalSteps ? (
                      <StepVisualizer
                        stepData={steps[currentStep - 1]}
                        stepIndex={currentStep - 1}
                        totalSteps={totalSteps}
                        matrixSize={steps[0]?.matrix.length || 0}
                      />
                    ) : (
                      <div className="p-6 text-center">
                        <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-3">
                          🎉 Solution Complete! 🎉
                        </h3>
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          <div className="inline-block p-6 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-2xl">
                            <SolutionDisplay 
                              solution={solutionX}
                              error={null}
                            />
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </div>
                  
                  {/* Playback controls */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm">Speed:</span>
                      <Slider
                        defaultValue={[1]}
                        min={0.5}
                        max={3}
                        step={0.5}
                        value={[animationSpeed]}
                        onValueChange={(value) => setAnimationSpeed(value[0])}
                        className="w-32"
                      />
                      <span className="text-sm">{animationSpeed}x</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <motion.button
                        onClick={() => {
                          if (currentStepIndex > 0) {
                            setCurrentStepIndex(prev => prev - 1);
                          }
                        }}
                        disabled={currentStepIndex === 0}
                        className={`p-2 rounded-lg ${
                          currentStepIndex === 0 
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                        whileHover={currentStepIndex > 0 ? { scale: 1.1 } : {}}
                        whileTap={currentStepIndex > 0 ? { scale: 0.9 } : {}}
                      >
                        <span className="text-xl">⬅️</span>
                      </motion.button>
                      
                      <motion.button
                        onClick={() => handleStep()}
                        disabled={currentStepIndex === steps.length - 1}
                        className={`p-2 rounded-lg ${
                          currentStepIndex >= steps.length - 1 
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                        whileHover={currentStepIndex < steps.length - 1 ? { scale: 1.1 } : {}}
                        whileTap={currentStepIndex < steps.length - 1 ? { scale: 0.9 } : {}}
                      >
                        <span className="text-xl">➡️</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
                
                {/* Optional learning tips */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30"
                >
                  <div className="flex items-start">
                    <span className="text-2xl mr-3 mt-1">💡</span>
                    <div>
                      <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-1">Learning Tip</h3>
                      <p className="text-blue-600 dark:text-blue-400">
                        Watch how the elimination process transforms the matrix into row echelon form.
                        Each step modifies rows to eliminate variables systematically.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FunSolverInterface;