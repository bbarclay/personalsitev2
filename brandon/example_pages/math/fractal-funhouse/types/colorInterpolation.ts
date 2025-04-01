import { GradientConfig } from './gradient';

export interface ColorInterpolation {
  startColor: [number, number, number];
  endColor: [number, number, number];
  steps: number;
}

export type ColorInterpolationFunction = (
  position: number,
  colors: readonly string[]
) => [number, number, number];
