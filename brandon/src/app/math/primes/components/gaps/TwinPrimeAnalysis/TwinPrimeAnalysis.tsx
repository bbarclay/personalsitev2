import { MathJax, MathJaxContext } from 'better-react-mathjax';

export default function TwinPrimeAnalysis() {
  return (
    <MathJaxContext>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Twin Primes Modulo 3 Analysis</h1>

        <p>
          Twin primes are pairs of primes that are exactly two units apart, such as (11, 13) or (17, 19). 
          When we analyze the gaps and patterns of twin primes using modulo 3, some interesting observations can be made.
        </p>

        <h2>Prime Numbers and Modulo 3</h2>

        <p>
          <strong>Prime Numbers:</strong> Primes greater than 5 are either{' '}
          <MathJax>{"\\( \\equiv 1 \\mod 3 \\)"}</MathJax> or{' '}
          <MathJax>{"\\( \\equiv 2 \\mod 3 \\)"}</MathJax>.
        </p>

        <h2>Gaps Modulo 3</h2>

        <p>Consider the first few twin primes and their gaps:</p>

        <div className="my-4">
          <MathJax>
            {`\\[
              \\begin{array}{ccc}
              \\text{Twin Primes} & \\text{Gap} & \\text{Gap Modulo 3} \\\\
              (11, 13) & 2 & 2 \\\\
              (17, 19) & 2 & 2 \\\\
              (29, 31) & 2 & 2 \\\\
              (41, 43) & 2 & 2 \\\\
              \\end{array}
            \\]`}
          </MathJax>
        </div>

        <h2>Gaps Between Sets of Twin Primes</h2>

        <p>The pattern extends to the gaps between sets of twin primes:</p>

        <p>
          <strong>First and Second Primes in Twin Sets:</strong> The first number in a twin prime pair will always be{' '}
          <MathJax>{"\\( \\equiv 1 \\mod 3 \\)"}</MathJax>, and the second number will always be{' '}
          <MathJax>{"\\( \\equiv 2 \\mod 3 \\)"}</MathJax>.
        </p>

        <p>
          <strong>Gap Between Twin Prime Sets:</strong> The gap between sets of twin primes is always 1 modulo 3. 
          This is because the first prime of the next twin prime pair will be{' '}
          <MathJax>{"\\( \\equiv 1 \\mod 3 \\)"}</MathJax>, following the second prime of the previous twin prime pair{' '}
          <MathJax>{"\\( \\equiv 2 \\mod 3 \\)"}</MathJax>.
        </p>

        <h2>Example with Twin Primes</h2>

        <div className="my-4">
          <MathJax>
            {`\\[
              \\begin{array}{ccc}
              \\text{Twin Primes} & \\text{Gap} & \\text{Gap Modulo 3} \\\\
              (11, 13) & 2 & 2 \\\\
              (17, 19) & 2 & 2 \\\\
              (29, 31) & 2 & 2 \\\\
              (41, 43) & 2 & 2 \\\\
              \\end{array}
            \\]`}
          </MathJax>
        </div>

        <p><strong>Gaps Between Pairs:</strong></p>

        <div className="my-4">
          <MathJax>
            {`\\[
              \\begin{array}{ccc}
              \\text{Between 13 and 17} & 4 & 1 \\\\
              \\text{Between 19 and 29} & 10 & 1 \\\\
              \\text{Between 31 and 41} & 10 & 1 \\\\
              \\end{array}
            \\]`}
          </MathJax>
        </div>

        <h2>Conclusion</h2>

        <p>
          The gap within twin prime pairs is always 2, and{' '}
          <MathJax>{"\\(2 \\mod 3 = 2\\)"}</MathJax>. The gap between sets of twin primes is always congruent to 1 modulo 3, 
          reflecting the structure of primes modulo 3.
        </p>
      </div>
    </MathJaxContext>
  );
}