import React from 'react';
import Link from 'next/link';

export default function ResourcesPanel() {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2>Learning Resources</h2>
        <h3>Related Tools</h3>
        <ul>
          <li><Link href="/math/derivatives">Derivative Calculator</Link></li>
          <li><Link href="/math/integrals">Integral Calculator</Link></li>
        </ul>
        <h3>External Resources</h3>
        <ul>
          <li><a href="https://en.wikipedia.org/wiki/Calculus" target="_blank" rel="noopener noreferrer">Wikipedia: Calculus</a></li>
          <li><a href="https://www.khanacademy.org/math/calculus-1" target="_blank" rel="noopener noreferrer">Khan Academy: Calculus</a></li>
        </ul>
      </div>
    </div>
  );
} 