import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { Callout } from "@/components/mdx/Callout";
import { CodeSnippets } from "@/components/mdx/CodeSnippets";
import { IfRenderer } from "@/components/mdx/IfRenderer";
import { YouTubeCallout } from "@/components/mdx/YouTubeCallout";
import { FeatureSnippets } from "@/components/mdx/FeatureSnippets";

export async function getPage(
  fileName: string
): Promise<PageProps | undefined> {
  const id = fileName.replace(/\.mdx$/, "");
  const res = await fetch(
    `https://raw.githubusercontent.com/storybookjs/web/main/${fileName}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_STORYBOOK_BOT_PAT}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "storybook-bot",
      },
      cache: "no-store", // To remove when solving the cache error
    }
  );

  if (!res.ok) return undefined;

  const rawMDX = await res.text();

  if (rawMDX === "404: Not Found") return undefined;

  const { frontmatter, content } = await compileMDX<{
    title: string;
    sidebar_title?: string;
  }>({
    source: rawMDX,
    components: {
      CodeSnippets,
      Callout,
      IfRenderer,
      YouTubeCallout,
      FeatureSnippets,
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          // [rehypeHighlight, {}],
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
            },
          ],
        ],
      },
    },
  });

  const segments = id.replace("docs/", "").split("/");
  const lastSegment = id.split("/").pop();
  const lastRealSegment =
    lastSegment === "index" ? segments[segments.length - 2] : lastSegment;
  const slug =
    lastRealSegment && lastRealSegment.match(/^\d+-/)
      ? lastRealSegment.replace(/^\d+-/, "")
      : lastRealSegment;

  const pageObj: PageProps = {
    meta: {
      id,
      slug: slug || "",
      title: frontmatter.title,
      sidebarTitle: frontmatter.sidebar_title || frontmatter.title || "",
      segments,
    },
    content,
  };

  return pageObj;
}
