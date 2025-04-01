import React from 'react';

interface ToolPageTemplateProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const ToolPageTemplate: React.FC<ToolPageTemplateProps> = ({
  title,
  description,
  children
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="mt-6">
        {children}
      </div>
    </div>
  );
}; 