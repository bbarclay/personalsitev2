import React, { memo } from 'react';
import { Boxes, ToyBrick, Bot } from 'lucide-react';
import { TeddyBear } from './icons/TeddyBear';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { DataPoint } from '../types';
import { useVisualizationData } from '../hooks';

interface ToyRoomProps {
  data: DataPoint[];
  weights: number[];
  iteration: number;
  isTraining: boolean;
}

const ROOM_FEATURES = {
  softToyCorner: {
    x: -0.8,
    y: -0.8,
    label: "Soft Toys Corner",
    icon: TeddyBear,
    color: "text-pink-400"
  },
  buildingZone: {
    x: 0.8,
    y: 0.8,
    label: "Building Blocks Zone",
    icon: ToyBrick,
    color: "text-blue-400"
  }
};

export const ToyRoom = memo(({ data, weights, iteration, isTraining }: ToyRoomProps) => {
  const { toyPoints } = useVisualizationData(data, weights, 0.1);

  // Calculate robot position based on iteration
  const robotX = Math.cos(iteration * 0.1) * 0.5;
  const robotY = Math.sin(iteration * 0.1) * 0.5;

  const renderRoomFeatures = () => {
    return Object.entries(ROOM_FEATURES).map(([key, feature]) => (
      <g key={key} transform={`translate(${feature.x}, ${feature.y})`}>
        <circle
          r="0.2"
          fill="hsl(var(--background))"
          stroke="hsl(var(--border))"
          strokeWidth="0.02"
          className="opacity-50"
        />
        <g transform="translate(-0.1, -0.1)">
          <feature.icon className={`w-[0.2] h-[0.2] ${feature.color}`} />
        </g>
        <text
          x="0"
          y="0.3"
          fontSize="0.1"
          textAnchor="middle"
          fill="hsl(var(--foreground))"
          className="opacity-70"
        >
          {feature.label}
        </text>
      </g>
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
                  fill="rgba(244, 114, 182, 0.2)"
                  className="animate-pulse"
                />
                <g transform="translate(-0.08, -0.08)">
                  <TeddyBear className="w-[0.16] h-[0.16] text-pink-400" />
                </g>
              </g>
            ) : (
              <g>
                <circle
                  r="0.15"
                  fill="rgba(96, 165, 250, 0.2)"
                  className="animate-pulse"
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
        </TooltipContent>
      </Tooltip>
    ));
  };

  const renderRobot = () => (
    <g transform={`translate(${robotX}, ${robotY})`}>
      <circle
        r="0.2"
        fill="hsl(var(--primary))"
        className="opacity-20 animate-pulse"
      />
      <g transform="translate(-0.1, -0.1)">
        <Bot 
          className="w-[0.2] h-[0.2] text-primary animate-bounce"
        />
      </g>
      {isTraining && (
        <path
          d={`M 0,0 L ${-robotX * 0.2},${-robotY * 0.2}`}
          stroke="hsl(var(--primary))"
          strokeWidth="0.02"
          strokeDasharray="0.05,0.05"
          className="opacity-50"
        />
      )}
    </g>
  );

  const renderPlayZones = () => {
    return toyPoints.map(({ x, y, prediction, key }) => (
      <circle
        key={key}
        cx={x}
        cy={y}
        r="0.05"
        fill={prediction > 0.5 ? "rgba(244, 114, 182, 0.1)" : "rgba(96, 165, 250, 0.1)"}
        stroke={prediction > 0.5 ? "rgba(244, 114, 182, 0.2)" : "rgba(96, 165, 250, 0.2)"}
        strokeWidth="0.01"
      />
    ));
  };

  return (
    <Card className="bg-background/50 border-border/50 relative">
      <CardHeader className="relative z-20">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Boxes className="w-5 h-5" />
          Robbie&apos;s Room
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-30">
        <svg
          viewBox="-1.2 -1.2 2.4 2.4"
          className="w-full h-80 bg-background rounded-lg"
        >
          {/* Room grid */}
          <defs>
            <pattern
              id="carpet"
              width="0.2"
              height="0.2"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 0.2 0 L 0 0 0 0.2"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="0.01"
              />
            </pattern>
          </defs>
          <rect
            x="-1.2"
            y="-1.2"
            width="2.4"
            height="2.4"
            fill="url(#carpet)"
            className="opacity-30"
          />

          {/* Play zones */}
          {renderPlayZones()}

          {/* Room features */}
          {renderRoomFeatures()}

          {/* Toys */}
          {renderToys()}

          {/* Robot */}
          {renderRobot()}
        </svg>
      </CardContent>
    </Card>
  );
});