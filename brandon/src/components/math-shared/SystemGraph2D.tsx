import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SystemGraph2DProps {
  matrixA: number[][];
  vectorB: number[];
  solution?: number[] | null;
  width?: number;
  height?: number;
  padding?: number;
  className?: string;
  gridLines?: number;
  axisLabels?: boolean;
  showIntersection?: boolean;
}

export const SystemGraph2D: React.FC<SystemGraph2DProps> = ({
  matrixA,
  vectorB,
  solution,
  width = 300,
  height = 300,
  padding = 30,
  className = '',
  gridLines = 10,
  axisLabels = true,
  showIntersection = true,
}) => {
  // Validate that this is a 2x2 system
  const is2x2 = matrixA.length === 2 && matrixA[0]?.length === 2 && vectorB.length === 2;
  
  // Calculate view bounds based on coefficients and solutions
  const viewBounds = useMemo(() => {
    if (!is2x2) return { minX: -5, maxX: 5, minY: -5, maxY: 5 };
    
    // Start with default bounds
    let bounds = { minX: -5, maxX: 5, minY: -5, maxY: 5 };
    
    // If we have a solution, center the view around it
    if (solution && solution.length === 2) {
      const [x, y] = solution;
      const margin = 3; // Add some space around the solution
      
      bounds = {
        minX: Math.floor(x - margin),
        maxX: Math.ceil(x + margin),
        minY: Math.floor(y - margin),
        maxY: Math.ceil(y + margin)
      };
    }
    
    // Ensure bounds are reasonable
    if (bounds.maxX - bounds.minX < 6) {
      const center = (bounds.minX + bounds.maxX) / 2;
      bounds.minX = center - 3;
      bounds.maxX = center + 3;
    }
    
    if (bounds.maxY - bounds.minY < 6) {
      const center = (bounds.minY + bounds.maxY) / 2;
      bounds.minY = center - 3;
      bounds.maxY = center + 3;
    }
    
    return bounds;
  }, [is2x2, solution]);
  
  // Map from math coordinates to SVG coordinates
  const mapX = (x: number): number => {
    return padding + ((x - viewBounds.minX) / (viewBounds.maxX - viewBounds.minX)) * (width - 2 * padding);
  };
  
  const mapY = (y: number): number => {
    // Invert Y because SVG has 0,0 at top-left
    return height - (padding + ((y - viewBounds.minY) / (viewBounds.maxY - viewBounds.minY)) * (height - 2 * padding));
  };
  
  // Calculate line endpoints for each equation
  const lineEndpoints = useMemo(() => {
    if (!is2x2) return [];
    
    // For each equation ax + by = c, calculate two points on the line
    return matrixA.map((row, i) => {
      const [a, b] = row;
      const c = vectorB[i];
      
      // Handle special cases
      if (Math.abs(b) < 1e-10) {
        // Vertical line: x = c/a
        const x = c / a;
        return {
          x1: x,
          y1: viewBounds.minY,
          x2: x, 
          y2: viewBounds.maxY,
          equation: `${a.toFixed(1)}x + ${b.toFixed(1)}y = ${c.toFixed(1)}`
        };
      } 
      
      if (Math.abs(a) < 1e-10) {
        // Horizontal line: y = c/b
        const y = c / b;
        return {
          x1: viewBounds.minX, 
          y1: y,
          x2: viewBounds.maxX, 
          y2: y,
          equation: `${a.toFixed(1)}x + ${b.toFixed(1)}y = ${c.toFixed(1)}`
        };
      }
      
      // Standard case: calculate y for min and max x
      // y = (c - ax) / b
      const y1 = (c - a * viewBounds.minX) / b;
      const y2 = (c - a * viewBounds.maxX) / b;
      
      // If these points are outside the view, calculate x for min and max y
      if ((y1 < viewBounds.minY || y1 > viewBounds.maxY) || 
          (y2 < viewBounds.minY || y2 > viewBounds.maxY)) {
        // x = (c - by) / a
        const x1 = (c - b * viewBounds.minY) / a;
        const x2 = (c - b * viewBounds.maxY) / a;
        
        return {
          x1, 
          y1: viewBounds.minY,
          x2, 
          y2: viewBounds.maxY,
          equation: `${a.toFixed(1)}x + ${b.toFixed(1)}y = ${c.toFixed(1)}`
        };
      }
      
      return {
        x1: viewBounds.minX, 
        y1,
        x2: viewBounds.maxX, 
        y2,
        equation: `${a.toFixed(1)}x + ${b.toFixed(1)}y = ${c.toFixed(1)}`
      };
    });
  }, [is2x2, matrixA, vectorB, viewBounds]);
  
  // Pick two nice colors for the lines
  const lineColors = ['#3b82f6', '#ef4444']; // blue, red
  
  // If this is not a 2x2 system, show an error message
  if (!is2x2) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-sm font-medium">System Visualization</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Visualization is only available for 2×2 systems.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  // Function to generate ticks for axes
  const generateTicks = () => {
    const xTicks = [];
    const yTicks = [];
    const tickStep = Math.ceil((viewBounds.maxX - viewBounds.minX) / 10);
    
    // X-axis ticks
    for (let x = Math.ceil(viewBounds.minX); x <= viewBounds.maxX; x += tickStep) {
      xTicks.push(
        <g key={`x-tick-${x}`}>
          <line 
            x1={mapX(x)} 
            y1={mapY(0) - 5} 
            x2={mapX(x)} 
            y2={mapY(0) + 5} 
            stroke="currentColor"
            strokeWidth="1"
          />
          {axisLabels && (
            <text 
              x={mapX(x)} 
              y={mapY(0) + 20} 
              textAnchor="middle" 
              fontSize="10"
              fill="currentColor"
            >
              {x}
            </text>
          )}
        </g>
      );
    }
    
    // Y-axis ticks
    for (let y = Math.ceil(viewBounds.minY); y <= viewBounds.maxY; y += tickStep) {
      yTicks.push(
        <g key={`y-tick-${y}`}>
          <line 
            x1={mapX(0) - 5} 
            y1={mapY(y)} 
            x2={mapX(0) + 5} 
            y2={mapY(y)} 
            stroke="currentColor"
            strokeWidth="1"
          />
          {axisLabels && y !== 0 && (
            <text 
              x={mapX(0) - 20} 
              y={mapY(y) + 4} 
              textAnchor="middle" 
              fontSize="10"
              fill="currentColor"
            >
              {y}
            </text>
          )}
        </g>
      );
    }
    
    return [...xTicks, ...yTicks];
  };
  
  // Function to generate grid lines
  const generateGrid = () => {
    const grid = [];
    const stepX = (viewBounds.maxX - viewBounds.minX) / gridLines;
    const stepY = (viewBounds.maxY - viewBounds.minY) / gridLines;
    
    // Vertical grid lines
    for (let x = viewBounds.minX; x <= viewBounds.maxX + 0.1; x += stepX) {
      grid.push(
        <line 
          key={`grid-v-${x}`}
          x1={mapX(x)} 
          y1={mapY(viewBounds.minY)} 
          x2={mapX(x)} 
          y2={mapY(viewBounds.maxY)} 
          stroke="currentColor"
          strokeWidth="0.5"
          strokeOpacity="0.2"
        />
      );
    }
    
    // Horizontal grid lines
    for (let y = viewBounds.minY; y <= viewBounds.maxY + 0.1; y += stepY) {
      grid.push(
        <line 
          key={`grid-h-${y}`}
          x1={mapX(viewBounds.minX)} 
          y1={mapY(y)} 
          x2={mapX(viewBounds.maxX)} 
          y2={mapY(y)} 
          stroke="currentColor"
          strokeWidth="0.5"
          strokeOpacity="0.2"
        />
      );
    }
    
    return grid;
  };
  
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">System Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <svg width={width} height={height} className="overflow-visible">
            {/* Grid */}
            {generateGrid()}
            
            {/* Axes */}
            <line 
              x1={mapX(viewBounds.minX)} 
              y1={mapY(0)} 
              x2={mapX(viewBounds.maxX)} 
              y2={mapY(0)} 
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <line 
              x1={mapX(0)} 
              y1={mapY(viewBounds.minY)} 
              x2={mapX(0)} 
              y2={mapY(viewBounds.maxY)} 
              stroke="currentColor"
              strokeWidth="1.5"
            />
            
            {/* Axis ticks */}
            {generateTicks()}
            
            {/* Lines representing the equations */}
            {lineEndpoints.map((line, i) => (
              <g key={`line-${i}`}>
                <line 
                  x1={mapX(line.x1)} 
                  y1={mapY(line.y1)} 
                  x2={mapX(line.x2)} 
                  y2={mapY(line.y2)} 
                  stroke={lineColors[i % lineColors.length]}
                  strokeWidth="2"
                />
                <text 
                  x={mapX((line.x1 + line.x2) / 2) + 10} 
                  y={mapY((line.y1 + line.y2) / 2) - 10} 
                  fill={lineColors[i % lineColors.length]}
                  fontSize="11"
                  fontWeight="500"
                >
                  {line.equation}
                </text>
              </g>
            ))}
            
            {/* Solution point */}
            {showIntersection && solution && solution.length === 2 && (
              <g>
                <circle 
                  cx={mapX(solution[0])} 
                  cy={mapY(solution[1])} 
                  r="5"
                  fill="green"
                />
                <text 
                  x={mapX(solution[0]) + 10} 
                  y={mapY(solution[1]) - 10} 
                  fill="green"
                  fontSize="12"
                  fontWeight="bold"
                >
                  ({solution[0].toFixed(2)}, {solution[1].toFixed(2)})
                </text>
              </g>
            )}
          </svg>
          
          {/* Solution information */}
          <div className="mt-4 text-sm">
            {solution && solution.length === 2 ? (
              <p className="font-medium text-center">
                Solution: (x₁, x₂) = ({solution[0].toFixed(2)}, {solution[1].toFixed(2)})
              </p>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center">
                {solution === null ? 'No solution or infinitely many solutions' : 'Solve the system to see the solution'}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 