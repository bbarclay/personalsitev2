"use client";

import React from 'react';
import { Card } from '@/components/ui/card';

export default function ApplicationsPanel() {
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Applications of the Pythagorean Theorem</h2>

      <Card className="p-4">
        <h3 className="text-xl font-semibold mb-3">Construction and Architecture</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Ensuring walls are perpendicular to floors</li>
          <li>Calculating diagonal distances in room layouts</li>
          <li>Designing roof trusses and support structures</li>
          <li>Measuring and cutting materials at right angles</li>
        </ul>
      </Card>

      <Card className="p-4">
        <h3 className="text-xl font-semibold mb-3">Navigation and Surveying</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Calculating distances between two points on a map</li>
          <li>Determining the height of buildings or structures</li>
          <li>Planning flight paths and distances</li>
          <li>Measuring property boundaries</li>
        </ul>
      </Card>

      <Card className="p-4">
        <h3 className="text-xl font-semibold mb-3">Engineering and Design</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Designing mechanical parts and structures</li>
          <li>Calculating forces in structural engineering</li>
          <li>Planning electrical and plumbing layouts</li>
          <li>Creating computer graphics and animations</li>
        </ul>
      </Card>

      <Card className="p-4">
        <h3 className="text-xl font-semibold mb-3">Sports and Recreation</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Calculating field dimensions in sports</li>
          <li>Designing skateboard ramps and obstacles</li>
          <li>Planning hiking trails and routes</li>
          <li>Setting up game courts and playing fields</li>
        </ul>
      </Card>
    </div>
  );
} 