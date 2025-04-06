import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator, 
  History, 
  BookOpen, 
  Code, 
  Lightbulb, 
  Sigma, 
  BrainCircuit,
  Infinity
} from 'lucide-react';

const ExplanationComponent: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card className="border-none shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-3xl font-bold">Understanding the Collatz Conjecture</CardTitle>
          <CardDescription className="text-lg">
            One of mathematics' most famous unsolved problems
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span>History</span>
          </TabsTrigger>
          <TabsTrigger value="mathematics" className="flex items-center gap-2">
            <Sigma className="h-4 w-4" />
            <span>Mathematics</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            <span>Key Insights</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>What is the Collatz Conjecture?</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                The Collatz conjecture is one of the most famous unsolved problems in mathematics. 
                The problem is remarkably simple to state but has resisted all attempts at a formal proof 
                for over 80 years.
              </p>
              
              <h3>The Rules</h3>
              <p>Take any positive integer n and apply the following rules:</p>
              <ul>
                <li>If n is even, divide it by 2: n → n/2</li>
                <li>If n is odd, multiply by 3 and add 1: n → 3n + 1</li>
              </ul>
              
              <p>
                The conjecture states that no matter what positive integer you start with, 
                the sequence will always eventually reach 1. Once it reaches 1, it enters the cycle: 1 → 4 → 2 → 1...
              </p>
              
              <h3>Example</h3>
              <p>Starting with n = 6:</p>
              <ol>
                <li>6 is even, so 6 ÷ 2 = 3</li>
                <li>3 is odd, so 3 × 3 + 1 = 10</li>
                <li>10 is even, so 10 ÷ 2 = 5</li>
                <li>5 is odd, so 5 × 3 + 1 = 16</li>
                <li>16 is even, so 16 ÷ 2 = 8</li>
                <li>8 is even, so 8 ÷ 2 = 4</li>
                <li>4 is even, so 4 ÷ 2 = 2</li>
                <li>2 is even, so 2 ÷ 2 = 1</li>
              </ol>
              
              <p>
                The sequence reaches 1, confirming the conjecture for the starting number 6.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Why is it Important?</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                The Collatz conjecture is significant for several reasons:
              </p>
              
              <ul>
                <li>
                  <strong>Simplicity vs. Complexity:</strong> It demonstrates how simple rules can generate 
                  complex, unpredictable behavior—a hallmark of chaos theory and complex systems.
                </li>
                <li>
                  <strong>Computational Unpredictability:</strong> Despite its simple formulation, 
                  we cannot predict how many steps it will take for a given number to reach 1 without 
                  actually computing the sequence.
                </li>
                <li>
                  <strong>Connection to Other Fields:</strong> The conjecture touches on number theory, 
                  dynamical systems, and computational complexity.
                </li>
                <li>
                  <strong>Verification vs. Proof:</strong> While the conjecture has been verified for all 
                  starting numbers up to 2<sup>68</sup> (approximately 295 trillion), a general proof remains elusive.
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historical Development</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                The Collatz conjecture has a fascinating history spanning nearly a century:
              </p>
              
              <h3>Origins</h3>
              <p>
                The problem was first proposed by German mathematician Lothar Collatz in 1937, 
                though it wasn't published until much later. Collatz was interested in number-theoretic 
                functions and their behavior under iteration.
              </p>
              
              <h3>Early Research</h3>
              <p>
                For many years, the problem remained relatively obscure, known only to a small circle 
                of mathematicians. In the 1950s and 1960s, it began to gain more attention as 
                computational methods allowed for more extensive testing.
              </p>
              
              <h3>Paul Erdős's Influence</h3>
              <p>
                The famous mathematician Paul Erdős helped popularize the problem, reportedly saying, 
                "Mathematics may not be ready for such problems." He offered $500 for its solution—a 
                significant sum for a mathematical problem at the time.
              </p>
              
              <h3>Modern Developments</h3>
              <p>
                In 2019, Terence Tao made significant progress by proving that the Collatz conjecture 
                is "almost always" true—meaning it holds for a set of numbers with "logarithmic density" 1.
              </p>
              
              <h3>Computational Verification</h3>
              <p>
                As computing power has increased, so has the range of numbers for which the conjecture 
                has been verified:
              </p>
              <ul>
                <li>1970s: Verified up to 10<sup>9</sup></li>
                <li>1990s: Verified up to 10<sup>14</sup></li>
                <li>2000s: Verified up to 10<sup>18</sup></li>
                <li>2020: Verified up to 2<sup>68</sup> (approximately 2.95 × 10<sup>20</sup>)</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Alternative Names</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                The Collatz conjecture is known by several other names:
              </p>
              
              <ul>
                <li><strong>3n+1 problem</strong> - Referring to the operation performed on odd numbers</li>
                <li><strong>Syracuse problem</strong> - Named after Syracuse University, where it was studied</li>
                <li><strong>Ulam's conjecture</strong> - After Stanislaw Ulam, who worked on it</li>
                <li><strong>Hasse's algorithm</strong> - After Helmut Hasse, who investigated it</li>
                <li><strong>Kakutani's problem</strong> - After Shizuo Kakutani, who independently discovered it</li>
                <li><strong>Thwaites conjecture</strong> - After Sir Bryan Thwaites, who offered a prize for its solution</li>
                <li><strong>Hailstone sequence</strong> - Because the values typically rise and fall, like hailstones in a cloud</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mathematics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mathematical Formulation</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                The Collatz function C(n) can be formally defined as:
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4 text-center">
                <p className="font-mono text-lg">
                  C(n) = n/2 if n is even<br />
                  C(n) = 3n+1 if n is odd
                </p>
              </div>
              
              <p>
                This can also be written as a single formula:
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4 text-center">
                <p className="font-mono text-lg">
                  C(n) = (3n+1) × 2<sup>-v<sub>2</sub>(3n+1)</sup>
                </p>
              </div>
              
              <p>
                Where v<sub>2</sub>(m) represents the highest power of 2 that divides m.
              </p>
              
              <h3>Key Mathematical Concepts</h3>
              
              <h4>Stopping Time</h4>
              <p>
                The "stopping time" of a number is how many steps it takes to reach a value less than the starting number. 
                The "total stopping time" is how many steps it takes to reach 1.
              </p>
              
              <h4>Cycle Detection</h4>
              <p>
                A major part of proving the conjecture involves showing that there are no cycles other than the 4→2→1→4 cycle.
              </p>
              
              <h4>Parity Sequences</h4>
              <p>
                The pattern of odd and even numbers in a Collatz sequence (its "parity sequence") can provide insights into the behavior.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Approaches to Proof</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                Mathematicians have tried various approaches to prove the Collatz conjecture:
              </p>
              
              <h3>Probabilistic Arguments</h3>
              <p>
                One approach treats the problem probabilistically. If we assume that after applying the 3n+1 operation to an odd number, 
                the result is equally likely to be divisible by any power of 2, then on average, numbers in the sequence should decrease over time.
              </p>
              
              <h3>Dynamical Systems</h3>
              <p>
                The Collatz function can be viewed as a dynamical system. Researchers have studied its behavior using techniques from 
                ergodic theory and the theory of iterated functions.
              </p>
              
              <h3>Computer-Assisted Proofs</h3>
              <p>
                Some mathematicians have explored the possibility of a computer-assisted proof, similar to the proof of the Four Color Theorem. 
                However, the unbounded nature of the Collatz problem makes this approach challenging.
              </p>
              
              <h3>Modular Approaches</h3>
              <p>
                Studying the behavior of the Collatz function modulo various numbers has yielded some insights, 
                particularly regarding cycle structures.
              </p>
              
              <h3>Generalizations</h3>
              <p>
                Researchers have studied generalizations of the Collatz problem, such as replacing 3n+1 with 3n+k or 
                using different multipliers instead of 3. Many of these generalizations have been proven to have cycles 
                or divergent trajectories.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fascinating Properties</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3>Glide Patterns</h3>
              <p>
                Many numbers follow similar "glide patterns" in their trajectories. For example, numbers of the form 2<sup>k</sup>-1 
                often reach high values before eventually decreasing.
              </p>
              
              <h3>Maximum Values</h3>
              <p>
                The maximum value reached in a Collatz sequence can be surprisingly high. For example, starting with 27 leads to a 
                maximum value of 9,232 before eventually reaching 1.
              </p>
              
              <h3>Delay Records</h3>
              <p>
                Some numbers take an unusually long time to reach 1. These "delay records" are of particular interest to researchers.
                For example, the number 63,728,127 takes 949 steps to reach 1, and reaches a maximum value of over 10<sup>15</sup>.
              </p>
              
              <h3>Parity Sequences</h3>
              <p>
                The patterns of odd and even numbers in Collatz sequences (known as parity sequences) exhibit fascinating regularities 
                and self-similarities.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Computational Challenges</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3>Exponential Growth</h3>
              <p>
                One of the challenges in studying the Collatz conjecture is that some sequences can grow exponentially before 
                eventually decreasing. This makes both computational verification and theoretical analysis difficult.
              </p>
              
              <h3>Unpredictable Behavior</h3>
              <p>
                The behavior of the Collatz function appears to be highly unpredictable. Small changes in the starting number 
                can lead to dramatically different trajectories.
              </p>
              
              <h3>Computational Complexity</h3>
              <p>
                The computational complexity of determining whether a number eventually reaches 1 is unknown. Some researchers 
                have suggested connections to undecidability and the halting problem.
              </p>
              
              <h3>Visualization Challenges</h3>
              <p>
                Visualizing Collatz sequences presents unique challenges due to their erratic behavior and potentially large values. 
                Various techniques have been developed to represent these sequences graphically, including:
              </p>
              <ul>
                <li>Trajectory plots</li>
                <li>Tree diagrams</li>
                <li>Heatmaps of stopping times</li>
                <li>3D visualizations of sequence spaces</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Philosophical Implications</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                The Collatz conjecture raises interesting philosophical questions about mathematics:
              </p>
              
              <h3>Simplicity vs. Complexity</h3>
              <p>
                How can such a simple rule generate such complex behavior? This question touches on fundamental issues in complexity theory.
              </p>
              
              <h3>The Nature of Mathematical Truth</h3>
              <p>
                The conjecture has been verified for an enormous range of numbers, yet a proof remains elusive. This highlights the 
                distinction between empirical evidence and mathematical proof.
              </p>
              
              <h3>Limits of Mathematical Knowledge</h3>
              <p>
                Some mathematicians have suggested that the Collatz conjecture might be undecidable within standard mathematical frameworks, 
                similar to Gödel's incompleteness theorems.
              </p>
              
              <h3>The Role of Computation in Mathematics</h3>
              <p>
                The extensive computational verification of the Collatz conjecture raises questions about the role of computers in 
                mathematical discovery and proof.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExplanationComponent;
