import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { common } from "lowlight";
import { Callout } from "@/components/mdx/Callout";
import { CodeSnippets } from "@/components/mdx/CodeSnippets";
import { IfRenderer } from "@/components/mdx/IfRenderer";
import { YouTubeCallout } from "@/components/mdx/YouTubeCallout";
import { FeatureSnippets } from "@/components/mdx/FeatureSnippets";
import { P, H1, H3 } from "@/components/mdx";
import fs from "fs";

export async function getRelease(version: string) {
  if (!version) return undefined;

  const fileContent = fs.readFileSync(`content/releases/${version}.md`, "utf8");

  return await compileMDX<{
    title: string;
    short_title?: string;
    show_as_tab?: boolean;
  }>({
    source: fileContent,
    components: {
      h1: H1,
      h2: H1,
      h3: H3,
      h4: H1,
      p: P,
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
          [
            // @ts-ignore TODO: fix types
            rehypeHighlight,
            {
              languages: { ...common },
              subset: false,
            },
          ],
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
}
