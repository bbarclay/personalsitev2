import React from 'react';
import { Button } from '@components/ui/button';

interface PatternTypeSelectorProps {
  patternType: string;
  setPatternType: (type: string) => void;
}

const PatternTypeSelector: React.FC<PatternTypeSelectorProps> = ({
  patternType,
  setPatternType,
}) => {
  const patternTypes = [
    { id: 'arithmetic', label: 'Arithmetic Sequence' },
    { id: 'geometric', label: 'Geometric Sequence' },
    { id: 'fibonacci', label: 'Fibonacci Sequence' },
    { id: 'square', label: 'Square Numbers' },
    { id: 'triangular', label: 'Triangular Numbers' },
  ];

  return (
    <div className="grid grid-cols-1 gap-2">
      {patternTypes.map((type) => (
        <Button
          key={type.id}
          variant={patternType === type.id ? 'default' : 'outline'}
          onClick={() => setPatternType(type.id)}
          className="glass-button"
        >
          {type.label}
        </Button>
      ))}
    </div>
  );
};

export default PatternTypeSelector;
