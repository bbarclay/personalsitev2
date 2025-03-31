import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SizeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  disabled?: boolean;
  label?: string;
  id?: string;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  value,
  onChange,
  options,
  disabled = false,
  label = "System Size (n x n)",
  id = "matrix-size",
}) => {
  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Select
        onValueChange={onChange}
        value={value}
        disabled={disabled}
      >
        <SelectTrigger id={id} className="w-[100px] mt-1">
          <SelectValue placeholder="Size" />
        </SelectTrigger>
        <SelectContent>
          {options.map((size) => (
            <SelectItem key={size} value={size}>
              {size}x{size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
