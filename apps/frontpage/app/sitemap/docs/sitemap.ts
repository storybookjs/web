import { docsVersions } from '@utils';
import { getSitemapFromTree } from '../../../lib/get-sitemap-from-tree';

export default function sitemap() {
  return getSitemapFromTree().filter(
    (item) => !docsVersions.some(({ id }) => item.url.includes(id))
  );
}
