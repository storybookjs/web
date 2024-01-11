import { packageManagers } from "@/docs-package-managers";
import { docsVersions } from "@/docs-versions";
import { bundleMDX } from "mdx-bundler";
import { cookies } from "next/headers";
import { firefoxThemeLight } from "../themes/firefox-theme-vscode";
import fs from "fs";
import rehypePrettyCode from "rehype-pretty-code";
import { languages } from "@/docs-languages";

interface Props {
  paths: string[];
}

export const getMetadata = async ({ paths }: Props) => {
  const cookieStore = cookies();
  const cookieVersion = cookieStore.get("sb-docs-version");
  const version = cookieVersion?.value ?? docsVersions[0].id;

  const rehypePrettyCodeOptions = {
    theme: firefoxThemeLight,
  };

  const content: CodeSnippetsProps[] = await Promise.all(
    paths.map(async (path) => {
      // Parse data
      const sourcePath = `content/docs/${version}/snippets/${path}`;
      const source = fs.readFileSync(sourcePath, "utf8");
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

      // Get the frontmatter and code from the MDX file
      const { frontmatter, code, matter } = await bundleMDX({
        source,
        mdxOptions(options) {
          options.rehypePlugins = [
            ...(options.rehypePlugins ?? []),
            [rehypePrettyCode, rehypePrettyCodeOptions],
          ];

          return options;
        },
      });

      console.log(matter);

      // TODO - Trim matter.content to get the snippet to copy + filename

      return {
        path,
        fileName,
        option,
        code,
        renderer,
        packageManager,
        language,
        ...frontmatter,
      };
    })
  );

  return content;
};
