"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Use dynamic import with SSR disabled to avoid hydration issues with game state
const PyramidBuildersClient = dynamic(
  () => import('./PyramidBuilders'),
  { ssr: false }
);

export function PyramidBuildersWrapper() {
  return <PyramidBuildersClient />;
} 