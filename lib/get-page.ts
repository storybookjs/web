import fs from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents, mdxOptions } from "./mdx";
import { generateDocsTree } from "./get-tree";
import { getNullableVersion, getVersion } from "./get-version";

export const getPageData = async (path: string[], activeVersion: string) => {
  const segment = path ? path.join("/").replace(`${activeVersion}/`, "") : "/";
  const superRootPath = `content/docs/${activeVersion}/docs`;

  const indexPath = `${superRootPath}/${segment}/index.mdx`;
  const linkPath =
    `${superRootPath}/${segment}.mdx` || `${superRootPath}/${segment}.md`;

  const isIndex = fs.existsSync(indexPath);
  const isLink = fs.existsSync(linkPath);

  let newPath = null;
  if (isIndex) newPath = indexPath;
  if (isLink) newPath = linkPath;

  if (!newPath) return undefined;

  const fileContents = fs.readFileSync(newPath, "utf8");

  const { frontmatter, content } = await compileMDX<NewTreeMetaProps>({
    source: fileContents,
    components: mdxComponents,
    options: mdxOptions,
  });

  // Get Tabs
  const activeVersionForPath = getVersion(path);
  const activeVersionForSlug = getNullableVersion(path);

  let rootPath = `content/docs/${activeVersionForPath?.id}/docs/`;
  let pathToFiles = `${rootPath}${
    isLink ? path.slice(0, -1).join("/") : path.join("/")
  }`;

  const parent = generateDocsTree({
    pathToFiles,
    activeVersion: activeVersionForSlug,
  }).sort((a, b) =>
    a?.tab?.order && b?.tab?.order ? a.tab.order - b.tab.order : 0
  );

  const index = parent.find((item) => item.name === "index.mdx");

  return {
    ...frontmatter,
    tabs: index?.isTab ? parent : [],
    content,
  };
};
