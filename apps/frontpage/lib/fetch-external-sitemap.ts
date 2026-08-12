import Sitemapper, { type SitemapperErrorData } from 'sitemapper';

interface ExtendedSitemapperErrorData extends SitemapperErrorData {
  message: string;
}

export function normalizeSitemapUrl(site: string): string {
  const url = new URL(site);
  const pathname = url.pathname.replace(/\/{2,}/g, '/');
  const isTrailingSlashSite = ['/showcase', '/blog', '/tutorials'].some(
    (path) => pathname.startsWith(path),
  );

  url.pathname = isTrailingSlashSite
    ? pathname.endsWith('/')
      ? pathname
      : `${pathname}/`
    : pathname.replace(/\/$/, '');

  return url.toString();
}

export async function fetchExternalSitemap(
  url: string,
): Promise<{ sites: { url: string }[]; error: string | null }> {
  const blogXml = new Sitemapper({ url, timeout: 15000 });
  const { sites, errors } = await blogXml.fetch();
  const fetchErrors = errors as ExtendedSitemapperErrorData[];

  if (fetchErrors.length > 0) {
    return {
      sites: [],
      error: fetchErrors[0].message || 'Error fetching sitemap',
    };
  }

  return {
    sites: sites.map((site) => ({ url: normalizeSitemapUrl(site) })),
    error: null,
  };
}
