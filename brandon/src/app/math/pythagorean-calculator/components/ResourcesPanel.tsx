import React from 'react';
import Link from 'next/link';

export default function ResourcesPanel() {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2>Learning Resources</h2>
        <h3>Related Tools</h3>
        <ul>
          <li><Link href="/math/geometry">Geometry Calculator</Link></li>
          <li><Link href="/math/trigonometry">Trigonometry Calculator</Link></li>
        </ul>
        <h3>External Resources</h3>
        <ul>
          <li><a href="https://en.wikipedia.org/wiki/Pythagorean_theorem" target="_blank" rel="noopener noreferrer">Wikipedia: Pythagorean Theorem</a></li>
          <li><a href="https://www.khanacademy.org/math/geometry/hs-geo-trig/hs-geo-pyth-theorem/v/the-pythagorean-theorem" target="_blank" rel="noopener noreferrer">Khan Academy: Pythagorean Theorem</a></li>
        </ul>
      </div>
    </div>
  );
} 