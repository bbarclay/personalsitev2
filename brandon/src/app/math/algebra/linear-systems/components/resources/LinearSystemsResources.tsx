"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

export function LinearSystemsResources() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Learning Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Video Tutorials</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://www.youtube.com/watch?v=9FtpqP8JSY0" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline"
                  >
                    Khan Academy: Solving Systems of Equations
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.youtube.com/watch?v=sYxA28SYTAQ" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline"
                  >
                    3Blue1Brown: Essence of Linear Algebra
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.youtube.com/watch?v=QQPz3eXXgQI" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline"
                  >
                    The Organic Chemistry Tutor: Elimination Method
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Interactive Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://www.desmos.com/calculator" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline"
                  >
                    Desmos Graphing Calculator
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.geogebra.org/graphing" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline"
                  >
                    GeoGebra Graphing Calculator
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.wolframalpha.com/examples/mathematics/algebra/systems-of-equations" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline"
                  >
                    Wolfram Alpha: Systems of Equations
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Books and Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="border-b pb-3">
              <div className="font-medium">Linear Algebra and Its Applications</div>
              <div className="text-sm text-muted-foreground">by Gilbert Strang</div>
              <p className="mt-1 text-sm">
                A comprehensive textbook covering linear systems, matrices, and their applications
                with clear explanations and examples.
              </p>
            </li>
            
            <li className="border-b pb-3">
              <div className="font-medium">Introduction to Linear Algebra with Applications</div>
              <div className="text-sm text-muted-foreground">by Jim DeFranza and Daniel Gagliardi</div>
              <p className="mt-1 text-sm">
                An accessible introduction to the subject with numerous examples and applications.
              </p>
            </li>
            
            <li>
              <div className="font-medium">A First Course in Linear Algebra</div>
              <div className="text-sm text-muted-foreground">by Robert A. Beezer (Free Online)</div>
              <p className="mt-1 text-sm">
                A free, open-source textbook covering linear systems, matrices, and vector spaces.
              </p>
              <a 
                href="http://linear.ups.edu/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:underline text-sm mt-1"
              >
                View Online
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
} 