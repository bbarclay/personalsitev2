"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface Step {
  system: string;
  operation?: string;
  solution?: {
    x: number;
    y: number;
  };
}

interface SolutionStepsProps {
  steps: Step[];
  currentStep: number;
  error?: string;
}

export function SolutionSteps({ steps, currentStep, error }: SolutionStepsProps) {
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (steps.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Solution Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Enter a system and click "Solve" to see the solution steps.</p>
        </CardContent>
      </Card>
    );
  }

  const currentStepData = steps[currentStep];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Solution Steps</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 border rounded-md bg-muted/50">
          <div className="mb-2 font-medium">
            Step {currentStep + 1} of {steps.length}
          </div>
          
          {currentStepData.operation && (
            <div className="mb-4 text-muted-foreground">
              <span className="font-medium">Operation:</span> {currentStepData.operation}
            </div>
          )}

          <div className="font-mono whitespace-pre-wrap">
            {currentStepData.system}
          </div>

          {currentStepData.solution && (
            <div className="mt-4 font-medium text-primary">
              Solution: x = {currentStepData.solution.x}, y = {currentStepData.solution.y}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 