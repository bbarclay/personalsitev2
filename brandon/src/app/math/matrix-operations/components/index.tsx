import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Play, Pause, RotateCcw, Dice1, Copy, Wand2 } from 'lucide-react';
import './styles.css';
import { Alert, AlertDescription } from '@/components/ui/alert';

type Matrix = number[][];
type Operation = 'add' | 'multiply' | 'subtract' | 'transpose';

const MatrixCalculator = () => {
  const [isAutoDemoActive, setIsAutoDemoActive] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [highlightedCells, setHighlightedCells] = useState<{ row: number, col: number }[]>([]);

  const [matrices, setMatrices] = useState<{
    A: Matrix;
    B: Matrix;
    result: Matrix | null;
  }>({
    A: [[1, 2], [3, 4]],
    B: [[5, 6], [7, 8]],
    result: null
  });

  const [dimensions, setDimensions] = useState({
    A: { rows: 2, cols: 2 },
    B: { rows: 2, cols: 2 }
  });

  const [operation, setOperation] = useState<Operation>('add');
  const [error, setError] = useState<string>('');

  const generateRandomMatrix = (rows: number, cols: number): Matrix => {
    return Array(rows).fill(0).map(() =>
      Array(cols).fill(0).map(() => Math.floor(Math.random() * 10))
    );
  };

  const resizeMatrix = (matrix: 'A' | 'B', newRows: number, newCols: number) => {
    const newMatrix = Array(newRows).fill(0).map((_, i) =>
      Array(newCols).fill(0).map((_, j) => {
        return matrices[matrix][i]?.[j] || 0;
      })
    );

    setMatrices(prev => ({
      ...prev,
      [matrix]: newMatrix
    }));

    setDimensions(prev => ({
      ...prev,
      [matrix]: { rows: newRows, cols: newCols }
    }));
  };

  const addMatrices = (a: Matrix, b: Matrix): Matrix => {
    if (a.length !== b.length || a[0].length !== b[0].length) {
      throw new Error('Matrices must have the same dimensions for addition');
    }
    return a.map((row, i) => row.map((cell, j) => cell + b[i][j]));
  };

  const subtractMatrices = (a: Matrix, b: Matrix): Matrix => {
    if (a.length !== b.length || a[0].length !== b[0].length) {
      throw new Error('Matrices must have the same dimensions for subtraction');
    }
    return a.map((row, i) => row.map((cell, j) => cell - b[i][j]));
  };

  const multiplyMatrices = (a: Matrix, b: Matrix): Matrix => {
    if (a[0].length !== b.length) {
      throw new Error('Number of columns in Matrix A must equal number of rows in Matrix B');
    }

    return Array(a.length).fill(0).map((_, i) =>
      Array(b[0].length).fill(0).map((_, j) =>
        a[i].reduce((sum, cell, k) => sum + cell * b[k][j], 0)
      )
    );
  };

  const transposeMatrix = (matrix: Matrix): Matrix => {
    return matrix[0].map((_, i) => matrix.map(row => row[i]));
  };

  const updateCell = (matrix: 'A' | 'B', row: number, col: number, value: string) => {
    // Add input validation
    if (!/^-?\d*\.?\d*$/.test(value) && value !== '') {
      return;
    }

    const newValue = value === '' ? 0 : parseFloat(value);
    // Check for valid number
    if (isNaN(newValue)) return;

    setMatrices(prev => ({
      ...prev,
      [matrix]: prev[matrix].map((r, i) =>
        i === row ? r.map((c, j) => j === col ? Number(newValue.toFixed(4)) : c) : r
      )
    }));
  };

  const calculate = () => {
    try {
      // Add dimension validation
      if (operation !== 'transpose') {
        if (dimensions.A.rows > 5 || dimensions.A.cols > 5 ||
          dimensions.B.rows > 5 || dimensions.B.cols > 5) {
          throw new Error('Matrix dimensions cannot exceed 5x5');
        }
      }

      let result: Matrix;
      switch (operation) {
        case 'add':
          if (dimensions.A.rows !== dimensions.B.rows || dimensions.A.cols !== dimensions.B.cols) {
            throw new Error('Matrices must have the same dimensions for addition');
          }
          result = addMatrices(matrices.A, matrices.B);
          break;
        case 'subtract':
          result = subtractMatrices(matrices.A, matrices.B);
          break;
        case 'multiply':
          result = multiplyMatrices(matrices.A, matrices.B);
          break;
        case 'transpose':
          result = transposeMatrix(matrices.A);
          break;
        default:
          throw new Error('Invalid operation');
      }
      // Round results to prevent floating point issues
      result = result.map(row => row.map(val => Number(val.toFixed(4))));
      setMatrices(prev => ({ ...prev, result }));
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setMatrices(prev => ({ ...prev, result: null }));
    }
  };

  const MatrixInput = ({ matrix, label }: { matrix: 'A' | 'B'; label: string }) => (
    <Card className="dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="text-lg font-semibold dark:text-gray-200">{label}</span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMatrices(prev => ({
                ...prev,
                [matrix]: generateRandomMatrix(dimensions[matrix].rows, dimensions[matrix].cols)
              }))}
              className="h-8 w-8"
            >
              <Dice1 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMatrices(prev => ({
                ...prev,
                [matrix]: Array(dimensions[matrix].rows).fill(0).map(() => Array(dimensions[matrix].cols).fill(0))
              }))}
              className="h-8 w-8"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
        <div className="flex gap-4">
          <div className="space-y-1">
            <label className="text-sm dark:text-gray-400">Rows</label>
            <Select
              value={dimensions[matrix].rows.toString()}
              onValueChange={(value) => resizeMatrix(matrix, parseInt(value), dimensions[matrix].cols)}
            >
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[2, 3, 4, 5].map(n => (
                  <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-sm dark:text-gray-400">Columns</label>
            <Select
              value={dimensions[matrix].cols.toString()}
              onValueChange={(value) => resizeMatrix(matrix, dimensions[matrix].rows, parseInt(value))}
            >
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[2, 3, 4, 5].map(n => (
                  <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {matrices[matrix].map((row, i) => (
            <div key={i} className="flex gap-2">
              {row.map((cell, j) => (
                <input
                  key={j}
                  type="number"
                  value={cell || ''}
                  onChange={(e) => updateCell(matrix, i, j, e.target.value)}
                  className={`matrix-cell w-16 px-2 py-1 border rounded text-center 
                    dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200
                    ${isAutoDemoActive ? 'auto-demo-active' : ''}
                    ${highlightedCells.some(cell => cell.row === i && cell.col === j) ? 'matrix-operation-highlight' : ''}`}
                />
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const copyToClipboard = (matrix: Matrix) => {
    const text = matrix.map(row => row.join('\t')).join('\n');
    navigator.clipboard.writeText(text);
  };

  const runAutoDemo = async () => {
    setIsAutoDemoActive(true);
    setDemoStep(0);

    // Demo sequence
    const demoSequence = [
      // Addition demo
      async () => {
        setOperation('add');
        setMatrices(prev => ({
          ...prev,
          A: [[1, 2], [3, 4]],
          B: [[5, 6], [7, 8]]
        }));
        await new Promise(resolve => setTimeout(resolve, 1000));
        calculate();
      },
      // Multiplication demo
      async () => {
        setOperation('multiply');
        setMatrices(prev => ({
          ...prev,
          A: [[2, 3], [1, 4]],
          B: [[5, 1], [2, 6]]
        }));
        await new Promise(resolve => setTimeout(resolve, 1000));
        calculate();
      },
      // Transpose demo
      async () => {
        setOperation('transpose');
        setMatrices(prev => ({
          ...prev,
          A: [[1, 2, 3], [4, 5, 6]]
        }));
        await new Promise(resolve => setTimeout(resolve, 1000));
        calculate();
      }
    ];

    // Run through demo sequence
    for (let i = 0; i < demoSequence.length; i++) {
      if (!isAutoDemoActive) break;
      setDemoStep(i);
      await demoSequence[i]();
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    setIsAutoDemoActive(false);
    setDemoStep(0);
  };

  useEffect(() => {
    return () => {
      setIsAutoDemoActive(false);
    };
  }, []);

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold dark:text-gray-200">Matrix Calculator</h1>
            <Button
              variant={isAutoDemoActive ? "destructive" : "outline"}
              onClick={() => isAutoDemoActive ? setIsAutoDemoActive(false) : runAutoDemo()}
              className="gap-2"
            >
              {isAutoDemoActive ? (
                <>
                  <Pause className="h-4 w-4" />
                  Stop Demo
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  Auto Demo
                </>
              )}
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Select
              value={operation}
              onValueChange={(value: Operation) => setOperation(value)}
            >
              <SelectTrigger className="w-40 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="add" className="dark:text-gray-200 dark:focus:bg-gray-700 dark:hover:bg-gray-700">Addition</SelectItem>
                <SelectItem value="subtract" className="dark:text-gray-200 dark:focus:bg-gray-700 dark:hover:bg-gray-700">Subtraction</SelectItem>
                <SelectItem value="multiply" className="dark:text-gray-200 dark:focus:bg-gray-700 dark:hover:bg-gray-700">Multiplication</SelectItem>
                <SelectItem value="transpose" className="dark:text-gray-200 dark:focus:bg-gray-700 dark:hover:bg-gray-700">Transpose A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <MatrixInput matrix="A" label="Matrix A" />
          {operation !== 'transpose' && <MatrixInput matrix="B" label="Matrix B" />}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={calculate}
            size="lg"
            className="w-full md:w-auto"
          >
            Calculate
          </Button>
        </div>

        {matrices.result && (
          <Card className="dark:bg-gray-800 matrix-result-appear">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="text-lg font-semibold dark:text-gray-200">Result</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(matrices.result!)}
                    className="h-8 w-8"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="matrix-wrapper">
                <div className="grid gap-2">
                  {matrices.result.map((row, i) => (
                    <div key={i} className="flex gap-2">
                      {row.map((cell, j) => (
                        <div
                          key={j}
                          className="matrix-cell w-16 px-2 py-1 border rounded text-center 
                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200
                            matrix-result-appear"
                          style={{ animationDelay: `${(i * row.length + j) * 0.1}s` }}
                        >
                          {cell}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MatrixCalculator;
