import { docsVersions } from '@utils';

export const slugHasVersion = (slug: string[]): boolean => {
  return (
    slug?.length >= 1 && docsVersions.some((version) => slug[0] === version.id)
  );
};
