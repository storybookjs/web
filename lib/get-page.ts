import fs from "fs";
import { generateDocsTree } from "./get-tree";
import { firefoxThemeLight } from "@/components/mdx/code-snippets/themes/firefox-theme-vscode";
import rehypePrettyCode from "rehype-pretty-code";
import { compileMDX } from "next-mdx-remote/rsc";
import * as MDX from "@/components/mdx";
import rehypeSlug from "rehype-slug";

const rehypePrettyCodeOptions = {
  theme: firefoxThemeLight,
};

export const getPageData = async (path: string[], activeVersion: string) => {
  const segment = path ? path.join("/").replace(`${activeVersion}/`, "") : "/";
  const superRootPath = `content/docs/${activeVersion}`;

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

  const { content, frontmatter } = await compileMDX<{ title: string }>({
    source: fileContents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, rehypePrettyCodeOptions] as any,
        ],
        format: "mdx",
      },
    },
    components: {
      h1: MDX.H1,
      h2: MDX.H2,
      h3: MDX.H3,
      h4: MDX.H1,
      a: MDX.A,
      p: MDX.P,
      hr: MDX.Hr,
      ul: MDX.UnorderedList,
      li: MDX.List,
      pre: MDX.Pre,
      // img: (props: any) => (
      //   <MDX.ImgDocs activeVersion={activeVersion} {...props} />
      // ),
      CodeSnippets: MDX.CodeSnippets,
      Callout: MDX.Callout,
      IfRenderer: MDX.IfRenderer,
      YouTubeCallout: MDX.YouTubeCallout,
      FeatureSnippets: MDX.FeatureSnippets,
    },
  });

  // Get Tabs
  let pathToFiles = isLink
    ? `${superRootPath}/${segment}`.split("/").slice(0, -1).join("/")
    : `${superRootPath}/${segment}`;

  const parent = generateDocsTree(pathToFiles);

  const sorted = parent?.sort((a, b) =>
    a?.tab?.order && b?.tab?.order ? a.tab.order - b.tab.order : 0
  );

  const index = sorted?.find((item) => item.name === "index.mdx");

  return {
    ...frontmatter,
    tabs: index?.isTab ? parent : [],
    content,
  };
};
