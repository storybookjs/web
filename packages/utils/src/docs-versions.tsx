export interface DocsVersion {
  /** Used for visual display, e.g. the docs sidebar */
  label: string;
  /** Used for routes */
  id: string;
  branch?: string;
  commit?: string;
  tag?: string;
  preRelease?: boolean;
}

/**
 * ********************************************
 * ** List of versions of the documentation  **
 * ********************************************
 **/

/** Latest version must ALWAYS be first */
export const docsVersions: DocsVersion[] = [
  {
    label: '8.1 (latest)',
    id: '8.1',
    branch: 'charles-transform-docs-1',
  },
  {
    label: '8.2 (beta)',
    id: '8.2',
    branch: 'charles-transform-docs-1',
    preRelease: true,
  },
  {
    label: '7.6',
    id: '7.6',
    branch: 'charles-transform-docs-1',
  },
  {
    label: '6.5',
    id: '6.5',
    branch: 'charles-transform-docs-1',
  },
];

export const latestVersion = docsVersions[0];
