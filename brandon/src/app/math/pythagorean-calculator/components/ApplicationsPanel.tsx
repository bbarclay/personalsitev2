"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MathJax } from '@/components/ui/mathjax';

export default function ApplicationsPanel() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6">Applications of the Pythagorean Theorem</h2>

        <p>
          The Pythagorean theorem is not just a mathematical curiosity—it's a fundamental principle with
          countless practical applications across many fields. From ancient times to modern technology,
          this theorem continues to be an essential tool for solving real-world problems.
        </p>
      </div>

      <Tabs defaultValue="construction">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="construction">Construction</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
          <TabsTrigger value="everyday">Everyday Life</TabsTrigger>
        </TabsList>

        <TabsContent value="construction" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Architecture and Construction</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-lg font-medium mb-3">Creating Right Angles</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  One of the most fundamental applications in construction is establishing perfect right angles.
                  Builders use the 3-4-5 triangle method (or scaled versions like 6-8-10) to ensure corners are square:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Measure 3 units along one wall from a corner</li>
                  <li>Measure 4 units along the perpendicular wall</li>
                  <li>If the diagonal between these points is exactly 5 units, the corner is square</li>
                </ol>
              </div>

              <div className="flex justify-center items-center">
                <div className="relative w-64 h-64">
                  <div className="absolute w-full h-full border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    {/* Construction diagram */}
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <line x1="10" y1="90" x2="90" y2="90" stroke="#666" strokeWidth="2" />
                      <line x1="10" y1="90" x2="10" y2="10" stroke="#666" strokeWidth="2" />
                      <line x1="10" y1="10" x2="90" y2="90" stroke="#f00" strokeDasharray="5,2" strokeWidth="2" />

                      {/* Measurements */}
                      <text x="50" y="95" textAnchor="middle" className="text-sm">3 units</text>
                      <text x="5" y="50" textAnchor="middle" className="text-sm" transform="rotate(270, 5, 50)">4 units</text>
                      <text x="45" y="45" textAnchor="middle" className="text-sm" fill="#f00">5 units</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="text-lg font-medium mb-3">Structural Engineering Applications</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
              <li>
                <strong>Roof Design:</strong> Calculating rafter lengths, roof pitch, and truss dimensions
              </li>
              <li>
                <strong>Stair Construction:</strong> Determining the relationship between rise, run, and stringer length
              </li>
              <li>
                <strong>Bridge Engineering:</strong> Calculating load distributions and support requirements
              </li>
              <li>
                <strong>Diagonal Bracing:</strong> Determining the length of diagonal supports for stability
              </li>
            </ul>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-medium mb-2">Example: Calculating Rafter Length</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                For a roof with a horizontal run of 12 feet and a rise of 5 feet, the rafter length would be:
              </p>
              <div className="text-center">
                <MathJax>
                  {`\text{Rafter Length} = \sqrt{12^2 + 5^2} = \sqrt{144 + 25} = \sqrt{169} = 13 \text{ feet}`}
                </MathJax>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="navigation" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Navigation and Surveying</h3>

            <h4 className="text-lg font-medium mb-3">Distance Calculations</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The Pythagorean theorem is fundamental to navigation and distance calculations in two and three dimensions:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h5 className="font-medium mb-2">GPS and Mapping</h5>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Calculating distances between coordinates on maps</li>
                  <li>Determining the shortest path between two points</li>
                  <li>Converting between coordinate systems</li>
                  <li>Triangulating positions from multiple reference points</li>
                </ul>
              </div>

              <div>
                <h5 className="font-medium mb-2">Aviation and Maritime Navigation</h5>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Calculating flight paths and distances</li>
                  <li>Determining heading corrections for crosswinds</li>
                  <li>Computing ship routes accounting for currents</li>
                  <li>Measuring distances across water bodies</li>
                </ul>
              </div>
            </div>

            <h4 className="text-lg font-medium mb-3">Surveying Applications</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Land surveyors rely heavily on the Pythagorean theorem for accurate measurements:
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
              <li>
                <strong>Indirect Measurements:</strong> Calculating distances that cannot be measured directly
              </li>
              <li>
                <strong>Height Determination:</strong> Finding the height of structures using distance and angle measurements
              </li>
              <li>
                <strong>Property Boundaries:</strong> Establishing accurate property lines and corners
              </li>
              <li>
                <strong>Topographic Mapping:</strong> Creating 3D terrain models from elevation data
              </li>
            </ul>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-medium mb-2">Example: Finding the Height of a Building</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                If you stand 30 meters from a building and measure the angle to the top as 40°, you can find the height:
              </p>
              <div className="text-center mb-3">
                <MathJax>
                  {`\text{Height} = 30 \times \tan(40°) \approx 25.2 \text{ meters}`}
                </MathJax>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                This uses trigonometry, which is built on the foundation of the Pythagorean theorem.
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="technology" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Technology and Engineering</h3>

            <h4 className="text-lg font-medium mb-3">Computer Graphics and Game Development</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The Pythagorean theorem is essential for creating realistic 3D environments and animations:
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
              <li>
                <strong>Distance Calculations:</strong> Computing distances between objects in 3D space
              </li>
              <li>
                <strong>Collision Detection:</strong> Determining when objects intersect or collide
              </li>
              <li>
                <strong>Camera Positioning:</strong> Calculating viewing angles and perspectives
              </li>
              <li>
                <strong>Ray Tracing:</strong> Simulating light paths for realistic rendering
              </li>
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-lg font-medium mb-3">Signal Processing</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  The theorem plays a crucial role in signal processing and telecommunications:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Analyzing frequency components of signals</li>
                  <li>Filtering noise from communications</li>
                  <li>Modulating and demodulating signals</li>
                  <li>Computing signal power and energy</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-3">Electrical Engineering</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Applications in electrical circuits and systems:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Calculating impedance in AC circuits</li>
                  <li>Vector analysis of electrical quantities</li>
                  <li>Power factor correction</li>
                  <li>Antenna design and signal propagation</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-medium mb-2">Example: Distance in 3D Space</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                In a 3D video game, the distance between a player at coordinates (3,4,5) and an object at (6,8,10) is:
              </p>
              <div className="text-center">
                <MathJax>
                  {`\text{Distance} = \sqrt{(6-3)^2 + (8-4)^2 + (10-5)^2} = \sqrt{9 + 16 + 25} = \sqrt{50} \approx 7.07 \text{ units}`}
                </MathJax>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="everyday" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Everyday Life Applications</h3>

            <h4 className="text-lg font-medium mb-3">Home and DIY Projects</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Hanging Pictures:</strong> Ensuring frames are level and properly spaced
                  </li>
                  <li>
                    <strong>Furniture Placement:</strong> Determining if furniture will fit diagonally through doorways
                  </li>
                  <li>
                    <strong>TV Mounting:</strong> Calculating optimal viewing distances and angles
                  </li>
                  <li>
                    <strong>Garden Design:</strong> Creating symmetrical layouts and right-angled beds
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Example: Will the Furniture Fit?</h5>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  If a doorway is 36 inches wide and 80 inches tall, the maximum diagonal dimension of furniture that can fit through is:
                </p>
                <div className="text-center">
                  <MathJax>
                    {`\text{Max Diagonal} = \sqrt{36^2 + 80^2} = \sqrt{1296 + 6400} = \sqrt{7696} \approx 87.7 \text{ inches}`}
                  </MathJax>
                </div>
              </div>
            </div>

            <h4 className="text-lg font-medium mb-3">Sports and Recreation</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
              <li>
                <strong>Field Layouts:</strong> Marking out sports fields with accurate dimensions and angles
              </li>
              <li>
                <strong>Golf:</strong> Calculating distances to the green accounting for elevation changes
              </li>
              <li>
                <strong>Hiking:</strong> Estimating true distances when accounting for elevation gain
              </li>
              <li>
                <strong>Billiards/Pool:</strong> Calculating angles for bank shots and rebounds
              </li>
              <li>
                <strong>Sailing:</strong> Determining the most efficient course when tacking against the wind
              </li>
            </ul>

            <h4 className="text-lg font-medium mb-3">Photography and Art</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Composition:</strong> Using the rule of thirds and golden ratio for balanced images
              </li>
              <li>
                <strong>Perspective Drawing:</strong> Creating accurate vanishing points and sight lines
              </li>
              <li>
                <strong>Camera Settings:</strong> Understanding the relationship between aperture, shutter speed, and ISO
              </li>
              <li>
                <strong>Framing:</strong> Calculating proportional dimensions for custom frames
              </li>
            </ul>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}