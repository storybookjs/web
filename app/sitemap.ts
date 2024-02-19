import { docsVersions } from "@/docs-versions";
import { getReleases } from "@/lib/get-releases";
import { generateDocsTree } from "@/lib/get-tree";
import { MetadataRoute } from "next";

interface Sitemap {
  url: string;
  lastModified: Date;
  changeFrequency:
    | "weekly"
    | "monthly"
    | "always"
    | "hourly"
    | "daily"
    | "yearly"
    | "never"
    | undefined;
  priority: number;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const mainUrl = "https://storybook.js.org";
  const docs: Sitemap[] = [];
  const tree = generateDocsTree();
  const treeFirstVersion = generateDocsTree(
    `content/docs/${docsVersions[0].id}`
  );

  const ids = (data: TreeProps[], removeVersion: boolean) => {
    data.forEach((item) => {
      if ("slug" in item) {
        const newSlug = item.slug.replace("/docs/", "").split("/");
        if (removeVersion) newSlug.shift();
        docs.push({
          url: `${mainUrl}/docs/${newSlug.join("/")}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
      if (item.children) {
        ids(item.children, removeVersion);
      }
    });
  };

  ids(treeFirstVersion, true);
  ids(tree, false);

  const releases: Sitemap[] = getReleases().map((release) => ({
    url: `${mainUrl}/releases/${release}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: mainUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${mainUrl}/community`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...docs,
    ...releases,
  ];
}
