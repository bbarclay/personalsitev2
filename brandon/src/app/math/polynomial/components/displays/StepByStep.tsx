import React from 'react';

interface StepByStepProps {
  steps: string[];
  title: string;
}

export const StepByStep: React.FC<StepByStepProps> = ({ steps, title }) => {
  return (
    <div className="step-by-step">
      <h3>{title}</h3>
      <ol>
        {steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default StepByStep;
