"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { SystemInput } from './SystemInput';
import { SystemVisualizer } from './SystemVisualizer';
import { SolutionSteps } from './SolutionSteps';
import { MethodSelector } from './MethodSelector';
import { SystemControls } from './SystemControls';
import { useLinearSystem } from '../../hooks/useLinearSystem';

export function LinearSystemsSolver() {
  const {
    system,
    method,
    steps,
    currentStep,
    isPlaying,
    error,
    setSystem,
    setMethod,
    handleNext,
    handlePrev,
    handlePlay,
    handlePause,
    handleReset,
    solve
  } = useLinearSystem();

  return (
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <SystemInput 
            value={system}
            onChange={setSystem}
            onSolve={solve}
          />
          <MethodSelector 
            value={method}
            onChange={setMethod}
          />
          <SystemControls
            isPlaying={isPlaying}
            onPlay={handlePlay}
            onPause={handlePause}
            onNext={handleNext}
            onPrev={handlePrev}
            onReset={handleReset}
            disabled={steps.length === 0}
          />
        </div>
        
        <SystemVisualizer
          step={steps[currentStep]}
          system={system}
        />
      </div>

      <SolutionSteps
        steps={steps}
        currentStep={currentStep}
        error={error}
      />
    </div>
  );
}