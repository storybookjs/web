import type { Metadata } from 'next';

/**
 * Open Graph metadata for a catalog page. A page's `openGraph` replaces the
 * root layout's, so this also sets `siteName`.
 *
 * @param path - Route within the catalog, without the `/addons` base path
 */
export function openGraph(path = ''): Metadata['openGraph'] {
  // Relative to the root layout's metadataBase
  return { url: `/addons${path}`, siteName: 'Storybook' };
}
