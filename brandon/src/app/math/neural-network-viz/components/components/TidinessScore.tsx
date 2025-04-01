import React from 'react';
import { Sparkles, ToyBrick } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip';

interface TidinessScoreProps {
  loss: number[];
}

export const TidinessScore = ({ loss }: TidinessScoreProps) => {
  return (
    <Card className="bg-background/50 border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Sparkles className="w-5 h-5" />
          Organization Accuracy
        </CardTitle>
      </CardHeader>
      <CardContent>
        <svg
          viewBox="0 0 100 60"
          className="w-full h-80 bg-background rounded-lg"
        >
          <defs>
            <pattern
              id="scoreGrid"
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
          <rect width="100" height="60" fill="url(#scoreGrid)" />

          {loss.map((l: number, i: number) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <>
                  <line
                    x1={i - 1}
                    y1={60 - Math.min(loss[i - 1] * 30, 58)}
                    x2={i}
                    y2={60 - Math.min(l * 30, 58)}
                    stroke="hsl(var(--primary))"
                    strokeWidth="0.5"
                  />
                  <Tooltip key={`loss-${i}`}>
                    <TooltipTrigger asChild>
                      <ToyBrick
                        size={8}
                        className="text-primary"
                        style={{
                          transform: `translate(${i}px, ${60 - Math.min(l * 30, 58)}px)`,
                        }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      Iteration {i}: {Math.round((1 - l) * 100)}% Accurate
                    </TooltipContent>
                  </Tooltip>
                </>
              )}
            </React.Fragment>
          ))}

          <text x="2" y="10" fill="hsl(var(--primary))" fontSize="4">
            100% Accurate
          </text>
          <text x="2" y="55" fill="hsl(var(--primary))" fontSize="4">
            0% Accurate
          </text>
        </svg>
      </CardContent>
    </Card>
  );
};