import React from 'react';

interface ExplanationPanelProps {
  explanation: string;
}

export default function ExplanationPanel({ explanation }: ExplanationPanelProps) {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2>Understanding the Pythagorean Theorem</h2>
        <p>{explanation}</p>
      </div>
    </div>
  );
} 