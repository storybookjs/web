import { docsVersions } from "@/docs-versions";

export const getVersion = (slug: string[]) => {
  // Find if the URL has a version that matches the docsVersions
  const versionFromUrl = docsVersions.find((version) => {
    if (!slug) return undefined;
    return slug[0] === version.id;
  });

  return versionFromUrl || docsVersions[0];
};

export const getNullableVersion = (slug: string[]) => {
  // Find if the URL has a version that matches the docsVersions
  const versionFromUrl = docsVersions.find((version) => {
    if (!slug) return undefined;
    return slug[0] === version.id;
  });

  return versionFromUrl || null;
};
