import { packageManagers } from "@/docs-package-managers";
import { docsVersions } from "@/docs-versions";
import { compileMDX } from "next-mdx-remote/rsc";
import { firefoxThemeLight } from "../themes/firefox-theme-vscode";
import fs from "fs";
import rehypePrettyCode from "rehype-pretty-code";
import { languages } from "@/docs-languages";

interface Props {
  paths: string[];
  activeVersion: string;
}

export const getMetadata = async ({ paths, activeVersion }: Props) => {
  const version = activeVersion ?? docsVersions[0].id;

  const rehypePrettyCodeOptions = {
    theme: firefoxThemeLight,
  };

  const content: CodeSnippetsProps[] = await Promise.all(
    paths.map(async (path) => {
      const source = await fs.promises.readFile(
        process.cwd() + `/content/snippets/${version}/${path}`,
        "utf8"
      );

      const renderer = path.split("/")[0];
      const segments = path
        .split("/")[1]
        .replace(/\.mdx$|\.md$/, "")
        .split(".");

      // Find the right data
      const fileName = segments[0];
      const rawOptions = segments.length === 3 ? segments[1] : null;
      const packageManager =
        packageManagers.find((p) => p.id === rawOptions)?.id ?? null;
      const option = packageManager ? null : rawOptions;
      const language =
        segments.find((s) => languages.map((p) => p.id).includes(s)) ?? null;

      const { content, frontmatter } = await compileMDX<{ title: string }>({
        source,
        options: {
          parseFrontmatter: true,
          mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions] as any],
            format: "mdx",
          },
        },
      });

      // TODO - Trim matter.content to get the snippet to copy + filename

      return {
        path,
        fileName,
        option,
        content,
        renderer,
        packageManager,
        language,
        ...frontmatter,
      };
    })
  );

  return content;
};
