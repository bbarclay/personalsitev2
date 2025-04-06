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
          Learn the fundamental concepts of fractions and how to work with them
        </p>
      </div>

      <Tabs defaultValue="basics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basics">Basics</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="equivalent">Equivalent Fractions</TabsTrigger>
          <TabsTrigger value="improper">Improper & Mixed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basics" className="p-4">
          <Card>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h2>What Are Fractions?</h2>
                <p>
                  A fraction represents a part of a whole or, more generally, any number of equal parts.
                  When we write a fraction, we are dividing one number by another:
                </p>
                
                <div className="flex justify-center my-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold">
                      <span className="block border-b-2 border-black dark:border-white pb-1 mb-1">Numerator</span>
                      <span className="block">Denominator</span>
                    </div>
                    <p className="mt-3">
                      <strong>Numerator:</strong> The number above the line, representing how many parts we have<br />
                      <strong>Denominator:</strong> The number below the line, representing how many equal parts the whole is divided into
                    </p>
                  </div>
                </div>
                
                <h3>Examples in Daily Life</h3>
                <ul>
                  <li>Half (1/2) of a pizza</li>
                  <li>A quarter (1/4) of an hour (15 minutes)</li>
                  <li>Three-quarters (3/4) of a cup of flour in a recipe</li>
                </ul>

                <h3>Types of Fractions</h3>
                <ul>
                  <li><strong>Proper Fractions:</strong> Numerator is less than denominator (e.g., 1/2, 3/4)</li>
                  <li><strong>Improper Fractions:</strong> Numerator is greater than or equal to denominator (e.g., 5/3, 7/4)</li>
                  <li><strong>Mixed Numbers:</strong> Whole number and proper fraction combined (e.g., 1½, 2¾)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="operations" className="p-4">
          <Card>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h2>Fraction Operations</h2>
                
                <h3>Addition and Subtraction</h3>
                <p>
                  To add or subtract fractions, they must have the same denominator (common denominator).
                  If the denominators are different, you need to find equivalent fractions with a common denominator.
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
                  <h4>Step-by-Step Process:</h4>
                  <ol>
                    <li>Find the least common multiple (LCM) of the denominators</li>
                    <li>Convert each fraction to an equivalent fraction with the common denominator</li>
                    <li>Add or subtract the numerators</li>
                    <li>Simplify the result if possible</li>
                  </ol>
                  <h4 className="mt-3">Example:</h4>
                  <p>
                    1/4 + 2/3<br />
                    LCM of 4 and 3 is 12<br />
                    1/4 = 3/12<br />
                    2/3 = 8/12<br />
                    3/12 + 8/12 = 11/12
                  </p>
                </div>
                
                <h3>Multiplication</h3>
                <p>
                  Multiplying fractions is straightforward: multiply the numerators together and multiply the denominators together.
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
                  <h4>Formula:</h4>
                  <p>
                    (a/b) × (c/d) = (a×c)/(b×d)
                  </p>
                  <h4 className="mt-3">Example:</h4>
                  <p>
                    2/3 × 3/4<br />
                    = (2×3)/(3×4)<br />
                    = 6/12<br />
                    = 1/2 (simplified)
                  </p>
                </div>
                
                <h3>Division</h3>
                <p>
                  To divide fractions, multiply by the reciprocal of the divisor (the second fraction).
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
                  <h4>Formula:</h4>
                  <p>
                    (a/b) ÷ (c/d) = (a/b) × (d/c) = (a×d)/(b×c)
                  </p>
                  <h4 className="mt-3">Example:</h4>
                  <p>
                    3/4 ÷ 2/5<br />
                    = (3/4) × (5/2)<br />
                    = (3×5)/(4×2)<br />
                    = 15/8<br />
                    = 1 7/8
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="equivalent" className="p-4">
          <Card>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h2>Equivalent Fractions</h2>
                
                <p>
                  Equivalent fractions are different fractions that represent the same value or proportion.
                  You can create equivalent fractions by multiplying or dividing both the numerator and denominator
                  by the same non-zero number.
                </p>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
                  <h4>Creating Equivalent Fractions:</h4>
                  <p>
                    a/b = (a×n)/(b×n) for any non-zero number n
                  </p>
                  <h4 className="mt-3">Example:</h4>
                  <p>
                    1/2 = (1×2)/(2×2) = 2/4<br />
                    1/2 = (1×3)/(2×3) = 3/6<br />
                    1/2 = (1×4)/(2×4) = 4/8
                  </p>
                </div>
                
                <h3>Examples of Equivalent Fractions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
                  <div className="text-center p-3 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                    <p className="text-2xl font-bold">1/2</p>
                  </div>
                  <div className="text-center p-3 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                    <p className="text-2xl font-bold">2/4</p>
                  </div>
                  <div className="text-center p-3 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                    <p className="text-2xl font-bold">3/6</p>
                  </div>
                  <div className="text-center p-3 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                    <p className="text-2xl font-bold">50/100</p>
                  </div>
                </div>
                
                <h3>Simplifying Fractions</h3>
                <p>
                  To simplify a fraction to its lowest terms, find the greatest common divisor (GCD) of the numerator and 
                  denominator, then divide both by this number.
                </p>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
                  <h4>Example:</h4>
                  <p>
                    Simplify 8/12<br />
                    GCD of 8 and 12 is 4<br />
                    8 ÷ 4 = 2<br />
                    12 ÷ 4 = 3<br />
                    So 8/12 = 2/3
                  </p>
                </div>
                
                <h3>Cross Multiplication</h3>
                <p>
                  Cross multiplication helps determine if two fractions are equivalent or to solve for an unknown in a proportion.
                </p>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
                  <h4>Formula:</h4>
                  <p>
                    If a/b = c/d, then a×d = b×c
                  </p>
                  <h4 className="mt-3">Example:</h4>
                  <p>
                    Are 3/4 and 9/12 equivalent?<br />
                    Cross multiply: 3×12 = 4×9<br />
                    36 = 36<br />
                    Yes, they are equivalent.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="improper" className="p-4">
          <Card>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h2>Improper Fractions and Mixed Numbers</h2>
                
                <h3>Improper Fractions</h3>
                <p>
                  An improper fraction is a fraction where the numerator is greater than or equal to the denominator.
                  Improper fractions represent values that are greater than or equal to 1.
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
                  <h4>Examples:</h4>
                  <ul>
                    <li>5/3 (five thirds)</li>
                    <li>7/4 (seven quarters)</li>
                    <li>11/5 (eleven fifths)</li>
                  </ul>
                </div>
                
                <h3>Mixed Numbers</h3>
                <p>
                  A mixed number consists of a whole number and a proper fraction. It's another way to represent
                  values greater than 1.
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
                  <h4>Examples:</h4>
                  <ul>
                    <li>1⅔ (one and two thirds)</li>
                    <li>3¾ (three and three quarters)</li>
                    <li>2⅕ (two and one fifth)</li>
                  </ul>
                </div>
                
                <h3>Converting Between Forms</h3>
                
                <h4>Improper Fraction to Mixed Number</h4>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
                  <ol>
                    <li>Divide the numerator by the denominator</li>
                    <li>The quotient becomes the whole number</li>
                    <li>The remainder becomes the numerator of the fraction</li>
                    <li>The denominator stays the same</li>
                  </ol>
                  <h5 className="mt-2">Example:</h5>
                  <p>
                    Convert 17/4 to a mixed number<br />
                    17 ÷ 4 = 4 with remainder 1<br />
                    So 17/4 = 4¼
                  </p>
                </div>
                
                <h4>Mixed Number to Improper Fraction</h4>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
                  <ol>
                    <li>Multiply the whole number by the denominator</li>
                    <li>Add the numerator to the product</li>
                    <li>Place this sum over the original denominator</li>
                  </ol>
                  <h5 className="mt-2">Example:</h5>
                  <p>
                    Convert 3⅔ to an improper fraction<br />
                    3 × 3 = 9<br />
                    9 + 2 = 11<br />
                    So 3⅔ = 11/3
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FractionExplanation;
