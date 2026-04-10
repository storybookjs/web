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
    label: 'Version 10.3',
    id: '10.3',
    branch: 'main',
  },
  // {
  //   label: 'Version 10.4 (alpha)',
  //   id: '10.4',
  //   inSlug: '10.4',
  //   branch: 'next',
  //   preRelease: true,
  // },
  {
    label: 'Version 9',
    id: '9.1',
    inSlug: '9',
    branch: 'release-9-1',
  },
  {
    label: 'Version 8',
    id: '8.6',
    inSlug: '8',
    branch: 'release-8-6',
  },
];

export const latestVersion = docsVersions[0];

/**
 * This needs updated alongside `docsVersions`, whenever a new major version is released.
 * It defines all of the versions that we've ever published, which we maintain redirects for (e.g. /docs/7.1/writing-stories → /docs/writing-stories).
 */
export const historicalVersions = [
  '6.0',
  '6.1',
  '6.2',
  '6.3',
  '6.4',
  '6.5',
  '7.0',
  '7.1',
  '7.2',
  '7.3',
  '7.4',
  '7.5',
  '7.6',
  ...docsVersions.filter((v) => !v.preRelease).reduce<string[]>((acc, v) => {
    // Fill in each latest major version with all minor versions (e.g. 8.6 -> 8.0, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6)
    const [major, minor] = v.id.split('.');
    for (let i = 0; i <= Number(minor); i++) {
      acc.push(`${major}.${String(i)}`);
    }
    return acc;
  }, []),
];