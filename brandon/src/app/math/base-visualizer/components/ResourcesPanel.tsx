import React from 'react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

const ResourcesPanel = () => {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6">Learning Resources</h2>
        
        <p>
          Explore these resources to deepen your understanding of number systems, their properties,
          and applications in various fields from computer science to mathematics.
        </p>
      </div>

      <Tabs defaultValue="tutorials">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="tools">Interactive Tools</TabsTrigger>
          <TabsTrigger value="books">Books & Articles</TabsTrigger>
          <TabsTrigger value="courses">Courses & Videos</TabsTrigger>
        </TabsList>

        <TabsContent value="tutorials" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Online Tutorials</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.mathsisfun.com/numbers/number-systems.html" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Number Systems - Math is Fun <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A beginner-friendly introduction to different number systems with clear explanations and examples.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:irrational-numbers/x2f8bb11595b61c86:number-systems/v/number-systems-introduction" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Number Systems Introduction - Khan Academy <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Video lessons and practice exercises on number systems and their properties.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.tutorialspoint.com/computer_logical_organization/number_system_conversion.htm" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Number System Conversion - TutorialsPoint <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Comprehensive guide to converting between different number systems with step-by-step examples.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Programming Tutorials</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.geeksforgeeks.org/number-system-and-base-conversions/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Number System and Base Conversions - GeeksforGeeks <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Programming-focused tutorial on number systems with implementation examples in various languages.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.hackerearth.com/practice/notes/number-theory-1/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Number Theory for Programmers - HackerEarth <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Practical guide to number systems and number theory concepts for competitive programming.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.cs.cornell.edu/~tomf/notes/cps104/twoscomp.html" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Two's Complement: Signed Binary Numbers - Cornell University <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Detailed explanation of two's complement representation for signed binary numbers.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Related Tools on This Site</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <Link href="/math/binary-calculator" className="flex items-center">
                        Binary Calculator
                      </Link>
                    </p>
                    <p className="mt-1">Perform arithmetic operations directly in binary and other number systems.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <Link href="/math/modular-arithmetic" className="flex items-center">
                        Modular Arithmetic Calculator
                      </Link>
                    </p>
                    <p className="mt-1">Explore modular arithmetic, which is closely related to number systems with finite bases.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <Link href="/math/prime-factorization" className="flex items-center">
                        Prime Factorization Tool
                      </Link>
                    </p>
                    <p className="mt-1">Understand the fundamental building blocks of numbers across all number systems.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Online Calculators and Converters</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.rapidtables.com/convert/number/index.html" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        RapidTables Number Conversion <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Comprehensive set of converters for different number systems with step-by-step explanations.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.calculator.net/binary-calculator.html" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Binary Calculator - Calculator.net <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Perform binary arithmetic operations and conversions between different number bases.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.omnicalculator.com/math/numeral-system-converter" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Numeral System Converter - Omni Calculator <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Convert between decimal, binary, octal, hexadecimal, and other custom bases.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Interactive Visualizations</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://visualgo.net/en/conversion" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        VisuAlgo - Number Conversion <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Animated visualizations of number system conversion algorithms.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.geogebra.org/m/qbfhbu9s" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Number Systems Explorer - GeoGebra <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Interactive visualization of different number bases and their relationships.</p>
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
                    <p className="font-medium">Number Systems and the Foundations of Analysis</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Elliott Mendelson</p>
                    <p className="mt-1">A rigorous mathematical treatment of number systems from a foundational perspective.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Computer Organization and Design: The Hardware/Software Interface</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">David A. Patterson and John L. Hennessy</p>
                    <p className="mt-1">Covers number representation in computer systems, including binary, octal, and hexadecimal.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">The Art of Computer Programming, Volume 2: Seminumerical Algorithms</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Donald E. Knuth</p>
                    <p className="mt-1">Contains in-depth discussions of number systems and arithmetic operations in different bases.</p>
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
                      <a href="https://www.ams.org/journals/bull/1964-70-06/S0002-9904-1964-11234-9/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Non-Decimal Numeration - American Mathematical Society <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">W. J. Eckert</p>
                    <p className="mt-1">Historical perspective on non-decimal number systems and their applications.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://ieeexplore.ieee.org/document/4567924" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        A History of Binary and Other Nondecimal Numeration - IEEE <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Anton Glaser</p>
                    <p className="mt-1">Comprehensive history of non-decimal number systems from ancient times to modern computing.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Online References</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://en.wikipedia.org/wiki/Numeral_system" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Numeral System - Wikipedia <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Comprehensive overview of different numeral systems with historical context and examples.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://mathworld.wolfram.com/Base.html" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Base - Wolfram MathWorld <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Mathematical treatment of number bases with formal definitions and properties.</p>
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
                      <a href="https://www.coursera.org/learn/digital-systems" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Digital Systems: From Logic Gates to Processors - Coursera <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Universitat Autònoma de Barcelona</p>
                    <p className="mt-1">Covers number systems and their applications in digital electronics and computer architecture.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.edx.org/learn/computer-science/massachusetts-institute-of-technology-computation-structures-1-digital-circuits" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Computation Structures: Digital Circuits - edX <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">MIT</p>
                    <p className="mt-1">Explores binary representation and arithmetic in the context of digital circuit design.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Video Lectures</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.youtube.com/watch?v=ku4KOFQ-bB4" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Number Systems Introduction - Computerphile <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Accessible introduction to number systems in computing with practical examples.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.youtube.com/watch?v=QXliQvd1vW0" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Binary, Decimal and Hexadecimal Number Systems - The Organic Chemistry Tutor <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Comprehensive tutorial on converting between different number systems with detailed examples.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.youtube.com/watch?v=FFDMzbrEXaE" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Why do computers use hexadecimal? - Ben Eater <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Explanation of why hexadecimal is commonly used in computing with hardware demonstrations.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Educational Channels</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.youtube.com/c/3blue1brown" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        3Blue1Brown <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Visual explanations of mathematical concepts, including number systems and their properties.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.youtube.com/c/Computerphile" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Computerphile <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Videos on computer science topics, including number representation and binary arithmetic.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.youtube.com/c/Numberphile" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Numberphile <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Videos about numbers and mathematics, including explorations of different number systems.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResourcesPanel;
