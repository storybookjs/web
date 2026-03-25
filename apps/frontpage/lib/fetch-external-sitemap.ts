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
      /* 
       * TODO: Standardize trailing slash behavior across all sites
       * 
       * Does the site have a trailing slash?
       * /addons - no
       * /docs - no (both work, but canonical is without)
       * /recipes - no (both work, but canonical is without)
       * /blog - yes
       * /showcase - yes
       * /tutorials - yes
       */
      if (
        !site.includes('/showcase') &&
        !site.includes('/blog') &&
        !site.includes('/tutorials')
      ) {
        const newUrl = site.replace(/\/$/, '');
        return { url: newUrl };
      }

      return { url: site };
    }),
    error: null,
  };
}
