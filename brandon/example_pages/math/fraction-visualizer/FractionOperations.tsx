import React from 'react';
import { Button } from '@components/ui/button';

interface FractionOperationsProps {
  operation: string;
  setOperation: (operation: string) => void;
}

const FractionOperations: React.FC<FractionOperationsProps> = ({
  operation,
  setOperation,
}) => {
  const operations = [
    { symbol: '+', label: 'Add' },
    { symbol: '-', label: 'Subtract' },
    { symbol: '×', label: 'Multiply' },
    { symbol: '÷', label: 'Divide' },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {operations.map((op) => (
        <Button
          key={op.symbol}
          variant={operation === op.symbol ? 'default' : 'outline'}
          onClick={() => setOperation(op.symbol)}
          className="glass-button"
        >
          {op.label}
        </Button>
      ))}
    </div>
  );
};

export default FractionOperations;
