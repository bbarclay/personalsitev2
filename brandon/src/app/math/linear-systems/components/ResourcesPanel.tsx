'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

export default function ResourcesPanel() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Learning Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <h3>Recommended Reading</h3>
            <ul>
              <li>Linear Algebra and Its Applications by Gilbert Strang</li>
              <li>Elementary Linear Algebra by Howard Anton</li>
            </ul>

            <h3>Online Resources</h3>
            <ul>
              <li>
                <Link href="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:systems-of-equations" 
                      className="text-blue-600 dark:text-blue-400 hover:underline">
                  Khan Academy: Systems of Equations
                </Link>
              </li>
              <li>
                <Link href="https://www.mathsisfun.com/algebra/systems-linear-equations.html"
                      className="text-blue-600 dark:text-blue-400 hover:underline">
                  Math is Fun: Linear Systems
                </Link>
              </li>
            </ul>

            <h3>Practice Problems</h3>
            <ul>
              <li>Basic systems with two variables</li>
              <li>Advanced systems with three variables</li>
              <li>Word problems and applications</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
