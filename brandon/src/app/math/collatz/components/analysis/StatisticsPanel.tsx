import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import * as d3 from 'd3';

interface Statistics {
  maxValue: number;
  stepsToReachMax: number;
  averageStepSize: number;
  evenSteps: number;
  oddSteps: number;
  convergenceRate: number;
}

interface StatisticsPanelProps {
  statistics: Statistics | null;
}

export function StatisticsPanel({ statistics }: StatisticsPanelProps) {
  if (!statistics) {
    return (
      <Card className="p-4">
        <div className="text-center text-muted-foreground">
          No statistics available yet
        </div>
      </Card>
    );
  }

  const {
    maxValue,
    stepsToReachMax,
    averageStepSize,
    evenSteps,
    oddSteps,
    convergenceRate
  } = statistics;

  const totalSteps = evenSteps + oddSteps;
  const evenPercentage = (evenSteps / totalSteps) * 100;
  const oddPercentage = (oddSteps / totalSteps) * 100;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Maximum Value</h4>
              <Badge variant="secondary">{maxValue}</Badge>
            </div>
            <Progress value={(stepsToReachMax / totalSteps) * 100} />
            <p className="text-xs text-muted-foreground">
              Reached at step {stepsToReachMax}
            </p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Average Step Size</h4>
              <Badge variant="secondary">
                {averageStepSize.toFixed(2)}
              </Badge>
            </div>
            <Progress value={(averageStepSize / maxValue) * 100} />
            <p className="text-xs text-muted-foreground">
              Relative to max value
            </p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Convergence Rate</h4>
              <Badge variant="secondary">
                {(convergenceRate * 100).toFixed(2)}%
              </Badge>
            </div>
            <Progress value={convergenceRate * 100} />
            <p className="text-xs text-muted-foreground">
              Steps per max value
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Step Distribution</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Even Steps</span>
              <span className="text-sm font-medium">
                {evenSteps} ({evenPercentage.toFixed(1)}%)
              </span>
            </div>
            <Progress value={evenPercentage} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Odd Steps</span>
              <span className="text-sm font-medium">
                {oddSteps} ({oddPercentage.toFixed(1)}%)
              </span>
            </div>
            <Progress value={oddPercentage} className="h-2" />
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Key Insights</h4>
          <div className="space-y-2">
            <p className="text-sm">
              • The sequence reaches its maximum value of {maxValue} after {stepsToReachMax} steps
            </p>
            <p className="text-sm">
              • The sequence takes {totalSteps} total steps to reach 1
            </p>
            <p className="text-sm">
              • The average step size is {averageStepSize.toFixed(2)}, indicating{' '}
              {averageStepSize > 1 ? 'growth' : 'shrinkage'} on average
            </p>
            <p className="text-sm">
              • The convergence rate of {(convergenceRate * 100).toFixed(2)}% suggests{' '}
              {convergenceRate > 0.5 ? 'relatively slow' : 'relatively fast'} convergence
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
} 