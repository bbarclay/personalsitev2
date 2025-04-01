"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function LinearSystemsLearning() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>What are Linear Systems?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            A system of linear equations is a collection of two or more linear equations with the same variables. 
            These systems arise naturally in many real-world problems in science, engineering, economics, and more.
          </p>
          <p className="mb-4">
            For a system of two equations with two unknowns (x and y), we can write:
          </p>
          <div className="p-4 bg-muted rounded-md font-mono mb-4">
            a₁x + b₁y = c₁<br/>
            a₂x + b₂y = c₂
          </div>
          <p>
            The solution to this system is the point (x, y) that satisfies both equations simultaneously.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Methods for Solving Linear Systems</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Elimination Method</h3>
              <p>
                The elimination method (also called Gaussian elimination) involves combining equations to eliminate one variable, 
                then solving for the remaining variable, and finally back-substituting to find the eliminated variable.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Substitution Method</h3>
              <p>
                The substitution method involves solving one equation for one variable (like y in terms of x), 
                then substituting that expression into the other equation to get an equation with just one variable.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Cramer's Rule</h3>
              <p>
                Cramer's rule uses determinants to find the solutions to a system of linear equations. 
                It's a direct formula for the solution, though it becomes computationally intensive for larger systems.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 