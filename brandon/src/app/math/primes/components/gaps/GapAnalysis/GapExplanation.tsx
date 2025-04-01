import React from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const GapExplanation = () => {
  return (
    <MathJaxContext>
      <div>
        <h1>Prime Gap Analysis</h1>
        <p>Analyzing the gaps between consecutive primes can reveal interesting patterns. By examining the gaps and their properties using modulo 3, we can gain insights into the structure of prime numbers.</p>
        
        <h2>Prime Numbers and Modulo 3</h2>
        <p><strong>Prime Numbers:</strong> Primes greater than 5 are either 
          <MathJax>{"\\( \\equiv 1 \\mod 3 \\)"}</MathJax> or 
          <MathJax>{"\\( \\equiv 2 \\mod 3 \\)"}</MathJax>.
        </p>
        
        <h2>Gaps Modulo 3</h2>
        <p>Consider the gaps between consecutive primes:</p>
        <MathJax>
          {`\\[
            \\begin{array}{ccc}
            \\text{Prime} & \\text{Gap} & \\text{Gap Modulo 3} \\\\
            7 & - & - \\\\
            11 & 4 & 1 \\\\
            13 & 2 & 2 \\\\
            17 & 4 & 1 \\\\
            19 & 2 & 2 \\\\
            \\end{array}
          \\]`}
        </MathJax>
        
        <h2>Removing Multiples of 3 (Gaps That Are 0 Modulo 3)</h2>
        <p>After removing gaps 
          <MathJax>{"\\( \\equiv 0 \\mod 3 \\)"}</MathJax>:
        </p>
        <MathJax>
          {`\\[
            \\text{Remaining Gaps Modulo 3: } 1, 2, 1, 2, 1, 2
          \\]`}
        </MathJax>
        
        <h2>Conclusion:</h2>
        <p>The pattern of prime gaps modulo 3 is consistent, reflecting the inherent properties of prime numbers.</p>
      </div>
    </MathJaxContext>
  );
};

export default GapExplanation;
