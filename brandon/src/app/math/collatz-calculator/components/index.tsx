'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

import Chart from './Chart';
import DisplayOptions from './DisplayOptions';
import InputField from './InputField';
import PlayControls from './PlayControls';
import Results from './Results';
import { useCollatzCalculator } from './hooks/useCollatzCalculator';
import { usePlayControls } from './hooks/usePlayControls';
import { useChartTransformations } from './hooks/useChartTransformations';

const CollatzCalculator = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    standardNumber,
    setStandardNumber,
    customNumber,
    setCustomNumber,
    divideBy,
    setDivideBy,
    multiplyBy,
    setMultiplyBy,
    addAfterDivide,
    setAddAfterDivide,
    addAfterMultiply,
    setAddAfterMultiply,
    maxSteps,
    setMaxSteps,
    standardResults,
    customResults,
    error,
    handleCalculate,
    autoCalculateFn,
  } = useCollatzCalculator();

  const {
    isPlayingStandard,
    isPlayingCustom,
    standardSpeed,
    setStandardSpeed,
    customSpeed,
    setCustomSpeed,
    togglePlay,
    handlePreviousNumber,
    handleNextNumber,
  } = usePlayControls({
    autoCalculateFn,
  });

  const {
    checkboxes,
    handleCheckboxChange,
    colors,
    prepareChartData,
    selectedTransformations,
  } = useChartTransformations(standardResults, customResults);

  // Return null on first render to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen [--tooltip-bg:rgba(255,255,255,0.9)] [--tooltip-border:1px_solid_#ccc] [--tooltip-color:#333] dark:[--tooltip-bg:rgba(31,41,55,0.9)] dark:[--tooltip-border:1px_solid_#4b5563] dark:[--tooltip-color:#e5e7eb]">
      <main className="flex-1">
        {/* Top Section - Display Options */}
        <DisplayOptions checkboxes={checkboxes} onCheckboxChange={handleCheckboxChange} />

        {/* Main Content */}
        <div className="mt-6 flex overflow-hidden max-w-[1600px] mx-auto w-full gap-6 px-6">
        {/* Side Section - Controls */}
        <div className="w-[400px] bg-background/50 backdrop-blur-[1px] p-6 overflow-y-auto">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Standard Collatz Section */}
          <div className="glass-panel mb-6">
            <h2 className="text-title mb-4">
              Collatz 3n+1 Conjecture
            </h2>
            <div className="form-group">
              <InputField label="Number to test" value={standardNumber} onChange={setStandardNumber} />
              <PlayControls
                isStandard={true}
                isPlayingStandard={isPlayingStandard}
                isPlayingCustom={isPlayingCustom}
                togglePlay={togglePlay}
                handlePreviousNumber={handlePreviousNumber}
                handleNextNumber={handleNextNumber}
                standardSpeed={standardSpeed}
                customSpeed={customSpeed}
                setStandardSpeed={setStandardSpeed}
                setCustomSpeed={setCustomSpeed}
              />
              <button
                onClick={() => handleCalculate(true)}
                className="glass-button"
              >
                Calculate
              </button>
            </div>
          </div>

          {/* Custom Conjecture Section */}
          <div className="glass-panel">
            <h2 className="text-title mb-4">
              Custom Conjecture
            </h2>
            <div className="form-group">
              <InputField label="Number to test" value={customNumber} onChange={setCustomNumber} />
              <InputField label="Divide if multiple of" value={divideBy} onChange={setDivideBy} />
              <InputField label="And add" value={addAfterDivide} onChange={setAddAfterDivide} />
              <InputField label="Else multiply by" value={multiplyBy} onChange={setMultiplyBy} />
              <InputField label="And add" value={addAfterMultiply} onChange={setAddAfterMultiply} />
              <InputField label="Stop after N steps" value={maxSteps} onChange={setMaxSteps} />
              <PlayControls
                isStandard={false}
                isPlayingStandard={isPlayingStandard}
                isPlayingCustom={isPlayingCustom}
                togglePlay={togglePlay}
                handlePreviousNumber={handlePreviousNumber}
                handleNextNumber={handleNextNumber}
                standardSpeed={standardSpeed}
                customSpeed={customSpeed}
                setStandardSpeed={setStandardSpeed}
                setCustomSpeed={setCustomSpeed}
              />
              <button
                onClick={() => handleCalculate(false)}
                className="glass-button"
              >
                Calculate
              </button>
            </div>
          </div>
        </div>

        {/* Side Section - Results and Charts */}
        <div className="w-2/3 p-6 overflow-y-auto">
          {/* Display Results Info */}
          <div className="bg-background/50 backdrop-blur-[1px] rounded-lg p-4 mb-6 border border-foreground/10">
            <Results standardResults={standardResults} customResults={customResults} />
          </div>

          {/* Display Charts Based on Selected Options */}
          <div className="bg-background/50 backdrop-blur-[1px] rounded-lg p-4 border border-foreground/10">
            {selectedTransformations.length > 0 ? (
              selectedTransformations.map((transformation, index) => {
                const chartData = prepareChartData(transformation);
                return (
                  <Chart
                    key={index}
                    transformation={transformation}
                    chartData={chartData}
                    standardResults={standardResults}
                    customResults={customResults}
                    colors={colors}
                  />
                );
              })
            ) : (
              <div className="flex items-center justify-center h-full p-6">
                <p className="text-foreground/60">
                  Select display options to visualize the sequences
                </p>
              </div>
            )}
          </div>
        </div>
        </div>
      </main>
    </div>
  );
};

export default CollatzCalculator;
