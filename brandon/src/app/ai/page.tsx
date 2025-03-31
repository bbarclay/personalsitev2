import React from 'react';
import { getAITools } from './utils/getAITools';
import { ToolsPage } from '../components/shared/ToolsPage';
import { AIPageMeta } from './types';

// Server component for AI tools page
export default async function AIPage() {
  // Get tools on the server
  const aiTools: AIPageMeta[] = await getAITools();

  return (
    <ToolsPage
      initialTools={aiTools}
      title="AI Tools & Resources"
      description="Explore our collection of AI tools, resources, and interactive demonstrations"
      type="ai"
    />
  );
}
