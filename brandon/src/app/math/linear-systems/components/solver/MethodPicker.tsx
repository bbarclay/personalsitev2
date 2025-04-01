import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface MethodPickerProps {
  onChange: (method: 'elimination' | 'substitution' | 'matrices') => void;
}

export function MethodPicker({ onChange }: MethodPickerProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        Solution Method
      </label>
      <RadioGroup
        defaultValue="elimination"
        onValueChange={(value) => onChange(value as 'elimination' | 'substitution' | 'matrices')}
        className="flex space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="elimination" id="elimination" />
          <Label htmlFor="elimination">Elimination</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="substitution" id="substitution" />
          <Label htmlFor="substitution">Substitution</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="matrices" id="matrices" />
          <Label htmlFor="matrices">Matrices</Label>
        </div>
      </RadioGroup>
    </div>
  );
}