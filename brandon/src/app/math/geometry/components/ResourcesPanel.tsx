import React from 'react';
import Link from 'next/link';

export default function ResourcesPanel() {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2>Learning Resources</h2>
        <h3>Related Tools</h3>
        <ul>
          <li><Link href="/math/trigonometry">Trigonometry Calculator</Link></li>
          <li><Link href="/math/vectors">Vector Calculator</Link></li>
        </ul>
        <h3>External Resources</h3>
        <ul>
          <li><a href="https://en.wikipedia.org/wiki/Geometry" target="_blank" rel="noopener noreferrer">Wikipedia: Geometry</a></li>
          <li><a href="https://www.khanacademy.org/math/geometry" target="_blank" rel="noopener noreferrer">Khan Academy: Geometry</a></li>
        </ul>
      </div>
    </div>
  );
} 