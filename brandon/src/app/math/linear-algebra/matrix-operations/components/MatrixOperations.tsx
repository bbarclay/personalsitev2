"use client";

import React, { useState, useEffect } from 'react';
import { ToggleSwitch } from '@/components/math-shared/ToggleSwitch';
import { MathTable } from '@/components/math-shared/MathTable';
import {
  Matrix,
  Step,
  addMatrices,
  subtractMatrices,
  multiplyMatrices,
  transposeMatrix,
  calculateDeterminant,
  scaleMatrix,
  createIdentityMatrix,
  getDimensions
} from '../utils/matrix-utils';

type OperationType = 'add' | 'subtract' | 'multiply' | 'transpose' | 'determinant' | 'scale' | 'identity';

export function MatrixOperations() {
  // State for operation type
  const [operationType, setOperationType] = useState<OperationType>('add');
  
  // State for matrix A dimensions
  const [rowsA, setRowsA] = useState<number>(2);
  const [colsA, setColsA] = useState<number>(2);
  
  // State for matrix B dimensions
  const [rowsB, setRowsB] = useState<number>(2);
  const [colsB, setColsB] = useState<number>(2);
  
  // State for matrices
  const [matrixA, setMatrixA] = useState<Matrix>([[0, 0], [0, 0]]);
  const [matrixB, setMatrixB] = useState<Matrix>([[0, 0], [0, 0]]);
  
  // State for scalar
  const [scalar, setScalar] = useState<number>(2);
  
  // State for identity matrix size
  const [identitySize, setIdentitySize] = useState<number>(3);
  
  // Result state
  const [result, setResult] = useState<Matrix | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showSteps, setShowSteps] = useState<boolean>(true);
  
  // Update matrix size when dimensions change
  useEffect(() => {
    const newMatrixA: Matrix = [];
    for (let i = 0; i < rowsA; i++) {
      const row: number[] = [];
      for (let j = 0; j < colsA; j++) {
        // Preserve existing values when possible
        row.push(matrixA[i]?.[j] || 0);
      }
      newMatrixA.push(row);
    }
    setMatrixA(newMatrixA);
  }, [rowsA, colsA]);
  
  useEffect(() => {
    const newMatrixB: Matrix = [];
    for (let i = 0; i < rowsB; i++) {
      const row: number[] = [];
      for (let j = 0; j < colsB; j++) {
        // Preserve existing values when possible
        row.push(matrixB[i]?.[j] || 0);
      }
      newMatrixB.push(row);
    }
    setMatrixB(newMatrixB);
  }, [rowsB, colsB]);
  
  // Handle matrix input change
  const handleMatrixAChange = (rowIndex: number, colIndex: number, value: string) => {
    const newValue = value === '' ? 0 : Number(value);
    const newMatrix = [...matrixA];
    newMatrix[rowIndex][colIndex] = newValue;
    setMatrixA(newMatrix);
  };
  
  const handleMatrixBChange = (rowIndex: number, colIndex: number, value: string) => {
    const newValue = value === '' ? 0 : Number(value);
    const newMatrix = [...matrixB];
    newMatrix[rowIndex][colIndex] = newValue;
    setMatrixB(newMatrix);
  };
  
  // Handle calculate button click
  const handleCalculate = () => {
    setError(null);
    setSteps([]);
    setResult(null);
    
    try {
      switch (operationType) {
        case 'add': {
          const { result, steps, error } = addMatrices(matrixA, matrixB);
          if (error) {
            setError(error);
          } else {
            setResult(result);
            setSteps(steps);
          }
          break;
        }
        case 'subtract': {
          const { result, steps, error } = subtractMatrices(matrixA, matrixB);
          if (error) {
            setError(error);
          } else {
            setResult(result);
            setSteps(steps);
          }
          break;
        }
        case 'multiply': {
          const { result, steps, error } = multiplyMatrices(matrixA, matrixB);
          if (error) {
            setError(error);
          } else {
            setResult(result);
            setSteps(steps);
          }
          break;
        }
        case 'transpose': {
          const { result, steps, error } = transposeMatrix(matrixA);
          if (error) {
            setError(error);
          } else {
            setResult(result);
            setSteps(steps);
          }
          break;
        }
        case 'determinant': {
          const { result, steps, error } = calculateDeterminant(matrixA);
          if (error) {
            setError(error);
          } else {
            setResult(result);
            setSteps(steps);
          }
          break;
        }
        case 'scale': {
          const { result, steps, error } = scaleMatrix(matrixA, scalar);
          if (error) {
            setError(error);
          } else {
            setResult(result);
            setSteps(steps);
          }
          break;
        }
        case 'identity': {
          const identityMatrix = createIdentityMatrix(identitySize);
          setResult(identityMatrix);
          setSteps([
            {
              explanation: `Created an identity matrix of size ${identitySize}`,
              result: identityMatrix
            }
          ]);
          break;
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };
  
  // Set example matrices
  const setExampleMatrices = () => {
    switch (operationType) {
      case 'add':
      case 'subtract':
        setRowsA(2);
        setColsA(2);
        setRowsB(2);
        setColsB(2);
        setMatrixA([[3, 5], [2, 1]]);
        setMatrixB([[1, 2], [3, 4]]);
        break;
      case 'multiply':
        setRowsA(2);
        setColsA(3);
        setRowsB(3);
        setColsB(2);
        setMatrixA([[1, 2, 3], [4, 5, 6]]);
        setMatrixB([[7, 8], [9, 10], [11, 12]]);
        break;
      case 'transpose':
        setRowsA(2);
        setColsA(3);
        setMatrixA([[1, 2, 3], [4, 5, 6]]);
        break;
      case 'determinant':
        setRowsA(3);
        setColsA(3);
        setMatrixA([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
        break;
      case 'scale':
        setRowsA(2);
        setColsA(2);
        setMatrixA([[1, 2], [3, 4]]);
        setScalar(2);
        break;
    }
  };
  
  // Render a matrix as a table
  const renderMatrix = (matrix: Matrix | null, label: string) => {
    if (!matrix || matrix.length === 0) return null;
    
    const [rows, cols] = getDimensions(matrix);
    
    return (
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">{label}</h3>
        <div className="border rounded overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              {matrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex} className="border p-2 text-center">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  // Render matrix input
  const renderMatrixInput = (
    matrix: Matrix,
    rows: number,
    cols: number,
    label: string,
    handleChange: (rowIndex: number, colIndex: number, value: string) => void
  ) => {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">{label}</h3>
        <div className="flex gap-3 mb-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Rows
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={rows}
              onChange={(e) => {
                const value = Math.min(5, Math.max(1, Number(e.target.value)));
                label === 'Matrix A' ? setRowsA(value) : setRowsB(value);
              }}
              className="w-16 px-2 py-1 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Columns
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={cols}
              onChange={(e) => {
                const value = Math.min(5, Math.max(1, Number(e.target.value)));
                label === 'Matrix A' ? setColsA(value) : setColsB(value);
              }}
              className="w-16 px-2 py-1 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
        
        <div className="border rounded overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              {matrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex} className="border p-1">
                      <input
                        type="number"
                        value={cell || ''}
                        onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                        className="w-full px-2 py-1 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Matrix Operations</h2>
      
      {/* Operation Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Operation
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {['add', 'subtract', 'multiply', 'transpose', 'determinant', 'scale', 'identity'].map((op) => (
            <button
              key={op}
              onClick={() => setOperationType(op as OperationType)}
              className={`px-3 py-2 rounded-md text-sm ${
                operationType === op
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              {op.charAt(0).toUpperCase() + op.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Example Button */}
      <div className="mb-6">
        <button
          onClick={setExampleMatrices}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          Load Example
        </button>
      </div>
      
      {/* Matrix Inputs */}
      <div className="mb-6">
        {(operationType === 'identity') ? (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Identity Matrix Size
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={identitySize}
              onChange={(e) => setIdentitySize(Math.min(5, Math.max(1, Number(e.target.value))))}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        ) : (
          <>
            {renderMatrixInput(matrixA, rowsA, colsA, 'Matrix A', handleMatrixAChange)}
            
            {(operationType === 'scale') && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Scalar Value
                </label>
                <input
                  type="number"
                  value={scalar}
                  onChange={(e) => setScalar(Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            )}
            
            {(operationType === 'add' || operationType === 'subtract' || operationType === 'multiply') && (
              renderMatrixInput(matrixB, rowsB, colsB, 'Matrix B', handleMatrixBChange)
            )}
          </>
        )}
      </div>
      
      {/* Calculate Button */}
      <div className="mb-6">
        <button
          onClick={handleCalculate}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Calculate
        </button>
      </div>
      
      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
          {error}
        </div>
      )}
      
      {/* Result Display */}
      {result && !error && (
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-4 text-gray-900 dark:text-white">Result</h3>
          {renderMatrix(result, 'Result Matrix')}
        </div>
      )}
      
      {/* Steps Toggle */}
      <div className="mb-4">
        <ToggleSwitch
          id="show-steps"
          label="Show steps"
          checked={showSteps}
          onChange={setShowSteps}
        />
      </div>
      
      {/* Steps Display */}
      {showSteps && steps.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Steps</h3>
          {steps.map((step, index) => (
            <div key={index} className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
              <p className="text-gray-900 dark:text-white mb-3">{step.explanation}</p>
              
              {step.matrices && step.matrices.map((matrix, matrixIndex) => (
                <div key={matrixIndex} className="mb-4">
                  {renderMatrix(matrix.matrix, matrix.label)}
                </div>
              ))}
              
              {step.result && (
                <div className="mt-2">
                  {renderMatrix(step.result, 'Step Result')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 