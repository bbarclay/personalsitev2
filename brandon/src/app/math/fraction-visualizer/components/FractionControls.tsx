import React from 'react';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';

interface FractionControlsProps {
  numerator: number;
  denominator: number;
  setNumerator: (value: number) => void;
  setDenominator: (value: number) => void;
}

const FractionControls: React.FC<FractionControlsProps> = ({
  numerator,
  denominator,
  setNumerator,
  setDenominator,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="numerator">Numerator</Label>
        <Input
          id="numerator"
          type="number"
          value={numerator}
          onChange={(e) => setNumerator(Number(e.target.value))}
          min={-100}
          max={100}
          className="glass-input"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="denominator">Denominator</Label>
        <Input
          id="denominator"
          type="number"
          value={denominator}
          onChange={(e) => setDenominator(Number(e.target.value))}
          min={1}
          max={100}
          className="glass-input"
        />
      </div>
    </div>
  );
};

export default FractionControls;
