'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLinearSystem } from '../hooks/useLinearSystem';
import { SystemInput } from './solver/SystemInput';
import { MethodSelector } from './solver/MethodSelector';
import { VisualExplorer } from './visualizer/VisualExplorer';
import { SolutionSteps } from './solver/SolutionSteps';
import { TutorialOverlay } from './onboarding/TutorialOverlay';
import { HelpPanel } from './help/HelpPanel';

export function LinearSystemsExplorer() {
  const [showTutorial, setShowTutorial] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  
  const {
    system,
    method,
    solution,
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
    <div className="min-h-screen p-4 space-y-6">
      {/* Header with Help and Tutorial Controls */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Linear Systems Explorer</h1>
        <div className="space-x-2">
          <Button 
            variant="outline" 
            onClick={() => setShowHelp(true)}
          >
            Help & Resources
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowTutorial(true)}
          >
            Start Tutorial
          </Button>
        </div>
      </div>

      {/* Main Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel: Input and Controls */}
        <Card className="p-4 space-y-4">
          <SystemInput 
            value={system}
            onChange={setSystem}
            onSolve={solve}
          />
          <MethodSelector 
            value={method}
            onChange={setMethod}
          />
          <div className="flex justify-between items-center">
            <Button
              onClick={handlePlay}
              disabled={!solution || isPlaying}
            >
              {isPlaying ? 'Playing...' : 'Play Solution'}
            </Button>
            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={handleNext}
                disabled={currentStep === steps.length - 1}
              >
                Next
              </Button>
            </div>
          </div>
        </Card>

        {/* Right Panel: Visualization */}
        <Card className="p-4">
          <VisualExplorer
            system={system}
            solution={solution}
            currentStep={steps[currentStep]}
          />
        </Card>
      </div>

      {/* Bottom Panel: Solution Steps */}
      <Card className="p-4">
        <SolutionSteps
          steps={steps}
          currentStep={currentStep}
          error={error}
        />
      </Card>

      {/* Overlays */}
      {showTutorial && (
        <TutorialOverlay
          onClose={() => setShowTutorial(false)}
          onComplete={() => {
            setShowTutorial(false);
            // Save tutorial completion to user preferences
          }}
        />
      )}

      {showHelp && (
        <HelpPanel
          onClose={() => setShowHelp(false)}
        />
      )}
    </div>
  );
}