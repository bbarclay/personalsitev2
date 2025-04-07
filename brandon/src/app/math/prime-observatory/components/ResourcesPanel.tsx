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
          Explore these resources to deepen your understanding of prime numbers, their properties, 
          patterns, and applications across various fields of mathematics and beyond.
        </p>
      </div>

      <Tabs defaultValue="books">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="books">Books & Articles</TabsTrigger>
          <TabsTrigger value="courses">Courses & Videos</TabsTrigger>
          <TabsTrigger value="tools">Tools & Software</TabsTrigger>
          <TabsTrigger value="related">Related Topics</TabsTrigger>
        </TabsList>

        <TabsContent value="books" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Books on Prime Numbers</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Prime Obsession: Bernhard Riemann and the Greatest Unsolved Problem in Mathematics</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">John Derbyshire</p>
                    <p className="mt-1">An engaging account of the Riemann Hypothesis, one of the most important unsolved problems in mathematics, and its connection to prime numbers.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">The Music of the Primes: Searching to Solve the Greatest Mystery in Mathematics</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Marcus du Sautoy</p>
                    <p className="mt-1">A fascinating exploration of prime numbers, their patterns, and the mathematicians who have studied them throughout history.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Prime Numbers: The Most Mysterious Figures in Math</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">David Wells</p>
                    <p className="mt-1">A comprehensive guide to prime numbers, covering their properties, patterns, and applications in an accessible way.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Academic Papers and Articles</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.ams.org/notices/200303/fea-conrey.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        The Riemann Hypothesis - Notices of the AMS <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">J. Brian Conrey</p>
                    <p className="mt-1">An accessible introduction to the Riemann Hypothesis and its implications for prime number distribution.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.ams.org/journals/bull/2007-44-01/S0273-0979-06-01142-6/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Small Gaps Between Primes - Bulletin of the AMS <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">D. A. Goldston, J. Pintz, and C. Y. Yıldırım</p>
                    <p className="mt-1">A groundbreaking paper on the distribution of gaps between consecutive prime numbers.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.ams.org/notices/200305/fea-granville.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        It is Easy to Determine Whether a Given Integer is Prime - Notices of the AMS <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Andrew Granville</p>
                    <p className="mt-1">An overview of the AKS primality test, the first deterministic polynomial-time algorithm for primality testing.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Popular Articles and Blogs</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.quantamagazine.org/mathematicians-discover-prime-conspiracy-20160313/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Mathematicians Discover Prime Conspiracy - Quanta Magazine <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">An article about the surprising patterns in the final digits of consecutive prime numbers.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://plus.maths.org/content/prime-patterns" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Prime Patterns - Plus Magazine <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">An exploration of visual patterns in the distribution of prime numbers.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.scientificamerican.com/article/the-music-of-the-primes/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        The Music of the Primes - Scientific American <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">An article exploring the connections between prime numbers and music.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Online Courses</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.coursera.org/learn/number-theory-cryptography" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Number Theory and Cryptography - Coursera <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">University of California, San Diego</p>
                    <p className="mt-1">A course covering number theory fundamentals, including prime numbers and their applications in cryptography.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.edx.org/course/introduction-to-number-theory" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Introduction to Number Theory - edX <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Kyoto University</p>
                    <p className="mt-1">A comprehensive introduction to number theory, with a focus on prime numbers and their properties.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.khanacademy.org/math/math-for-fun-and-glory/number-theory" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Number Theory - Khan Academy <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Free lessons on number theory topics, including prime numbers, modular arithmetic, and the Euclidean algorithm.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Video Lectures and Documentaries</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.youtube.com/watch?v=0JUN9aDxVmI" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        The Riemann Hypothesis - Numberphile <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">An accessible explanation of the Riemann Hypothesis and its connection to prime numbers.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.youtube.com/watch?v=tlpYjrbujG0" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        The Prime Number Theorem - 3Blue1Brown <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A visual and intuitive explanation of the Prime Number Theorem.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.bbc.co.uk/programmes/b008lt2y" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        The Story of Maths: The Language of the Universe - BBC <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A documentary series that includes segments on prime numbers and their historical significance.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Interactive Tutorials</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://mathigon.org/course/divisibility/primes" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Prime Numbers and Factorization - Mathigon <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">An interactive course on prime numbers with visualizations and exercises.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.wolframalpha.com/examples/mathematics/number-theory/prime-numbers" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Prime Number Exploration - Wolfram Alpha <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A collection of interactive examples for exploring prime numbers and their properties.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Software and Calculators</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.alpertron.com.ar/ECM.HTM" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Integer Factorization Calculator <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A powerful online tool for factoring large numbers into their prime components.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.mersenne.org/download/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Prime95 / GIMPS <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Software used by the Great Internet Mersenne Prime Search to find new Mersenne primes.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.sagemath.org/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        SageMath <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A free open-source mathematics software system with extensive number theory capabilities.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Visualization Tools</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.redblobgames.com/grids/circle-drawing/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Ulam Spiral Generator <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">An interactive tool for generating and exploring the Ulam spiral, which reveals patterns in the distribution of prime numbers.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.geogebra.org/m/nzw3xbta" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Sieve of Eratosthenes - GeoGebra <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">An interactive visualization of the Sieve of Eratosthenes algorithm for finding prime numbers.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.desmos.com/calculator/jhp61xmzja" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Prime Number Patterns - Desmos <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A graphical exploration of prime number patterns using the Desmos graphing calculator.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Databases and Resources</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://oeis.org/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        The On-Line Encyclopedia of Integer Sequences (OEIS) <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A comprehensive database of integer sequences, including many related to prime numbers.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://primes.utm.edu/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        The Prime Pages <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A comprehensive resource on prime numbers, including the largest known primes, prime records, and research.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.mersenne.org/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Great Internet Mersenne Prime Search (GIMPS) <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A collaborative project to discover new Mersenne prime numbers.</p>
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
                      <Link href="/math/riemann" className="flex items-center">
                        Riemann Zeta Explorer
                      </Link>
                    </p>
                    <p className="mt-1">Explore the Riemann zeta function and its deep connections to prime numbers.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <Link href="/math/base-visualizer" className="flex items-center">
                        Base Number System Visualizer
                      </Link>
                    </p>
                    <p className="mt-1">Visualize numbers in different bases, which can reveal interesting patterns in prime numbers.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <Link href="/math/factorial-calculator" className="flex items-center">
                        Factorial Calculator
                      </Link>
                    </p>
                    <p className="mt-1">Calculate factorials, which have interesting relationships with prime numbers.</p>
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
                    <p className="font-medium">Number Theory</p>
                    <p className="mt-1">The branch of mathematics concerned with the properties and relationships of numbers, particularly integers.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Modular Arithmetic</p>
                    <p className="mt-1">A system of arithmetic for integers where numbers "wrap around" after reaching a certain value (the modulus).</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Cryptography</p>
                    <p className="mt-1">The practice and study of techniques for secure communication, which often relies on properties of prime numbers.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Analytic Number Theory</p>
                    <p className="mt-1">The application of calculus and complex analysis to number theory problems, particularly those involving prime numbers.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Research Organizations and Communities</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.ams.org/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        American Mathematical Society (AMS) <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A professional society that promotes mathematical research and education, including number theory and prime numbers.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.numbertheory.org/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Number Theory Web <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A resource for number theorists, with links to conferences, journals, and other resources.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://math.stackexchange.com/questions/tagged/prime-numbers" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Mathematics Stack Exchange - Prime Numbers <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A community-driven question and answer site for mathematics, with many discussions about prime numbers.</p>
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
