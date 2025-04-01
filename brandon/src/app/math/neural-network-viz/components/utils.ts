import { DataPoint } from './types';

export const generateData = (): DataPoint[] => {
  const points: DataPoint[] = [];
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * 2 - 1; // x between -1 and 1
    const y = Math.random() * 2 - 1; // y between -1 and 1
    const label = x * x + y * y < 0.5 ? 1 : 0;
    points.push({ x, y, label });
  }
  return points;
};

export const sigmoid = (x: number): number => 1 / (1 + Math.exp(-x));

export const predict = (point: DataPoint, w: number[]): number => {
  return sigmoid(w[0] + w[1] * point.x + w[2] * point.y);
};