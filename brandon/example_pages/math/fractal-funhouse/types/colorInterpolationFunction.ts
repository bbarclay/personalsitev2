export type ColorInterpolationFunction = (
  position: number,
  colors: readonly string[]
) => [number, number, number];
