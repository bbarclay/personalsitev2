import React from 'react';
import { useCollatzContext } from '../context/CollatzContext';

const TheoremExplainer: React.FC = () => {
  return (
    <div className="cosmic-panel cosmic-theorem">
      <h3 className="cosmic-subtitle">The Collatz Conjecture</h3>
      <div className="cosmic-theorem-content">
        <p>
          The Collatz conjecture is one of mathematics' most famous unsolved problems.
          It states that for any positive integer n:
        </p>

        <div className="cosmic-formula">
          <p>If n is even: n → n/2</p>
          <p>If n is odd: n → 3n + 1</p>
        </div>

        <p>
          Following this rule repeatedly will eventually reach 1, regardless of the initial number.
          Despite its simple formulation, the conjecture has resisted proof since 1937.
        </p>

        <h4>Notable Properties</h4>
        <ul>
          <li>Every number tested so far (up to 2^68) eventually reaches 1</li>
          <li>Some numbers take extraordinarily long paths (e.g., 27 takes 111 steps)</li>
          <li>Patterns emerge in the stopping times of consecutive integers</li>
          <li>The sequence can reach values much higher than the starting number (e.g., 27 reaches 9,232)</li>
        </ul>

        <h4>Related Theorems</h4>
        <p>
          <strong>Terras Theorem (1976):</strong> For almost all integers, the number of iterations needed to reach a value less than the starting value has logarithmic growth.
        </p>
        <p>
          <strong>Convergence Patterns:</strong> Numbers of the form 2^n eventually reach 1 in exactly n steps.
        </p>
      </div>
    </div>
  );
};

export default TheoremExplainer;
