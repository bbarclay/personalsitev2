import React from 'react';
import { Polynomial } from '../types';

interface FactorizationPanelProps {
  polynomial: Polynomial;
}

export const FactorizationPanel: React.FC<FactorizationPanelProps> = ({ polynomial }) => {
  return (
    <div className="factorization-panel">
      <h3>Factorization</h3>
      <div className="factorization-container">
        <p>Factorization of the polynomial will be calculated and displayed here</p>
      </div>
    </div>
  );
};

export default FactorizationPanel;
