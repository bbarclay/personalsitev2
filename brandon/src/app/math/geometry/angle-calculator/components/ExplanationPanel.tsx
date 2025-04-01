'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

const ExplanationPanel: React.FC = () => {
  return (
    <Card className="border-t-4 border-t-blue-500">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-4">Understanding Angles</h2>
        
        <Tabs defaultValue="basics">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="types">Types of Angles</TabsTrigger>
            <TabsTrigger value="formulas">Key Formulas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basics" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">What is an Angle?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                An angle is formed when two rays share the same endpoint (vertex). 
                The size of an angle is measured in degrees (°) or radians (rad) and 
                represents the amount of rotation between the two rays.
              </p>
              
              <div className="my-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 p-4">
                <h4 className="font-medium mb-2">Key Concepts:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Angles are measured in degrees (°) or radians (rad)</li>
                  <li>A full rotation is 360° or 2π radians</li>
                  <li>To convert: degrees = radians × (180/π)</li>
                  <li>To convert: radians = degrees × (π/180)</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Measuring Angles</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Angles can be measured with a protractor, or calculated using 
                trigonometric functions and coordinate geometry. In this calculator,
                we provide multiple methods to find angles based on different inputs.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="types" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4 border rounded-lg"
              >
                <h3 className="font-semibold mb-2">Acute Angle</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Measures less than 90° (or π/2 rad)
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="p-4 border rounded-lg"
              >
                <h3 className="font-semibold mb-2">Right Angle</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Measures exactly 90° (or π/2 rad)
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="p-4 border rounded-lg"
              >
                <h3 className="font-semibold mb-2">Obtuse Angle</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Measures more than 90° but less than 180° (between π/2 and π rad)
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="p-4 border rounded-lg"
              >
                <h3 className="font-semibold mb-2">Straight Angle</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Measures exactly 180° (or π rad)
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="p-4 border rounded-lg"
              >
                <h3 className="font-semibold mb-2">Reflex Angle</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Measures more than 180° but less than 360° (between π and 2π rad)
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="p-4 border rounded-lg"
              >
                <h3 className="font-semibold mb-2">Full Angle</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Measures exactly 360° (or 2π rad)
                </p>
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="formulas" className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 font-medium">
                Common Angle Formulas
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Using Coordinates</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    For points A(x₁, y₁), B(x₂, y₂), and C(x₃, y₃):
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                    <p className="font-mono text-sm">
                      θ = arccos[(AB² + BC² - AC²) / (2 × AB × BC)]
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      where AB, BC, and AC are the distances between points
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1">Using Vectors</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    For vectors v⃗ and w⃗:
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                    <p className="font-mono text-sm">
                      θ = arccos[(v⃗ · w⃗) / (|v⃗| × |w⃗|)]
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      where v⃗ · w⃗ is the dot product and |v⃗|, |w⃗| are vector magnitudes
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1">Using Slopes</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    For lines with slopes m₁ and m₂:
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                    <p className="font-mono text-sm">
                      θ = arctan|[(m₂ - m₁) / (1 + m₁m₂)]|
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      where m₁ = (y₂ - y₁)/(x₂ - x₁) and m₂ = (y₄ - y₃)/(x₄ - x₃)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExplanationPanel;
