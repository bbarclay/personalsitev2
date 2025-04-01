import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Type definition for a step in the Gaussian elimination process
 */
export type EliminationStep = {
  matrix: number[][];  // The coefficient matrix at this step
  vector: number[];    // The right-hand side vector at this step
  explanation: string; // Text explanation of what happened in this step
  highlight?: {        // Optional highlighting for visualization
    type: 'row' | 'col' | 'element'; 
    index: number | [number, number];
  };
};

/**
 * Interface for example systems that can be loaded
 */
export interface ExampleSystem {
  name: string;        // Display name for the example
  size: number;        // Matrix size (n for nxn matrix)
  matrixA: number[][]; // Coefficient matrix 
  vectorB: number[];   // Right-hand side vector
  description: string; // Explanation of the example
}

/**
 * Custom hook for linear system solving functionality
 * Manages state and provides methods for the linear system solver interface
 * 
 * @param initialSize - Initial size of the matrix (defaults to 3x3)
 * @returns An object with state and methods for the linear system solver
 */
export const useLinearSolver = (initialSize = 3) => {
  // ====== STATE VARIABLES ======
  // Matrix and vectors
  const [matrixSize, setMatrixSize] = useState<number>(initialSize);
  const [matrixA, setMatrixA] = useState<string[][]>([]);
  const [vectorB, setVectorB] = useState<string[]>([]);
  const [solutionX, setSolutionX] = useState<number[] | null>(null);
  
  // Solution steps and visualization
  const [stepsHistory, setStepsHistory] = useState<EliminationStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [animationSpeed, setAnimationSpeed] = useState<number>(1); // 1x speed
  
  // Status indicators
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Refs
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // ====== UTILITY FUNCTIONS ======
  /**
   * Reset matrix state for a given size, optionally pre-filling with data
   */
  const resetMatrixForNewSize = useCallback((
    size: number,
    initialMatrix?: number[][],
    initialVector?: number[]
  ) => {
    // Create empty matrix and vector of the specified size
    const newMatrixA = Array(size).fill(0).map(() => Array(size).fill(''));
    const newVectorB = Array(size).fill('');

    // If initial data is provided, fill the matrix and vector
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

    // Update state 
    setMatrixA(newMatrixA);
    setVectorB(newVectorB);
    setSolutionX(null);
    setStepsHistory([]);
    setCurrentStepIndex(0);
    setError(null);
    setInfoMessage(null);
    setIsPlaying(false);
    
    // Return the new matrices as strings for immediate calculation if needed
    return { matrixAStr: newMatrixA, vectorBStr: newVectorB };
  }, [matrixA, vectorB]);

  // Initialize on mount
  useEffect(() => {
    resetMatrixForNewSize(matrixSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ====== EVENT HANDLERS ======
  /**
   * Handle matrix size changes
   */
  const handleSizeChange = useCallback((value: string) => {
    const newSize = parseInt(value, 10);
    if (newSize >= 2 && newSize <= 6 && newSize !== matrixSize) {
      resetMatrixForNewSize(newSize);
      setMatrixSize(newSize);
    }
  }, [matrixSize, resetMatrixForNewSize]);

  /**
   * Handle changes to matrix cells
   */
  const handleMatrixInputChange = useCallback((rowIndex: number, colIndex: number, value: string) => {
    const newMatrix = matrixA.map(row => [...row]);
    // Allow only numbers, decimal points, and negative signs
    if (/^-?\d*\.?\d*$/.test(value)) {
      newMatrix[rowIndex][colIndex] = value;
      setMatrixA(newMatrix);
      // Reset solution when input changes
      setSolutionX(null);
      setStepsHistory([]);
      setCurrentStepIndex(0);
    }
  }, [matrixA]);

  /**
   * Handle changes to vector cells
   */
  const handleVectorInputChange = useCallback((rowIndex: number, value: string) => {
    const newVector = [...vectorB];
    if (/^-?\d*\.?\d*$/.test(value)) {
      newVector[rowIndex] = value;
      setVectorB(newVector);
      // Reset solution when input changes
      setSolutionX(null);
      setStepsHistory([]);
      setCurrentStepIndex(0);
    }
  }, [vectorB]);

  // ====== GAUSSIAN ELIMINATION LOGIC ======
  // Helper functions for deep copying matrices and vectors
  const deepCopyMatrix = (matrix: number[][]): number[][] => matrix.map(row => [...row]);
  const deepCopyVector = (vector: number[]): number[] => [...vector];

  /**
   * Perform Gaussian elimination to solve the linear system
   */
  const performGaussianElimination = useCallback((
    inputSize: number = matrixSize,
    inputMatrixA: string[][] = matrixA,
    inputVectorB: string[] = vectorB
  ) => {
    // Reset state for new calculation
    setIsLoading(true);
    setError(null);
    setStepsHistory([]);
    setCurrentStepIndex(0);
    setSolutionX(null);

    try {
      // Convert string inputs to numbers
      const size = inputSize;
      const matrix: number[][] = inputMatrixA.map(row => 
        row.map(cell => cell === '' ? 0 : parseFloat(cell))
      );
      const vector: number[] = inputVectorB.map(cell => 
        cell === '' ? 0 : parseFloat(cell)
      );
      
      // Initialize the steps history with the initial state
      const steps: EliminationStep[] = [{
        matrix: deepCopyMatrix(matrix),
        vector: deepCopyVector(vector),
        explanation: "Initial system of equations."
      }];
      
      // Function to record a step in the elimination process
      const recordStep = (
        explanation: string, 
        highlight?: EliminationStep['highlight']
      ) => {
        steps.push({
          matrix: deepCopyMatrix(matrix),
          vector: deepCopyVector(vector),
          explanation,
          highlight
        });
      };

      // ===== FORWARD ELIMINATION PHASE =====
      for (let i = 0; i < size; i++) {
        // Find the pivot (the largest absolute value in the current column)
        let maxRow = i;
        let maxVal = Math.abs(matrix[i][i]);
        
        for (let j = i + 1; j < size; j++) {
          const absVal = Math.abs(matrix[j][i]);
          if (absVal > maxVal) {
            maxRow = j;
            maxVal = absVal;
          }
        }
        
        // If the largest value is zero, the matrix is singular
        if (maxVal < 1e-10) {
          // Check if this is an inconsistent system
          let isInconsistent = false;
          for (let row = i; row < size; row++) {
            let isZeroRow = true;
            for (let col = 0; col < size; col++) {
              if (Math.abs(matrix[row][col]) > 1e-10) {
                isZeroRow = false;
                break;
              }
            }
            if (isZeroRow && Math.abs(vector[row]) > 1e-10) {
              isInconsistent = true;
              recordStep(`Row ${row + 1} is all zeros but b[${row + 1}] = ${vector[row]} ≠ 0. This system is inconsistent and has no solution.`, 
                { type: 'row', index: row });
              break;
            }
          }
          
          if (isInconsistent) {
            setError("The system is inconsistent and has no solution.");
          } else {
            recordStep(`The matrix is singular. The system has infinitely many solutions.`);
            setInfoMessage("The system has infinitely many solutions. Some variables can be chosen freely.");
          }
          
          setIsLoading(false);
          setStepsHistory(steps);
          return;
        }
        
        // Swap rows if necessary
        if (maxRow !== i) {
          // Swap rows in matrix
          [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];
          // Swap elements in vector
          [vector[i], vector[maxRow]] = [vector[maxRow], vector[i]];
          
          recordStep(`Swap rows ${i + 1} and ${maxRow + 1} to ensure largest pivot.`, 
            { type: 'row', index: i });
        }
        
        // Scale the pivot row to make the pivot 1
        const pivot = matrix[i][i];
        if (Math.abs(pivot - 1.0) > 1e-10) { // If not already 1
          for (let j = i; j < size; j++) {
            matrix[i][j] /= pivot;
          }
          vector[i] /= pivot;
          
          recordStep(`Scale row ${i + 1} by dividing by ${pivot.toFixed(4)} to make the pivot 1.`, 
            { type: 'row', index: i });
        }
        
        // Eliminate below
        for (let j = i + 1; j < size; j++) {
          const factor = matrix[j][i];
          if (Math.abs(factor) > 1e-10) { // If not already 0
            for (let k = i; k < size; k++) {
              matrix[j][k] -= factor * matrix[i][k];
            }
            vector[j] -= factor * vector[i];
            
            recordStep(`Subtract ${factor.toFixed(4)} times row ${i + 1} from row ${j + 1} to eliminate variable x${i + 1} from equation ${j + 1}.`, 
              { type: 'row', index: j });
          }
        }
      }
      
      // ===== BACK SUBSTITUTION PHASE =====
      const solution = new Array(size).fill(0);
      for (let i = size - 1; i >= 0; i--) {
        solution[i] = vector[i];
        for (let j = i + 1; j < size; j++) {
          solution[i] -= matrix[i][j] * solution[j];
        }
        recordStep(`Compute x${i + 1} = ${solution[i].toFixed(4)} through back substitution.`, 
          { type: 'element', index: [i, i] });
      }
      
      // Round solutions to fix floating point errors
      const roundedSolution = solution.map(val => Math.round(val * 1e10) / 1e10);
      
      setStepsHistory(steps);
      setSolutionX(roundedSolution);
      setIsLoading(false);
      
    } catch (e) {
      console.error("Error in Gaussian elimination:", e);
      setError(`Calculation error: ${e instanceof Error ? e.message : 'Unknown error'}`);
      setIsLoading(false);
    }
  }, [matrixA, matrixSize, vectorB]);

  // ====== PLAYBACK CONTROL HANDLERS ======
  /**
   * Start playing the solution steps
   */
  const handlePlay = useCallback(() => {
    if (currentStepIndex < stepsHistory.length - 1) {
      setIsPlaying(true);
    }
  }, [currentStepIndex, stepsHistory.length]);

  /**
   * Pause the solution steps playback
   */
  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  /**
   * Reset the solution steps to the beginning
   */
  const handleReset = useCallback(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, []);

  /**
   * Move to the next step manually
   */
  const handleStep = useCallback(() => {
    if (currentStepIndex < stepsHistory.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  }, [currentStepIndex, stepsHistory.length]);

  // Auto-play effect for steps
  useEffect(() => {
    if (isPlaying) {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
      
      playIntervalRef.current = setInterval(() => {
        setCurrentStepIndex(prev => {
          const next = prev + 1;
          if (next >= stepsHistory.length - 1) {
            setIsPlaying(false);
            return stepsHistory.length - 1;
          }
          return next;
        });
      }, 1500 / animationSpeed); // Adjust timing based on animation speed
    } else if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current);
    }
    
    // Cleanup interval on unmount
    return () => {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    };
  }, [isPlaying, stepsHistory.length, animationSpeed]);

  /**
   * Load an example linear system
   */
  const loadExample = useCallback((example: ExampleSystem) => {
    const { matrixAStr, vectorBStr } = resetMatrixForNewSize(example.size, example.matrixA, example.vectorB);
    setMatrixSize(example.size);
    performGaussianElimination(example.size, matrixAStr, vectorBStr);
  }, [performGaussianElimination, resetMatrixForNewSize]);

  // Return all state and methods needed by components
  return {
    matrixSize,
    matrixA,
    vectorB,
    solutionX,
    stepsHistory,
    currentStepIndex,
    setCurrentStepIndex,
    isPlaying,
    error,
    infoMessage,
    isLoading,
    animationSpeed,
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
  };
}; 