import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface MatrixInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
}

export function MatrixInput({ value, onChange, error }: MatrixInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        Enter System of Equations
      </label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Example:&#13;&#10;2x + y = 5&#13;&#10;x - y = 1"
        className="font-mono"
        rows={4}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}