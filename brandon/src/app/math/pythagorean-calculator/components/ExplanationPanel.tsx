'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MathJax } from '@/components/ui/mathjax';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamically import the VisualProof component to avoid SSR issues with canvas
const VisualProof = dynamic(() => import('./VisualProof'), { ssr: false });

export default function ExplanationPanel() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6">Understanding the Pythagorean Theorem</h2>

        <p>
          The Pythagorean theorem is one of the most fundamental and widely used principles in mathematics.
          Named after the ancient Greek mathematician Pythagoras, this theorem establishes a crucial relationship
          between the sides of a right triangle.
        </p>
      </div>

      <Tabs defaultValue="basics">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="basics">Basic Concept</TabsTrigger>
          <TabsTrigger value="proofs">Visual Proofs</TabsTrigger>
          <TabsTrigger value="history">Historical Context</TabsTrigger>
          <TabsTrigger value="extensions">Extensions</TabsTrigger>
        </TabsList>

        <TabsContent value="basics" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">What is the Pythagorean Theorem?</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse (c)
              equals the sum of squares of the lengths of the other two sides (a and b).
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center mb-6">
              <MathJax>
                {`a^2 + b^2 = c^2`}
              </MathJax>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium mb-3">Key Terms</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong>Right Triangle:</strong> A triangle with one 90-degree angle</li>
                  <li><strong>Hypotenuse:</strong> The longest side of a right triangle, opposite to the right angle</li>
                  <li><strong>Legs:</strong> The other two sides of the right triangle that form the right angle</li>
                  <li><strong>Squared:</strong> A number multiplied by itself (x²)</li>
                </ul>
              </div>

              <div className="flex justify-center items-center">
                <div className="relative w-64 h-64">
                  <div className="absolute w-full h-full border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    {/* Right triangle diagram */}
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <polygon points="10,90 90,90 90,10" fill="none" stroke="currentColor" strokeWidth="2" />
                      <rect x="85" y="85" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1" />

                      {/* Labels */}
                      <text x="45" y="95" textAnchor="middle" className="text-sm">a</text>
                      <text x="95" y="50" textAnchor="middle" className="text-sm">b</text>
                      <text x="45" y="45" textAnchor="middle" className="text-sm">c</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Common Pythagorean Triples</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Pythagorean triples are sets of three positive integers a, b, and c that satisfy the equation a² + b² = c².
              These represent the sides of right triangles with whole number lengths.
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Triple</th>
                    <th className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">a</th>
                    <th className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">b</th>
                    <th className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">c</th>
                    <th className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Verification</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">3-4-5</td>
                    <td className="px-4 py-3 whitespace-nowrap">3</td>
                    <td className="px-4 py-3 whitespace-nowrap">4</td>
                    <td className="px-4 py-3 whitespace-nowrap">5</td>
                    <td className="px-4 py-3 whitespace-nowrap">3² + 4² = 9 + 16 = 25 = 5²</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">5-12-13</td>
                    <td className="px-4 py-3 whitespace-nowrap">5</td>
                    <td className="px-4 py-3 whitespace-nowrap">12</td>
                    <td className="px-4 py-3 whitespace-nowrap">13</td>
                    <td className="px-4 py-3 whitespace-nowrap">5² + 12² = 25 + 144 = 169 = 13²</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">8-15-17</td>
                    <td className="px-4 py-3 whitespace-nowrap">8</td>
                    <td className="px-4 py-3 whitespace-nowrap">15</td>
                    <td className="px-4 py-3 whitespace-nowrap">17</td>
                    <td className="px-4 py-3 whitespace-nowrap">8² + 15² = 64 + 225 = 289 = 17²</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">7-24-25</td>
                    <td className="px-4 py-3 whitespace-nowrap">7</td>
                    <td className="px-4 py-3 whitespace-nowrap">24</td>
                    <td className="px-4 py-3 whitespace-nowrap">25</td>
                    <td className="px-4 py-3 whitespace-nowrap">7² + 24² = 49 + 576 = 625 = 25²</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="proofs" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Visual Proofs</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              There are many ways to prove the Pythagorean theorem. Here are some visual proofs that demonstrate
              why a² + b² = c² must be true for right triangles.
            </p>

            <div className="mb-8">
              <h4 className="text-lg font-medium mb-3">Proof by Rearrangement</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                This proof shows how squares with areas a² and b² can be rearranged to form a square with area c².
              </p>

              <div className="h-80 w-full">
                <VisualProof />
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-medium mb-3">Proof by Similar Triangles</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                By drawing an altitude from the right angle to the hypotenuse, we create two triangles that are similar
                to the original triangle and to each other.
              </p>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <MathJax>
                  {`\begin{align}
                  \frac{a}{p} &= \frac{c}{a} \implies a^2 = pc \\
                  \frac{b}{q} &= \frac{c}{b} \implies b^2 = qc \\
                  \end{align}`}
                </MathJax>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  Since p + q = c, we get a² + b² = pc + qc = c(p + q) = c²
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Algebraic Proof</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The Pythagorean theorem can also be proven using algebra and coordinate geometry.
            </p>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="mb-2 text-gray-700 dark:text-gray-300">
                Consider a right triangle with vertices at (0,0), (a,0), and (0,b) in a coordinate system:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mb-4">
                <li>The distance from (0,0) to (a,0) is a</li>
                <li>The distance from (0,0) to (0,b) is b</li>
                <li>The distance from (a,0) to (0,b) is the hypotenuse c</li>
              </ul>

              <p className="mb-2 text-gray-700 dark:text-gray-300">
                Using the distance formula:
              </p>
              <MathJax>
                {`\begin{align}
                c^2 &= (a - 0)^2 + (0 - b)^2 \\
                &= a^2 + b^2
                \end{align}`}
              </MathJax>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Historical Context</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="col-span-2">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  While the theorem is named after Pythagoras (c. 570–495 BCE), a Greek mathematician and philosopher,
                  evidence suggests that knowledge of the relationship was known to several ancient civilizations before him.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  The Babylonians, Egyptians, Chinese, and Indians all had knowledge of the theorem and its applications,
                  often in practical contexts like construction and surveying. However, Pythagoras or his followers are
                  credited with the first general proof of the theorem.
                </p>
              </div>

              <div className="flex justify-center items-center">
                <div className="relative w-48 h-48 rounded-full overflow-hidden bg-gray-200">
                  {/* Placeholder for Pythagoras image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <span>Pythagoras<br/>(c. 570–495 BCE)</span>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="text-lg font-medium mb-3">Ancient Applications</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
              <li><strong>Babylonian Tablets (1800 BCE):</strong> Contain examples of Pythagorean triples</li>
              <li><strong>Egyptian Construction:</strong> Used rope with 12 equally spaced knots to form 3-4-5 triangles for right angles</li>
              <li><strong>Chinese Mathematics:</strong> The "Gougu theorem" in the Zhou Bi Suan Jing text (500-200 BCE)</li>
              <li><strong>Indian Sulbasutras:</strong> Ancient texts containing rules for altar construction using right triangles</li>
            </ul>

            <h4 className="text-lg font-medium mb-3">Pythagoras and His School</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Pythagoras founded a philosophical and religious school in Croton, southern Italy. The Pythagoreans were
              known for their belief that "all is number" and studied mathematical relationships extensively.
              The discovery of irrational numbers (through the Pythagorean theorem applied to an isosceles right triangle)
              reportedly caused a crisis in their mathematical worldview.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="extensions" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Extensions and Generalizations</h3>

            <h4 className="text-lg font-medium mb-3">Law of Cosines</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The Pythagorean theorem is a special case of the Law of Cosines, which applies to all triangles:
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6 text-center">
              <MathJax>
                {`c^2 = a^2 + b^2 - 2ab\cos(C)`}
              </MathJax>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                When angle C = 90°, cos(C) = 0, and we get the Pythagorean theorem: c² = a² + b²
              </p>
            </div>

            <h4 className="text-lg font-medium mb-3">Pythagorean Theorem in Higher Dimensions</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The theorem extends to higher dimensions through the distance formula in n-dimensional space:
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6 text-center">
              <MathJax>
                {`d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2 + ...}`}
              </MathJax>
            </div>

            <h4 className="text-lg font-medium mb-3">Fermat's Last Theorem</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Fermat's Last Theorem is a generalization that states there are no positive integers a, b, and c that satisfy:
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6 text-center">
              <MathJax>
                {`a^n + b^n = c^n`}
              </MathJax>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                for any integer n > 2. This theorem remained unproven for over 350 years until Andrew Wiles provided a proof in 1994.
              </p>
            </div>

            <h4 className="text-lg font-medium mb-3">Non-Euclidean Geometry</h4>
            <p className="text-gray-700 dark:text-gray-300">
              In non-Euclidean geometries (spherical or hyperbolic), the Pythagorean theorem does not hold in its standard form.
              For example, on the surface of a sphere, the sum of the squares of the sides of a right triangle is greater than
              the square of the hypotenuse.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}