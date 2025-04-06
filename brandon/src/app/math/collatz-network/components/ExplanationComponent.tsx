import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ExplanationComponent: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Understanding the Collatz Network</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            The Collatz Network is a visualization tool that explores the connections and patterns
            within the Collatz conjecture, one of the most famous unsolved problems in mathematics.
          </p>
          
          <h3>What is the Collatz Conjecture?</h3>
          <p>
            The Collatz conjecture states that if you take any positive integer and apply the following rules repeatedly:
          </p>
          <ul>
            <li>If the number is even, divide it by 2</li>
            <li>If the number is odd, multiply it by 3 and add 1</li>
          </ul>
          <p>
            You will eventually reach the number 1, after which the sequence will cycle through 4, 2, 1 indefinitely.
          </p>
          
          <h3>Network Visualization</h3>
          <p>
            The network visualization in this tool represents the connections between odd numbers in the Collatz sequences.
            Each node represents an odd number, and edges represent transitions between these numbers in the sequence.
          </p>
          <p>
            The size of each node indicates how frequently that number appears in the sequences we've analyzed,
            while the thickness of edges shows the strength of the connection between two numbers.
          </p>
          
          <h3>Binary Representation</h3>
          <p>
            One interesting aspect of the Collatz conjecture is how it behaves when viewed through binary representation.
            When we apply the 3n+1 operation to an odd number and then divide by powers of 2 until we reach another odd number,
            we can observe patterns in the binary digits.
          </p>
          
          <h3>Trajectory Analysis</h3>
          <p>
            The trajectory view shows the path of individual numbers through the Collatz sequence,
            highlighting the "hailstone" nature of these sequences - sometimes increasing dramatically
            before eventually falling back to 1.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Mathematical Significance</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            Despite its simple formulation, the Collatz conjecture has resisted proof for over 80 years.
            It has been verified for all starting numbers up to 2^68, but a general proof remains elusive.
          </p>
          
          <p>
            The conjecture touches on deep questions in number theory, dynamical systems, and computational complexity.
            Some key mathematical aspects include:
          </p>
          
          <ul>
            <li><strong>Stopping Time:</strong> The number of steps required to reach 1 from a given starting number.</li>
            <li><strong>Maximum Value:</strong> The highest number reached during a sequence.</li>
            <li><strong>Cycle Detection:</strong> Proving that no other cycles exist besides the 4-2-1 cycle.</li>
            <li><strong>Probabilistic Approaches:</strong> Showing that "most" numbers eventually decrease.</li>
          </ul>
          
          <p>
            The network visualization helps identify patterns that might not be obvious when looking at individual sequences,
            potentially offering new insights into this challenging mathematical problem.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExplanationComponent;
