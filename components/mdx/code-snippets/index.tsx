import { FC } from "react";
import { TSIcon } from "./icons";
import { Dropdown } from "./dropdown";
import { Copy } from "./copy";
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

  console.log(contentWithoutCode);

  return (
    <div className="border border-zinc-300 rounded overflow-hidden mb-6">
      <div className="flex items-center justify-between py-2 pl-5 pr-4 border-b border-b-zinc-300 bg-slate-50">
        <div className="flex items-center gap-2 font-bold text-sm">
          <TSIcon /> Name to be replaced
        </div>
        <div className="flex items-center gap-2">
          <Dropdown />
          <Copy />
        </div>
      </div>
      <div className="p-4 text-sm">
        <CodeSnippetsClient data={content} />
      </div>
    </div>
  );
};
