import fs from "fs";
import { generateDocsTree } from "./get-tree";
import { getNullableVersion } from "./get-version";
import { bundleMDX } from "mdx-bundler";
import { firefoxThemeLight } from "@/components/mdx/code-snippets/themes/firefox-theme-vscode";
import rehypePrettyCode from "rehype-pretty-code";

const rehypePrettyCodeOptions = {
  theme: firefoxThemeLight,
};

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

  const { frontmatter, code } = await bundleMDX<TreeMetaProps>({
    source: fileContents,
    mdxOptions(options) {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        [rehypePrettyCode, rehypePrettyCodeOptions],
      ];

      return options;
    },
  });

  // Get Tabs
  let pathToFiles = isLink
    ? `${superRootPath}/${segment}`.split("/").slice(0, -1).join("/")
    : `${superRootPath}/${segment}`;

  const parent = generateDocsTree({
    pathToFiles,
    activeVersion: getNullableVersion(path),
  }).sort((a, b) =>
    a?.tab?.order && b?.tab?.order ? a.tab.order - b.tab.order : 0
  );

  const index = parent.find((item) => item.name === "index.mdx");

  return {
    ...frontmatter,
    tabs: index?.isTab ? parent : [],
    code,
  };
};
