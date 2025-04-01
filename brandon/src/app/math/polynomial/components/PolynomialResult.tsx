import React from 'react';
import { Polynomial } from '../types';

interface PolynomialResultProps {
  result: string | Polynomial;
  steps?: string[];
}

export const PolynomialResult: React.FC<PolynomialResultProps> = ({ result, steps = [] }) => {
  const resultString = typeof result === 'string' ? result : result.toString();
  
  return (
    <div className="polynomial-result">
      <h3>Result</h3>
      <div>{resultString}</div>
      {steps.length > 0 && (
        <>
          <h3>Steps</h3>
          <ol>
            {steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
};

export default PolynomialResult;
