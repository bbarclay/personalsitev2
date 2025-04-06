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
  Dices,
  Microscope,
  Atom
} from 'lucide-react';

const ApplicationsComponent: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card className="border-none shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-3xl font-bold">Applications of the Collatz Conjecture</CardTitle>
          <CardDescription className="text-lg">
            How this simple mathematical problem impacts various fields
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="computing" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="computing" className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            <span>Computing</span>
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            <span>Education</span>
          </TabsTrigger>
          <TabsTrigger value="research" className="flex items-center gap-2">
            <Microscope className="h-4 w-4" />
            <span>Research</span>
          </TabsTrigger>
          <TabsTrigger value="interdisciplinary" className="flex items-center gap-2">
            <Atom className="h-4 w-4" />
            <span>Interdisciplinary</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="computing" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-100 dark:border-blue-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-600" />
                  <CardTitle>Algorithm Design & Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  The Collatz conjecture serves as an excellent case study for algorithm design and analysis. 
                  It demonstrates how simple rules can lead to complex computational challenges, including:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Optimization techniques for sequence calculation</li>
                  <li>• Memory-efficient representations of large integers</li>
                  <li>• Parallel computation strategies</li>
                  <li>• Memoization and dynamic programming approaches</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                Many programming competitions and coding challenges use Collatz-inspired problems.
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
                  The unpredictable nature of Collatz sequences has potential applications in cryptography:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• One-way functions based on Collatz-like operations</li>
                  <li>• Pseudorandom number generation</li>
                  <li>• Hash function design</li>
                  <li>• Cryptographic key generation</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                While not widely used in production systems, Collatz-inspired cryptographic primitives remain an active research area.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-green-100 dark:border-green-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-green-600" />
                  <CardTitle>Distributed Computing</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  The Collatz conjecture has been used as a test case for distributed computing projects:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• BOINC projects for distributed verification</li>
                  <li>• Load balancing algorithms for dividing computational work</li>
                  <li>• Fault tolerance in distributed systems</li>
                  <li>• Volunteer computing frameworks</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                Projects like Collatz Conjecture have engaged thousands of volunteers in distributed computing efforts.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-amber-100 dark:border-amber-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Dices className="h-5 w-5 text-amber-600" />
                  <CardTitle>Pseudorandom Generation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  The chaotic behavior of Collatz sequences can be harnessed for generating pseudorandom numbers:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Using trajectory patterns as entropy sources</li>
                  <li>• Combining Collatz operations with other algorithms</li>
                  <li>• Creating non-cryptographic random number generators</li>
                  <li>• Generating test data with specific properties</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                While not suitable for cryptographic applications alone, Collatz-based PRNGs can be useful for simulations and testing.
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
                  <CardTitle>Mathematics Education</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  The Collatz conjecture is an invaluable teaching tool in mathematics education:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Introducing students to mathematical conjectures and proofs</li>
                  <li>• Demonstrating how simple rules can generate complex behavior</li>
                  <li>• Teaching number theory concepts in an engaging way</li>
                  <li>• Illustrating the difference between verification and proof</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                Its accessibility makes it ideal for engaging students from middle school through university level.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-purple-100 dark:border-purple-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-purple-600" />
                  <CardTitle>Computer Science Education</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  The conjecture provides excellent programming exercises for computer science students:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Teaching loop structures and conditional logic</li>
                  <li>• Introducing recursion and memoization</li>
                  <li>• Demonstrating algorithm optimization techniques</li>
                  <li>• Exploring big integer arithmetic and overflow handling</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                Many CS1 and CS2 courses use Collatz-based assignments to build programming fundamentals.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-green-100 dark:border-green-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  <CardTitle>Data Visualization</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Collatz sequences provide rich opportunities for teaching data visualization:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Creating trajectory plots and heatmaps</li>
                  <li>• Designing interactive visualizations</li>
                  <li>• Representing large datasets effectively</li>
                  <li>• Communicating mathematical concepts visually</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                The visual patterns in Collatz sequences make them ideal for teaching information design principles.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-amber-100 dark:border-amber-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-600" />
                  <CardTitle>Computational Thinking</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  The conjecture helps develop computational thinking skills:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Breaking down complex problems into simpler steps</li>
                  <li>• Recognizing patterns and making predictions</li>
                  <li>• Developing algorithmic solutions</li>
                  <li>• Understanding abstraction and generalization</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These skills transfer to many other domains beyond mathematics and computer science.
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="research" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-100 dark:border-blue-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-blue-600" />
                  <CardTitle>Dynamical Systems</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  The Collatz conjecture provides insights into discrete dynamical systems:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Studying attractors and basins of attraction</li>
                  <li>• Analyzing iterated function systems</li>
                  <li>• Investigating chaotic behavior in discrete systems</li>
                  <li>• Developing new methods for analyzing dynamical systems</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                Research on the Collatz conjecture has led to advances in understanding other dynamical systems.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-purple-100 dark:border-purple-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-purple-600" />
                  <CardTitle>Computational Complexity</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  The conjecture raises interesting questions about computational complexity:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Connections to the halting problem</li>
                  <li>• Complexity of determining stopping times</li>
                  <li>• Relationships to undecidability</li>
                  <li>• Computational irreducibility</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                Some researchers have suggested that the Collatz problem might be undecidable in certain formal systems.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-green-100 dark:border-green-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  <CardTitle>Number Theory</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  The Collatz conjecture connects to various areas of number theory:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Modular arithmetic and congruences</li>
                  <li>• Properties of powers of 2 and 3</li>
                  <li>• Diophantine equations</li>
                  <li>• Patterns in integer sequences</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                Research on the conjecture has led to new insights in number theory and related fields.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-amber-100 dark:border-amber-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Microscope className="h-5 w-5 text-amber-600" />
                  <CardTitle>Experimental Mathematics</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  The Collatz conjecture exemplifies the field of experimental mathematics:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Using computation to explore mathematical conjectures</li>
                  <li>• Developing heuristics based on empirical observations</li>
                  <li>• Finding patterns that suggest theoretical approaches</li>
                  <li>• Bridging pure mathematics and computational methods</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                The extensive computational verification of the conjecture has influenced how mathematicians approach other problems.
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="interdisciplinary" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-100 dark:border-blue-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Atom className="h-5 w-5 text-blue-600" />
                  <CardTitle>Complex Systems</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  The Collatz conjecture illustrates principles of complex systems:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Emergence of complex behavior from simple rules</li>
                  <li>• Self-organization and pattern formation</li>
                  <li>• Sensitivity to initial conditions</li>
                  <li>• Computational irreducibility</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These principles apply to systems ranging from biological networks to social dynamics.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-purple-100 dark:border-purple-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-purple-600" />
                  <CardTitle>Network Science</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Collatz sequences can be represented as directed graphs, connecting to network science:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Studying network topology and connectivity</li>
                  <li>• Analyzing path lengths and centrality measures</li>
                  <li>• Investigating convergence patterns in networks</li>
                  <li>• Modeling information flow in directed networks</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                The network structure of Collatz sequences provides insights applicable to other network systems.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-green-100 dark:border-green-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-green-600" />
                  <CardTitle>Philosophy of Mathematics</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  The Collatz conjecture raises philosophical questions about mathematics:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• The nature of mathematical truth and evidence</li>
                  <li>• Limits of formal systems and provability</li>
                  <li>• Role of computation in mathematical discovery</li>
                  <li>• Relationship between simplicity and complexity</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These questions connect to broader philosophical debates about knowledge and understanding.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-amber-100 dark:border-amber-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-amber-600" />
                  <CardTitle>Data Science & Visualization</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  The Collatz conjecture provides rich opportunities for data science and visualization:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Developing novel visualization techniques</li>
                  <li>• Analyzing patterns in large datasets</li>
                  <li>• Creating interactive data explorations</li>
                  <li>• Communicating complex mathematical concepts visually</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                The visual patterns in Collatz sequences have inspired innovative approaches to data visualization.
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Real-World Impact</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            While the Collatz conjecture might seem like a purely theoretical curiosity, its study has led to practical advances:
          </p>
          
          <ul>
            <li>
              <strong>Computational Methods:</strong> Techniques developed to handle the large numbers in Collatz sequences have been applied to other computational problems.
            </li>
            <li>
              <strong>Educational Tools:</strong> The conjecture has inspired numerous educational tools and platforms that make mathematics more accessible and engaging.
            </li>
            <li>
              <strong>Distributed Computing:</strong> Projects focused on verifying the conjecture have advanced distributed computing frameworks and volunteer computing.
            </li>
            <li>
              <strong>Algorithm Design:</strong> Optimization techniques developed for Collatz calculations have applications in other areas of computer science.
            </li>
          </ul>
          
          <p>
            Perhaps most importantly, the Collatz conjecture demonstrates how seemingly simple mathematical questions can lead to profound insights and cross-disciplinary connections.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationsComponent;
