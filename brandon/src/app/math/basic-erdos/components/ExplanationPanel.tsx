import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MathJax } from '@/components/ui/mathjax';

const ExplanationPanel = () => {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6">The Erdős Discrepancy Problem</h2>
        
        <p>
          The Erdős Discrepancy Problem is a fascinating mathematical problem in combinatorics and number theory, 
          posed by the legendary mathematician Paul Erdős in the 1930s. It remained unsolved for over 80 years 
          until it was finally proven in 2015 by Terence Tao.
        </p>
      </div>

      <Tabs defaultValue="problem">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="problem">The Problem</TabsTrigger>
          <TabsTrigger value="definition">Mathematical Definition</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="proof">The Proof</TabsTrigger>
        </TabsList>

        <TabsContent value="problem" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">The Basic Question</h3>
              <p className="mb-4">
                Imagine a sequence of +1s and -1s that goes on forever. Erdős asked: 
                Is it always possible to find a subsequence (taking every nth element) 
                where the sum of the elements becomes arbitrarily large?
              </p>
              <p className="mb-4">
                In simpler terms: No matter how cleverly you arrange +1s and -1s in a sequence, 
                can someone always find a way to select elements from your sequence that add up to a very large number?
              </p>
              <p>
                Erdős conjectured that the answer is yes - there is always some way to select elements 
                that will make the sum grow beyond any fixed bound.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="definition" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Mathematical Formulation</h3>
              <p className="mb-4">
                Let's define the problem more formally:
              </p>
              <div className="my-6">
                <MathJax>
                  {`
                  \\begin{align}
                  \\text{For any sequence } f: \\mathbb{N} \\to \\{-1, +1\\}, \\text{ and any constant } C, \\\\
                  \\text{there exist integers } d, n \\text{ such that } \\left| \\sum_{i=1}^{n} f(id) \\right| > C
                  \\end{align}
                  `}
                </MathJax>
              </div>
              <p className="mb-4">
                In other words, for any sequence of +1s and -1s, and any constant C, 
                there is always some arithmetic progression (taking every d-th element, 
                starting from the beginning) where the absolute value of the sum exceeds C.
              </p>
              <p>
                The "discrepancy" refers to how far the sum deviates from zero.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Illustrative Examples</h3>
              <p className="mb-4">
                Let's look at some simple examples:
              </p>
              <div className="mb-6">
                <h4 className="font-medium mb-2">Example 1: Alternating Sequence</h4>
                <p className="mb-2">Consider the sequence: +1, -1, +1, -1, +1, -1, ...</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>If we take every 2nd element (d=2), we get: -1, -1, -1, ... (all -1s)</li>
                  <li>The sum of n such elements is -n, which grows arbitrarily large in absolute value</li>
                </ul>
              </div>
              <div className="mb-6">
                <h4 className="font-medium mb-2">Example 2: Thue-Morse Sequence</h4>
                <p className="mb-2">
                  The Thue-Morse sequence (replacing 0s with +1s and 1s with -1s) was once thought to be a potential counterexample:
                  +1, -1, -1, +1, -1, +1, +1, -1, ...
                </p>
                <p>
                  However, it was proven that even this carefully constructed sequence has unbounded discrepancy.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="proof" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Terence Tao's Proof</h3>
              <p className="mb-4">
                In 2015, Fields Medalist Terence Tao finally proved the Erdős Discrepancy Conjecture.
              </p>
              <p className="mb-4">
                The proof is highly complex and uses techniques from:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Fourier analysis</li>
                <li>Analytic number theory</li>
                <li>Ergodic theory</li>
                <li>Multiplicative number theory</li>
              </ul>
              <p className="mb-4">
                Tao proved that for any sequence of +1s and -1s, the discrepancy is not just unbounded, 
                but grows at least logarithmically with the length of the sequence.
              </p>
              <p>
                Interestingly, the proof was developed with the help of the Polymath Project, 
                a collaborative mathematics project where mathematicians around the world worked together online.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExplanationPanel;
