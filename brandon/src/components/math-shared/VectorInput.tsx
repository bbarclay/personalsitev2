import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface VectorInputProps {
  vector: string[];
  size: number;
  label?: string;
  onChange: (rowIndex: number, value: string) => void;
  disabled?: boolean;
  className?: string;
}

export const VectorInput: React.FC<VectorInputProps> = ({
  vector,
  size,
  label = "Vector b",
  onChange,
  disabled = false,
  className,
}) => {
  if (size <= 0) return null; // Don't render if size is invalid

  return (
    <div className={className}>
      {label && <Label>{label}</Label>}
      <div className="grid gap-2 mt-1" aria-label={label}>
        {vector.map((val, i) =>
          // Ensure we only render inputs up to the current size
          i < size ? (
            <Input
              key={`vector-input-${i}`}
              type="text"
              value={val ?? ''} // Ensure value is controlled, default to empty string
              onChange={(e) => onChange(i, e.target.value)}
              className="text-center h-10 w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
              aria-label={`${label} element row ${i + 1}`}
              disabled={disabled}
              autoComplete="off" // Prevent browser autocomplete
            />
          ) : null // Don't render rows beyond size
        )}
      </div>
    </div>
  );
};
