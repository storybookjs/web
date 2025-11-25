import type { RedirectData } from './types';

/*
 * TODO: Make this more dynamic. Both HISTORICAL_VERSIONS and
 *       OLDEST_DOCUMENTED_VERSION should not be hardcoded.
 *       Instead, extend docs-versions to include non-documented
 *       versions, and then generate from there.
 * 
 *       Consider a less-drastic destination.
 */

const HISTORICAL_VERSIONS = [
  '8.6',
  '8.5',
  '8.4',
  '8.3',
  '8.2',
  '8.1',
  '8.0',
  '7.6',
  '7.5',
  '7.4',
  '7.3',
  '7.2',
  '7.1',
  '7.0',
  '6.5',
  '6.4',
  '6.3',
  '6.2',
  '6.1',
  '6.0',
];

const OLDEST_DOCUMENTED_VERSION = 7;

export const docsVersionsRedirects = [
  ...HISTORICAL_VERSIONS
    .filter((v) => Number(v.split('.')[0]) < OLDEST_DOCUMENTED_VERSION)
    .reduce<RedirectData[]>((acc, v) => {
      acc.push({
        source: `/docs/${v}`,
        destination: `/docs/`,
        permanent: false,
      });
      acc.push({
        source: `/docs/${v}/:path*`,
        destination: `/docs/`,
        permanent: false,
      });
      return acc;
    }, []),
];
