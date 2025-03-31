import React, { ReactNode } from 'react';
import { Metadata } from 'next';

// Define the metadata that will be used for SEO and page titles
export const metadata: Metadata = {
  title: 'Math Tools',
  description: 'Interactive mathematical tools and calculators',
  // You can add more metadata properties here as needed
  // keywords: meta.keywords?.join(', '),
  // openGraph: { ... }
};

// This layout is used only for metadata - it doesn't add any visual elements
export default function ToolLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}