import { FC } from "react";
import rehypePrettyCode from "rehype-pretty-code";
import { bundleMDX } from "mdx-bundler";
import fs from "fs";
import { firefoxThemeLight } from "./themes/firefox-theme-vscode";
import { cookies } from "next/headers";
import { docsVersions } from "@/docs-versions";
import { packageManagers } from "@/docs-package-managers";
import { languages } from "@/docs-languages";
import { renderers } from "@/docs-renderers";
import { TSIcon } from "./icons";
import { Dropdown } from "./dropdown";
import { Copy } from "./copy";
import { getMDXComponent } from "mdx-bundler/client";
import { setLanguageCookie, setPackageManagerCookie } from "@/app/actions";

type Props = {
  paths: string[];
};

export const CodeSnippets: FC<Props> = async ({ paths }) => {
  const cookieStore = cookies();
  const cookieVersion = cookieStore.get("sb-docs-version");
  const cookieRenderer = cookieStore.get("sb-docs-renderer");
  const cookieLanguage = cookieStore.get("sb-docs-language");
  const cookiePackageManager = cookieStore.get("sb-docs-package-manager");
  const version = cookieVersion?.value ?? docsVersions[0].id;
  const renderer = cookieRenderer?.value ?? renderers[0].id;
  const language = cookieLanguage?.value ?? languages[0].id;
  const packageManager = cookiePackageManager?.value ?? packageManagers[0].id;

  const rehypePrettyCodeOptions = {
    theme: firefoxThemeLight,
  };

  // This is how files are structured.
  // [renderer]/[filename].[option].[language].mdx
  // [renderer]/[filename].[language].mdx
  //
  // Options are optional and are serving 2 purposes:
  // - Create tabs (could be anything)
  // - Set the package manager (npm | yarn | pnpm)
  //
  // option in angular: with-builder | ...
  // option in Vue: 2 | 3
  // option in common: could be anything

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

  const contentWithoutCode = content.map((obj) => (({ code, ...o }) => o)(obj));

  const listOfLanguages = [
    ...new Set(contentWithoutCode.map((obj) => obj.language)),
  ].filter((r) => r !== null) as string[];

  const languagesWithData = listOfLanguages.map((obj) =>
    languages.find((r) => r.id === obj)
  );

  // Package managers
  const transformPackageManager = content.map((pm) => {
    if (pm.packageManager === "npx") return "npm";
    return pm.packageManager;
  });

  // Removing duplicates and null values
  const listOfPm = [...new Set(transformPackageManager)].filter(
    (r) => r !== null
  ) as string[];

  // Add the right data for each package manager
  const PmWithData = listOfPm.map((obj) =>
    packageManagers.find((r) => r.id === obj)
  );

  const filters: CodeSnippetsFiltersProps = {
    languages: languagesWithData,
    packageManagers: PmWithData,
  };

  const Code = getMDXComponent(content[0].code);

  return (
    <div className="border border-zinc-300 rounded overflow-hidden mb-6 w-full">
      <div className="flex items-center justify-between py-2 pl-5 pr-4 border-b border-b-zinc-300 bg-slate-50">
        <div className="flex items-center gap-2 font-bold text-sm">
          <TSIcon /> Name to be replaced
        </div>
        <div className="flex items-center gap-2">
          {filters.languages.length > 1 && (
            <Dropdown
              list={filters.languages}
              activeId={language}
              type="language"
              action={setLanguageCookie}
            />
          )}
          {filters.packageManagers.length > 1 && (
            <Dropdown
              list={filters.packageManagers}
              activeId={packageManager}
              type="packageManager"
              action={setPackageManagerCookie}
            />
          )}
          <Copy />
        </div>
      </div>
      <div className="p-4 text-sm max-w-full overflow-scroll">
        <Code />
      </div>
    </div>
  );
};
