"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FractionExplanation = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Understanding Fractions
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          A comprehensive guide to fractions, their operations, and mathematical properties
        </p>
      </div>

      <Tabs defaultValue="basics" className="w-full">
        <TabsList className="grid w-full sm:grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="basics">Fraction Basics</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="comparisons">Comparisons</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Topics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basics" className="p-4">
          <Card>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h2>What Are Fractions?</h2>
                <p>
                  A fraction represents a part of a whole. It consists of two numbers: the <strong>numerator</strong> (top number) and 
                  the <strong>denominator</strong> (bottom number). The numerator represents how many parts we have, while the 
                  denominator represents the total number of equal parts that make up the whole.
                </p>
                
                <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="mb-2">Types of Fractions</h3>
                  <ul className="space-y-3">
                    <li>
                      <strong>Proper Fractions:</strong> The numerator is less than the denominator (e.g., 3/4, 2/5).
                      These fractions represent values less than 1.
                    </li>
                    <li>
                      <strong>Improper Fractions:</strong> The numerator is greater than or equal to the denominator (e.g., 5/3, 7/4).
                      These fractions represent values greater than or equal to 1.
                    </li>
                    <li>
                      <strong>Mixed Numbers:</strong> A whole number and a proper fraction combined (e.g., 2½, 3¾).
                      These can be converted to improper fractions and vice versa.
                    </li>
                    <li>
                      <strong>Equivalent Fractions:</strong> Different fractions that represent the same value (e.g., 1/2, 2/4, 3/6).
                    </li>
                  </ul>
                </div>
                
                <h3>Converting Between Forms</h3>
                
                <h4>Improper Fraction to Mixed Number</h4>
                <ol>
                  <li>Divide the numerator by the denominator</li>
                  <li>The quotient becomes the whole number part</li>
                  <li>The remainder becomes the new numerator over the same denominator</li>
                </ol>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-3">
                  <p className="font-medium">Example: Convert 11/4 to a mixed number</p>
                  <p>11 ÷ 4 = 2 with remainder 3</p>
                  <p>So 11/4 = 2¾</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="operations" className="p-4">
          <Card>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h2>Fraction Operations</h2>
                <p>
                  Understanding how to perform operations with fractions is essential for solving
                  mathematical problems and real-world applications.
                </p>
                
                <h3>Addition and Subtraction</h3>
                <p>
                  To add or subtract fractions:
                </p>
                <ol>
                  <li>Find a common denominator (usually the least common multiple)</li>
                  <li>Convert fractions to equivalent fractions with this common denominator</li>
                  <li>Add or subtract the numerators, keeping the denominator the same</li>
                  <li>Simplify the result if possible</li>
                </ol>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
                  <h4 className="font-medium">Example: 2/3 + 1/4</h4>
                  <p>
                    The LCM of 3 and 4 is 12<br />
                    2/3 = 8/12<br />
                    1/4 = 3/12<br />
                    8/12 + 3/12 = 11/12
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comparisons" className="p-4">
          <Card>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h2>Comparing Fractions</h2>
                <p>
                  To compare fractions, you need to find a common measure. There are several methods:
                </p>
                
                <h3>Method 1: Common Denominator</h3>
                <p>
                  Convert fractions to equivalent fractions with the same denominator, then compare the numerators.
                </p>
                
                <h3>Method 2: Cross Multiplication</h3>
                <p>
                  For fractions a/b and c/d:
                </p>
                <ul>
                  <li>If a×d &gt; b×c, then a/b &gt; c/d</li>
                  <li>If a×d &lt; b×c, then a/b &lt; c/d</li>
                  <li>If a×d = b×c, then a/b = c/d</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="p-4">
          <Card>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h2>Advanced Fraction Concepts</h2>
                <p>
                  Beyond basic operations, fractions are foundational to many advanced mathematical concepts.
                </p>
                
                <h3>Complex Fractions</h3>
                <p>
                  Complex fractions are fractions that contain fractions in the numerator, denominator, or both.
                  To simplify, divide the numerator by the denominator.
                </p>
                
                <h3>Continued Fractions</h3>
                <p>
                  Continued fractions represent numbers as a sum of integers and reciprocals. They're useful for
                  finding rational approximations of irrational numbers.
                </p>
                
                <h3>Applications in Calculus</h3>
                <p>
                  Fractions are essential in calculus for concepts like:
                </p>
                <ul>
                  <li>Partial fraction decomposition</li>
                  <li>Rational functions</li>
                  <li>Limit evaluations</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FractionExplanation;