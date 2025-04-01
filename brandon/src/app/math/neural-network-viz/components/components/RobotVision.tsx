import React, { memo } from 'react';
import { Eye, ToyBrick } from 'lucide-react';
import { TeddyBear } from './icons/TeddyBear';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip';
import { DataPoint } from '../types';
import { useVisualizationData } from '../hooks';
import { predict } from '../utils';

interface RobotVisionProps {
  data: DataPoint[];
  weights: number[];
  isTraining: boolean;
}

export const RobotVision = memo(({ data, weights, isTraining }: RobotVisionProps) => {
  const { gridPoints, decisionBoundary } = useVisualizationData(data, weights, 0.1);

  const renderHeatmap = () => {
    return gridPoints.map(({ x, y, prediction, key }) => (
      <rect
        key={key}
        x={x - 0.05}
        y={y - 0.05}
        width="0.1"
        height="0.1"
        fill={`rgba(${prediction > 0.5 
          ? `134, 239, 172, ${prediction * 0.3}` // green for soft toys area
          : `147, 197, 253, ${(1 - prediction) * 0.3}`})`} // blue for blocks area
      />
    ));
  };

  const renderBoundary = () => {
    return decisionBoundary.map(({ x, y, key }) => (
      <circle
        key={key}
        cx={x}
        cy={y}
        r="0.02"
        fill="hsl(var(--primary))"
        className="opacity-30"
      />
    ));
  };

  const renderToys = () => {
    return data.map((point: DataPoint, i: number) => (
      <Tooltip key={i}>
        <TooltipTrigger asChild>
          <g transform={`translate(${point.x}, ${point.y})`} style={{ cursor: 'pointer' }}>
            {point.label === 1 ? (
              <g>
                <circle
                  r="0.15"
                  fill="rgba(244, 114, 182, 0.3)"
                  className={isTraining ? "animate-pulse" : ""}
                />
                <g transform="translate(-0.08, -0.08)">
                  <TeddyBear className="w-[0.16] h-[0.16] text-pink-400" />
                </g>
              </g>
            ) : (
              <g>
                <circle
                  r="0.15"
                  fill="rgba(96, 165, 250, 0.3)"
                  className={isTraining ? "animate-pulse" : ""}
                />
                <g transform="translate(-0.08, -0.08)">
                  <ToyBrick className="w-[0.16] h-[0.16] text-blue-400" />
                </g>
              </g>
            )}
          </g>
        </TooltipTrigger>
        <TooltipContent className="z-50">
          {point.label === 1 ? "Soft Toy" : "Building Block"}
          <br />
          Confidence: {Math.round(point.label === 1 
            ? predict(point, weights) * 100 
            : (1 - predict(point, weights)) * 100)}%
        </TooltipContent>
      </Tooltip>
    ));
  };

  return (
    <Card className="bg-background/50 border-border/50 relative">
      <CardHeader className="relative z-20">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Eye className="w-5 h-5" />
          Robot&apos;s Vision
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-30">
        <div className="relative">
          <svg
            viewBox="-1.2 -1.2 2.4 2.4"
            className="w-full h-80 bg-background rounded-lg"
          >
            {/* Scanner effect */}
            <defs>
              <linearGradient id="scanner" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
              </linearGradient>
              <mask id="scannerMask">
                <rect x="-1.2" y="-1.2" width="2.4" height="2.4" fill="white" />
              </mask>
            </defs>

            {/* Grid lines */}
            <g className="opacity-20">
              {Array.from({ length: 24 }).map((_, i) => {
                const pos = -1.2 + i * 0.1;
                return (
                  <React.Fragment key={i}>
                    <line
                      x1={pos}
                      y1="-1.2"
                      x2={pos}
                      y2="1.2"
                      stroke="hsl(var(--foreground))"
                      strokeWidth="0.005"
                    />
                    <line
                      x1="-1.2"
                      y1={pos}
                      x2="1.2"
                      y2={pos}
                      stroke="hsl(var(--foreground))"
                      strokeWidth="0.005"
                    />
                  </React.Fragment>
                );
              })}
            </g>

            {/* Heatmap */}
            {renderHeatmap()}

            {/* Decision boundary */}
            {renderBoundary()}

            {/* Toys */}
            {renderToys()}

            {/* Scanner animation */}
            {isTraining && (
              <rect
                x="-1.2"
                y="-1.2"
                width="2.4"
                height="2.4"
                fill="url(#scanner)"
                mask="url(#scannerMask)"
                className="animate-pulse"
              >
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  from="0 -2.4"
                  to="0 2.4"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </rect>
            )}
          </svg>

          {/* Legend */}
          <div className="absolute bottom-2 right-2 flex flex-col gap-2 text-xs bg-background/80 p-2 rounded">
            <div className="text-center mb-1">What the Robot Sees:</div>
            <div className="flex flex-col gap-2">
              <div className="border-b border-border pb-1">
                <div className="text-[10px] text-muted-foreground mb-1">Actual Toys:</div>
                <div className="flex items-center gap-1">
                  <TeddyBear className="w-3 h-3 text-pink-400" />
                  <span>Soft Toy</span>
                </div>
                <div className="flex items-center gap-1">
                  <ToyBrick className="w-3 h-3 text-blue-400" />
                  <span>Building Block</span>
                </div>
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground mb-1">Where Robot Thinks Toys Should Go:</div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-300 opacity-30 rounded-sm" />
                  <span>Soft Toys Zone</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-300 opacity-30 rounded-sm" />
                  <span>Building Blocks Zone</span>
                </div>
                <div className="text-[10px] text-muted-foreground mt-1">
                  Darker shade = More confident about this area
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});