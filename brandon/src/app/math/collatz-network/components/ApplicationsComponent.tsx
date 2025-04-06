import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GitBranch, Cpu, Network, Lock, Zap, BarChart } from 'lucide-react';

const ApplicationsComponent: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Applications of Collatz Network Analysis</CardTitle>
          <CardDescription>
            How the patterns and properties of the Collatz conjecture can be applied in various fields
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-100 dark:border-blue-900">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">Computational Complexity</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  The Collatz conjecture serves as a benchmark for testing computational methods and algorithms.
                  Its unpredictable behavior makes it useful for stress-testing systems and exploring the limits
                  of computational tractability.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-green-100 dark:border-green-900">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-lg">Network Theory</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  The network structure of Collatz sequences provides insights into directed graphs with special properties.
                  These patterns can inform network design, routing algorithms, and the study of complex systems.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-purple-100 dark:border-purple-900">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-purple-600" />
                  <CardTitle className="text-lg">Cryptography</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  The unpredictable nature of Collatz trajectories has potential applications in cryptographic systems.
                  The difficulty in predicting sequence behavior without direct calculation makes it a candidate for
                  one-way functions in certain security contexts.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-amber-100 dark:border-amber-900">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-amber-600" />
                  <CardTitle className="text-lg">Dynamical Systems</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  The Collatz process can be viewed as a discrete dynamical system. Studying its behavior helps
                  mathematicians understand chaotic systems, attractors, and the long-term evolution of iterative processes.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-red-100 dark:border-red-900">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-red-600" />
                  <CardTitle className="text-lg">Pseudorandom Generation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  The seemingly random behavior of Collatz sequences can be harnessed for generating pseudorandom numbers
                  in certain applications. The unpredictability of maximum values and sequence lengths provides a source
                  of entropy.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-cyan-100 dark:border-cyan-900">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-cyan-600" />
                  <CardTitle className="text-lg">Data Visualization</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  The Collatz network provides an excellent case study for visualizing complex mathematical relationships.
                  Techniques developed for representing these patterns can be applied to other complex datasets in science
                  and business.
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Educational Value</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            Beyond its direct applications, the Collatz conjecture serves as an excellent educational tool:
          </p>
          
          <ul>
            <li>It introduces students to mathematical conjectures and the concept of proof</li>
            <li>It demonstrates how simple rules can generate complex behavior</li>
            <li>It provides an accessible entry point to number theory and discrete mathematics</li>
            <li>It encourages computational thinking and algorithm design</li>
            <li>It illustrates the value of visualization in understanding mathematical concepts</li>
          </ul>
          
          <p>
            The interactive nature of this tool makes it particularly valuable for exploring these concepts
            in an engaging, hands-on manner.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationsComponent;
