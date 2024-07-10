import { DocsVersion, latestVersion } from '@repo/utils';

export const getUrl = (slug: string, activeVersion?: DocsVersion) => {
  if (!activeVersion) return slug;
  if (activeVersion.id === latestVersion.id) {
    return slug.replace(`/docs/${activeVersion.id}`, '/docs');
  } else if (activeVersion.id !== latestVersion.id && activeVersion.inSlug) {
    return slug.replace(
      `/docs/${activeVersion.id}`,
      `/docs/${activeVersion.inSlug}`,
    );
  }

  return slug;
};
