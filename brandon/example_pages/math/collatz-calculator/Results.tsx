import React from 'react';
import { CalculationResult } from './types';
import { DARK_MODE_COLORS } from './constants';

interface ResultsProps {
  standardResults: CalculationResult | null;
  customResults: CalculationResult | null;
}

const ResultCard: React.FC<{
  label: string;
  value: number;
}> = ({ label, value }) => (
  <div className="p-4 bg-background/50 backdrop-blur-[1px] rounded-lg border border-foreground/10 transition-all hover:border-foreground/20">
    <p className="text-sm font-medium text-foreground/60 mb-1">{label}</p>
    <p className="text-2xl font-semibold text-foreground">{value}</p>
  </div>
);

const SequenceSection: React.FC<{
  title: string;
  result: CalculationResult;
}> = ({ title, result }) => (
  <div>
    <h4 className="text-md font-medium mb-3 text-foreground">{title}</h4>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ResultCard label="Starting Number" value={result.startNumber} />
      <ResultCard label="Total Steps" value={result.totalSteps} />
      <ResultCard label="Highest Value" value={result.maxValue} />
    </div>
  </div>
);

const Results: React.FC<ResultsProps> = ({ standardResults, customResults }) => (
  <div>
    <h3 className="text-lg font-semibold mb-6 text-foreground">Results</h3>
    <div className="space-y-6">
      {standardResults && (
        <SequenceSection title="Standard Sequence" result={standardResults} />
      )}
      {customResults && (
        <SequenceSection title="Custom Sequence" result={customResults} />
      )}
      {!standardResults && !customResults && (
        <div className="text-center py-8">
          <p className="text-foreground/60">
            No calculations performed yet. Enter a number and click Calculate to see results.
          </p>
        </div>
      )}
    </div>
  </div>
);

export default Results;
