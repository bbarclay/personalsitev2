import { loadToolMeta } from './meta-loader';
import { ToolMeta, ToolComponentProps } from '../types/tool-types';
import { Metadata } from 'next';
import React from 'react';

/**
 * Creates a Next.js metadata object from tool meta
 */
export function createPageMetadata(toolMeta: ToolMeta): Metadata {
  return {
    title: `${toolMeta.title} | ${toolMeta.type === 'math' ? 'Math' : 'AI'} Tools`,
    description: toolMeta.description,
    keywords: toolMeta.keywords,
  };
}

/**
 * Creates a standardized page layout from meta.json and a component
 */
export function createToolPage<T extends ToolComponentProps = ToolComponentProps>(
  metaJson: any,
  Component: React.ComponentType<T>,
  props?: Omit<T, 'activeTab'>
) {
  // Process metadata with defaults
  const meta = loadToolMeta(metaJson);
  
  // Return the Page component and metadata
  function Page({ params }: { params: { activeTab?: string } }) {
    return <Component activeTab={params.activeTab} {...props as any} />;
  }
  
  return {
    meta,
    metadata: createPageMetadata(meta),
    default: Page
  };
}

/**
 * Creates a layout component for a tool page
 */
export function createToolLayout(metaJson: any) {
  const meta = loadToolMeta(metaJson);
  
  return {
    metadata: createPageMetadata(meta)
  };
} 