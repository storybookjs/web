"use client";

import { Dropdown } from "./dropdown";
import { getFilters } from "./utils/get-filters";
import { getMetadata } from "./utils/get-metadata";
import { getActiveContent } from "./utils/get-active-content";
import { CodeWrapper } from "./wrapper";
import { useDocs } from "@/app/docs/provider";

type Props = {
  paths: string[];
};

export const CodeSnippets = async ({ paths }: Props) => {
  const { activeLanguage, activePackageManager } = useDocs();

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

  const test = [
    {
      path: "common/init-command.npx.js.mdx",
      fileName: "init-command",
      option: null,
      renderer: "common",
      packageManager: "npx",
      language: "js",
    },
    {
      path: "common/init-command.yarn.js.mdx",
      fileName: "init-command",
      option: null,
      renderer: "common",
      packageManager: "yarn",
      language: "ts",
    },
    {
      path: "common/init-command.pnpm.js.mdx",
      fileName: "init-command",
      option: null,
      renderer: "common",
      packageManager: "pnpm",
      language: "ts-4-9",
    },
  ];

  // Get metadata for all files from the Code Snippets component
  const codeSnippetsContent: CodeSnippetsProps[] = await getMetadata({ paths });

  // Get filters - If preformatted text, we don't need filters
  const filters = getFilters({ codeSnippetsContent });

  // Get active content for the Code Snippets component
  const activeContent = getActiveContent({
    codeSnippetsContent,
    filters,
    activeLanguage,
    activePackageManager,
  });

  // Helper
  const contentWithoutCode = codeSnippetsContent?.map((obj) =>
    (({ content, ...o }) => o)(obj)
  );

  // console.log(renderer, language, packageManager, version);
  // console.log("Content", contentWithoutCode);

  return (
    <CodeWrapper
      title="Code Snippets"
      options={
        <>
          {/* {filters && filters.languages.length > 1 && (
            <Dropdown
              list={filters.languages}
              activeId={language}
              type="language"
              action={setLanguageCookie}
            />
          )}
          {filters && filters.packageManagers.length > 1 && (
            <Dropdown
              list={filters.packageManagers}
              activeId={packageManager}
              type="packageManager"
              action={setPackageManagerCookie}
            />
          )} */}
        </>
      }
    >
      {activeContent?.content ?? (
        <div>
          <div>Oh no! We could not find the code you are looking for.</div>
          <div>
            It would be great if you could report an issue on Github if you see
            that message.
          </div>
        </div>
      )}
    </CodeWrapper>
  );
};
