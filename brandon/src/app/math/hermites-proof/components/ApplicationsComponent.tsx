import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, 
  Cpu, 
  BrainCircuit, 
  Lightbulb, 
  BookOpen, 
  GraduationCap,
  Network,
  Lock,
  BarChart3,
  FileText,
  Puzzle,
  Microscope,
  Calculator,
  Pi
} from 'lucide-react';

const ApplicationsComponent: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card className="border-none shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-3xl font-bold">Applications of Hermite's Methods</CardTitle>
          <CardDescription className="text-lg">
            How techniques from Hermite's proof extend to other areas of mathematics and beyond
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="mathematics" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="mathematics" className="flex items-center gap-2">
            <Pi className="h-4 w-4" />
            <span>Mathematics</span>
          </TabsTrigger>
          <TabsTrigger value="computer-science" className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            <span>Computer Science</span>
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            <span>Education</span>
          </TabsTrigger>
          <TabsTrigger value="interdisciplinary" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            <span>Interdisciplinary</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mathematics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-100 dark:border-blue-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Pi className="h-5 w-5 text-blue-600" />
                  <CardTitle>Transcendence Theory</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Hermite's methods directly influenced the development of transcendence theory:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Lindemann's proof of π's transcendence (1882)</li>
                  <li>• The Lindemann-Weierstrass theorem on exponential values</li>
                  <li>• Gelfond-Schneider theorem on algebraic powers</li>
                  <li>• Baker's work on linear forms in logarithms</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These results resolved classical problems like squaring the circle and provided tools for Diophantine analysis.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-purple-100 dark:border-purple-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-purple-600" />
                  <CardTitle>Approximation Theory</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  The approximation techniques in Hermite's proof have broader applications:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Padé approximations for rational approximation of functions</li>
                  <li>• Hermite interpolation in numerical analysis</li>
                  <li>• Approximation of special functions</li>
                  <li>• Error bounds in numerical integration</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These methods are fundamental in numerical analysis and computational mathematics.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-green-100 dark:border-green-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  <CardTitle>Differential Equations</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Hermite's integral representations connect to differential equations:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Solutions to linear differential equations</li>
                  <li>• Special functions defined by differential equations</li>
                  <li>• Boundary value problems</li>
                  <li>• Asymptotic analysis of solutions</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These connections help solve problems in mathematical physics and engineering.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-amber-100 dark:border-amber-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-amber-600" />
                  <CardTitle>Number Theory</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Hermite's work influenced broader areas of number theory:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Diophantine approximation</li>
                  <li>• Irrationality measures</li>
                  <li>• Algebraic independence results</li>
                  <li>• Transcendental number generation</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These areas continue to be active research fields with connections to cryptography and computer science.
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="computer-science" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-100 dark:border-blue-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-blue-600" />
                  <CardTitle>Computer Algebra Systems</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Knowledge of transcendental relationships is crucial for symbolic computation:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Simplification of expressions involving e and π</li>
                  <li>• Recognition of special values of transcendental functions</li>
                  <li>• Symbolic integration algorithms</li>
                  <li>• Exact computation with transcendental numbers</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                Systems like Mathematica, Maple, and SymPy rely on these mathematical foundations.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-purple-100 dark:border-purple-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-purple-600" />
                  <CardTitle>Cryptography</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Transcendental number theory has implications for cryptography:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Elliptic curve cryptography (related to transcendental functions)</li>
                  <li>• Pseudorandom number generation</li>
                  <li>• Complexity of certain number-theoretic problems</li>
                  <li>• Post-quantum cryptographic schemes</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                The computational complexity of problems related to transcendental numbers provides security guarantees.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-green-100 dark:border-green-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-green-600" />
                  <CardTitle>Numerical Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Hermite's approximation methods influence numerical computation:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Efficient algorithms for computing e and related functions</li>
                  <li>• Error analysis in floating-point arithmetic</li>
                  <li>• Numerical integration techniques</li>
                  <li>• Approximation of special functions</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These techniques are essential for scientific computing and simulation.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-amber-100 dark:border-amber-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-amber-600" />
                  <CardTitle>Formal Verification</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Hermite's proof techniques relate to formal verification:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Computer-assisted proofs of mathematical theorems</li>
                  <li>• Verification of floating-point algorithms</li>
                  <li>• Formalization of transcendental number theory</li>
                  <li>• Certified computation with transcendental functions</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These applications ensure the correctness of critical software systems.
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-100 dark:border-blue-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  <CardTitle>Mathematical Pedagogy</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Hermite's proof serves as an excellent teaching example:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Illustrating proof by contradiction</li>
                  <li>• Demonstrating the integration of multiple mathematical areas</li>
                  <li>• Teaching the concept of transcendental numbers</li>
                  <li>• Showing the elegance of mathematical reasoning</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                The proof is often featured in advanced undergraduate and graduate courses.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-purple-100 dark:border-purple-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-purple-600" />
                  <CardTitle>Historical Context</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Hermite's work provides valuable historical context:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Understanding the development of modern mathematics</li>
                  <li>• Appreciating the resolution of long-standing problems</li>
                  <li>• Seeing the evolution of mathematical techniques</li>
                  <li>• Learning from the approaches of great mathematicians</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                This historical perspective enriches mathematical education at all levels.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-green-100 dark:border-green-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  <CardTitle>Interdisciplinary Education</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  The proof connects multiple disciplines:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Bridging algebra, analysis, and number theory</li>
                  <li>• Connecting pure mathematics to applications</li>
                  <li>• Illustrating the unity of mathematical knowledge</li>
                  <li>• Demonstrating how theoretical results impact practical fields</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                This interdisciplinary nature helps students see connections across their curriculum.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-amber-100 dark:border-amber-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Puzzle className="h-5 w-5 text-amber-600" />
                  <CardTitle>Problem-Solving Strategies</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Hermite's approach teaches valuable problem-solving strategies:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Constructing auxiliary functions for specific purposes</li>
                  <li>• Using integral representations to analyze functions</li>
                  <li>• Applying contradiction techniques effectively</li>
                  <li>• Breaking complex problems into manageable steps</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These strategies transfer to many other mathematical and scientific problems.
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="interdisciplinary" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-100 dark:border-blue-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Microscope className="h-5 w-5 text-blue-600" />
                  <CardTitle>Physics and Engineering</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  The transcendental nature of e has implications for physical systems:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Exponential growth and decay processes</li>
                  <li>• Harmonic oscillators and wave equations</li>
                  <li>• Quantum mechanical systems</li>
                  <li>• Control systems and feedback loops</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                Understanding the properties of e is essential for modeling many physical phenomena.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-purple-100 dark:border-purple-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-purple-600" />
                  <CardTitle>Complex Systems</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Transcendental functions appear in complex systems analysis:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Network growth models</li>
                  <li>• Population dynamics</li>
                  <li>• Financial systems and compound interest</li>
                  <li>• Chaotic systems and strange attractors</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                The exponential function, with base e, is fundamental to modeling complex system behavior.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-green-100 dark:border-green-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  <CardTitle>Philosophy of Mathematics</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Hermite's proof raises philosophical questions:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• The nature of mathematical existence</li>
                  <li>• The relationship between mathematics and physical reality</li>
                  <li>• The role of proof in establishing mathematical truth</li>
                  <li>• The distinction between constructive and non-constructive methods</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These philosophical questions connect mathematics to broader intellectual traditions.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-amber-100 dark:border-amber-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-amber-600" />
                  <CardTitle>Data Science</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Transcendental functions are essential in data science:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Exponential and logarithmic transformations</li>
                  <li>• Maximum likelihood estimation</li>
                  <li>• Information theory and entropy</li>
                  <li>• Machine learning activation functions</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                The exponential function and its properties underlie many statistical and machine learning methods.
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Practical Applications of Transcendence Results</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            The transcendence of e and related results have practical applications beyond pure mathematics:
          </p>
          
          <ul>
            <li>
              <strong>Computer Graphics:</strong> The impossibility of squaring the circle (a consequence of π's transcendence) 
              informs algorithms for approximating circular shapes in digital environments.
            </li>
            <li>
              <strong>Signal Processing:</strong> Transcendental functions like sine, cosine, and exponentials (involving e) 
              are fundamental to Fourier analysis and signal processing.
            </li>
            <li>
              <strong>Financial Mathematics:</strong> Continuous compounding formulas involving e are used in financial 
              modeling, option pricing, and risk assessment.
            </li>
            <li>
              <strong>Cryptography:</strong> The computational complexity of certain problems involving transcendental 
              functions provides security guarantees for cryptographic systems.
            </li>
          </ul>
          
          <p>
            These applications demonstrate how abstract mathematical results about the nature of numbers can have 
            far-reaching practical implications.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Educational Value</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            Hermite's proof and the methods it inspired have significant educational value:
          </p>
          
          <ul>
            <li>
              <strong>Mathematical Reasoning:</strong> The proof demonstrates sophisticated mathematical reasoning, 
              combining algebraic and analytic techniques in an elegant way.
            </li>
            <li>
              <strong>Historical Perspective:</strong> Studying Hermite's work provides insight into the historical 
              development of mathematics and the resolution of long-standing problems.
            </li>
            <li>
              <strong>Interdisciplinary Connections:</strong> The proof illustrates connections between different 
              branches of mathematics, showing how techniques from one area can solve problems in another.
            </li>
            <li>
              <strong>Problem-Solving Strategies:</strong> The approach Hermite took—constructing auxiliary functions 
              with specific properties—exemplifies creative problem-solving strategies applicable to many contexts.
            </li>
          </ul>
          
          <p>
            By studying this proof and its applications, students develop a deeper appreciation for the beauty and 
            power of mathematical thinking.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationsComponent;
