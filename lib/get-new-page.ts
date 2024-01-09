import fs from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents, mdxOptions } from "./mdx";

export const getPageData = async (path: string[], activeVersion: string) => {
  const segment = path ? path.join("/").replace(`${activeVersion}/`, "") : "/";
  const superRootPath = `content/test-docs-2/${activeVersion}/docs`;

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

  return {
    ...frontmatter,
    content,
  };
};
