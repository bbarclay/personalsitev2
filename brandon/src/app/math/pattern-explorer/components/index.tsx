'use client';

import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import { Alert, AlertDescription } from '@components/ui/alert';
import { AlertCircle } from 'lucide-react';

import PatternControls from './PatternControls';
import PatternDisplay from './PatternDisplay';
import PatternTypeSelector from './PatternTypeSelector';
import { usePatternGenerator } from './hooks/usePatternGenerator';
import '../math-components.css';

const PatternExplorer = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // Prevent hydration issues
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const {
    patternType,
    setPatternType,
    startValue,
    setStartValue,
    step,
    setStep,
    sequenceLength,
    setSequenceLength,
    pattern,
    error,
    generatePattern,
  } = usePatternGenerator();

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

            {/* Pattern Type Selection */}
            <div className="glass-panel mb-6">
              <h2 className="text-title mb-4">
                Pattern Type
              </h2>
              <PatternTypeSelector
                patternType={patternType}
                setPatternType={setPatternType}
              />
            </div>

            {/* Pattern Controls */}
            <div className="glass-panel mb-6">
              <h2 className="text-title mb-4">
                Pattern Settings
              </h2>
              <PatternControls
                patternType={patternType}
                startValue={startValue}
                setStartValue={setStartValue}
                step={step}
                setStep={setStep}
                sequenceLength={sequenceLength}
                setSequenceLength={setSequenceLength}
              />
            </div>

            <button
              onClick={generatePattern}
              className="glass-button w-full"
            >
              Generate Pattern
            </button>
          </div>

          {/* Right Section - Pattern Display */}
          <div className="w-2/3 p-6 overflow-y-auto">
            <div className="bg-background/50 backdrop-blur-[1px] rounded-lg p-4 border border-foreground/10">
              <PatternDisplay
                pattern={pattern}
                patternType={patternType}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatternExplorer;
