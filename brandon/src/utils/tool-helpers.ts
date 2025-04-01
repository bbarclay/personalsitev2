import { ToolMeta } from '../types/tool-types';
import { DEFAULT_MATH_TOOL_META, DEFAULT_AI_TOOL_META, createToolMeta } from '../config/tool-config';

export function createMathToolPage(
  meta: Partial<ToolMeta>,
  component: React.ComponentType<any>
) {
  const fullMeta = createToolMeta(DEFAULT_MATH_TOOL_META, meta);
  
  return {
    meta: fullMeta,
    component
  };
}

export function createAIToolPage(
  meta: Partial<ToolMeta>,
  component: React.ComponentType<any>
) {
  const fullMeta = createToolMeta(DEFAULT_AI_TOOL_META, meta);
  
  return {
    meta: fullMeta,
    component
  };
}

export function createCustomToolPage(
  baseMeta: Partial<ToolMeta>,
  meta: Partial<ToolMeta>,
  component: React.ComponentType<any>
) {
  const fullMeta = createToolMeta(baseMeta, meta);
  
  return {
    meta: fullMeta,
    component
  };
} 