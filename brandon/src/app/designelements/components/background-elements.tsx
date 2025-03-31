"use client";

import React from 'react';

export function BackgroundElements() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
      
      {/* Geometric shapes */}
      <div className="absolute -top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-blue-500/5 blur-[100px]"></div>
      <div className="absolute top-[60%] -left-[20%] w-[50%] h-[40%] rounded-full bg-blue-500/5 blur-[100px]"></div>
    </div>
  );
} 