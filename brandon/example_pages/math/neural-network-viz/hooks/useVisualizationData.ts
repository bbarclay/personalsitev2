import { useMemo } from 'react';
import { DataPoint } from '../types';
import { predict } from '../utils';

interface GridPoint {
  x: number;
  y: number;
  prediction: number;
  key: string;
}

interface VisualizationData {
  gridPoints: GridPoint[];
  toyPoints: GridPoint[];
  decisionBoundary: GridPoint[];
}

export function useVisualizationData(
  data: DataPoint[],
  weights: number[],
  gridStep: number = 0.05
): VisualizationData {
  return useMemo(() => {
    const gridPoints: GridPoint[] = [];
    const toyPoints: GridPoint[] = [];
    const decisionBoundary: GridPoint[] = [];

    // Create a finer grid for decision boundary
    for (let x = -1; x <= 1; x += gridStep) {
      for (let y = -1; y <= 1; y += gridStep) {
        const roundedX = Math.round(x * 100) / 100;
        const roundedY = Math.round(y * 100) / 100;
        const prediction = predict({ x: roundedX, y: roundedY, label: 0 }, weights);
        const point = {
          x: roundedX,
          y: roundedY,
          prediction,
          key: `${roundedX}-${roundedY}`
        };

        gridPoints.push(point);
        
        // Points near the decision boundary
        if (Math.abs(prediction - 0.5) < 0.1) {
          decisionBoundary.push(point);
        }

        // Points that are more definitively classified
        if (Math.abs(prediction - 0.5) > 0.3) {
          toyPoints.push(point);
        }
      }
    }

    return {
      gridPoints,
      toyPoints: toyPoints.filter((_, i) => i % 4 === 0), // Reduce density of toy points
      decisionBoundary
    };
  }, [weights, gridStep]);
}