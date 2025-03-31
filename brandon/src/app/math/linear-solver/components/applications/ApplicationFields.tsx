import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const ApplicationFields: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-4">Applications of Linear Systems</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Linear systems of equations are fundamental in various fields of science, engineering, 
          economics, and more. Here are some of the key applications:
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-lg mb-3">Engineering</h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Circuit analysis using Kirchhoff's laws</li>
              <li>Structural analysis in civil engineering</li>
              <li>Control systems design and analysis</li>
              <li>Signal processing and filter design</li>
              <li>Stress and strain analysis in materials</li>
            </ul>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-lg mb-3">Computer Science</h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Computer graphics (transformations, rendering)</li>
              <li>Machine learning (regression, neural networks)</li>
              <li>Image compression and reconstruction</li>
              <li>Network flow optimization</li>
              <li>Cryptography and error-correcting codes</li>
            </ul>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-lg mb-3">Physics</h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Mechanics (force balancing equations)</li>
              <li>Quantum mechanics (solving Schrödinger's equation)</li>
              <li>Electromagnetism (solving Maxwell's equations)</li>
              <li>Fluid dynamics simulations</li>
              <li>Thermodynamics and heat transfer</li>
            </ul>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-lg mb-3">Economics</h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Input-output models</li>
              <li>Portfolio optimization</li>
              <li>Market equilibrium analysis</li>
              <li>Econometric modeling</li>
              <li>Resource allocation problems</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationFields; 