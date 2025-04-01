import React from 'react';
import { Polynomial } from '../types';

interface OperationsPanelProps {
  polynomialA: Polynomial;
  polynomialB: Polynomial;
  onPolynomialAChange: (polynomial: Polynomial) => void;
  onPolynomialBChange: (polynomial: Polynomial) => void;
}

export const OperationsPanel: React.FC<OperationsPanelProps> = ({
  polynomialA,
  polynomialB,
  onPolynomialAChange,
  onPolynomialBChange
}) => {
  return (
    <div className="operations-panel">
      <h3>Polynomial Operations</h3>
      <div className="operations-container">
        <p>Polynomial operations (addition, subtraction, multiplication, division) will be implemented here</p>
      </div>
    </div>
  );
};

export default OperationsPanel;
