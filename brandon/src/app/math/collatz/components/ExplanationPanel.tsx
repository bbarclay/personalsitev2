import React from 'react';

interface ExplanationPanelProps {
  explanation: string;
}

export default function ExplanationPanel({ explanation }: ExplanationPanelProps) {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2>Understanding the Collatz Conjecture</h2>
        
        <p>{explanation}</p>
        
        <h3>The Procedure</h3>
        <ol>
          <li>Start with any positive integer n.</li>
          <li>If n is even, divide it by 2 to get n/2.</li>
          <li>If n is odd, multiply it by 3 and add 1 to get 3n+1.</li>
          <li>Repeat the process with the new value of n.</li>
        </ol>
        
        <h3>The Conjecture</h3>
        <p>
          The Collatz conjecture states that no matter what positive integer you start with, 
          the sequence will always eventually reach 1, after which it enters the cycle: 1, 4, 2, 1, ...
        </p>
        
        <h3>Example</h3>
        <p>Starting with n = 6:</p>
        <ul>
          <li>6 is even, so we divide by 2: 6 ÷ 2 = 3</li>
          <li>3 is odd, so we multiply by 3 and add 1: 3 × 3 + 1 = 10</li>
          <li>10 is even, so we divide by 2: 10 ÷ 2 = 5</li>
          <li>5 is odd, so we multiply by 3 and add 1: 5 × 3 + 1 = 16</li>
          <li>16 is even, so we divide by 2: 16 ÷ 2 = 8</li>
          <li>8 is even, so we divide by 2: 8 ÷ 2 = 4</li>
          <li>4 is even, so we divide by 2: 4 ÷ 2 = 2</li>
          <li>2 is even, so we divide by 2: 2 ÷ 2 = 1</li>
        </ul>
        <p>The sequence terminates at 1, as predicted by the conjecture.</p>
      </div>
    </div>
  );
} 