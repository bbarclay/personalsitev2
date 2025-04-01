import React from 'react';
import { Polynomial } from '../types';

interface PolynomialGrapherProps {
  polynomial: Polynomial;
  range?: [number, number];
}

export const PolynomialGrapher: React.FC<PolynomialGrapherProps> = ({ 
  polynomial,
  range = [-10, 10]
}) => {
  return (
    <div className="polynomial-grapher">
      <h3>Polynomial Graph</h3>
      <div className="graph-container">
        {/* Graph visualization would go here */}
        <p>Graph of polynomial will be displayed here</p>
      </div>
    </div>
  );
};

export default PolynomialGrapher;
