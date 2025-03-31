import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface ExampleSystem {
  name: string;
  size: number;
  matrixA: number[][];
  vectorB: number[];
  description: string; // Required description for tooltip
}

interface ExampleSelectorProps {
  examples: ExampleSystem[];
  onSelectExample: (example: ExampleSystem) => void;
  disabled?: boolean;
  className?: string;
}

export const ExampleSelector: React.FC<ExampleSelectorProps> = ({
  examples,
  onSelectExample,
  disabled = false,
  className,
}) => {
  if (!examples || examples.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <Label>Load Example</Label>
      <div className="flex flex-wrap gap-2 mt-1">
        <TooltipProvider delayDuration={100}>
          {examples.map((example) => (
            <Tooltip key={example.name}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSelectExample(example)}
                  disabled={disabled}
                  className="text-xs h-8"
                >
                  {example.name}
                </Button>
              </TooltipTrigger>
              {example.description && (
                <TooltipContent>
                  <p>{example.description}</p>
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
};
