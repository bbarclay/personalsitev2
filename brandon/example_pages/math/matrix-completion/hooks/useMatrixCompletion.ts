'use client';

import { useState, useCallback } from 'react';
import { MatrixCell, MatrixCompletionState } from '../types';

const initialState: MatrixCompletionState = {
  matrix: [],
  completedMatrix: null,
  rank: 2,
  tolerance: 1e-6,
  metrics: {
    rank: 0,
    error: 0,
    iterations: 0,
    convergenceTime: 0,
    singularValues: [],
    nuclearNorm: 0,
    coherence: 0
  },
  isProcessing: false,
  error: null,
  animationStep: 0
};

export const useMatrixCompletion = () => {
  const [state, setState] = useState<MatrixCompletionState>(initialState);

  const generateRandomMatrix = useCallback((rows: number, cols: number, sparsity = 0.3) => {
    const matrix: MatrixCell[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: MatrixCell[] = [];
      for (let j = 0; j < cols; j++) {
        const isKnown = Math.random() > sparsity;
        row.push({
          value: isKnown ? Math.round(Math.random() * 10) : 0,
          isKnown,
          isHighlighted: false,
          confidence: isKnown ? 1 : 0
        });
      }
      matrix.push(row);
    }
    return matrix;
  }, []);

  const calculateCoherence = useCallback((matrix: MatrixCell[][]) => {
    if (!matrix || matrix.length === 0) return 0;
    const n = matrix.length;
    const m = matrix[0].length;
    const knownEntries = matrix.flat().filter(cell => cell.isKnown).length;
    return Math.sqrt((n * m) / knownEntries);
  }, []);

  const calculateSVD = useCallback((matrix: number[][]) => {
    if (!matrix || matrix.length === 0) return [];
    const n = matrix.length;
    const singularValues = Array(n).fill(0)
      .map((_, i) => Math.exp(-i * 0.5) * (Math.random() * 0.2 + 0.9));
    return singularValues;
  }, []);

  const simulateMatrixCompletion = useCallback(async (
    inputMatrix: MatrixCell[][],
    targetRank: number,
    targetTolerance: number
  ) => {
    if (!inputMatrix || inputMatrix.length === 0) return null;
    
    const n = inputMatrix.length;
    const completedMatrix: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));
    const iterations = 20 + Math.floor(Math.random() * 10);

    // Initialize with known values
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        completedMatrix[i][j] = inputMatrix[i][j].isKnown ? inputMatrix[i][j].value : 0;
      }
    }

    // Simulate iterative completion
    for (let iter = 0; iter < iterations; iter++) {
      await new Promise(resolve => setTimeout(resolve, 100));

      // Update unknown entries
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (!inputMatrix[i][j].isKnown) {
            const progress = iter / iterations;
            const noise = (1 - progress) * (Math.random() - 0.5);
            completedMatrix[i][j] = 5 + 5 * Math.sin(i * j / 10) + noise;
          }
        }
      }

      // Calculate metrics
      const singularValues = calculateSVD(completedMatrix);
      const nuclearNorm = singularValues.reduce((sum, sv) => sum + Math.abs(sv), 0);
      const error = Math.exp(-iter / 5) * (Math.random() * 0.1 + 0.9);

      setState(prev => ({
        ...prev,
        completedMatrix: [...completedMatrix],
        metrics: {
          ...prev.metrics,
          iterations: iter + 1,
          error,
          singularValues,
          nuclearNorm,
          rank: singularValues.filter(sv => sv > targetTolerance).length
        },
        animationStep: iter + 1
      }));
    }

    return completedMatrix;
  }, [calculateSVD]);

  const handleGenerateExample = useCallback(() => {
    const matrix = generateRandomMatrix(6, 6);
    const coherence = calculateCoherence(matrix);

    setState(prev => ({
      ...prev,
      matrix,
      completedMatrix: null,
      metrics: {
        ...prev.metrics,
        coherence,
        singularValues: [],
        nuclearNorm: 0
      },
      error: null,
      animationStep: 0
    }));
  }, [generateRandomMatrix, calculateCoherence]);

  const handleComplete = useCallback(async () => {
    setState(prev => ({ ...prev, isProcessing: true, error: null }));

    try {
      const startTime = performance.now();
      await simulateMatrixCompletion(state.matrix, state.rank, state.tolerance);
      const endTime = performance.now();

      setState(prev => ({
        ...prev,
        isProcessing: false,
        metrics: {
          ...prev.metrics,
          convergenceTime: endTime - startTime
        }
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'An error occurred during matrix completion',
        isProcessing: false
      }));
    }
  }, [simulateMatrixCompletion, state.matrix, state.rank, state.tolerance]);

  return {
    state,
    setState,
    handleGenerateExample,
    handleComplete
  };
};