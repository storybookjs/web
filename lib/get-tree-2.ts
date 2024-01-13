import { DocsVersion, docsVersions } from "@/docs-versions";
import fs from "fs";
import matter from "gray-matter";
// import { cookies } from "next/headers";
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

export const generateDocsTree3 = ({
  pathToFiles,
  docsRoot = pathToFiles,
  activeVersion,
}: {
  pathToFiles?: string;
  docsRoot?: string;
  activeVersion?: DocsVersion | null;
}) => {
  // const cookieStore = cookies();
  // const stuff = cookieStore.get("sb-docs-version")?.value;
  const stuff = "8.0-test-1";
  let newPath = pathToFiles || `content/docs/${stuff}/docs`;

  const fileExists = fs.existsSync(newPath);

  if (!fileExists) return null;

  const files = fs.readdirSync(newPath);
  const tree: TreeProps[] = [];

  files.forEach((file) => {
    const filePath = path.join(newPath, file);

    // Slug
    const slug = filePath
      .replace(`content/docs/${stuff}/docs`, `/docs/${stuff}`)
      .replace(/\.mdx?$|\.md$/, "");

    const isDirectory = fs.lstatSync(filePath).isDirectory();

    if (isDirectory) {
      const childItems = generateDocsTree3({
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
