import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useLinearSolver } from '../utils/linearSolverUtils';
import { exampleSystems } from '../utils/exampleSystems';
import ControlPanel from './solver/ControlPanel';
import MatrixInput from './solver/MatrixInput';
import SolutionViewer from './solver/SolutionViewer';

/**
 * SolverInterface - The main interactive interface for the linear system solver.
 * Provides a structured UI with:
 * 1. Control panel for matrix size, examples and solving
 * 2. Matrix input area for entering coefficients
 * 3. Solution steps visualization
 * 
 * Uses the useLinearSolver hook for all calculation logic and state management.
 */
const SolverInterface: React.FC = () => {
  const {
    // Matrix and solution state
    matrixSize,
    matrixA,
    vectorB,
    solutionX,
    
    // Solution steps and visualization state
    stepsHistory,
    currentStepIndex,
    isPlaying,
    error,
    isLoading,
    animationSpeed,
    
    // Event handlers
    handleSizeChange,
    handleMatrixInputChange,
    handleVectorInputChange,
    performGaussianElimination,
    handlePlay,
    handlePause,
    handleReset,
    handleStep,
    setAnimationSpeed,
    loadExample,
  } = useLinearSolver();

  return (
    <div className="space-y-6">
      {/* Input section */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Controls section */}
            <div className="w-full md:w-1/3">
              <ControlPanel 
                matrixSize={matrixSize}
                examples={exampleSystems}
                isLoading={isLoading}
                onSizeChange={handleSizeChange}
                onExampleSelect={loadExample}
                onSolve={() => performGaussianElimination()}
              />
            </div>
            
            {/* Matrix input section */}
            <div className="w-full md:w-2/3">
              <MatrixInput 
                matrixSize={matrixSize}
                matrixA={matrixA}
                vectorB={vectorB}
                onMatrixChange={handleMatrixInputChange}
                onVectorChange={handleVectorInputChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Solution visualization section - only shown when there's a result */}
      {(stepsHistory.length > 0 || error) && (
        <Card>
          <CardContent className="pt-6">
            <SolutionViewer 
              stepsHistory={stepsHistory}
              currentStepIndex={currentStepIndex}
              solutionX={solutionX}
              isPlaying={isPlaying}
              animationSpeed={animationSpeed}
              error={error}
              onPlay={handlePlay}
              onPause={handlePause}
              onReset={handleReset}
              onStep={handleStep}
              onSpeedChange={setAnimationSpeed}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SolverInterface;