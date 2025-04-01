"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function LinearSystemsApplications() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Real-World Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Economics</h3>
              <p className="mb-2">
                Linear systems are extensively used in economic models:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Supply and demand equilibrium</li>
                <li>Input-output models of production</li>
                <li>Resource allocation problems</li>
                <li>Price determination in multi-market scenarios</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Engineering</h3>
              <p className="mb-2">
                Engineers use linear systems in various contexts:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Circuit analysis (Kirchhoff's laws)</li>
                <li>Structural analysis in civil engineering</li>
                <li>Traffic flow modeling</li>
                <li>Control systems design</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Computer Graphics</h3>
              <p className="mb-2">
                Linear systems form the foundation of computer graphics:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>3D transformations and projections</li>
                <li>Camera positioning and view calculations</li>
                <li>Image processing algorithms</li>
                <li>Animation and physics simulations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Application Example: Mixture Problems</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            A coffee shop wants to create a blend using two types of coffee beans:
            premium beans costing $15 per pound and standard beans costing $8 per pound.
            The manager wants to create 20 pounds of a blend that will cost $10 per pound.
          </p>
          
          <div className="font-medium mb-2">Setting up the equations:</div>
          <div className="p-4 bg-muted rounded-md font-mono mb-4">
            Let x = pounds of premium beans<br/>
            Let y = pounds of standard beans<br/><br/>
            x + y = 20 (total weight)<br/>
            15x + 8y = 10(20) = 200 (total cost)
          </div>
          
          <div className="font-medium mb-2">Solving:</div>
          <div className="p-4 bg-muted rounded-md font-mono">
            From first equation: y = 20 - x<br/>
            Substitute into second: 15x + 8(20 - x) = 200<br/>
            15x + 160 - 8x = 200<br/>
            7x = 40<br/>
            x = 5.71 pounds of premium beans<br/>
            y = 14.29 pounds of standard beans
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 