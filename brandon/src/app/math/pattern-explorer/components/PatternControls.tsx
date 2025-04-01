import React from 'react';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';

interface PatternControlsProps {
  patternType: string;
  startValue: number;
  setStartValue: (value: number) => void;
  step: number;
  setStep: (value: number) => void;
  sequenceLength: number;
  setSequenceLength: (value: number) => void;
}

const PatternControls: React.FC<PatternControlsProps> = ({
  patternType,
  startValue,
  setStartValue,
  step,
  setStep,
  sequenceLength,
  setSequenceLength,
}) => {
  const showStep = patternType === 'arithmetic' || patternType === 'geometric';

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="startValue">Starting Value</Label>
        <Input
          id="startValue"
          type="number"
          value={startValue}
          onChange={(e) => setStartValue(Number(e.target.value))}
          min={-100}
          max={100}
          className="glass-input"
        />
      </div>

      {showStep && (
        <div className="space-y-2">
          <Label htmlFor="step">
            {patternType === 'arithmetic' ? 'Common Difference' : 'Common Ratio'}
          </Label>
          <Input
            id="step"
            type="number"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            min={-10}
            max={10}
            step={patternType === 'geometric' ? 0.1 : 1}
            className="glass-input"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="sequenceLength">Sequence Length</Label>
        <Input
          id="sequenceLength"
          type="number"
          value={sequenceLength}
          onChange={(e) => setSequenceLength(Number(e.target.value))}
          min={1}
          max={20}
          className="glass-input"
        />
      </div>
    </div>
  );
};

export default PatternControls;
