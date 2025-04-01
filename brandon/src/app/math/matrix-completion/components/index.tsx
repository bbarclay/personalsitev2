'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";
import { MathematicalInsight } from './components/MathematicalInsight';
import { MatrixGrid } from './components/MatrixGrid';
import { SingularValueSpectrum } from './components/SingularValueSpectrum';
import { CompletionMetrics } from './components/CompletionMetrics';
import { useMatrixCompletion } from './hooks/useMatrixCompletion';

const MatrixCompletionVisualizer: React.FC = () => {
  const [showTheory, setShowTheory] = useState(false);
  const { state, setState, handleGenerateExample, handleComplete } = useMatrixCompletion();
  return (
    <div className="p-6 bg-background text-foreground">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>

            <p className="text-muted-foreground mt-2">
              Reconstruct missing values using low-rank matrix completion, based on the groundbreaking work of Emmanuel Candès and Benjamin Recht (2009)
            </p>
          </div>
          {state.isProcessing && (
            <div className="flex items-center gap-2 text-primary animate-pulse">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw className="w-5 h-5" />
              </motion.div>
              <span>Processing...</span>
            </div>
          )}
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
                onClick={handleComplete}
                className="flex items-center bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                disabled={state.isProcessing || !state.matrix.length}
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
                Complete Matrix
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
                    title="Nuclear Norm Minimization (Candès & Recht, 2009)"
                    content="Matrix completion via nuclear norm minimization, introduced by Emmanuel Candès and Benjamin Recht, revolutionized the field by proving that most low-rank matrices can be perfectly reconstructed from a small subset of entries. The nuclear norm (sum of singular values) serves as a convex proxy for rank minimization."
                  />
                  <MathematicalInsight
                    title="Matrix Coherence"
                    content={`Current matrix coherence: ${state.metrics.coherence.toFixed(2)}. Coherence measures how well-spread the singular vectors are, affecting recovery guarantees. Lower coherence means better recovery chances. This concept was crucial in establishing the theoretical foundations of matrix completion.`}
                  />
                  <MathematicalInsight
                    title="Historical Impact"
                    content="This work had profound implications for collaborative filtering, quantum state tomography, and signal processing. The Netflix Prize competition (2006-2009) highlighted its practical significance in recommendation systems."
                  />
                </motion.div>
              </AnimatePresence>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Original Matrix</h4>
                <MatrixGrid matrix={state.matrix} />
              </div>

              {state.completedMatrix && (
                <div>
                  <h4 className="text-lg font-semibold mb-4">Completed Matrix</h4>
                  <MatrixGrid matrix={state.completedMatrix} isCompleted={true} />
                </div>
              )}
            </div>

            {state.completedMatrix && (
              <SingularValueSpectrum singularValues={state.metrics.singularValues} />
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-lg mb-6 border border-border">
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">Parameters</h3>
              <div className="space-y-4">
                <label className="block">
                  <span className="text-muted-foreground">Target Rank</span>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={state.rank}
                    onChange={(e) => setState((prev: typeof state) => ({ ...prev, rank: parseInt(e.target.value) }))}
                    className="w-full mt-1 bg-background text-foreground border border-input rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </label>
                <label className="block">
                  <span className="text-muted-foreground">Tolerance</span>
                  <input
                    type="number"
                    min="1e-10"
                    max="1e-2"
                    step="1e-6"
                    value={state.tolerance}
                    onChange={(e) => setState((prev: typeof state) => ({ ...prev, tolerance: parseFloat(e.target.value) }))}
                    className="w-full mt-1 bg-background text-foreground border border-input rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </label>
              </div>
            </div>

            {state.completedMatrix && (
              <div className="bg-card p-6 rounded-lg space-y-6 border border-border">
                <h3 className="text-xl font-semibold mb-4 text-card-foreground">Completion Metrics</h3>

                <div>
                  <label className="text-muted-foreground font-medium">Effective Rank</label>
                  <div className="text-2xl font-bold text-foreground mt-1">
                    {state.metrics.rank}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Number of significant singular values
                  </p>
                </div>

                <div>
                  <label className="text-muted-foreground font-medium">Nuclear Norm</label>
                  <div className="text-2xl font-bold text-foreground mt-1">
                    {state.metrics.nuclearNorm.toFixed(2)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sum of singular values
                  </p>
                </div>

                <div>
                  <label className="text-muted-foreground font-medium">Reconstruction Error</label>
                  <div className="text-2xl font-bold text-foreground mt-1">
                    {state.metrics.error.toExponential(2)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Frobenius norm of difference
                  </p>
                </div>

                <div>
                  <label className="text-muted-foreground font-medium">Iterations</label>
                  <div className="text-2xl font-bold text-foreground mt-1">
                    {state.metrics.iterations}
                  </div>
                </div>

                <div>
                  <label className="text-muted-foreground font-medium">Convergence Time</label>
                  <div className="text-2xl font-bold text-foreground mt-1">
                    {state.metrics.convergenceTime.toFixed(0)}ms
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

        {showTheory && (
          <div className="mt-8 bg-gray-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Mathematical Background</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                Matrix completion is a fundamental problem in modern data science, with applications
                ranging from recommendation systems to sensor networks. The work of Candès and Tao
                showed that under certain conditions, a low-rank matrix can be perfectly reconstructed
                from a small subset of its entries.
              </p>

              <p>
                Key theoretical results:
              </p>

              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Nuclear Norm Minimization:</strong> The problem of completing a low-rank
                  matrix can be solved via convex optimization by minimizing the nuclear norm
                  (sum of singular values) subject to data constraints.
                </li>

                <li>
                  <strong>Sample Complexity:</strong> For an n×n matrix of rank r, roughly
                  nr log(n) randomly sampled entries are sufficient for exact recovery with
                  high probability.
                </li>

                <li>
                  <strong>Incoherence Conditions:</strong> Recovery guarantees depend on how
                  well-spread the singular vectors are, measured by the matrix coherence.
                  Lower coherence means better recovery chances.
                </li>
              </ul>

              <p>
                The algorithm visualized here uses iterative soft thresholding of singular
                values, which provides a computationally efficient way to solve the nuclear
                norm minimization problem.
              </p>
            </div>
          </div>
        )}

        {state.completedMatrix && (
          <CompletionMetrics metrics={state.metrics} />
        )}
      </div>
    </div>
  );
};

export default MatrixCompletionVisualizer;
