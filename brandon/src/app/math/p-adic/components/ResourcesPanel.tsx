import React from 'react';
import Link from 'next/link';

export default function ResourcesPanel() {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2>Learning Resources</h2>
        <h3>Related Tools</h3>
        <ul>
          <li><Link href="/math/polynomial">Polynomial Calculator</Link></li>
          <li><Link href="/math/riemann">Riemann Zeta Calculator</Link></li>
        </ul>
        <h3>External Resources</h3>
        <ul>
          <li><a href="https://en.wikipedia.org/wiki/P-adic_number" target="_blank" rel="noopener noreferrer">Wikipedia: P-adic Numbers</a></li>
          <li><a href="https://www.math.ucla.edu/~tao/resource/general/115a.3.02f/" target="_blank" rel="noopener noreferrer">UCLA Notes on P-adic Numbers</a></li>
        </ul>
      </div>
    </div>
  );
}
