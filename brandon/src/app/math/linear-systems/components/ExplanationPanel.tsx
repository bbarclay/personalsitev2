'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LinearSystemAnimations } from './LinearSystemAnimations';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ExplanationPanel() {
  const [method, setMethod] = useState<'elimination' | 'substitution' | 'matrices'>('elimination');
  const [showDemo, setShowDemo] = useState(false);
  
  // Example systems for demo
  const sampleSystem = {
    elimination: {
      matrix: [
        [2, 1],
        [1, -1]
      ],
      constants: [5, 1],
      solution: { x: 2, y: 1 }
    },
    substitution: {
      matrix: [
        [3, 2],
        [1, -2]
      ],
      constants: [7, -3],
      solution: { x: 1, y: 2 }
    },
    matrices: {
      matrix: [
        [4, 1],
        [2, 3]
      ],
      constants: [7, 8],
      solution: { x: 1, y: 2 }
    }
  };

  const currentSystem = sampleSystem[method];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Linear Systems Explained
          </CardTitle>
          <CardDescription>
            Understanding systems of linear equations and their solutions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Introduction */}
            <div className="prose dark:prose-invert max-w-none">
              <h3>What are Linear Systems?</h3>
              <p>
                A system of linear equations is a collection of two or more linear equations involving the same set of variables. 
                A linear equation in <em>n</em> variables can be written in the form:
              </p>
              
              <div className="bg-slate-900 p-4 rounded-lg text-center font-mono text-blue-300">
                a₁x₁ + a₂x₂ + ... + aₙxₙ = b
              </div>
              
              <p>
                Linear systems have wide-ranging applications in physics, engineering, computer science, economics, and many other fields.
                They can be used to model relationships between variables and solve real-world problems.
              </p>
            </div>
            
            {/* Visual representation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div>
                <h3 className="text-lg font-medium mb-3">Geometric Interpretation</h3>
                <div className="h-64 mb-2 relative rounded-lg overflow-hidden">
                  <div className="absolute inset-0 dark:bg-slate-800 bg-slate-100">
                    <LinearSystemAnimations.WaveFunction equation="2x + y = 5" color="#3b82f6" />
                  </div>
                  <div className="absolute inset-0">
                    <LinearSystemAnimations.WaveFunction equation="x - y = 1" color="#a855f7" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  In 2D, each linear equation represents a line. The solution is the point where all lines intersect.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Matrix Representation</h3>
                <div className="flex items-center justify-center p-4 bg-slate-900/50 rounded-lg h-64">
                  <LinearSystemAnimations.AnimatedMatrix 
                    matrix={[
                      [2, 1],
                      [1, -1]
                    ]}
                    constants={[5, 1]}
                    isAnimating={true}
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-2">
                  Linear systems can be represented compactly in matrix form as Ax = b.
                </p>
              </div>
            </div>
            
            {/* Solution methods */}
            <div className="mt-8">
              <Tabs defaultValue={method} onValueChange={(value) => setMethod(value as 'elimination' | 'substitution' | 'matrices')}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Solution Methods</h3>
                  <TabsList>
                    <TabsTrigger value="elimination">Elimination</TabsTrigger>
                    <TabsTrigger value="substitution">Substitution</TabsTrigger>
                    <TabsTrigger value="matrices">Matrices</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="elimination" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="md:col-span-3 space-y-4">
                      <p>
                        <strong>Gaussian Elimination</strong> transforms the system of equations into an equivalent system with an upper triangular matrix. This is done through three elementary row operations:
                      </p>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Swap two rows</li>
                        <li>Multiply a row by a non-zero constant</li>
                        <li>Add a multiple of one row to another</li>
                      </ul>
                      <p>
                        After achieving an upper triangular form (row echelon form), we use <strong>back-substitution</strong> to find the values of the variables, starting from the bottom row.
                      </p>
                      <Button className="mt-4" onClick={() => setShowDemo(!showDemo)}>
                        {showDemo ? "Hide Example" : "Show Example"}
                      </Button>
                    </div>
                    <div className="md:col-span-2 flex items-center justify-center">
                      <div className="bg-slate-900/50 p-4 rounded-lg w-full h-full flex items-center justify-center">
                        <motion.div 
                          className="p-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <LinearSystemAnimations.IntersectionPoint point={currentSystem.solution} />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  
                  {showDemo && (
                    <div className="mt-6 bg-slate-900/30 p-4 rounded-lg">
                      <h4 className="text-lg font-medium mb-3">Example: Solving by Elimination</h4>
                      <div className="space-y-4">
                        <div className="font-mono bg-slate-900/50 p-3 rounded">
                          <div>2x + y = 5</div>
                          <div>x - y = 1</div>
                        </div>
                        
                        <div className="space-y-2">
                          <p><strong>Step 1:</strong> Multiply the second equation by 2 to make the x-coefficients match</p>
                          <div className="font-mono bg-slate-900/50 p-3 rounded">
                            <div>2x + y = 5</div>
                            <div className="text-green-400">2x - 2y = 2</div>
                          </div>
                          
                          <p><strong>Step 2:</strong> Subtract the second equation from the first to eliminate x</p>
                          <div className="font-mono bg-slate-900/50 p-3 rounded">
                            <div className="text-blue-400">3y = 3</div>
                            <div>2x - 2y = 2</div>
                          </div>
                          
                          <p><strong>Step 3:</strong> Solve for y</p>
                          <div className="font-mono bg-slate-900/50 p-3 rounded">
                            <div className="text-blue-400">y = 1</div>
                          </div>
                          
                          <p><strong>Step 4:</strong> Back-substitute to find x</p>
                          <div className="font-mono bg-slate-900/50 p-3 rounded">
                            <div>x - 1 = 1</div>
                            <div className="text-blue-400">x = 2</div>
                          </div>
                          
                          <p><strong>Solution:</strong> x = 2, y = 1</p>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="substitution" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="md:col-span-3 space-y-4">
                      <p>
                        <strong>Substitution</strong> involves solving one equation for one variable and then substituting that expression into the other equations.
                      </p>
                      <p>This method works particularly well for systems with just a few variables and when some equations are already solved for one variable.</p>
                      <ol className="list-decimal list-inside space-y-2">
                        <li>Solve one equation for one variable</li>
                        <li>Substitute this expression into the remaining equations</li>
                        <li>Solve the resulting system with fewer variables</li>
                        <li>Back-substitute to find all variable values</li>
                      </ol>
                      <Button className="mt-4" onClick={() => setShowDemo(!showDemo)}>
                        {showDemo ? "Hide Example" : "Show Example"}
                      </Button>
                    </div>
                    <div className="md:col-span-2 flex items-center justify-center">
                      <div className="bg-slate-900/50 p-4 rounded-lg w-full h-full flex items-center justify-center">
                        <motion.div 
                          className="p-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <LinearSystemAnimations.IntersectionPoint point={currentSystem.solution} />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  
                  {showDemo && (
                    <div className="mt-6 bg-slate-900/30 p-4 rounded-lg">
                      <h4 className="text-lg font-medium mb-3">Example: Solving by Substitution</h4>
                      <div className="space-y-4">
                        <div className="font-mono bg-slate-900/50 p-3 rounded">
                          <div>3x + 2y = 7</div>
                          <div>x - 2y = -3</div>
                        </div>
                        
                        <div className="space-y-2">
                          <p><strong>Step 1:</strong> Solve the second equation for x</p>
                          <div className="font-mono bg-slate-900/50 p-3 rounded">
                            <div className="text-green-400">x = -3 + 2y</div>
                          </div>
                          
                          <p><strong>Step 2:</strong> Substitute into the first equation</p>
                          <div className="font-mono bg-slate-900/50 p-3 rounded">
                            <div>3(-3 + 2y) + 2y = 7</div>
                            <div className="text-blue-400">-9 + 6y + 2y = 7</div>
                            <div className="text-blue-400">-9 + 8y = 7</div>
                            <div className="text-blue-400">8y = 16</div>
                            <div className="text-blue-400">y = 2</div>
                          </div>
                          
                          <p><strong>Step 3:</strong> Substitute y back to find x</p>
                          <div className="font-mono bg-slate-900/50 p-3 rounded">
                            <div>x = -3 + 2(2)</div>
                            <div>x = -3 + 4</div>
                            <div className="text-blue-400">x = 1</div>
                          </div>
                          
                          <p><strong>Solution:</strong> x = 1, y = 2</p>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="matrices" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="md:col-span-3 space-y-4">
                      <p>
                        <strong>Matrix methods</strong> offer an elegant approach to solving linear systems. The most common matrix methods include:
                      </p>
                      <ul className="list-disc list-inside space-y-2">
                        <li><strong>Cramer's Rule:</strong> Uses determinants to find solutions</li>
                        <li><strong>Matrix Inverse:</strong> If A is invertible, then x = A⁻¹b</li>
                        <li><strong>LU Decomposition:</strong> Factors A into lower and upper triangular matrices</li>
                      </ul>
                      <p>
                        Matrix methods are particularly useful for computational approaches and for systems with many variables.
                      </p>
                      <Button className="mt-4" onClick={() => setShowDemo(!showDemo)}>
                        {showDemo ? "Hide Example" : "Show Example"}
                      </Button>
                    </div>
                    <div className="md:col-span-2 flex items-center justify-center">
                      <div className="bg-slate-900/50 p-4 rounded-lg w-full h-full flex items-center justify-center">
                        <motion.div 
                          className="p-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <LinearSystemAnimations.IntersectionPoint point={currentSystem.solution} />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  
                  {showDemo && (
                    <div className="mt-6 bg-slate-900/30 p-4 rounded-lg">
                      <h4 className="text-lg font-medium mb-3">Example: Solving with Cramer's Rule</h4>
                      <div className="space-y-4">
                        <div className="font-mono bg-slate-900/50 p-3 rounded">
                          <div>4x + y = 7</div>
                          <div>2x + 3y = 8</div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <p><strong>Step 1:</strong> Write in matrix form Ax = b</p>
                            <div className="flex items-center justify-center p-3">
                              <LinearSystemAnimations.AnimatedMatrix 
                                matrix={currentSystem.matrix}
                                constants={currentSystem.constants}
                                isAnimating={false}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <p><strong>Step 2:</strong> Calculate determinants</p>
                            <div className="font-mono bg-slate-900/50 p-3 rounded">
                              <div className="text-blue-400">det(A) = 4×3 - 1×2 = 12 - 2 = 10</div>
                              
                              <div className="mt-2">For x, replace first column with constants:</div>
                              <div className="text-green-400">det(A_x) = 7×3 - 8×1 = 21 - 8 = 13</div>
                              
                              <div className="mt-2">For y, replace second column with constants:</div>
                              <div className="text-green-400">det(A_y) = 4×8 - 7×2 = 32 - 14 = 18</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="font-mono bg-slate-900/50 p-3 rounded">
                          <div className="text-blue-400">x = det(A_x)/det(A) = 10/10 = 1</div>
                          <div className="text-blue-400">y = det(A_y)/det(A) = 20/10 = 2</div>
                        </div>
                        
                        <p><strong>Solution:</strong> x = 1, y = 2</p>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Types of solutions */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Types of Solutions</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="overflow-hidden">
                  <div className="h-36 relative bg-gradient-to-br from-blue-600 to-purple-600">
                    <div className="absolute inset-0 p-4">
                      <LinearSystemAnimations.WaveFunction equation="2x + y = 5" color="#ffffff" />
                      <LinearSystemAnimations.WaveFunction equation="x - y = 1" color="#ffffff" />
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <h4 className="font-semibold text-lg">Unique Solution</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Lines intersect at exactly one point. The system has a single unique solution.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden">
                  <div className="h-36 relative bg-gradient-to-br from-red-600 to-orange-600">
                    <div className="absolute inset-0 p-4">
                      <LinearSystemAnimations.WaveFunction equation="2x + y = 5" color="#ffffff" />
                      <LinearSystemAnimations.WaveFunction equation="2x + y = 8" color="#ffffff" />
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <h4 className="font-semibold text-lg">No Solution</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Lines are parallel and never intersect. The system is inconsistent.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden">
                  <div className="h-36 relative bg-gradient-to-br from-green-600 to-teal-600">
                    <div className="absolute inset-0 p-4">
                      <LinearSystemAnimations.WaveFunction equation="2x + y = 5" color="#ffffff" />
                      <LinearSystemAnimations.WaveFunction equation="4x + 2y = 10" color="#ffffff" />
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <h4 className="font-semibold text-lg">Infinite Solutions</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Lines are identical and overlap. The system has infinitely many solutions.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Real-world applications */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Real-World Applications</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/30 p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Economics</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Linear equations model relationships between economic variables such as supply and demand, price elasticity, and market equilibrium.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-900/30 p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Computer Graphics</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        3D transformations, camera positioning, ray tracing, and collision detection all rely on solving systems of linear equations.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-900/30 p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Engineering</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Structural analysis, circuit design, and fluid dynamics all involve setting up and solving linear systems to model complex physical phenomena.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-900/30 p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Machine Learning</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Linear regression, neural networks, and many optimization algorithms require solving large systems of linear equations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}