import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { MathJax } from '@/components/ui/mathjax';

const ExplanationPanel = () => {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6">Understanding Number Systems</h2>
        
        <p>
          Number systems are mathematical frameworks that allow us to represent quantities using different symbols and rules.
          While we commonly use the decimal (base-10) system in everyday life, other number systems like binary (base-2),
          octal (base-8), and hexadecimal (base-16) are fundamental in computer science and various fields of mathematics.
        </p>
      </div>

      <Tabs defaultValue="basics">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="basics">Basic Concepts</TabsTrigger>
          <TabsTrigger value="conversion">Conversion Methods</TabsTrigger>
          <TabsTrigger value="arithmetic">Arithmetic Operations</TabsTrigger>
          <TabsTrigger value="special">Special Number Systems</TabsTrigger>
        </TabsList>

        <TabsContent value="basics" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">What is a Number System?</h3>
              <p className="mb-4">
                A number system is a way to represent numbers using a specific set of symbols (digits) and rules.
                The <strong>base</strong> (or radix) of a number system determines how many unique digits are used.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium text-lg mb-2">Positional Notation</h4>
                  <p>
                    Most number systems use positional notation, where the position of a digit determines its value.
                    Each position represents a power of the base, increasing from right to left.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium text-lg mb-2">Place Value</h4>
                  <p>
                    In a base-b system, each position represents a power of b:
                    <br />
                    <span className="font-mono">... b³, b², b¹, b⁰, b⁻¹, b⁻², ...</span>
                  </p>
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Common Number Systems</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">System</th>
                      <th className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Base</th>
                      <th className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Digits</th>
                      <th className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Example</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">Binary</td>
                      <td className="px-4 py-3 whitespace-nowrap">2</td>
                      <td className="px-4 py-3 whitespace-nowrap">0, 1</td>
                      <td className="px-4 py-3 whitespace-nowrap font-mono">1011₂ = 11₁₀</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">Octal</td>
                      <td className="px-4 py-3 whitespace-nowrap">8</td>
                      <td className="px-4 py-3 whitespace-nowrap">0, 1, 2, 3, 4, 5, 6, 7</td>
                      <td className="px-4 py-3 whitespace-nowrap font-mono">13₈ = 11₁₀</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">Decimal</td>
                      <td className="px-4 py-3 whitespace-nowrap">10</td>
                      <td className="px-4 py-3 whitespace-nowrap">0, 1, 2, 3, 4, 5, 6, 7, 8, 9</td>
                      <td className="px-4 py-3 whitespace-nowrap font-mono">11₁₀ = 11₁₀</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">Hexadecimal</td>
                      <td className="px-4 py-3 whitespace-nowrap">16</td>
                      <td className="px-4 py-3 whitespace-nowrap">0-9, A, B, C, D, E, F</td>
                      <td className="px-4 py-3 whitespace-nowrap font-mono">B₁₆ = 11₁₀</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Mathematical Representation</h3>
              <p className="mb-4">
                A number in base-b can be represented mathematically as:
              </p>
              <div className="my-6 flex justify-center">
                <MathJax>
                  {`(d_n d_{n-1} ... d_1 d_0 . d_{-1} d_{-2} ...)_b = \\sum_{i=-\\infty}^{n} d_i \\times b^i`}
                </MathJax>
              </div>
              <p className="mb-4">
                Where d<sub>i</sub> represents the digit at position i, and each digit must satisfy 0 ≤ d<sub>i</sub> &lt; b.
              </p>
              
              <h4 className="text-lg font-medium mt-6 mb-3">Example: Decimal Representation</h4>
              <p className="mb-4">
                The decimal number 254.75 can be written as:
              </p>
              <div className="my-6 flex justify-center">
                <MathJax>
                  {`254.75_{10} = 2 \\times 10^2 + 5 \\times 10^1 + 4 \\times 10^0 + 7 \\times 10^{-1} + 5 \\times 10^{-2}`}
                </MathJax>
              </div>
              
              <h4 className="text-lg font-medium mt-6 mb-3">Example: Binary Representation</h4>
              <p className="mb-4">
                The binary number 1011.01 can be written as:
              </p>
              <div className="my-6 flex justify-center">
                <MathJax>
                  {`1011.01_2 = 1 \\times 2^3 + 0 \\times 2^2 + 1 \\times 2^1 + 1 \\times 2^0 + 0 \\times 2^{-1} + 1 \\times 2^{-2} = 8 + 0 + 2 + 1 + 0 + 0.25 = 11.25_{10}`}
                </MathJax>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversion" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Converting Between Number Systems</h3>
              <p className="mb-4">
                There are several methods to convert numbers between different bases. Here are the most common approaches:
              </p>
              
              <h4 className="text-lg font-medium mb-3">Converting from Any Base to Decimal</h4>
              <p className="mb-4">
                To convert a number from base-b to decimal (base-10), multiply each digit by its corresponding power of b and sum the results.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Example: Converting 1A3₁₆ to Decimal</h5>
                <div className="my-4 flex justify-center">
                  <MathJax>
                    {`1A3_{16} = 1 \\times 16^2 + 10 \\times 16^1 + 3 \\times 16^0 = 256 + 160 + 3 = 419_{10}`}
                  </MathJax>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Note: In hexadecimal, A represents the value 10.
                </p>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Converting from Decimal to Any Base</h4>
              <p className="mb-4">
                To convert a decimal number to base-b:
              </p>
              <ol className="list-decimal pl-6 mb-6 space-y-2">
                <li>For the integer part: Divide repeatedly by b, collecting the remainders in reverse order.</li>
                <li>For the fractional part: Multiply repeatedly by b, collecting the integer parts in forward order.</li>
              </ol>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Example: Converting 25₁₀ to Binary</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2">Division process:</p>
                    <div className="font-mono">
                      25 ÷ 2 = 12 remainder 1<br />
                      12 ÷ 2 = 6 remainder 0<br />
                      6 ÷ 2 = 3 remainder 0<br />
                      3 ÷ 2 = 1 remainder 1<br />
                      1 ÷ 2 = 0 remainder 1
                    </div>
                  </div>
                  <div>
                    <p className="mb-2">Reading remainders from bottom to top:</p>
                    <div className="font-mono text-lg">
                      25₁₀ = 11001₂
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Example: Converting 0.625₁₀ to Binary</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2">Multiplication process:</p>
                    <div className="font-mono">
                      0.625 × 2 = 1.25 → 1<br />
                      0.25 × 2 = 0.5 → 0<br />
                      0.5 × 2 = 1.0 → 1
                    </div>
                  </div>
                  <div>
                    <p className="mb-2">Reading integer parts from top to bottom:</p>
                    <div className="font-mono text-lg">
                      0.625₁₀ = 0.101₂
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Direct Conversion Between Non-Decimal Bases</h3>
              <p className="mb-4">
                For certain base pairs, direct conversion methods exist that don't require going through decimal:
              </p>
              
              <h4 className="text-lg font-medium mb-3">Binary ↔ Octal Conversion</h4>
              <p className="mb-4">
                Group binary digits in sets of 3 (from the decimal point) and convert each group to its octal equivalent.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Example: Binary to Octal</h5>
                <div className="font-mono">
                  101 110 011₂ = 563₈<br />
                  (5)  (6)  (3)
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Binary ↔ Hexadecimal Conversion</h4>
              <p className="mb-4">
                Group binary digits in sets of 4 (from the decimal point) and convert each group to its hexadecimal equivalent.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Example: Binary to Hexadecimal</h5>
                <div className="font-mono">
                  1010 1111₂ = AF₁₆<br />
                  (A)   (F)
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="arithmetic" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Arithmetic in Different Bases</h3>
              <p className="mb-4">
                Arithmetic operations (addition, subtraction, multiplication, division) can be performed directly in any number system,
                following similar rules to decimal arithmetic but with different digit values and carry thresholds.
              </p>
              
              <h4 className="text-lg font-medium mb-3">Addition</h4>
              <p className="mb-4">
                When adding in base-b, if the sum of two digits exceeds b-1, we carry a 1 to the next position.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Example: Binary Addition</h5>
                <div className="font-mono text-center">
                  <pre>
                    {`  1 1 1 1  (carries)
  1 0 1 1
+ 1 1 0 1
---------
1 1 0 0 0`}
                  </pre>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  In binary: 0+0=0, 0+1=1, 1+0=1, 1+1=10 (carry 1)
                </p>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Subtraction</h4>
              <p className="mb-4">
                When subtracting in base-b, if we need to subtract a larger digit from a smaller one, we borrow 1 from the next position.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Example: Hexadecimal Subtraction</h5>
                <div className="font-mono text-center">
                  <pre>
                    {`    F 16
  A 3 C
- 2 8 F
-------
  7 A D`}
                  </pre>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  C-F requires borrowing: (C+16)-F = 12+16-15 = 13 = D
                </p>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Multiplication</h4>
              <p className="mb-4">
                Multiplication in different bases follows the same process as decimal multiplication, but using the base's digit values.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Example: Binary Multiplication</h5>
                <div className="font-mono text-center">
                  <pre>
                    {`    1 0 1
  × 1 1 0
  -------
    0 0 0
  1 0 1 0
1 0 1 0 0
---------
1 1 1 1 0`}
                  </pre>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  In binary: 0×0=0, 0×1=0, 1×0=0, 1×1=1
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Negative Numbers and Complements</h3>
              <p className="mb-4">
                In computer systems, negative numbers are often represented using complement systems:
              </p>
              
              <h4 className="text-lg font-medium mb-3">One's Complement</h4>
              <p className="mb-4">
                In binary, the one's complement of a number is obtained by flipping all bits (changing 0s to 1s and vice versa).
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Example:</h5>
                <div className="font-mono">
                  One's complement of 10110₂ is 01001₂
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Two's Complement</h4>
              <p className="mb-4">
                The two's complement is obtained by adding 1 to the one's complement. This is the most common representation for negative numbers in computers.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Example:</h5>
                <div className="font-mono">
                  Two's complement of 10110₂:<br />
                  One's complement: 01001₂<br />
                  Add 1: 01001₂ + 1₂ = 01010₂
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="special" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Special Number Systems</h3>
              <p className="mb-4">
                Beyond the common binary, octal, decimal, and hexadecimal systems, several specialized number systems exist for specific applications:
              </p>
              
              <h4 className="text-lg font-medium mb-3">Balanced Ternary</h4>
              <p className="mb-4">
                A base-3 system using the digits {-1, 0, 1} (often written as T, 0, 1). It has unique mathematical properties that make certain computations more efficient.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Example:</h5>
                <div className="my-4 flex justify-center">
                  <MathJax>
                    {`1T01_{balanced} = 1 \\times 3^3 + (-1) \\times 3^2 + 0 \\times 3^1 + 1 \\times 3^0 = 27 - 9 + 0 + 1 = 19_{10}`}
                  </MathJax>
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Negabinary</h4>
              <p className="mb-4">
                A base-(-2) system that can represent both positive and negative integers without a sign bit.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Example:</h5>
                <div className="my-4 flex justify-center">
                  <MathJax>
                    {`110_{negabinary} = 1 \\times (-2)^2 + 1 \\times (-2)^1 + 0 \\times (-2)^0 = 4 - 2 + 0 = 2_{10}`}
                  </MathJax>
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Residue Number System (RNS)</h4>
              <p className="mb-4">
                A non-positional system that represents numbers as tuples of remainders when divided by a set of coprime moduli.
                It allows for efficient parallel arithmetic operations.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Example with moduli {3, 5, 7}:</h5>
                <p>
                  The number 11 would be represented as (2, 1, 4) because:<br />
                  11 mod 3 = 2<br />
                  11 mod 5 = 1<br />
                  11 mod 7 = 4
                </p>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Fibonacci Number System</h4>
              <p className="mb-4">
                A number system where each position represents a Fibonacci number instead of a power of a base.
                Every positive integer can be uniquely represented as a sum of non-consecutive Fibonacci numbers.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Example:</h5>
                <p>
                  The Fibonacci sequence starts: 1, 1, 2, 3, 5, 8, 13, 21, ...<br />
                  The number 17 in Fibonacci representation is 101001, meaning:<br />
                  1×13 + 0×8 + 1×3 + 0×2 + 0×1 + 1×1 = 13 + 3 + 1 = 17
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Non-Integer Bases</h3>
              <p className="mb-4">
                Number systems can also use non-integer bases, which have interesting mathematical properties:
              </p>
              
              <h4 className="text-lg font-medium mb-3">Golden Ratio Base</h4>
              <p className="mb-4">
                A number system using the golden ratio (φ ≈ 1.618) as its base. In this system, only the digits 0 and 1 are needed,
                and no two consecutive 1s can appear in a valid representation.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Example:</h5>
                <div className="my-4 flex justify-center">
                  <MathJax>
                    {`101.01_{\\phi} = 1 \\times \\phi^2 + 0 \\times \\phi^1 + 1 \\times \\phi^0 + 0 \\times \\phi^{-1} + 1 \\times \\phi^{-2}`}
                  </MathJax>
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Negative Bases</h4>
              <p className="mb-4">
                Number systems with negative bases (like base -10) can represent both positive and negative numbers without a sign.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Example in Base -10:</h5>
                <div className="my-4 flex justify-center">
                  <MathJax>
                    {`42_{-10} = 4 \\times (-10)^1 + 2 \\times (-10)^0 = -40 + 2 = -38_{10}`}
                  </MathJax>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExplanationPanel;
