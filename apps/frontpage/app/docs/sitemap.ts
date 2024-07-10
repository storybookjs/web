import { MetadataRoute } from 'next';
import { generateDocsTree } from '../../lib/get-tree';
import { docsVersions } from '@repo/utils';
import { getUrl } from '../../lib/get-url';
import { getFlatTreeSitemap } from '../../lib/get-flat-tree-sitemap';

export default function sitemap(): MetadataRoute.Sitemap {
  const latestVersion = docsVersions[0];

  // Generate docs tree for the latest version only
  const tree = generateDocsTree(`content/docs/${latestVersion.id}`);

  // We flatten the tree
  const flatTree = getFlatTreeSitemap(tree);

  // Generate URLs for each node - The getUrl function will remove the version from the URL
  const docsUrls = flatTree.map((node) => ({
    url: getUrl(`https://storybook.js.org${node.slug}`, latestVersion),
  }));

  return [
    { url: 'https://storybook.js.org' },
    { url: 'https://storybook.js.org/community' },
    ...docsUrls,
  ];
}
