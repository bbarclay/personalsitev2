import React from 'react';
import { ScanSearch } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface LearningProgressProps {
  loss: number[];
}

export const LearningProgress = ({ loss }: LearningProgressProps) => {
  const renderLearningProgress = (): JSX.Element => {
    const elements: JSX.Element[] = [];
    for (let i = 0; i < loss.length; i++) {
      if (i > 0) {
        elements.push(
          <line
            key={`line-${i}`}
            x1={i - 1}
            y1={60 - Math.min(loss[i - 1] * 30, 58)}
            x2={i}
            y2={60 - Math.min(loss[i] * 30, 58)}
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
          />
        );
      }
      elements.push(
        <Tooltip key={`loss-${i}`}>
          <TooltipTrigger asChild>
            <circle
              cx={i}
              cy={60 - Math.min(loss[i] * 30, 58)}
              r="1"
              fill="hsl(var(--primary))"
            />
          </TooltipTrigger>
          <TooltipContent>
            Iteration {i}: Loss {loss[i].toFixed(3)}
          </TooltipContent>
        </Tooltip>
      );
    }
    return <g>{elements}</g>;
  };

  return (
    <Card className="bg-background/50 border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <ScanSearch className="w-5 h-5" />
          Learning Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <svg
          viewBox="0 0 100 60"
          className="w-full h-80 bg-background rounded-lg"
        >
          <defs>
            <pattern
              id="progressGrid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="60" fill="url(#progressGrid)" />

          {renderLearningProgress()}

          <text x="2" y="10" fill="hsl(var(--primary))" fontSize="4">
            Low Loss
          </text>
          <text x="2" y="55" fill="hsl(var(--primary))" fontSize="4">
            High Loss
          </text>
        </svg>
      </CardContent>
    </Card>
  );
};