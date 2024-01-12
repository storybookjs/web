import { DocsVersion, docsVersions } from "@/docs-versions";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

function getMetadata(filePath: string): any {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const {
    data: { navTitle, title, ...data },
  } = matter(fileContents);
  return {
    title: navTitle || title,
    ...data,
  };
}

export const generateDocsTree = ({
  pathToFiles,
  docsRoot = pathToFiles,
  activeVersion,
}: {
  pathToFiles: string;
  docsRoot?: string;
  activeVersion: DocsVersion | null;
}) => {
  const fileExists = fs.existsSync(pathToFiles);

  if (!fileExists) return null;

  const files = fs.readdirSync(pathToFiles);
  const tree: TreeProps[] = [];

  files.forEach((file) => {
    const filePath = path.join(pathToFiles, file);

    // Slug
    let slug = filePath;
    if (activeVersion)
      slug = filePath
        .replace(
          `content/docs/${activeVersion.id}/docs`,
          `/docs/${activeVersion.id}`
        )
        .replace(/\.mdx?$|\.md$/, "");
    if (activeVersion === null)
      slug = filePath
        .replace(`content/docs/${docsVersions[0].id}/docs`, `/docs`)
        .replace(/\.mdx?$|\.md$/, "");

    const isDirectory = fs.lstatSync(filePath).isDirectory();

    if (isDirectory) {
      const childItems = generateDocsTree({
        pathToFiles: filePath,
        docsRoot,
        activeVersion,
      });

      if (childItems) {
        const indexFile = childItems.find((item) => item.name === "index.mdx");
        const children = childItems
          .sort((a, b) =>
            a?.sidebar?.order && b?.sidebar?.order
              ? a.sidebar.order - b.sidebar.order
              : 0
          )
          .filter((item) => item.name !== "index.mdx");
        const isTab = indexFile?.isTab || false;

        if (indexFile) {
          tree.push({
            ...indexFile,
            name: file,
            slug,
            pathSegment: filePath,
            type: "directory",
            children: isTab ? [] : children,
          });
        }
      }
    } else if (file.endsWith(".mdx") || file.endsWith(".md")) {
      const metaData = getMetadata(filePath);

      const isTab = metaData.isTab || false;

      tree.push({
        name: file,
        slug: isTab ? slug.replace(/\/index$/, "") : slug,
        pathSegment: filePath,
        type: "link",
        ...metaData,
      });
    }
  });

  return tree
    .sort((a, b) =>
      a?.sidebar?.order && b?.sidebar?.order
        ? a.sidebar.order - b.sidebar.order
        : 0
    )
    .filter((item) => item.slug !== "/docs/index");
};
