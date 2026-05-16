import type { DocsVersion } from './docs-versions';
import { docsVersions } from './docs-versions';

export const getVersion = (slug: string[] | undefined): DocsVersion => {
  let activeVersion = docsVersions[0];
  const versionFromUrl =
    slug &&
    slug.length >= 1 &&
    // Exact version match, e.g. `8.2`
    (docsVersions.find((version) => slug[0] === version.id) ??
      // Major version match, e.g. `8` for `8.1`
      docsVersions.find((version) => slug[0] === version.id.split('.')[0]));
  if (versionFromUrl) activeVersion = versionFromUrl;

  return activeVersion;
};
