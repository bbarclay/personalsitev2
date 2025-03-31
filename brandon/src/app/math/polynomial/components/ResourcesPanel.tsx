'use client';

import React from 'react';
import Link from 'next/link';

export default function ResourcesPanel() {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2>Learning Resources</h2>
        <h3>Related Tools</h3>
        <ul>
          <li><Link href="/math/algebra">Algebra Calculator</Link></li>
          <li><Link href="/math/calculus">Calculus Calculator</Link></li>
        </ul>
        <h3>External Resources</h3>
        <ul>
          <li><a href="https://en.wikipedia.org/wiki/Polynomial" target="_blank" rel="noopener noreferrer">Wikipedia: Polynomial</a></li>
          <li><a href="https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:poly" target="_blank" rel="noopener noreferrer">Khan Academy: Polynomials</a></li>
        </ul>
      </div>
    </div>
  );
}
