import { FC } from "react";
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
import { getFilters } from "./utils/get-filters";
import { getMetadata } from "./utils/get-metadata";
import { getActiveContent } from "./utils/get-active-content";
import { CodeWrapper } from "./wrapper";

type Props = {
  paths: string[];
};

export const CodeSnippets: FC<Props> = async ({ paths }) => {
  const cookieStore = cookies();
  const cookieVersion = cookieStore.get("sb-docs-version");
  const cookieRenderer = cookieStore.get("sb-docs-renderer");
  const cookieLanguage = cookieStore.get("sb-docs-language");
  const language = cookieLanguage?.value ?? languages[0].id;
  const cookiePackageManager = cookieStore.get("sb-docs-package-manager");
  const packageManager = cookiePackageManager?.value ?? packageManagers[0].id;
  const version = cookieVersion?.value ?? docsVersions[0].id;
  const renderer = cookieRenderer?.value ?? renderers[0].id;

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
  const activeContent = getActiveContent({ codeSnippetsContent, filters });

  // Helper
  const contentWithoutCode = codeSnippetsContent?.map((obj) =>
    (({ code, ...o }) => o)(obj)
  );

  // console.log(renderer, language, packageManager, version);
  // console.log("Content", contentWithoutCode);

  const Code = activeContent
    ? getMDXComponent(activeContent.code)
    : DummyComponent;

  return (
    <CodeWrapper
      title="Code Snippets"
      options={
        <>
          {filters && filters.languages.length > 1 && (
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
          )}
        </>
      }
    >
      <Code />
    </CodeWrapper>
  );
};

const DummyComponent: React.FC = () => (
  <div>
    <div>Oh no! We could not find the code you are looking for.</div>
    <div>
      It would be great if you could report an issue on Github if you see that
      message.
    </div>
  </div>
);
