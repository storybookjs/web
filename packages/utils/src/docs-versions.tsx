export interface DocsVersion {
  /** For fetching content */
  id: string;
  /** For visual display, e.g. the docs sidebar */
  label: string;
  /** For routes */
  inSlug?: string;
  preRelease?: boolean;
  /** The rest of these define the method used to fetch content */
  branch?: string;
  commit?: string;
  tag?: string;
}

/**
 * All published versions of the docs.
 *
 * This list relies on some conventions:
 *
 * 1. The latest version must always be first.
 * 2. The `label` should be... TODO
 * 3. The `id` must be unique and should be of the form `major.minor` for clarity.
 * 4. For the pre-release version (there should only be one), `preRelease: true` must be set.
 * 5. The `inSlug` property (set to the major version) must be defined for:
 *    - Non-latest non-pre-release versions (e.g. 7.6, 6.5)
 *    - Pre-release major versions (e.g. 9.0, when in alpha/beta/RC)
 * 6. Either a `branch`, `commit`, or `tag` must be provided for fetching content.
 **/
export const docsVersions: DocsVersion[] = [
  {
    label: 'Version 9.0',
    id: '9.0',
    branch: 'main',
  },
  // {
  //   label: 'Version 9.1 (alpha)',
  //   id: '9.1',
  //   branch: 'next',
  //   preRelease: true,
  // },
  {
    label: 'Version 8',
    id: '8.6',
    inSlug: '8',
    branch: 'release-8-6',
  },
  {
    label: 'Version 7',
    id: '7.6',
    inSlug: '7',
    branch: 'release-7-6',
  },
];

export const latestVersion = docsVersions[0];
