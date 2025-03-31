import React from 'react';

type Operation = 'factor' | 'expand' | 'simplify';

interface OperationSelectorProps {
  operation: Operation;
  onOperationChange: (op: Operation) => void;
  operations: Operation[];
}

export const OperationSelector: React.FC<OperationSelectorProps> = ({ 
  operation, 
  onOperationChange,
  operations 
}) => {
  return (
    <select 
      value={operation}
      onChange={(e) => onOperationChange(e.target.value as Operation)}
      className="operation-selector"
    >
      {operations.map((op) => (
        <option key={op} value={op}>
          {op}
        </option>
      ))}
    </select>
  );
};

export default OperationSelector;
