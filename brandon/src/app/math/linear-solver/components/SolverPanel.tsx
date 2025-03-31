'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { PlayControl } from '@/components/math-shared/PlayControl';
import { MatrixInputGrid } from '@/components/math-shared/MatrixInputGrid';
import { VectorInput } from '@/components/math-shared/VectorInput';
import { SizeSelector } from '@/components/math-shared/SizeSelector';
import { StepVisualizer } from '@/components/math-shared/StepVisualizer';
import { SolutionDisplay } from '@/components/math-shared/SolutionDisplay';
import { CalculationStatus } from '@/components/math-shared/CalculationStatus';
import { ExampleSelector, ExampleSystem } from '@/components/math-shared/ExampleSelector';

// Placeholder for Gaussian elimination steps and result
type EliminationStep = {
  matrix: number[][];
  vector: number[];
  explanation: string;
  highlight?: { type: 'row' | 'col' | 'element'; index: number | [number, number] };
};

const MAX_SIZE = 6; // Limit matrix size for performance/display

const SolverPanel: React.FC = () => {
  const [matrixSize, setMatrixSize] = useState<number>(3);
  const [matrixA, setMatrixA] = useState<string[][]>([]);
  const [vectorB, setVectorB] = useState<string[]>([]);
  const [solutionX, setSolutionX] = useState<number[] | null>(null);
  const [stepsHistory, setStepsHistory] = useState<EliminationStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [animationSpeed, setAnimationSpeed] = useState<number>(1); // 1x speed

  // Function to reset matrix/vector state for a given size, optionally pre-filling with data
  const resetMatrixForNewSize = (
    size: number,
    initialMatrix?: number[][],
    initialVector?: number[]
  ) => {
    const newMatrixA = Array(size).fill(0).map(() => Array(size).fill(''));
    const newVectorB = Array(size).fill('');

    if (initialMatrix && initialVector && initialMatrix.length === size && initialVector.length === size) {
      // Pre-fill with example data, converting numbers to strings
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          newMatrixA[i][j] = String(initialMatrix[i]?.[j] ?? '');
        }
        newVectorB[i] = String(initialVector[i] ?? '');
      }
    } else {
      // Try to preserve existing values if size changes without an example
      const currentMatrixA = matrixA;
      const currentVectorB = vectorB;
      if (currentMatrixA.length > 0 && currentVectorB.length > 0) {
        for (let i = 0; i < Math.min(size, currentMatrixA.length); i++) {
          for (let j = 0; j < Math.min(size, currentMatrixA[0]?.length || 0); j++) {
            newMatrixA[i][j] = currentMatrixA[i]?.[j] ?? '';
          }
          if (i < currentVectorB.length) {
            newVectorB[i] = currentVectorB[i] ?? '';
          }
        }
      }
    }

    setMatrixA(newMatrixA);
    setVectorB(newVectorB);
    setSolutionX(null);
    setStepsHistory([]);
    setCurrentStepIndex(0);
    setError(null);
    setInfoMessage(null);
    setIsPlaying(false);
    return { matrixAStr: newMatrixA, vectorBStr: newVectorB };
  };

  // Initial setup on mount
  useEffect(() => {
    resetMatrixForNewSize(matrixSize);
  }, []);

  // Define Example Systems
  const examples: ExampleSystem[] = [
    {
      name: "Simple 2x2",
      size: 2,
      matrixA: [[2, 1], [1, 3]],
      vectorB: [5, 5],
      description: "A basic 2x2 system with a unique solution (x=2, y=1)."
    },
    {
      name: "Standard 3x3",
      size: 3,
      matrixA: [[1, 1, 1], [0, 2, 5], [2, 5, -1]],
      vectorB: [6, -4, 27],
      description: "A typical 3x3 system (x=5, y=3, z=-2)."
    },
    {
      name: "Needs Swap",
      size: 3,
      matrixA: [[0, 1, 1], [1, 2, 1], [2, 7, 9]],
      vectorB: [4, 5, 18],
      description: "Requires a row swap during elimination (x=-1, y=2, z=2)."
    },
    {
      name: "Singular (Inf)",
      size: 2,
      matrixA: [[1, 2], [2, 4]],
      vectorB: [3, 6],
      description: "Singular system with infinite solutions (dependent equations)."
    },
    {
      name: "Inconsistent",
      size: 2,
      matrixA: [[1, 2], [2, 4]],
      vectorB: [3, 7],
      description: "Inconsistent system with no solution."
    },
  ];

  const loadExample = (example: ExampleSystem) => {
    const { matrixAStr, vectorBStr } = resetMatrixForNewSize(example.size, example.matrixA, example.vectorB);
    setMatrixSize(example.size);
    performGaussianElimination(example.size, matrixAStr, vectorBStr);
  };

  const handleSizeChange = (value: string) => {
    const newSize = parseInt(value, 10);
    if (newSize >= 2 && newSize <= MAX_SIZE && newSize !== matrixSize) {
      resetMatrixForNewSize(newSize);
      setMatrixSize(newSize);
    }
  };

  const handleMatrixInputChange = (rowIndex: number, colIndex: number, value: string) => {
    const newMatrix = matrixA.map(row => [...row]);
    if (/^-?\d*\.?\d*$/.test(value)) {
      newMatrix[rowIndex][colIndex] = value;
      setMatrixA(newMatrix);
      setSolutionX(null);
      setStepsHistory([]);
      setCurrentStepIndex(0);
    }
  };

  const handleVectorInputChange = (rowIndex: number, value: string) => {
    const newVector = [...vectorB];
    if (/^-?\d*\.?\d*$/.test(value)) {
      newVector[rowIndex] = value;
      setVectorB(newVector);
      setSolutionX(null);
      setStepsHistory([]);
      setCurrentStepIndex(0);
    }
  };

  // Helper to create deep copies for steps history
  const deepCopyMatrix = (matrix: number[][]): number[][] => matrix.map(row => [...row]);
  const deepCopyVector = (vector: number[]): number[] => [...vector];

  const performGaussianElimination = async (size: number, matrixAStr: string[][], vectorBStr: string[]) => {
    setIsLoading(true);
    setError(null);
    setInfoMessage(null);
    setStepsHistory([]);
    setCurrentStepIndex(0);
    setIsPlaying(false);

    try {
      // Convert string inputs to numbers
      const matrixA = matrixAStr.map(row => 
        row.map(val => parseFloat(val) || 0)
      );
      const vectorB = vectorBStr.map(val => parseFloat(val) || 0);

      // Check for invalid inputs
      if (matrixA.some(row => row.some(isNaN)) || vectorB.some(isNaN)) {
        setError("Please enter valid numbers in all fields");
        return;
      }

      // Initialize steps history
      const steps: EliminationStep[] = [];
      
      // Add initial state
      steps.push({
        matrix: deepCopyMatrix(matrixA),
        vector: deepCopyVector(vectorB),
        explanation: "Starting system of equations"
      });

      // TODO: Implement actual Gaussian elimination steps here
      // For now, just add a placeholder step
      steps.push({
        matrix: deepCopyMatrix(matrixA),
        vector: deepCopyVector(vectorB),
        explanation: "Gaussian elimination steps will be implemented here",
        highlight: { type: 'row', index: 0 }
      });

      setStepsHistory(steps);
      setSolutionX([1, 2, 3]); // Placeholder solution
      setInfoMessage("Gaussian elimination steps will be implemented in a future update");
    } catch (err) {
      setError("Error performing Gaussian elimination");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Input System</CardTitle>
          <CardDescription>
            Enter your system of linear equations in matrix form
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <SizeSelector
              value={matrixSize.toString()}
              onChange={handleSizeChange}
              options={Array.from({ length: MAX_SIZE - 1 }, (_, i) => (i + 2).toString())}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MatrixInputGrid
                matrix={matrixA}
                size={matrixSize}
                onChange={handleMatrixInputChange}
              />
              <VectorInput
                vector={vectorB}
                size={matrixSize}
                onChange={handleVectorInputChange}
              />
            </div>

            <ExampleSelector
              examples={examples}
              onSelectExample={loadExample}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => performGaussianElimination(matrixSize, matrixA, vectorB)}
            disabled={isLoading}
          >
            Solve System
          </Button>
        </CardFooter>
      </Card>

      <CalculationStatus
        error={error}
        infoMessage={infoMessage}
      />

      {stepsHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Solution Steps</CardTitle>
            <CardDescription>
              Watch the Gaussian elimination process step by step
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <PlayControl
                isPlaying={isPlaying}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onReset={() => setCurrentStepIndex(0)}
                onStep={() => setCurrentStepIndex(prev => Math.min(prev + 1, stepsHistory.length - 1))}
              />
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Animation Speed:</label>
                <Slider
                  value={[animationSpeed]}
                  onValueChange={(value) => setAnimationSpeed(value[0])}
                  min={0.5}
                  max={2}
                  step={0.1}
                  className="w-48"
                />
                <span className="text-sm text-gray-500">{animationSpeed}x</span>
              </div>
              <StepVisualizer
                stepData={stepsHistory[currentStepIndex]}
                stepIndex={currentStepIndex}
                totalSteps={stepsHistory.length}
                matrixSize={matrixSize}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {solutionX && (
        <SolutionDisplay
          solution={solutionX}
          error={error}
        />
      )}
    </div>
  );
};

export default SolverPanel; 