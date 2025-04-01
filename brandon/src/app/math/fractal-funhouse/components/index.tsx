'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";
import { FractalRenderer, FractalControls, ColorSchemeSwitcher, ErrorBoundary } from './components';
import { useFractal } from './hooks/useFractal';
import { UI_CONFIG } from './constants';
import { FractalType } from './types/fractal';

const FractalFunhouse: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);
  const {
    state,
    handleGenerateFractal,
    handleReset,
    handleChangeColors,
    handleZoomChange,
    handleFractalTypeChange,
    handleMaxIterationsChange,
  } = useFractal();

  return (
    <div className="p-6 bg-background text-foreground min-h-screen">
      <div className="max-w-6xl mx-auto">


        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={() => setShowInfo(!showInfo)}
            className="flex items-center bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            title="Toggle Information Panel"
            aria-label="Toggle Information Panel"
          >
            <Info className="mr-2" />
            {showInfo ? 'Hide Info' : 'Show Info'}
          </button>
        </div>

        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 bg-blue-950 p-4 rounded-lg"
              aria-live="polite"
            >
              <h2 className="text-xl font-semibold mb-2 text-blue-200">About Fractals</h2>
              <p className="text-blue-100">
                Fractals are infinitely complex patterns that are self-similar across different scales. They are created by repeating a simple process over and over in an ongoing feedback loop.
              </p>
              <p className="text-blue-100 mt-2">
                Use the controls to navigate through different fractals, adjust zoom levels, and customize color schemes to discover the mesmerizing world of fractal geometry.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ErrorBoundary
              fallback={<Alert variant="destructive"><AlertTitle>Something went wrong</AlertTitle><AlertDescription>Unable to render the fractal.</AlertDescription></Alert>}
              onError={(error: Error, errorInfo: React.ErrorInfo) => console.error('FractalRenderer Error:', error, errorInfo)}
            >
              <FractalRenderer
                fractalType={state.fractalType}
                zoom={state.zoom}
                maxIterations={state.maxIterations}
                colors={state.colors}
                isProcessing={state.isProcessing}
                error={state.error}
                onError={(error: Error) => handleReset()}
              />
            </ErrorBoundary>
          </div>

          <div className="lg:col-span-1 space-y-6">
            {state.error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error.message}</AlertDescription>
              </Alert>
            )}

            <FractalControls
              fractalType={state.fractalType}
              zoom={state.zoom}
              maxIterations={state.maxIterations}
              colors={state.colors}
              onFractalTypeChange={handleFractalTypeChange}
              onZoomChange={handleZoomChange}
              onGenerate={handleGenerateFractal}
              onReset={handleReset}
              onColorChange={handleChangeColors}
              onMaxIterationsChange={handleMaxIterationsChange}
            />

            <div className="bg-card p-6 rounded-lg space-y-6 border border-border">
              <h3 className="text-xl font-semibold mb-4">Current Settings</h3>
              <div>
                <label className="text-muted-foreground font-medium">Fractal Type</label>
                <div className="text-2xl font-bold text-foreground mt-1">
                  {state.fractalType}
                </div>
              </div>

              <div>
                <label className="text-muted-foreground font-medium">Zoom Level</label>
                <div className="text-2xl font-bold text-foreground mt-1">
                  {state.zoom.toFixed(2)}x
                </div>
              </div>

              <div>
                <label className="text-muted-foreground font-medium">Max Iterations</label>
                <div className="text-2xl font-bold text-foreground mt-1">
                  {state.maxIterations}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FractalFunhouse;
