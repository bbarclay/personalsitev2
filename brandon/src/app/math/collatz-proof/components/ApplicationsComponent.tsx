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
  Microscope
} from 'lucide-react';

const ApplicationsComponent: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card className="border-none shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-3xl font-bold">Applications of Proof Techniques</CardTitle>
          <CardDescription className="text-lg">
            How methods used to approach the Collatz conjecture apply to other fields
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="mathematics" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="mathematics" className="flex items-center gap-2">
            <Puzzle className="h-4 w-4" />
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
                  <Puzzle className="h-5 w-5 text-blue-600" />
                  <CardTitle>Number Theory</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Proof techniques developed for the Collatz conjecture have applications in broader number theory:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Analyzing other iterative processes on integers</li>
                  <li>• Studying patterns in integer sequences</li>
                  <li>• Investigating properties of arithmetic functions</li>
                  <li>• Exploring modular arithmetic relationships</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These techniques have contributed to advances in understanding other number-theoretic problems.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-purple-100 dark:border-purple-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-purple-600" />
                  <CardTitle>Dynamical Systems</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  The Collatz conjecture is fundamentally a problem in discrete dynamical systems:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Analyzing attractors and basins of attraction</li>
                  <li>• Studying ergodic properties of transformations</li>
                  <li>• Investigating chaotic behavior in discrete systems</li>
                  <li>• Developing methods for cycle detection</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These approaches have applications in understanding other dynamical systems in mathematics and physics.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-green-100 dark:border-green-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  <CardTitle>Proof Theory</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Work on the Collatz conjecture has implications for proof theory:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Exploring the limits of different proof techniques</li>
                  <li>• Developing new approaches to induction</li>
                  <li>• Investigating the role of computation in proofs</li>
                  <li>• Studying the decidability of mathematical statements</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These investigations contribute to our understanding of what constitutes a mathematical proof.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-amber-100 dark:border-amber-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-amber-600" />
                  <CardTitle>Graph Theory</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  The Collatz process can be represented as a directed graph:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Analyzing connectivity properties of directed graphs</li>
                  <li>• Studying tree structures and branching processes</li>
                  <li>• Investigating cycle structures in graphs</li>
                  <li>• Developing algorithms for graph traversal</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These graph-theoretic approaches have applications in network analysis and algorithm design.
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
                  <CardTitle>Computational Complexity</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  The Collatz conjecture connects to fundamental questions in computational complexity:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Studying the complexity of determining stopping times</li>
                  <li>• Investigating relationships to the halting problem</li>
                  <li>• Exploring computational irreducibility</li>
                  <li>• Analyzing the efficiency of algorithms for sequence generation</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These investigations contribute to our understanding of computational tractability.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-purple-100 dark:border-purple-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-purple-600" />
                  <CardTitle>Algorithm Design</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Work on the Collatz conjecture has led to advances in algorithm design:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Optimizing algorithms for large integer arithmetic</li>
                  <li>• Developing efficient cycle detection methods</li>
                  <li>• Creating parallel algorithms for sequence generation</li>
                  <li>• Implementing memory-efficient data structures</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These algorithmic techniques have applications in various computational problems.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-green-100 dark:border-green-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-green-600" />
                  <CardTitle>Formal Verification</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Approaches to proving the Collatz conjecture relate to formal verification:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Developing techniques for verifying properties of algorithms</li>
                  <li>• Creating formal specifications of mathematical conjectures</li>
                  <li>• Implementing automated theorem provers</li>
                  <li>• Exploring the limits of formal verification systems</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These methods are crucial for ensuring the correctness of critical software systems.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-amber-100 dark:border-amber-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-amber-600" />
                  <CardTitle>Data Structures</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Work on the Collatz conjecture has influenced data structure design:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Creating efficient representations for large directed graphs</li>
                  <li>• Developing data structures for tracking sequence properties</li>
                  <li>• Implementing memory-efficient storage of sequence data</li>
                  <li>• Designing structures for fast lookup of computed results</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These data structures have applications in managing large datasets in various domains.
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
                  The Collatz conjecture is an excellent teaching tool:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Introducing students to mathematical conjectures and proofs</li>
                  <li>• Demonstrating the difference between verification and proof</li>
                  <li>• Illustrating concepts in number theory and dynamical systems</li>
                  <li>• Engaging students with an accessible yet unsolved problem</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                Its simplicity makes it ideal for teaching mathematical reasoning at various levels.
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
                  The conjecture provides excellent programming exercises:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Teaching algorithm implementation and optimization</li>
                  <li>• Introducing concepts in computational complexity</li>
                  <li>• Demonstrating big integer arithmetic</li>
                  <li>• Illustrating recursion, iteration, and memoization</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These exercises help develop programming skills and computational thinking.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-green-100 dark:border-green-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-green-600" />
                  <CardTitle>Research Methodology</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  The Collatz conjecture illustrates important aspects of research methodology:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Formulating clear research questions</li>
                  <li>• Developing and testing hypotheses</li>
                  <li>• Collecting and analyzing empirical data</li>
                  <li>• Communicating results and open questions</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These methodological lessons apply across scientific disciplines.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-amber-100 dark:border-amber-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-amber-600" />
                  <CardTitle>Data Visualization</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  The Collatz conjecture provides rich opportunities for teaching data visualization:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Creating effective visualizations of complex data</li>
                  <li>• Representing mathematical concepts graphically</li>
                  <li>• Designing interactive visualizations</li>
                  <li>• Communicating patterns and relationships visually</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These visualization skills are valuable in many fields that deal with complex data.
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
                  <CardTitle>Scientific Computing</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Techniques developed for the Collatz conjecture have applications in scientific computing:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Optimizing algorithms for numerical simulations</li>
                  <li>• Developing methods for analyzing complex systems</li>
                  <li>• Creating efficient distributed computing frameworks</li>
                  <li>• Implementing high-precision arithmetic for scientific calculations</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These computational techniques are essential for modeling and simulation across scientific disciplines.
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
                  The graph structure of the Collatz process connects to network science:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Analyzing connectivity patterns in complex networks</li>
                  <li>• Studying information flow in directed networks</li>
                  <li>• Investigating emergent properties of network structures</li>
                  <li>• Developing algorithms for network analysis</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These network analysis techniques apply to social, biological, and technological networks.
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
                  The Collatz conjecture raises important philosophical questions:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Exploring the nature of mathematical truth and evidence</li>
                  <li>• Investigating the role of computation in mathematical proof</li>
                  <li>• Examining the limits of formal systems</li>
                  <li>• Considering the relationship between simplicity and complexity</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These philosophical inquiries contribute to our understanding of mathematics and knowledge.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-amber-100 dark:border-amber-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-amber-600" />
                  <CardTitle>Artificial Intelligence</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Work on the Collatz conjecture has implications for AI research:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Developing machine learning approaches to pattern recognition</li>
                  <li>• Creating AI systems for mathematical discovery</li>
                  <li>• Implementing automated reasoning systems</li>
                  <li>• Exploring the limits of computational intelligence</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These AI techniques have applications in automated theorem proving and scientific discovery.
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Practical Applications of Proof Techniques</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            The techniques developed for approaching the Collatz conjecture have practical applications beyond pure mathematics:
          </p>
          
          <ul>
            <li>
              <strong>Software Verification:</strong> Methods for proving properties of the Collatz function can be adapted for verifying the correctness of software systems.
            </li>
            <li>
              <strong>Cryptographic Systems:</strong> Number-theoretic insights gained from studying the Collatz conjecture can inform the design of cryptographic algorithms.
            </li>
            <li>
              <strong>Optimization Algorithms:</strong> Techniques for analyzing the behavior of the Collatz function can be applied to optimization problems in operations research.
            </li>
            <li>
              <strong>Data Analysis:</strong> Methods for detecting patterns in Collatz sequences can be adapted for analyzing patterns in other types of data.
            </li>
          </ul>
          
          <p>
            These practical applications demonstrate how research on abstract mathematical problems can lead to tools and techniques with real-world impact.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Educational Value</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            Beyond its technical applications, the study of proof approaches to the Collatz conjecture has significant educational value:
          </p>
          
          <ul>
            <li>
              <strong>Critical Thinking:</strong> Engaging with the conjecture develops skills in logical reasoning, pattern recognition, and hypothesis testing.
            </li>
            <li>
              <strong>Interdisciplinary Connections:</strong> The problem naturally connects mathematics, computer science, and philosophy, encouraging cross-disciplinary thinking.
            </li>
            <li>
              <strong>Research Methodology:</strong> The history of attempts to prove the conjecture illustrates the iterative nature of research and the importance of multiple approaches.
            </li>
            <li>
              <strong>Computational Thinking:</strong> Working with the conjecture develops skills in algorithmic thinking, abstraction, and problem decomposition.
            </li>
          </ul>
          
          <p>
            These educational benefits make the Collatz conjecture a valuable topic for students at various levels, from high school to graduate studies.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationsComponent;
