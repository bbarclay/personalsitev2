import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MatrixInputGridProps {
  matrix: string[][];
  size: number;
  label?: string;
  onChange: (rowIndex: number, colIndex: number, value: string) => void;
  onCellHover?: (cell: { row: number, col: number } | null) => void;
  disabled?: boolean;
  className?: string;
}

export const MatrixInputGrid: React.FC<MatrixInputGridProps> = ({
  matrix,
  size,
  label = "Matrix A",
  onChange,
  onCellHover,
  disabled = false,
  className,
}) => {
  if (size <= 0) return null; // Don't render if size is invalid

  return (
    <div className={className}>
      {label && <Label>{label}</Label>}
      <div
        className={`grid gap-2 mt-1`}
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
        aria-label={label}
      >
        {matrix.map((row, i) =>
          // Ensure we only render inputs up to the current size
          i < size ? row.map((cell, j) =>
            j < size ? (
              <Input
                key={`matrix-input-${i}-${j}`}
                type="text"
                value={cell ?? ''} // Ensure value is controlled, default to empty string
                onChange={(e) => onChange(i, j, e.target.value)}
                onMouseEnter={() => onCellHover?.({ row: i, col: j })}
                onMouseLeave={() => onCellHover?.(null)}
                className="text-center h-10 w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                aria-label={`${label} element row ${i + 1} column ${j + 1}`}
                disabled={disabled}
                autoComplete="off" // Prevent browser autocomplete
              />
            ) : null // Don't render columns beyond size
          ) : null // Don't render rows beyond size
        )}
      </div>
    </div>
  );
};
