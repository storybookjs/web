import { docsVersions as docsVersionsConstant } from './docs-versions';

export type DocsVersion = {
  /** Used for visual display, e.g. the docs sidebar */
  label: string;
  /** Used for routes */
  id: string;
  branch?: string;
  commit?: string;
  tag?: string;
};

export const docsVersions: DocsVersion[] = docsVersionsConstant;

export const latestVersion = docsVersions[0];
