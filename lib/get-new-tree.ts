import fs from "fs";
import matter from "gray-matter";
import path from "path";

function getMetadata(filePath: string) {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const {
    data: { navTitle, title, ...data },
  } = matter(fileContents);
  return {
    title: navTitle || title,
    ...data,
  };
}

const rootPath = "content/test-docs-2/8.0-test-1/docs";

export const generateDocsTree = (
  pathToFiles = rootPath,
  docsRoot = pathToFiles
) => {
  const files = fs.readdirSync(pathToFiles);
  const tree: NewTreeProps[] = [];

  files.forEach((file) => {
    const filePath = path.join(pathToFiles, file);

    // Slug
    let slug = filePath
      .replace(`${rootPath}/`, "/docs/") // Make it relative to docs
      .replace(/\.mdx?$|\.md$/, ""); // Remove .mdx and .md extensions
    if (filePath === `${rootPath}/index.mdx`) slug = "/docs";

    const isDirectory = fs.lstatSync(filePath).isDirectory();

    if (isDirectory) {
      const childItems = generateDocsTree(filePath, docsRoot);

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

        if (indexFile && !isTab) {
          tree.push({
            ...indexFile,
            name: file,
            slug,
            pathSegment: filePath,
            type: "directory",
            children,
          });
        }
      }
    } else if (file.endsWith(".mdx") || file.endsWith(".md")) {
      const metaData = getMetadata(filePath);

      tree.push({
        name: file,
        slug,
        pathSegment: filePath,
        type: "link",
        ...metaData,
      });
    }
  });

  return tree.sort((a, b) =>
    a?.sidebar?.order && b?.sidebar?.order
      ? a.sidebar.order - b.sidebar.order
      : 0
  );
};
