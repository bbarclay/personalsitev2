import React from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const TwinPrimeExplanation = () => {
  return (
    <MathJaxContext>

      <div>
        <h1>Twin Primes Modulo 3 Analysis</h1>
        <p>
          Twin primes are pairs of primes that are exactly two units apart, such as (11, 13) or (17, 19). When we analyze the gaps and patterns of twin primes using modulo 3, some interesting observations can be made.
        </p>
        <h2>Prime Numbers and Modulo 3</h2>
        <p>
          <strong>Prime Numbers:</strong> Primes greater than 3 are either \( \equiv 1 \mod 3 \) or \( \equiv 2 \mod 3 \).
        </p>
        <h2>Gaps Modulo 3</h2>
        <p>Consider the first few twin primes and their gaps:</p>
        <MathJax>
          {`\\[
            \\begin{array}{|c|c|c|}
            \\hline
            \\text{Twin Primes} & \\text{Gap} & \\text{Gap Modulo 3} \\\\
            \\hline
            (11, 13) & 2 & 2 \\\\
            (17, 19) & 2 & 2 \\\\
            (29, 31) & 2 & 2 \\\\
            (41, 43) & 2 & 2 \\\\
            \\hline
            \\end{array}
          \\]`}
        </MathJax>
        <h2>Gaps Between Sets of Twin Primes</h2>
        <p>The pattern extends to the gaps between sets of twin primes:</p>
        <p>
          <strong>First and Second Primes in Twin Sets:</strong> The first number in a twin prime pair will always be \( \equiv 1 \mod 3 \), and the second number will always be \( \equiv 2 \mod 3 \).
        </p>
        <p>
          <strong>Gap Between Twin Prime Sets:</strong> The gap between sets of twin primes is always \(1 \mod 3\). This is because the first prime of the next twin prime pair will be \( \equiv 1 \mod 3 \), following the second prime of the previous twin prime pair which is \( \equiv 2 \mod 3 \).
        </p>
        <h2>Example with Twin Primes</h2>
        <MathJax>
          {`\\[
            \\begin{array}{|c|c|c|}
            \\hline
            \\text{Twin Primes} & \\text{Gap} & \\text{Gap Modulo 3} \\\\
            \\hline
            (11, 13) & 2 & 2 \\\\
            (17, 19) & 2 & 2 \\\\
            (29, 31) & 2 & 2 \\\\
            (41, 43) & 2 & 2 \\\\
            \\hline
            \\end{array}
          \\]`}
        </MathJax>
        <p><strong>Gaps Between Pairs:</strong></p>
        <MathJax>
          {`\\[
            \\begin{array}{|c|c|c|}
            \\hline
            \\text{Between 13 and 17} & 4 & 1 \\\\
            \\text{Between 19 and 29} & 10 & 1 \\\\
            \\text{Between 31 and 41} & 10 & 1 \\\\
            \\hline
            \\end{array}
          \\]`}
        </MathJax>
        <p><strong>Conclusion:</strong></p>
        <p>
          The gap within twin prime pairs is always 2, and \(2 \mod 3 = 2\). The gap between sets of twin primes is always congruent to 1 modulo 3, reflecting the structure of primes modulo 3.
        </p>
      </div>
      </MathJaxContext>

  );
};

export default TwinPrimeExplanation;
