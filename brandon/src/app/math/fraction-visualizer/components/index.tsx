'use client';

import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

import FractionDisplay from './FractionDisplay';
import FractionControls from './FractionControls';
import FractionOperations from './FractionOperations';
import { useFractionCalculator } from './hooks/useFractionCalculator';
import '../../../math-components.css';

const FractionVisualizer = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // Prevent hydration issues
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const {
    numerator,
    denominator,
    setNumerator,
    setDenominator,
    operation,
    setOperation,
    secondNumerator,
    secondDenominator,
    setSecondNumerator,
    setSecondDenominator,
    result,
    error,
    handleCalculate,
  } = useFractionCalculator();

  // Return null on first render to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen [--tooltip-bg:rgba(255,255,255,0.9)] [--tooltip-border:1px_solid_#ccc] [--tooltip-color:#333] dark:[--tooltip-bg:rgba(31,41,55,0.9)] dark:[--tooltip-border:1px_solid_#4b5563] dark:[--tooltip-color:#e5e7eb]">
      <main className="flex-1">
        <div className="mt-6 flex overflow-hidden max-w-[1600px] mx-auto w-full gap-6 px-6">
          {/* Left Section - Controls */}
          <div className="w-[400px] bg-background/50 backdrop-blur-[1px] p-6 overflow-y-auto">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* First Fraction Section */}
            <div className="glass-panel mb-6">
              <h2 className="text-title mb-4">
                First Fraction
              </h2>
              <div className="form-group">
                <FractionControls
                  numerator={numerator}
                  denominator={denominator}
                  setNumerator={setNumerator}
                  setDenominator={setDenominator}
                />
              </div>
            </div>

            {/* Operation Section */}
            <div className="glass-panel mb-6">
              <h2 className="text-title mb-4">
                Operation
              </h2>
              <FractionOperations
                operation={operation}
                setOperation={setOperation}
              />
            </div>

            {/* Second Fraction Section */}
            <div className="glass-panel mb-6">
              <h2 className="text-title mb-4">
                Second Fraction
              </h2>
              <div className="form-group">
                <FractionControls
                  numerator={secondNumerator}
                  denominator={secondDenominator}
                  setNumerator={setSecondNumerator}
                  setDenominator={setSecondDenominator}
                />
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="glass-button w-full"
            >
              Calculate
            </button>
          </div>

          {/* Right Section - Visualization */}
          <div className="w-2/3 p-6 overflow-y-auto">
            <div className="bg-background/50 backdrop-blur-[1px] rounded-lg p-4 border border-foreground/10">
              <FractionDisplay
                numerator={numerator}
                denominator={denominator}
                secondNumerator={secondNumerator}
                secondDenominator={secondDenominator}
                operation={operation}
                result={result}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FractionVisualizer;
