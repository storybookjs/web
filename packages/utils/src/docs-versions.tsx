export interface DocsVersion {
  /** Used for visual display, e.g. the docs sidebar */
  label: string;
  /** Used for routes */
  id: string;
  branch?: string;
  commit?: string;
  tag?: string;
}

/**
 * ********************************************
 * ** List of versions of the documentation  **
 * ********************************************
 **/

/** Latest version must ALWAYS be first */
export const docsVersions: DocsVersion[] = [
  {
    label: 'Version Test 1',
    id: '8.0-test-1',
    branch: 'charles-transform-docs-1',
  },
  {
    label: 'Version Test 2',
    id: '8.0-test-2',
    branch: 'charles-transform-docs-1',
  },
  {
    label: 'Version Test 3',
    id: '8.0-test-3',
    branch: 'charles-transform-docs-1',
  },
];

export const latestVersion = docsVersions[0];
