import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from 'lucide-react';

export type CellValidationError = {
  rowIndex: number;
  colIndex: number;
  message: string;
};

export type VectorValidationError = {
  index: number;
  message: string;
};

interface InputValidationHighlighterProps {
  matrixErrors?: CellValidationError[];
  vectorErrors?: VectorValidationError[];
  className?: string;
  onFocusError?: (location: { type: 'matrix' | 'vector', rowIndex: number, colIndex?: number }) => void;
}

export const InputValidationHighlighter: React.FC<InputValidationHighlighterProps> = ({
  matrixErrors = [],
  vectorErrors = [],
  className = '',
  onFocusError,
}) => {
  // If no errors, return nothing or a success message
  if (matrixErrors.length === 0 && vectorErrors.length === 0) {
    return null;
  }

  // Group matrix errors by row for easier display
  const groupedMatrixErrors: Record<number, CellValidationError[]> = {};
  matrixErrors.forEach(error => {
    if (!groupedMatrixErrors[error.rowIndex]) {
      groupedMatrixErrors[error.rowIndex] = [];
    }
    groupedMatrixErrors[error.rowIndex].push(error);
  });

  // Handle click on error message to focus on the relevant input
  const handleErrorClick = (type: 'matrix' | 'vector', rowIndex: number, colIndex?: number) => {
    if (onFocusError) {
      onFocusError({ type, rowIndex, colIndex });
    }
  };

  return (
    <Card className={`${className} border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center text-red-700 dark:text-red-300">
          <AlertCircle className="h-5 w-5 mr-2" />
          Input Validation Errors
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Matrix Errors */}
          {Object.keys(groupedMatrixErrors).length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2 text-red-700 dark:text-red-300">Matrix A Errors:</h3>
              <ul className="space-y-2">
                {Object.entries(groupedMatrixErrors).map(([rowIndex, errors]) => (
                  <li key={`row-${rowIndex}`} className="text-sm">
                    <div className="font-medium">Row {parseInt(rowIndex) + 1}:</div>
                    <ul className="pl-4 list-disc space-y-1">
                      {errors.map((error, idx) => (
                        <li 
                          key={`error-${rowIndex}-${error.colIndex}-${idx}`}
                          className="text-red-600 dark:text-red-400 cursor-pointer hover:underline"
                          onClick={() => handleErrorClick('matrix', error.rowIndex, error.colIndex)}
                        >
                          Column {error.colIndex + 1}: {error.message}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Vector Errors */}
          {vectorErrors.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2 text-red-700 dark:text-red-300">Vector b Errors:</h3>
              <ul className="space-y-1 pl-4 list-disc">
                {vectorErrors.map((error, idx) => (
                  <li 
                    key={`vector-error-${error.index}-${idx}`}
                    className="text-red-600 dark:text-red-400 cursor-pointer hover:underline"
                    onClick={() => handleErrorClick('vector', error.index)}
                  >
                    Row {error.index + 1}: {error.message}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="text-xs text-red-600 dark:text-red-400 italic">
            Click on any error to highlight the corresponding input field.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 