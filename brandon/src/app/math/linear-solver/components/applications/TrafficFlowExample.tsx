import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const TrafficFlowExample: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-4">Real-World Example: Traffic Flow</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Consider a network of roads with intersections. At each intersection, the number of cars entering must equal the number leaving (conservation of flow).
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              For the simple network shown, we can write:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>At intersection A: x₁ + x₂ = x₃ + 50</li>
              <li>At intersection B: x₃ + 30 = x₄ + x₅</li>
              <li>At intersection C: x₄ + 20 = x₆ + 60</li>
              <li>At intersection D: x₅ + 40 = 70 + x₇</li>
              <li>At intersection E: x₆ + x₇ = x₁ + x₂</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              This forms a system of linear equations that can be solved to find the traffic flow on each road segment.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <pre className="text-sm">
                {`
    50 cars/hr
        ↓
        A → x₃ → B
       ↗ ↑        ↘
  x₁  |  |         | x₅
      |  |         |
      |  x₂        ↓
      |            D
      |            ↑
      |            | 40
      |            |
      E ← x₆ ← C ← x₄
      ↑        ↑
      x₇       | 20
      |        |
      70 cars/hr
                `}
              </pre>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficFlowExample; 