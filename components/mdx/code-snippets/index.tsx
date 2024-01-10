import { FC } from "react";
import rehypePrettyCode from "rehype-pretty-code";
import { bundleMDX } from "mdx-bundler";
import fs from "fs";
import { firefoxThemeLight } from "./themes/firefox-theme-vscode";
import { renderers } from "@/docs-renderers";
import { cookies } from "next/headers";
import { docsVersions } from "@/docs-versions";
import { CodeSnippetsClient } from "./client";
import { packageManagers } from "@/docs-package-managers";
import { languages } from "@/docs-languages";

type Props = {
  paths: string[];
};

export const CodeSnippets: FC<Props> = async ({ paths }) => {
  const cookieStore = cookies();
  const versionCookie = cookieStore.get("sb-docs-version");
  const version = versionCookie?.value ?? docsVersions[0].id;

  const rehypePrettyCodeOptions = {
    theme: firefoxThemeLight,
  };

  const content: CodeSnippetsProps[] = await Promise.all(
    paths.map(async (path) => {
      const sourcePath = `content/docs/${version}/snippets/${path}`;
      const source = fs.readFileSync(sourcePath, "utf8");

      const folderName = path.split("/")[0];
      const fileName = path.split("/")[1];
      const segments = fileName.replace(/\.mdx$|\.md$/, "").split(".");
      const isRender = renderers.map((r) => r.id).includes(folderName);
      const renderer = isRender ? folderName : null;
      const packageManager =
        segments.find((s) => packageManagers.map((p) => p.id).includes(s)) ??
        null;
      const language =
        segments.find((s) => languages.map((p) => p.id).includes(s)) ?? null;

      const { frontmatter, code } = await bundleMDX({
        source,
        mdxOptions(options) {
          options.rehypePlugins = [
            ...(options.rehypePlugins ?? []),
            [rehypePrettyCode, rehypePrettyCodeOptions],
          ];

          return options;
        },
      });

      return {
        path,
        code,
        renderer,
        packageManager,
        language,
        ...frontmatter,
      };
    })
  );

  const contentWithoutCode = content.map((obj) => (({ code, ...o }) => o)(obj));

  const listOfRenderers = [
    ...new Set(contentWithoutCode.map((obj) => obj.renderer)),
  ].filter((r) => r) as string[];

  const renderersWithData = listOfRenderers.map((obj) =>
    renderers.find((r) => r.id === obj)
  );

  const listOfLanguages = [
    ...new Set(contentWithoutCode.map((obj) => obj.language)),
  ].filter((r) => r !== null) as string[];

  const languagesWithData = listOfLanguages.map((obj) =>
    languages.find((r) => r.id === obj)
  );

  const listOfPm = [
    ...new Set(contentWithoutCode.map((obj) => obj.packageManager)),
  ].filter((r) => r !== null) as string[];

  const PmWithData = listOfPm.map((obj) =>
    packageManagers.find((r) => r.id === obj)
  );

  const filters: CodeSnippetsFiltersProps = {
    renderers: renderersWithData,
    languages: languagesWithData,
    packageManagers: PmWithData,
  };

  console.log(contentWithoutCode);

  // console.log(filters);

  return <CodeSnippetsClient data={content} filters={filters} />;
};
