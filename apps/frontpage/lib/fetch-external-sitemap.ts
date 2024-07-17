import Sitemapper, { type SitemapperErrorData } from 'sitemapper';

interface ExtendedSitemapperErrorData extends SitemapperErrorData {
  message: string;
}

export async function fetchExternalSitemap(
  url: string,
): Promise<{ sites: { url: string }[]; error: string | null }> {
  const blogXml = new Sitemapper({ url, timeout: 15000 });
  const { sites, errors } = await blogXml.fetch();
  const fetchErrors = errors as ExtendedSitemapperErrorData[];

  if (fetchErrors?.length > 0) {
    return {
      sites: [],
      error: fetchErrors[0].message || 'Error fetching sitemap',
    };
  }

  return {
    sites: sites.map((site) => {
      const newUrl = site.replace(/\/$/, '');
      return { url: newUrl };
    }),
    error: null,
  };
}
