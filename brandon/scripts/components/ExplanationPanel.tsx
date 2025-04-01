import React from 'react';

interface ExplanationPanelProps {
  explanation: string;
}

export default function ExplanationPanel({ explanation }: ExplanationPanelProps) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>About This Tool</h2>
      <p>{explanation}</p>
    </div>
  );
} 