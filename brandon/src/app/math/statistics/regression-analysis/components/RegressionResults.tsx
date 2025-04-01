import React from 'react';

interface RegressionResult {
  coefficients: number[];
  rSquared: number;
  equation: string;
}

interface RegressionResultsProps {
  result: RegressionResult;
}

export const RegressionResults: React.FC<RegressionResultsProps> = ({ result }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Regression Results</h2>
      <div className="space-y-2">
        <div>
          <h3 className="text-lg font-medium">Equation</h3>
          <p className="text-muted-foreground">{result.equation}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium">Coefficients</h3>
          <p className="text-muted-foreground">
            {result.coefficients.map((coef, i) => `β${i} = ${coef.toFixed(4)}`).join(', ')}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium">R² Value</h3>
          <p className="text-muted-foreground">{result.rSquared.toFixed(4)}</p>
        </div>
      </div>
    </div>
  );
}; 