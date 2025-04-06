import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ApplicationsPanel = () => {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6">Applications of the Erdős Discrepancy Problem</h2>
        
        <p>
          While the Erdős Discrepancy Problem might seem like a purely theoretical question in number theory,
          it has surprising connections to various fields in mathematics and computer science.
        </p>
      </div>

      <Tabs defaultValue="cs">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="cs">Computer Science</TabsTrigger>
          <TabsTrigger value="crypto">Cryptography</TabsTrigger>
          <TabsTrigger value="physics">Physics</TabsTrigger>
          <TabsTrigger value="math">Mathematics</TabsTrigger>
        </TabsList>

        <TabsContent value="cs" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Computational Complexity</h3>
              <p className="mb-4">
                The Erdős Discrepancy Problem has implications for computational complexity theory:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">
                  <strong>Pseudorandom Number Generation:</strong> The problem helps us understand the limitations of certain types of pseudorandom number generators.
                </li>
                <li className="mb-2">
                  <strong>Computational Bounds:</strong> It establishes fundamental limits on what certain computational models can achieve.
                </li>
                <li>
                  <strong>SAT Solving:</strong> The problem was approached using SAT solvers, which helped verify small cases before the general proof was found.
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Algorithmic Discrepancy Theory</h3>
              <p className="mb-4">
                Discrepancy theory in computer science deals with how evenly data can be distributed:
              </p>
              <ul className="list-disc pl-6">
                <li className="mb-2">
                  <strong>Load Balancing:</strong> Insights from discrepancy theory help design better algorithms for distributing computational loads across servers.
                </li>
                <li className="mb-2">
                  <strong>Data Structures:</strong> It influences the design of data structures that need to maintain balance.
                </li>
                <li>
                  <strong>Approximation Algorithms:</strong> Discrepancy minimization is used in developing approximation algorithms for NP-hard problems.
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crypto" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Cryptographic Sequences</h3>
              <p className="mb-4">
                The Erdős Discrepancy Problem has implications for cryptography:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">
                  <strong>Sequence Design:</strong> When designing cryptographic sequences, we need to understand their structural properties. The Erdős result shows that no binary sequence can avoid having large discrepancy.
                </li>
                <li className="mb-2">
                  <strong>Stream Ciphers:</strong> Some stream ciphers rely on sequences with good statistical properties. The Erdős result places fundamental limits on what can be achieved with binary sequences.
                </li>
                <li>
                  <strong>Randomness Extraction:</strong> Understanding discrepancy helps in designing better randomness extractors, which are crucial in cryptography.
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="physics" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Quantum Mechanics</h3>
              <p className="mb-4">
                There are interesting connections to quantum physics:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">
                  <strong>Quantum Randomness:</strong> The inherent limitations in creating perfectly balanced sequences relate to questions about quantum randomness.
                </li>
                <li className="mb-2">
                  <strong>Quantum Computing:</strong> Discrepancy theory has applications in quantum algorithm design and quantum error correction.
                </li>
                <li>
                  <strong>Quantum Walks:</strong> The behavior of quantum walks on graphs can be analyzed using techniques related to discrepancy theory.
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Statistical Physics</h3>
              <p className="mb-4">
                The problem has connections to statistical physics:
              </p>
              <ul className="list-disc pl-6">
                <li className="mb-2">
                  <strong>Spin Systems:</strong> If we interpret +1 and -1 as spin states, the discrepancy problem relates to the behavior of one-dimensional spin systems.
                </li>
                <li className="mb-2">
                  <strong>Phase Transitions:</strong> The growth of discrepancy can be viewed as a kind of phase transition in certain physical models.
                </li>
                <li>
                  <strong>Self-Organized Criticality:</strong> The inevitable emergence of large discrepancies has parallels with self-organized critical phenomena in physics.
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="math" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Number Theory</h3>
              <p className="mb-4">
                The problem has deep connections to number theory:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">
                  <strong>Multiplicative Functions:</strong> Tao's proof involved extending the problem to multiplicative functions, connecting it to deep results in analytic number theory.
                </li>
                <li className="mb-2">
                  <strong>Character Sums:</strong> The problem relates to bounds on character sums, which are important in number theory.
                </li>
                <li>
                  <strong>Diophantine Approximation:</strong> There are connections to how well real numbers can be approximated by rationals.
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Combinatorics and Ramsey Theory</h3>
              <p className="mb-4">
                The problem fits into the broader context of combinatorics:
              </p>
              <ul className="list-disc pl-6">
                <li className="mb-2">
                  <strong>Ramsey Theory:</strong> The Erdős Discrepancy Problem is a manifestation of the principle that complete disorder is impossible - a central theme in Ramsey Theory.
                </li>
                <li className="mb-2">
                  <strong>Van der Waerden's Theorem:</strong> It relates to this theorem, which states that in any coloring of the integers, there are arbitrarily long monochromatic arithmetic progressions.
                </li>
                <li>
                  <strong>Szemerédi's Theorem:</strong> There are connections to this deep result about arithmetic progressions in dense sets of integers.
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApplicationsPanel;
