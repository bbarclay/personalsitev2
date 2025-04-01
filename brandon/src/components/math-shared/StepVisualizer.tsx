import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Define the type within the component or import if shared
type EliminationStep = {
  matrix: number[][];
  vector: number[];
  explanation: string;
  highlight?: { type: 'row' | 'col' | 'element'; index: number | [number, number] };
};

interface StepVisualizerProps {
  stepData: EliminationStep | null;
  stepIndex: number; // 0-based index
  totalSteps: number;
  matrixSize: number;
}

export const StepVisualizer: React.FC<StepVisualizerProps> = ({
  stepData,
  stepIndex,
  totalSteps,
  matrixSize,
}) => {
  if (!stepData || matrixSize <= 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-10">
        Enter a system and click "Solve System" to begin visualization.
      </div>
    );
  }

  const { matrix, vector, explanation, highlight } = stepData;

  return (
    <div className="space-y-4">
      <p className="text-center font-medium text-gray-700 dark:text-gray-300">
        Step {stepIndex + 1} / {totalSteps}: {explanation}
      </p>
      <div className="overflow-x-auto rounded-md border border-gray-300 dark:border-gray-700">
        <Table className="min-w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-800/50">
              {Array(matrixSize).fill(0).map((_, j) => (
                <TableHead key={`head-A-${j}`} className="text-center border-b border-r border-gray-300 dark:border-gray-700 px-2 py-2 font-semibold">
                  x<sub>{j + 1}</sub>
                </TableHead>
              ))}
              <TableHead className="text-center border-b border-gray-300 dark:border-gray-700 px-2 py-2 font-semibold bg-gray-100 dark:bg-gray-800">
                b
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matrix.map((row, i) => (
              <TableRow
                key={`row-${i}`}
                className={`
                  ${highlight?.type === 'row' && highlight.index === i ? 'bg-yellow-100 dark:bg-yellow-900/30' : ''}
                  hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors duration-150
                `}
              >
                {row.map((cell, j) => (
                  <TableCell
                    key={`cell-${i}-${j}`}
                    className={`
                      text-center border-r border-b border-gray-300 dark:border-gray-700 p-2 transition-all duration-300
                      ${highlight?.type === 'element' && Array.isArray(highlight.index) && highlight.index[0] === i && highlight.index[1] === j ? 'ring-2 ring-red-500 ring-inset scale-105 bg-red-100 dark:bg-red-900/40' : ''}
                      ${highlight?.type === 'col' && highlight.index === j ? 'bg-blue-100 dark:bg-blue-900/30' : ''}
                    `}
                  >
                    {/* Add check for NaN or Infinity if needed */}
                    {cell.toFixed(2)}
                  </TableCell>
                ))}
                <TableCell
                  className={`
                    text-center border-b border-gray-300 dark:border-gray-700 p-2 bg-gray-100 dark:bg-gray-800/80 transition-all duration-300
                    ${highlight?.type === 'row' && highlight.index === i ? 'bg-yellow-100 dark:bg-yellow-900/30' : ''}
                  `}
                >
                  {vector[i].toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
