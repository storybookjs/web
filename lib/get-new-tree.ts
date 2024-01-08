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

interface TOCProps {
  name: string;
  slug: string;
  pathSegment: string;
  title: string;
  type: "directory" | "link";
  children?: TOCProps[];
}

const rootPath = "content/test-docs-2/8.0-test-1/docs";

export const generateDocsToc = (
  pathToFiles = "content/test-docs-2/8.0-test-1/docs",
  docsRoot = pathToFiles
) => {
  const files = fs.readdirSync(pathToFiles);

  const toc: TOCProps[] = [];

  files.forEach((file) => {
    const filePath = path.join(pathToFiles, file);

    // Slug
    let slug = filePath
      .replace(`${rootPath}/`, "/docs/") // Make it relative to docs
      .replace(/\.mdx?$|\.md$/, ""); // Remove .mdx and .md extensions
    if (filePath === `${rootPath}/index.mdx`) slug = "/docs";

    const isDirectory = fs.lstatSync(filePath).isDirectory();

    if (isDirectory) {
      const childItems = generateDocsToc(filePath, docsRoot);

      if (childItems) {
        const indexFile = childItems.find((item) => item.name === "index.mdx");
        const children = childItems.filter((item) => item.name !== "index.mdx");

        if (indexFile) {
          toc.push({
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

      toc.push({
        name: file,
        slug,
        pathSegment: filePath,
        type: "link",
        ...metaData,
      });
    }
  });

  return toc;
};
