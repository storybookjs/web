import { docsVersions } from "@/docs-versions";

export const getVersion = (slug: string[]) => {
  // Find if the URL has a version that matches the docsVersions
  const versionFromUrl = docsVersions.find((version) => {
    if (!slug) return undefined;
    return slug[0] === version.id;
  });

  // If the version is not found, use the latest version
  const activeVersion = versionFromUrl || docsVersions[0];

  console.log("activeVersion", activeVersion);

  return activeVersion;
};
