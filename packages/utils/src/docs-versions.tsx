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
    branch: 'charles-docs-new-structure',
  },
  {
    label: 'Version Test 2',
    id: '8.0-test-2',
    branch: 'charles-docs-new-structure',
  },
];

export const latestVersion = docsVersions[0];
