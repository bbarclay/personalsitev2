import React from 'react';
import Link from 'next/link';

export default function ResourcesPanel() {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2>Learning Resources</h2>
        <h3>Related Tools</h3>
        <ul>
          <li><Link href="/math/p-adic">P-adic Calculator</Link></li>
          <li><Link href="/math/polynomial">Polynomial Calculator</Link></li>
        </ul>
        <h3>External Resources</h3>
        <ul>
          <li><a href="https://en.wikipedia.org/wiki/Riemann_zeta_function" target="_blank" rel="noopener noreferrer">Wikipedia: Riemann Zeta Function</a></li>
          <li><a href="https://www.claymath.org/millennium-problems/riemann-hypothesis" target="_blank" rel="noopener noreferrer">Clay Mathematics Institute: Riemann Hypothesis</a></li>
        </ul>
      </div>
    </div>
  );
}
