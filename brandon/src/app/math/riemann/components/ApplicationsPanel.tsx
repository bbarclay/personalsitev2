import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { MathJax } from '@/components/ui/mathjax';

export default function ApplicationsPanel() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6">Applications of the Riemann Zeta Function</h2>

        <p>
          The Riemann zeta function extends far beyond pure mathematics, with applications in physics,
          engineering, cryptography, and other fields. Its properties and connections to prime numbers
          make it a powerful tool in various domains.
        </p>
      </div>

      <Tabs defaultValue="number-theory">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="number-theory">Number Theory</TabsTrigger>
          <TabsTrigger value="physics">Physics</TabsTrigger>
          <TabsTrigger value="cryptography">Cryptography</TabsTrigger>
          <TabsTrigger value="other">Other Fields</TabsTrigger>
        </TabsList>

        <TabsContent value="number-theory" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Prime Number Theory</h3>

              <h4 className="text-lg font-medium mb-3">Prime Number Theorem</h4>
              <p className="mb-4">
                The Prime Number Theorem, which describes the asymptotic distribution of prime numbers,
                is intimately connected to the Riemann zeta function. The theorem states that the number of primes
                less than or equal to a given number x is approximately x/ln(x).
              </p>
              <div className="my-6 flex justify-center">
                <MathJax>
                  {`\pi(x) \sim \frac{x}{\ln(x)}`}
                </MathJax>
              </div>
              <p className="mb-6">
                The proof of this theorem relies on showing that the Riemann zeta function has no zeros on the line Re(s) = 1.
              </p>

              <h4 className="text-lg font-medium mb-3">Error Bounds in Prime Counting</h4>
              <p className="mb-4">
                The Riemann Hypothesis provides the best possible error bound for the Prime Number Theorem.
                If proven true, it would establish that:
              </p>
              <div className="my-6 flex justify-center">
                <MathJax>
                  {`|\pi(x) - \text{li}(x)| < C\sqrt{x}\log(x)`}
                </MathJax>
              </div>
              <p className="mb-6">
                This has practical implications for algorithms that rely on estimating the distribution of primes.
              </p>

              <h4 className="text-lg font-medium mb-3">Dirichlet L-functions and Class Numbers</h4>
              <p>
                The zeta function is the simplest case of Dirichlet L-functions, which are used to study the distribution
                of primes in arithmetic progressions. These functions are crucial in determining class numbers of number fields,
                which are important invariants in algebraic number theory.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="physics" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Applications in Physics</h3>

              <h4 className="text-lg font-medium mb-3">Quantum Field Theory</h4>
              <p className="mb-6">
                In quantum field theory, the Riemann zeta function appears in the calculation of Feynman diagrams.
                The values ζ(3), ζ(5), etc., appear in the computation of higher-order corrections in quantum electrodynamics
                and other quantum field theories. The function is also used in regularization techniques to handle divergent integrals.
              </p>

              <h4 className="text-lg font-medium mb-3">Statistical Mechanics</h4>
              <p className="mb-6">
                In statistical mechanics, the Riemann zeta function appears in the calculation of partition functions
                for certain systems. For example, the partition function for an ideal Bose gas can be expressed in terms
                of the Riemann zeta function. The famous Bose-Einstein condensation phenomenon is related to the pole of
                the zeta function at s = 1.
              </p>

              <h4 className="text-lg font-medium mb-3">Casimir Effect</h4>
              <p className="mb-6">
                The Casimir effect, a quantum mechanical force arising from the vacuum energy between two close parallel plates,
                involves the Riemann zeta function in its calculation. Specifically, the energy density between the plates
                is proportional to ζ(4).
              </p>

              <h4 className="text-lg font-medium mb-3">Quantum Chaos</h4>
              <p>
                The distribution of the non-trivial zeros of the Riemann zeta function appears to follow the same statistical
                patterns as the energy levels of quantum systems whose classical counterparts are chaotic. This connection,
                known as the Montgomery-Odlyzko law, suggests deep links between number theory and quantum mechanics.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cryptography" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Cryptographic Applications</h3>

              <h4 className="text-lg font-medium mb-3">Prime Number Generation</h4>
              <p className="mb-6">
                Modern cryptography relies heavily on large prime numbers, particularly for public-key cryptosystems like RSA.
                The distribution of primes, governed by the Riemann zeta function, affects the efficiency and security of
                algorithms for generating and testing prime numbers.
              </p>

              <h4 className="text-lg font-medium mb-3">Random Number Generation</h4>
              <p className="mb-6">
                The zeros of the Riemann zeta function exhibit properties of randomness that make them useful in generating
                high-quality pseudo-random numbers. These can be used in cryptographic applications where unpredictability
                is essential.
              </p>

              <h4 className="text-lg font-medium mb-3">Factorization Algorithms</h4>
              <p>
                The security of many cryptographic systems depends on the difficulty of factoring large numbers.
                Improved understanding of the Riemann zeta function and its connection to prime numbers could potentially
                lead to more efficient factorization algorithms, which would have significant implications for cryptography.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="other" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Applications in Other Fields</h3>

              <h4 className="text-lg font-medium mb-3">Signal Processing</h4>
              <p className="mb-6">
                The Riemann zeta function has applications in signal processing, particularly in the analysis of
                fractal signals and 1/f noise (pink noise). The spectral properties of such signals can be related
                to the zeta function, helping in their characterization and filtering.
              </p>

              <h4 className="text-lg font-medium mb-3">Complex Networks</h4>
              <p className="mb-6">
                In the study of complex networks, the zeta function appears in the analysis of scale-free networks,
                where the distribution of connections follows a power law. The zeta function helps in calculating
                various network properties and understanding their asymptotic behavior.
              </p>

              <h4 className="text-lg font-medium mb-3">Computer Science</h4>
              <p className="mb-6">
                In computer science, the zeta function is used in the analysis of algorithms, particularly those
                involving recursive structures or divide-and-conquer strategies. It helps in deriving asymptotic
                bounds for the running time or space complexity of such algorithms.
              </p>

              <h4 className="text-lg font-medium mb-3">Machine Learning</h4>
              <p>
                Recent research has explored connections between the Riemann zeta function and machine learning.
                The statistical properties of the zeta function's zeros have been used to develop novel regularization
                techniques and to analyze the convergence properties of certain learning algorithms.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}