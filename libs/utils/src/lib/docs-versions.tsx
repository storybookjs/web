/**
 * ********************************************
 * ** List of versions of the documentation  **
 * ********************************************
 **/

/**
 * Produces an object type that must contain exactly one key (in union K) of type V
 * See: https://stackoverflow.com/a/60873215
 */
type ExactlyOneKeyWithType<K extends keyof any, V, KK extends keyof any = K> =
  { [P in K]: { [Q in P]: V } &
    { [Q in Exclude<KK, P>]?: never} extends infer O ?
    { [Q in keyof O]: O[Q] } : never
  }[K];

type BaseDocsVersion = {
  /** Used for visual display, e.g. the docs sidebar */
  label: string;
  /** Used for routes */
  id: string;
  /** Used in calculations */
  number: number;
  isPreRelease?: boolean;
}

/** Used to fetch data. Only one type may be provided. */
type DocsVersionReferenceKind = 'branch' | 'commit' | 'tag';

export type DocsVersion = BaseDocsVersion & ExactlyOneKeyWithType<DocsVersionReferenceKind, string>;

/** Latest version must ALWAYS be first */
export const docsVersions: DocsVersion[] = [
  {
    label: "Version Test 1",
    id: "8.0",
    number: 8,
    branch: "charles-docs-new-structure-2",
  },
  {
    label: "Version Test 2",
    id: "8.0-test-2",
    number: 8.1,
    isPreRelease: true,
    branch: "charles-docs-new-structure",
  },
  // {
  //   label: "Verion 8.0 - Alpha 7",
  //   id: "8.0.0-alpha.7",
  //   tag: "v8.0.0-alpha.7",
  // },
  // {
  //   label: "Version 7.6.7",
  //   id: "7.6.7",
  //   tag: "v7.6.7",
  // },
  // {
  //   label: "Version 6.5.16",
  //   id: "6.5.16",
  //   tag: "v6.5.16",
  // },
];

export const latestVersion = docsVersions[0];