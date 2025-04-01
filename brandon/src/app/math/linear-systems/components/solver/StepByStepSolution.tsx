import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface StepByStepSolutionProps {
  solution: any;
  currentStep: number;
  onStepForward: () => void;
  onStepBack: () => void;
}

export function StepByStepSolution({ 
  solution, 
  currentStep, 
  onStepForward, 
  onStepBack 
}: StepByStepSolutionProps) {
  if (!solution) return null;

  const step = solution.steps[currentStep];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Step {currentStep + 1}</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={onStepBack}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={onStepForward}
            disabled={currentStep === solution.steps.length - 1}
          >
            Next
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <p className="font-medium mb-2">{step.description}</p>
        <div className="font-mono whitespace-pre">
          {step.equations.join('\n')}
        </div>
      </Card>
    </div>
  );
}