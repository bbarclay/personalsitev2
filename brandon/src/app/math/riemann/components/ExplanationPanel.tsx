import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { MathJax } from '@/components/ui/mathjax';

export default function ExplanationPanel() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6">Understanding the Riemann Zeta Function</h2>

        <p>
          The Riemann zeta function is one of the most important functions in mathematics, with profound connections
          to prime numbers, complex analysis, and many other areas of mathematics and physics. Named after the
          German mathematician Bernhard Riemann, it has been the subject of intense study for over 150 years.
        </p>
      </div>

      <Tabs defaultValue="definition">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="definition">Definition</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="hypothesis">Riemann Hypothesis</TabsTrigger>
          <TabsTrigger value="history">Historical Context</TabsTrigger>
        </TabsList>

        <TabsContent value="definition" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Mathematical Definition</h3>
              <p className="mb-4">
                The Riemann zeta function ζ(s) is initially defined for complex numbers s with real part greater than 1 by the infinite series:
              </p>
              <div className="my-6 flex justify-center">
                <MathJax>
                  {`\zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^s}`}
                </MathJax>
              </div>
              <p className="mb-4">
                This series converges absolutely in the half-plane Re(s) > 1. However, through analytic continuation,
                the function can be extended to the entire complex plane, except for a simple pole at s = 1.
              </p>
              <h4 className="text-lg font-medium mt-6 mb-3">Euler Product Formula</h4>
              <p className="mb-4">
                One of the most remarkable properties of the zeta function is its connection to prime numbers,
                expressed through the Euler product formula:
              </p>
              <div className="my-6 flex justify-center">
                <MathJax>
                  {`\zeta(s) = \prod_{p \text{ prime}} \frac{1}{1-p^{-s}}`}
                </MathJax>
              </div>
              <p>
                This formula, valid for Re(s) > 1, directly connects the zeta function to the distribution of prime numbers,
                making it a central object in analytic number theory.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Key Properties</h3>

              <h4 className="text-lg font-medium mb-3">Functional Equation</h4>
              <p className="mb-4">
                The Riemann zeta function satisfies a remarkable functional equation that relates values at s to values at 1-s:
              </p>
              <div className="my-6 flex justify-center">
                <MathJax>
                  {`\zeta(s) = 2^s \pi^{s-1} \sin\left(\frac{\pi s}{2}\right) \Gamma(1-s) \zeta(1-s)`}
                </MathJax>
              </div>
              <p className="mb-6">
                This equation allows us to compute values of ζ(s) in regions where the original series definition doesn't converge.
              </p>

              <h4 className="text-lg font-medium mb-3">Special Values</h4>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>At even negative integers:</strong> ζ(-2n) = 0 for integers n ≥ 1 (these are called the "trivial zeros")
                </li>
                <li>
                  <strong>At positive even integers:</strong> ζ(2n) can be expressed in terms of Bernoulli numbers and powers of π
                </li>
                <li>
                  <strong>At s = 1:</strong> The function has a simple pole with residue 1
                </li>
                <li>
                  <strong>At s = 0:</strong> ζ(0) = -1/2
                </li>
              </ul>

              <h4 className="text-lg font-medium mb-3">Zeros of the Zeta Function</h4>
              <p className="mb-4">
                The zeros of the Riemann zeta function come in two types:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Trivial zeros:</strong> Located at the negative even integers (-2, -4, -6, ...)
                </li>
                <li>
                  <strong>Non-trivial zeros:</strong> Located in the critical strip 0 ≤ Re(s) ≤ 1
                </li>
              </ul>
              <p className="mt-4">
                The distribution of these non-trivial zeros is the subject of the famous Riemann Hypothesis.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hypothesis" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">The Riemann Hypothesis</h3>
              <p className="mb-4">
                The Riemann Hypothesis is one of the most important unsolved problems in mathematics.
                It was proposed by Bernhard Riemann in 1859 and remains unproven to this day.
              </p>

              <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg mb-6">
                <p className="font-medium text-purple-800 dark:text-purple-300">
                  The Riemann Hypothesis states that all non-trivial zeros of the Riemann zeta function
                  have real part exactly equal to 1/2.
                </p>
              </div>

              <p className="mb-4">
                In other words, all non-trivial zeros lie on the "critical line" Re(s) = 1/2 in the complex plane.
              </p>

              <h4 className="text-lg font-medium mt-6 mb-3">Importance and Implications</h4>
              <p className="mb-4">
                If proven true, the Riemann Hypothesis would have profound implications for our understanding of the distribution of prime numbers.
                It would confirm that primes are as regularly distributed as possible, given their inherently irregular nature.
              </p>

              <p className="mb-4">
                The hypothesis is equivalent to the statement that the error term in the Prime Number Theorem is bounded by:
              </p>

              <div className="my-6 flex justify-center">
                <MathJax>
                  {`|\pi(x) - \text{li}(x)| < C\sqrt{x}\log(x)`}
                </MathJax>
              </div>

              <p className="mb-4">
                Where π(x) is the prime counting function, li(x) is the logarithmic integral, and C is a constant.
              </p>

              <h4 className="text-lg font-medium mt-6 mb-3">Current Status</h4>
              <p>
                The Riemann Hypothesis has been verified numerically for the first 10 trillion zeros, but a rigorous proof remains elusive.
                It is one of the seven Millennium Prize Problems, with a $1 million reward for its solution.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Historical Development</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium mb-2">Euler's Early Work (18th Century)</h4>
                  <p>
                    Leonhard Euler first studied what we now call the Riemann zeta function for real values.
                    He discovered the connection between the zeta function and prime numbers, establishing the Euler product formula.
                    Euler also calculated ζ(2) = π²/6 and found values for other even positive integers.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-2">Riemann's Memoir (1859)</h4>
                  <p>
                    Bernhard Riemann extended the zeta function to complex values in his groundbreaking paper
                    "On the Number of Primes Less Than a Given Magnitude." In this eight-page paper, he:
                  </p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Defined the zeta function for all complex numbers (except s=1)</li>
                    <li>Established the functional equation</li>
                    <li>Connected the zeros of the zeta function to the distribution of primes</li>
                    <li>Formulated the Riemann Hypothesis</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-2">Hadamard and de la Vallée Poussin (1896)</h4>
                  <p>
                    Jacques Hadamard and Charles-Jean de la Vallée Poussin independently proved the Prime Number Theorem,
                    which had been conjectured based on Riemann's work. They showed that no zeros of the zeta function
                    lie on the line Re(s) = 1, a crucial step in understanding the distribution of primes.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-2">Modern Developments</h4>
                  <p>
                    The 20th and 21st centuries have seen extensive computational verification of the Riemann Hypothesis
                    and the development of numerous equivalent formulations. G.H. Hardy proved in 1914 that infinitely many
                    zeros lie on the critical line, and in 1974, Norman Levinson showed that at least one-third of the zeros
                    are on the critical line. This proportion has since been improved to over 40%.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
