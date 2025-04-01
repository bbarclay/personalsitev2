'use client';
'use client'
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface DecodingState {
  originalMessage: number[];
  encodedMessage: number[];
  errors: number[];
  decodedMessage: number[] | null;
  step: number;
  isProcessing: boolean;
  errorMetrics: {
    errorRate: number;
    iterations: number;
    convergenceTime: number;
    sparsityMeasure: number;
    reconstructionError: number;
  };
  mathematicalInsights: {
    sparsityBound: number;
    conditionNumber: number;
    convergenceRate: number;
  };
  error?: string;
}

const MathematicalInsight: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <div className="bg-blue-950 p-4 rounded-lg mb-4">
    <h3 className="text-lg font-semibold text-blue-200 mb-2 flex items-center">
      <Info className="mr-2 h-5 w-5" />
      {title}
    </h3>
    <p className="text-blue-100 text-sm">{content}</p>
  </div>
);

const DecodingVisualizer: React.FC = () => {
  const [state, setState] = useState<DecodingState>({
    originalMessage: [],
    encodedMessage: [],
    errors: [],
    decodedMessage: null,
    step: 0,
    isProcessing: false,
    errorMetrics: {
      errorRate: 0,
      iterations: 0,
      convergenceTime: 0,
      sparsityMeasure: 0,
      reconstructionError: 0
    },
    mathematicalInsights: {
      sparsityBound: 0,
      conditionNumber: 0,
      convergenceRate: 0
    }
  });

  const [showTheory, setShowTheory] = useState(false);

  const generateRandomMessage = useCallback((length: number) => {
    return Array.from({ length }, () => Math.random() > 0.5 ? 1 : 0);
  }, []);

  const calculateSparsity = useCallback((vector: number[]) => {
    return vector.filter(x => x !== 0).length / vector.length;
  }, []);

  const calculateConditionNumber = useCallback((matrix: number[][]) => {
    // Simplified condition number calculation using matrix norms
    const norm = Math.sqrt(matrix.reduce((acc, row) =>
      acc + row.reduce((sum, val) => sum + val * val, 0), 0));
    return norm;
  }, []);

  const handleGenerateExample = useCallback(() => {
    const messageLength = 32;
    const errorRate = 0.15; // Slightly higher error rate for more interesting examples

    const original = generateRandomMessage(messageLength);
    const errors = Array(messageLength).fill(0).map(() =>
      Math.random() < errorRate ? 1 : 0
    );
    const encoded = original.map((bit, i) => bit ^ errors[i]);

    // Calculate mathematical insights
    const sparsityBound = 1 / (2 * Math.log(messageLength));
    const matrix = Array(messageLength).fill(0).map(() =>
      Array(messageLength).fill(0).map(() => Math.random() > 0.5 ? 1 : 0)
    );

    setState(prev => ({
      ...prev,
      originalMessage: original,
      encodedMessage: encoded,
      errors,
      decodedMessage: null,
      step: 0,
      errorMetrics: {
        ...prev.errorMetrics,
        errorRate,
        sparsityMeasure: calculateSparsity(errors),
        reconstructionError: 0
      },
      mathematicalInsights: {
        sparsityBound,
        conditionNumber: calculateConditionNumber(matrix),
        convergenceRate: 0
      }
    }));
  }, [generateRandomMessage, calculateSparsity, calculateConditionNumber]);

  const handleDecode = useCallback(async () => {
    setState(prev => ({ ...prev, isProcessing: true, error: undefined }));
    const startTime = performance.now();

    try {
      // Simulated decoding process with multiple steps
      await new Promise(resolve => setTimeout(resolve, 1000));

      const decoded = [...state.encodedMessage];
      let iterations = 0;
      let convergenceRate = 0;

      // Simplified LP solution simulation
      for (let i = 0; i < decoded.length; i++) {
        if (Math.random() < 0.9) { // 90% success rate
          decoded[i] = state.originalMessage[i];
        }
        iterations++;
      }

      const endTime = performance.now();
      const errorRate = decoded.reduce((acc, val, i) =>
        acc + (val !== state.originalMessage[i] ? 1 : 0), 0) / decoded.length;

      convergenceRate = 1 - errorRate;

      setState(prev => ({
        ...prev,
        decodedMessage: decoded,
        isProcessing: false,
        errorMetrics: {
          ...prev.errorMetrics,
          errorRate,
          iterations,
          convergenceTime: endTime - startTime,
          reconstructionError: errorRate
        },
        mathematicalInsights: {
          ...prev.mathematicalInsights,
          convergenceRate
        }
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isProcessing: false,
        error: "Failed to decode message: Optimization did not converge"
      }));
    }
  }, [state.encodedMessage, state.originalMessage]);

  const renderBitSequence = useCallback((bits: number[], label: string, highlight = false) => (
    <div className={`mb-4 p-4 rounded ${highlight ? 'bg-blue-900' : 'bg-gray-900'}`}>
      <div className="text-sm text-gray-400 mb-2">{label}</div>
      <div className="flex flex-wrap gap-2">
        {bits.map((bit, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.02 }}
            className={`w-8 h-8 flex items-center justify-center rounded
              ${bit === 1 ? 'bg-green-600' : 'bg-red-600'}`}
          >
            {bit}
          </motion.div>
        ))}
      </div>
    </div>
  ), []);

  const renderMetrics = useCallback(() => {
    const metrics = [
      {
        name: 'Error Rate',
        value: state.errorMetrics.errorRate * 100,
        unit: '%'
      },
      {
        name: 'Sparsity',
        value: state.errorMetrics.sparsityMeasure * 100,
        unit: '%'
      },
      {
        name: 'Convergence',
        value: state.mathematicalInsights.convergenceRate * 100,
        unit: '%'
      }
    ];

    return (
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={metrics}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#4ade80" />
        </LineChart>
      </ResponsiveContainer>
    );
  }, [state.errorMetrics, state.mathematicalInsights]);

  return (
    <div className="p-6 bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Decoding by Linear Programming</h1>
          <p className="text-gray-400">
            Explore Terence Tao and Emmanuel Candès&apos; groundbreaking work on error correction
            using convex optimization techniques.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex gap-4 mb-6">
              <button
                onClick={handleGenerateExample}
                className="flex items-center bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                disabled={state.isProcessing}
              >
                <RefreshCw className="mr-2" />
                Generate Example
              </button>

              <button
                onClick={handleDecode}
                className="flex items-center bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                disabled={state.isProcessing || state.encodedMessage.length === 0}
              >
                {state.isProcessing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <RefreshCw className="mr-2" />
                  </motion.div>
                ) : (
                  <CheckCircle className="mr-2" />
                )}
                Decode Message
              </button>

              <button
                onClick={() => setShowTheory(!showTheory)}
                className="flex items-center bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
              >
                <Info className="mr-2" />
                {showTheory ? 'Hide Theory' : 'Show Theory'}
              </button>
            </div>

            {showTheory && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6"
                >
                  <MathematicalInsight
                    title="The Restricted Isometry Property (RIP)"
                    content="Tao and Candès discovered that certain matrices satisfy the RIP, which guarantees exact recovery of sparse signals. This property ensures that the matrix approximately preserves distances between sparse vectors."
                  />
                  <MathematicalInsight
                    title="Sparsity and Recovery Guarantees"
                    content={`Current sparsity: ${(state.errorMetrics.sparsityMeasure * 100).toFixed(1)}%.
                    Theoretical bound: ${(state.mathematicalInsights.sparsityBound * 100).toFixed(1)}%.
                    Recovery is guaranteed when error sparsity is below the theoretical bound.`}
                  />
                </motion.div>
              </AnimatePresence>
            )}

            {state.originalMessage.length > 0 && (
              <div className="space-y-6">
                {renderBitSequence(state.originalMessage, 'Original Message')}
                {renderBitSequence(state.encodedMessage, 'Corrupted Message', true)}
                {state.decodedMessage && renderBitSequence(state.decodedMessage, 'Decoded Message')}
                {renderMetrics()}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            {state.decodedMessage && (
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Decoding Results</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400">Error Rate</label>
                    <div className="text-2xl font-bold">
                      {(state.errorMetrics.errorRate * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400">Sparsity Measure</label>
                    <div className="text-2xl font-bold">
                      {(state.errorMetrics.sparsityMeasure * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400">Convergence Time</label>
                    <div className="text-2xl font-bold">
                      {state.errorMetrics.convergenceTime.toFixed(1)}ms
                    </div>
                  </div>
                </div>
              </div>
            )}

            {state.error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecodingVisualizer;
