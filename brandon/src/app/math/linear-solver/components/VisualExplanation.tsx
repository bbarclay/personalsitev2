import React from 'react';
import GaussianExplanation from './explanation/GaussianExplanation';
import EchelonFormExplanation from './explanation/EchelonFormExplanation';
import SpecialCasesExplanation from './explanation/SpecialCasesExplanation';

const VisualExplanation: React.FC = () => {
  return (
    <div className="space-y-8">
      <GaussianExplanation />
      <EchelonFormExplanation />
      <SpecialCasesExplanation />
    </div>
  );
};

export default VisualExplanation; 