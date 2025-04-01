import React from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const RandomPrimeExplanation: React.FC = () => {
  return (
    <MathJaxContext>
      <div>
        <hr style={{ borderTop: '1px solid #000' }} />
        <h3>Random Prime Generation Analysis</h3>
        <hr style={{ borderTop: '1px solid #000' }} />
        <p>
          Randomly generating prime numbers and analyzing their properties can
          reveal interesting patterns and distributions. By filtering out
          certain primes and analyzing the gaps and modulo 3 properties, we can
          gain insights into their behavior.
        </p>

        <h4>Prime Numbers and Modulo 3</h4>
        <p>
          <strong>Prime Numbers:</strong> Primes greater than 5 are either{' '}
          <MathJax>{"\\( \\equiv 1 \\mod 3 \\)"}</MathJax> or{' '}
          <MathJax>{"\\( \\equiv 2 \\mod 3 \\)"}</MathJax>.
        </p>

        <h4>Gaps Modulo 3</h4>
        <p>Consider the generated primes and their gaps:</p>
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

        <hr style={{ borderTop: '1px solid #000' }} />
        <h4>Removing Multiples of 3 (Gaps That Are 0 Modulo 3)</h4>
        <p>
          After removing gaps{' '}
          <MathJax>{"\\( \\equiv 0 \\mod 3 \\)"}</MathJax>:
        </p>
        <MathJax>
          {`\\[
            \\text{Remaining Gaps Modulo 3: } 1, 2, 1, 2, 1, 2
          \\]`}
        </MathJax>

        <hr style={{ borderTop: '1px solid #000' }} />
        <h4>Random Distribution of Primes</h4>
        <p>
          An intriguing aspect of this pattern is that it is robust to random
          removal of primes. Even if we randomly drop primes from the list, the
          modulo 3 gap pattern remains intact:
        </p>
        <p>
          <strong>Random Removal:</strong> If we take a random distribution of
          primes and randomly start dropping primes, it will not disrupt this
          alternating distribution pattern.
        </p>

        <hr style={{ borderTop: '1px solid #000' }} />
        <h4>Conclusion</h4>
        <p>
          The pattern of prime gaps modulo 3 is consistent even with random
          prime generation and filtering. This reflects the inherent properties
          of prime numbers.
        </p>
      </div>
    </MathJaxContext>
  );
};

export default RandomPrimeExplanation;
