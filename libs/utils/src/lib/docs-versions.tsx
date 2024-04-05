// eslint-disable-next-line @nx/enforce-module-boundaries
import { docsVersions as docsVersionsConstant } from '../../../../docs-versions';

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


export const docsVersions: DocsVersion[] = docsVersionsConstant;

export const latestVersion = docsVersions[0];
