import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { MathJax } from '@/components/ui/mathjax';

export default function ExplanationPanel() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6">Understanding Prime Numbers</h2>
        
        <p>
          Prime numbers are the fundamental building blocks of mathematics. A prime number is a natural number 
          greater than 1 that cannot be formed by multiplying two smaller natural numbers. The Prime Observatory 
          allows you to explore the fascinating patterns and properties of prime numbers through interactive 
          visualizations.
        </p>
      </div>

      <Tabs defaultValue="basics">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="basics">Basic Concepts</TabsTrigger>
          <TabsTrigger value="patterns">Prime Patterns</TabsTrigger>
          <TabsTrigger value="distributions">Distributions</TabsTrigger>
          <TabsTrigger value="conjectures">Conjectures</TabsTrigger>
        </TabsList>

        <TabsContent value="basics" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">What are Prime Numbers?</h3>
              <p className="mb-4">
                Prime numbers are natural numbers greater than 1 that have exactly two factors: 1 and themselves. 
                In other words, a prime number can only be divided evenly by 1 and itself.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium text-lg mb-2">Key Properties</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Every natural number greater than 1 is either a prime or can be expressed as a product of primes</li>
                    <li>There are infinitely many prime numbers (proven by Euclid around 300 BCE)</li>
                    <li>2 is the only even prime number</li>
                    <li>The first few prime numbers are: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, ...</li>
                    <li>Prime numbers become less frequent as numbers get larger</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium text-lg mb-2">Testing for Primality</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Trial Division:</strong> Check if a number is divisible by any integer from 2 to its square root</li>
                    <li><strong>Sieve of Eratosthenes:</strong> Efficient algorithm for finding all primes up to a given limit</li>
                    <li><strong>Fermat Primality Test:</strong> Probabilistic test based on Fermat's Little Theorem</li>
                    <li><strong>Miller-Rabin Test:</strong> More sophisticated probabilistic primality test</li>
                    <li><strong>AKS Primality Test:</strong> First deterministic polynomial-time algorithm for primality testing</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-3">The Fundamental Theorem of Arithmetic</h4>
              <p className="mb-4">
                One of the most important results in number theory is the Fundamental Theorem of Arithmetic, which states:
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                <p className="italic">
                  Every integer greater than 1 can be represented uniquely as a product of prime numbers, up to the order of the factors.
                </p>
              </div>
              <p className="mb-4">
                For example, the number 60 can be expressed as:
              </p>
              <div className="flex justify-center mb-4">
                <MathJax>
                  {`60 = 2^2 \\times 3 \\times 5`}
                </MathJax>
              </div>
              <p>
                This prime factorization is unique (apart from the order of the factors), which makes prime numbers the "building blocks" of all natural numbers.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Special Types of Prime Numbers</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium text-lg mb-2">Twin Primes</h4>
                  <p className="mb-2">
                    Pairs of prime numbers that differ by 2.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Examples: (3, 5), (5, 7), (11, 13), (17, 19)</li>
                    <li>The Twin Prime Conjecture states that there are infinitely many twin primes</li>
                    <li>The largest known twin prime pair has more than 388,000 digits</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium text-lg mb-2">Mersenne Primes</h4>
                  <p className="mb-2">
                    Prime numbers of the form 2<sup>p</sup> - 1, where p is also prime.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Examples: 3, 7, 31, 127 (for p = 2, 3, 5, 7)</li>
                    <li>Only 51 Mersenne primes are known as of 2023</li>
                    <li>The largest known prime number is a Mersenne prime with 24,862,048 digits</li>
                  </ul>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium text-lg mb-2">Sophie Germain Primes</h4>
                  <p className="mb-2">
                    Primes p where 2p + 1 is also prime.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Examples: 2, 3, 5, 11, 23, 29</li>
                    <li>Named after mathematician Sophie Germain</li>
                    <li>Important in number theory and cryptography</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium text-lg mb-2">Circular Primes</h4>
                  <p className="mb-2">
                    Primes that remain prime after cyclic rotation of their digits.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Examples: 2, 3, 5, 7, 11, 13, 17, 37, 79, 113</li>
                    <li>The number 197 is circular because 197, 971, and 719 are all prime</li>
                    <li>There are only 55 circular primes below one million</li>
                  </ul>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium text-lg mb-2">Palindromic Primes</h4>
                  <p className="mb-2">
                    Primes that read the same forwards and backwards.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Examples: 2, 3, 5, 7, 11, 101, 131, 151, 181</li>
                    <li>The largest known palindromic prime has 474,501 digits</li>
                    <li>All palindromic primes with an even number of digits are divisible by 11 (except 11 itself)</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium text-lg mb-2">Fermat Primes</h4>
                  <p className="mb-2">
                    Primes of the form 2<sup>2<sup>n</sup></sup> + 1.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Examples: 3, 5, 17, 257, 65537 (for n = 0, 1, 2, 3, 4)</li>
                    <li>Only five Fermat primes are known</li>
                    <li>Connected to the constructibility of regular polygons with ruler and compass</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Prime Number Patterns</h4>
              <p className="mb-4">
                Prime numbers exhibit fascinating patterns when visualized in different ways:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Ulam Spiral:</strong> When natural numbers are arranged in a spiral and prime numbers are highlighted, they tend to appear along diagonal lines
                </li>
                <li>
                  <strong>Modular Patterns:</strong> When considering primes modulo n (the remainder when divided by n), they form distinct patterns
                </li>
                <li>
                  <strong>Prime Gaps:</strong> The differences between consecutive primes show interesting statistical properties
                </li>
                <li>
                  <strong>Klauber Triangle:</strong> A triangular arrangement of numbers that reveals patterns in the distribution of primes
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distributions" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Distribution of Prime Numbers</h3>
              
              <h4 className="text-lg font-medium mb-3">Prime Number Theorem</h4>
              <p className="mb-4">
                The Prime Number Theorem describes the asymptotic distribution of prime numbers. It states that the number of primes less than or equal to a given number n, denoted by π(n), is approximately:
              </p>
              <div className="flex justify-center mb-4">
                <MathJax>
                  {`\\pi(n) \\sim \\frac{n}{\\ln(n)}`}
                </MathJax>
              </div>
              <p className="mb-4">
                This means that as n gets larger, the ratio of π(n) to n/ln(n) approaches 1:
              </p>
              <div className="flex justify-center mb-4">
                <MathJax>
                  {`\\lim_{n \\to \\infty} \\frac{\\pi(n)}{\\frac{n}{\\ln(n)}} = 1`}
                </MathJax>
              </div>
              <p className="mb-6">
                The Prime Number Theorem was independently proven by Jacques Hadamard and Charles Jean de la Vallée Poussin in 1896, resolving a conjecture that had stood for over a century.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Prime Counting Function</h5>
                <p className="mb-2">
                  The prime counting function π(n) gives the number of primes less than or equal to n:
                </p>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mb-2">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">n</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">π(n)</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">n/ln(n)</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ratio π(n)/(n/ln(n))</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap">10</td>
                      <td className="px-4 py-2 whitespace-nowrap">4</td>
                      <td className="px-4 py-2 whitespace-nowrap">4.3</td>
                      <td className="px-4 py-2 whitespace-nowrap">0.93</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap">100</td>
                      <td className="px-4 py-2 whitespace-nowrap">25</td>
                      <td className="px-4 py-2 whitespace-nowrap">21.7</td>
                      <td className="px-4 py-2 whitespace-nowrap">1.15</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap">1,000</td>
                      <td className="px-4 py-2 whitespace-nowrap">168</td>
                      <td className="px-4 py-2 whitespace-nowrap">145</td>
                      <td className="px-4 py-2 whitespace-nowrap">1.16</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap">10,000</td>
                      <td className="px-4 py-2 whitespace-nowrap">1,229</td>
                      <td className="px-4 py-2 whitespace-nowrap">1,086</td>
                      <td className="px-4 py-2 whitespace-nowrap">1.13</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap">100,000</td>
                      <td className="px-4 py-2 whitespace-nowrap">9,592</td>
                      <td className="px-4 py-2 whitespace-nowrap">8,686</td>
                      <td className="px-4 py-2 whitespace-nowrap">1.10</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  As n increases, the ratio approaches 1, confirming the Prime Number Theorem.
                </p>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Prime Gaps</h4>
              <p className="mb-4">
                A prime gap is the difference between consecutive prime numbers. The first few prime gaps are:
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Between 2 and 3: gap of 1 (the only gap of 1)</li>
                <li>Between 3 and 5: gap of 2</li>
                <li>Between 5 and 7: gap of 2</li>
                <li>Between 7 and 11: gap of 4</li>
                <li>Between 11 and 13: gap of 2</li>
              </ul>
              <p className="mb-4">
                Some key facts about prime gaps:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Bertrand's Postulate:</strong> For every n > 1, there is always at least one prime p such that n < p < 2n
                </li>
                <li>
                  <strong>Cramér's Conjecture:</strong> The largest prime gap below n is approximately (log n)²
                </li>
                <li>
                  <strong>Arbitrarily Large Gaps:</strong> There exist arbitrarily large gaps between consecutive primes
                </li>
                <li>
                  <strong>Bounded Gaps:</strong> The breakthrough work of Yitang Zhang in 2013 proved that there are infinitely many pairs of primes with a gap less than 70 million
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conjectures" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Famous Prime Number Conjectures</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium text-lg mb-2">Goldbach's Conjecture</h4>
                  <p className="mb-2">
                    Every even integer greater than 2 can be expressed as the sum of two primes.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>4 = 2 + 2</li>
                    <li>6 = 3 + 3</li>
                    <li>8 = 3 + 5</li>
                    <li>10 = 3 + 7 = 5 + 5</li>
                    <li>12 = 5 + 7</li>
                  </ul>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Proposed in 1742, this remains one of the oldest unsolved problems in mathematics.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium text-lg mb-2">Twin Prime Conjecture</h4>
                  <p className="mb-2">
                    There are infinitely many pairs of primes that differ by 2.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>(3, 5), (5, 7), (11, 13), (17, 19), (29, 31), ...</li>
                  </ul>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    In 2013, Yitang Zhang proved that there are infinitely many pairs of primes with a gap less than 70 million, a major step toward this conjecture.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium text-lg mb-2">Riemann Hypothesis</h4>
                  <p className="mb-2">
                    All non-trivial zeros of the Riemann zeta function have real part 1/2.
                  </p>
                  <p className="mb-2">
                    This conjecture has profound implications for the distribution of prime numbers and is considered one of the most important unsolved problems in mathematics.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    The Clay Mathematics Institute has offered a $1 million prize for its solution.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium text-lg mb-2">Legendre's Conjecture</h4>
                  <p className="mb-2">
                    There is at least one prime number between n² and (n+1)² for every positive integer n.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Between 1² and 2²: 2, 3</li>
                    <li>Between 2² and 3²: 5, 7</li>
                    <li>Between 3² and 4²: 11, 13</li>
                    <li>Between 4² and 5²: 17, 19, 23</li>
                  </ul>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    This conjecture remains unproven despite extensive computational verification.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium text-lg mb-2">Polignac's Conjecture</h4>
                  <p className="mb-2">
                    For any positive even number n, there are infinitely many pairs of consecutive primes that differ by n.
                  </p>
                  <p className="mb-2">
                    This is a generalization of the Twin Prime Conjecture (which is the case n = 2).
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Like many conjectures about prime numbers, this remains unproven.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium text-lg mb-2">Oppermann's Conjecture</h4>
                  <p className="mb-2">
                    For any integer n > 1, there is at least one prime between n(n-1) and n² and at least one prime between n² and n(n+1).
                  </p>
                  <p className="mb-2">
                    This is a stronger version of Legendre's Conjecture and remains unproven.
                  </p>
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-3">The Importance of Prime Conjectures</h4>
              <p className="mb-4">
                These conjectures are not merely mathematical curiosities. They have profound implications for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Number Theory:</strong> Understanding the fundamental structure of numbers
                </li>
                <li>
                  <strong>Cryptography:</strong> Many encryption systems rely on properties of prime numbers
                </li>
                <li>
                  <strong>Computer Science:</strong> Algorithms for primality testing and factorization
                </li>
                <li>
                  <strong>Physics:</strong> Connections to quantum chaos and energy levels in quantum systems
                </li>
                <li>
                  <strong>Mathematics as a Whole:</strong> Techniques developed to approach these problems have led to advances in many areas of mathematics
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
