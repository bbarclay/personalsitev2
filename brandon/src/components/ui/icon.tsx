'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { IconType } from '@/types/tool-types';
import * as LucideIcons from 'lucide-react';

interface IconProps {
  icon: IconType;
  className?: string;
}

export function Icon({ icon, className = '' }: IconProps) {
  // If icon is a string, check if it's an emoji or a Lucide icon name
  if (typeof icon === 'string') {
    // Check if the string contains emoji by looking for non-ASCII characters
    const isEmoji = /[^\u0000-\u007F]/.test(icon);
    
    if (isEmoji) {
      return <span className={className}>{icon}</span>;
    }

    // Convert icon name to PascalCase and append 'Icon' if needed
    const iconName = icon
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('') + (icon.endsWith('Icon') ? '' : 'Icon');

    // Try to get the Lucide icon component
    const LucideIcon = (LucideIcons as any)[iconName];
    if (LucideIcon) {
      return <LucideIcon className={className} />;
    }

    // Fallback to warning icon if Lucide icon not found
    const AlertCircle = LucideIcons.AlertCircle;
    console.warn(`Icon "${icon}" not found in Lucide icons`);
    return <AlertCircle className={className} />;
  }

  // If icon is a component configuration
  const { component, props = {} } = icon;

  // If it's a Lucide icon name in component format
  const LucideIcon = (LucideIcons as any)[component];
  if (LucideIcon) {
    return <LucideIcon className={className} {...props} />;
  }

  // Otherwise, dynamically import from our custom icons
  const IconComponent = dynamic(
    () => import(`@/components/icons/${component}`).catch(() => {
      console.error(`Failed to load icon component: ${component}`);
      return () => <LucideIcons.AlertCircle className={className} />;
    })
  );

  return <IconComponent className={className} {...props} />;
} 