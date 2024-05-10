import { docsVersions } from '@repo/utils';

export const slugHasVersion = (slug: string[] | undefined): boolean => {
  if (slug === undefined) return false;

  return (
    slug.length >= 1 && docsVersions.some((version) => slug[0] === version.id)
  );
};
