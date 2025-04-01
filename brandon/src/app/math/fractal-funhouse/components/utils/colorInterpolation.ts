import { ColorInterpolationFunction } from '../types/colorInterpolationFunction';
import { hexToRgb } from './fractalUtils';

export const linearColorInterpolation: ColorInterpolationFunction = (position, colors) => {
  const totalColors = colors.length;
  const scaledPosition = position * (totalColors - 1);
  const index = Math.floor(scaledPosition);
  const fraction = scaledPosition - index;

  const startColor = hexToRgb(colors[index]);
  const endColor = hexToRgb(colors[(index + 1) % totalColors]);

  const interpolatedColor: [number, number, number] = [
    Math.round(startColor[0] + (endColor[0] - startColor[0]) * fraction),
    Math.round(startColor[1] + (endColor[1] - startColor[1]) * fraction),
    Math.round(startColor[2] + (endColor[2] - startColor[2]) * fraction),
  ];

  return interpolatedColor;
};
