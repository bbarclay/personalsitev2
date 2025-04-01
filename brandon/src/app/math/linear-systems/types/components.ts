import { ComponentType } from 'react';

export type DynamicImportFn<P = any> = Promise<{
  default: ComponentType<P>;
}>;

export type DynamicImportResult<P = any> = () => DynamicImportFn<P>;

export interface DynamicOptions {
  loading?: ComponentType;
  ssr?: boolean;
}
