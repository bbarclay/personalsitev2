import { ExampleSystem } from './linearSolverUtils';

export const exampleSystems: ExampleSystem[] = [
  {
    name: "Simple 2x2",
    size: 2,
    matrixA: [[2, 1], [1, 3]],
    vectorB: [5, 5],
    description: "A basic 2x2 system with a unique solution (x=2, y=1)."
  },
  {
    name: "Standard 3x3",
    size: 3,
    matrixA: [[1, 1, 1], [0, 2, 5], [2, 5, -1]],
    vectorB: [6, -4, 27],
    description: "A typical 3x3 system (x=5, y=3, z=-2)."
  },
  {
    name: "Needs Swap",
    size: 3,
    matrixA: [[0, 1, 1], [1, 2, 1], [2, 7, 9]],
    vectorB: [4, 5, 18],
    description: "Requires a row swap during elimination (x=-1, y=2, z=2)."
  },
  {
    name: "Singular (Inf)",
    size: 2,
    matrixA: [[1, 2], [2, 4]],
    vectorB: [3, 6],
    description: "Singular system with infinite solutions (dependent equations)."
  },
  {
    name: "Inconsistent",
    size: 2,
    matrixA: [[1, 2], [2, 4]],
    vectorB: [3, 7],
    description: "Inconsistent system with no solution."
  },
  {
    name: "Complex 4x4",
    size: 4,
    matrixA: [
      [2, 1, -1, 2],
      [4, 5, -3, 6],
      [-2, 5, -2, 6],
      [4, 11, -4, 8]
    ],
    vectorB: [5, 9, 4, 2],
    description: "A more complex 4x4 system requiring multiple operations."
  }
]; 