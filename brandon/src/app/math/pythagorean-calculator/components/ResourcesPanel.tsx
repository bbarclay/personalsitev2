import React from 'react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

export default function ResourcesPanel() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6">Learning Resources</h2>

        <p>
          Explore these resources to deepen your understanding of the Pythagorean theorem,
          its applications, and related mathematical concepts.
        </p>
      </div>

      <Tabs defaultValue="videos">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="videos">Videos & Courses</TabsTrigger>
          <TabsTrigger value="interactive">Interactive Tools</TabsTrigger>
          <TabsTrigger value="books">Books & Articles</TabsTrigger>
          <TabsTrigger value="related">Related Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Video Tutorials</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.khanacademy.org/math/geometry/hs-geo-trig/hs-geo-pyth-theorem/v/the-pythagorean-theorem" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Khan Academy: Pythagorean Theorem <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Comprehensive video lessons on the Pythagorean theorem with interactive practice problems.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.youtube.com/watch?v=CAkMUdeB06o" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        3Blue1Brown: Pythagorean Theorem - A Different Way <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A visually engaging explanation of the Pythagorean theorem with beautiful animations.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.youtube.com/watch?v=YompsDlEdtc" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Numberphile: Pythagorean Triples <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">An exploration of Pythagorean triples and their fascinating properties.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Online Courses</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.coursera.org/learn/geometry" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Introduction to Geometry - Coursera <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Stanford University</p>
                    <p className="mt-1">A comprehensive course covering fundamental geometric principles, including the Pythagorean theorem.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.edx.org/learn/math/school-yourself-geometry" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Geometry - edX <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">SchoolYourself</p>
                    <p className="mt-1">An interactive course with hands-on exercises exploring geometric concepts.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interactive" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Interactive Demonstrations</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.geogebra.org/m/buxQJuEv" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Pythagorean Theorem Explorer - GeoGebra <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">An interactive visualization that allows you to manipulate right triangles and see how the Pythagorean relationship holds.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.mathsisfun.com/pythagoras.html" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Pythagoras' Theorem - Math is Fun <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A beginner-friendly interactive explanation with visual proofs and examples.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://phet.colorado.edu/en/simulation/pythagorean-theorem" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Pythagorean Theorem - PhET Interactive Simulations <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A dynamic simulation that demonstrates the theorem through area visualization.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Online Calculators</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.calculator.net/pythagorean-theorem-calculator.html" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Pythagorean Theorem Calculator - Calculator.net <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A comprehensive calculator with step-by-step solutions for right triangle problems.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.omnicalculator.com/math/pythagorean-theorem" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Pythagorean Theorem Calculator - Omni Calculator <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">An intuitive calculator with visual representation and practical examples.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="books" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Books</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">The Pythagorean Theorem: A 4,000-Year History</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Eli Maor (2007)</p>
                    <p className="mt-1">A fascinating exploration of the theorem's history across different civilizations and its impact on mathematics.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">The Joy of x: A Guided Tour of Math, from One to Infinity</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Steven Strogatz (2012)</p>
                    <p className="mt-1">Contains an engaging chapter on the Pythagorean theorem and its applications in everyday life.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">What Is Mathematics? An Elementary Approach to Ideas and Methods</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Richard Courant and Herbert Robbins (1996)</p>
                    <p className="mt-1">A classic text that includes a thorough discussion of the Pythagorean theorem and its generalizations.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Articles and Papers</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://en.wikipedia.org/wiki/Pythagorean_theorem" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Pythagorean Theorem - Wikipedia <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A comprehensive overview with historical context, proofs, and applications.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.ams.org/notices/201010/rtx101001221p.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        The Pythagorean Theorem: The Way of Truth and the Way of Beauty - AMS <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Michael Fried</p>
                    <p className="mt-1">An academic paper exploring different proofs of the theorem throughout history.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.maa.org/external_archive/devlin/devlin_09_08.html" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        The Pythagorean Theorem - Mathematical Association of America <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Keith Devlin</p>
                    <p className="mt-1">An insightful article on the theorem's significance in mathematics.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="related" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Related Tools on This Site</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <Link href="/math/geometry" className="flex items-center">
                        Geometry Calculator
                      </Link>
                    </p>
                    <p className="mt-1">A comprehensive tool for calculating various geometric properties of shapes and figures.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <Link href="/math/trigonometry" className="flex items-center">
                        Trigonometry Calculator
                      </Link>
                    </p>
                    <p className="mt-1">Calculate trigonometric functions and solve triangle problems with this interactive tool.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <Link href="/math/distance-calculator" className="flex items-center">
                        Distance Calculator
                      </Link>
                    </p>
                    <p className="mt-1">Calculate distances between points in 2D and 3D space using the distance formula derived from the Pythagorean theorem.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Related Mathematical Concepts</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Trigonometry</p>
                    <p className="mt-1">The study of relationships between angles and sides of triangles, which builds directly on the Pythagorean theorem.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Euclidean Geometry</p>
                    <p className="mt-1">The mathematical system attributed to Euclid, which includes the Pythagorean theorem as one of its key results.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Coordinate Geometry</p>
                    <p className="mt-1">The branch of geometry where points are represented using coordinates, with the distance formula derived from the Pythagorean theorem.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Vector Algebra</p>
                    <p className="mt-1">The study of vectors and their operations, where the Pythagorean theorem is used to calculate vector magnitudes.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}