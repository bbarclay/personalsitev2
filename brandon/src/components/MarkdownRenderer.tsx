import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

/**
 * A simple component that renders markdown content as HTML.
 * This is a basic implementation without full markdown support.
 */
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) return null;

  // Very simple markdown to HTML conversion
  let html = content
    // Headers
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold my-4">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold my-3">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold my-2">$1</h3>')
    .replace(/^#### (.+)$/gm, '<h4 class="text-lg font-bold my-2">$1</h4>')
    
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    
    // Italic
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    
    // Lists
    .replace(/^- (.+)$/gm, '<li class="ml-5">$1</li>')
    
    // Code
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">$1</code>')
    
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline">$1</a>')
    
    // Paragraphs - needs to be done with care not to mess up other elements
    .replace(/^(?!<h|<li|<ul|<ol|<p|<div|<code|<pre)(.+)$/gm, '<p class="my-2">$1</p>');

  // Add a container for lists (very simple approach)
  html = html.replace(/<li class="ml-5">/g, '<ul class="list-disc ml-5 my-2"><li class="ml-5">');
  html = html.replace(/<\/li>\n<li class="ml-5">/g, '</li><li class="ml-5">');
  html = html.replace(/<\/li>\n(?!<li)/g, '</li></ul>\n');

  return <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />;
};

export default MarkdownRenderer; 