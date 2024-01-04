import {
  H1,
  H3,
  P,
  CodeSnippets,
  Callout,
  IfRenderer,
  YouTubeCallout,
  FeatureSnippets,
  UnorderedList,
  List,
  Hr,
  H2,
  A,
} from "@/components/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkExpressiveCode from "remark-expressive-code";
import { CompileOptions } from "@mdx-js/mdx";

/** @type {import('remark-expressive-code').RemarkExpressiveCodeOptions} */
const remarkExpressiveCodeOptions = {
  // You can add configuration options here,
  // see the API section for more information
};

export const mdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H1,
  a: A,
  p: P,
  hr: Hr,
  ul: UnorderedList,
  li: List,
  CodeSnippets,
  Callout,
  IfRenderer,
  YouTubeCallout,
  FeatureSnippets,
};

export const mdxOptions: {
  scope?: Record<string, unknown>;
  mdxOptions?: Omit<CompileOptions, "outputFormat" | "providerImportSource">;
  parseFrontmatter?: boolean;
} = {
  parseFrontmatter: true,
  mdxOptions: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
        },
      ],
    ],
    // remarkPlugins: [
    //   // The nested array structure below is used
    //   // to pass options to the remark plugin
    //   [remarkExpressiveCode, remarkExpressiveCodeOptions],
    // ],
  },
};
