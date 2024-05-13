import type { DocsVersion } from '@repo/utils';
import { docsVersions } from '@repo/utils';

export const getVersion = (
  slug: string[] | undefined,
): DocsVersion | undefined => {
  let activeVersion = docsVersions[0];
  const versionFromUrl =
    slug &&
    slug.length >= 1 &&
    docsVersions.find((version) => slug[0] === version.id);
  if (versionFromUrl) activeVersion = versionFromUrl;

  return activeVersion;
};
