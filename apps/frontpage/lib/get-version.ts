import { docsVersions } from "@/docs-versions";

export const getVersion = (slug: string[]) => {
  let activeVersion = docsVersions[0];
  const versionFromUrl =
    slug?.length >= 1 && docsVersions.find((version) => slug[0] === version.id);
  if (versionFromUrl) activeVersion = versionFromUrl;

  return activeVersion;
};
