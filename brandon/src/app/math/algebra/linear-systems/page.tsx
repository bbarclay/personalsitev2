"use client";

import React from 'react';
import { ToolPageLayout, createDynamicPanelComponent } from '@/components/layouts/ToolPageLayout';
import { loadToolMeta } from '@/utils/meta-loader';
import { LinearSystemsSolver } from './components/solver/LinearSystemsSolver';
import { LinearSystemsLearning } from './components/learn/LinearSystemsLearning';
import { LinearSystemsApplications } from './components/applications/LinearSystemsApplications';
import { LinearSystemsResources } from './components/resources/LinearSystemsResources';
import metaJson from './meta.json';

const meta = loadToolMeta(metaJson);

const LinearSystemsContent = createDynamicPanelComponent({
  solver: LinearSystemsSolver,
  explanation: LinearSystemsLearning,
  applications: LinearSystemsApplications,
  resources: LinearSystemsResources
});

export default function LinearSystemsPage() {
  return (
    <ToolPageLayout meta={meta}>
      <LinearSystemsContent />
    </ToolPageLayout>
  );
}
