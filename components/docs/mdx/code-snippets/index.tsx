import { getMetadata } from "./utils/get-metadata";
import { CodeSnippetsClient } from "./client";

type Props = {
  paths: string[];
};

export const CodeSnippets = async ({ paths }: Props) => {
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
  // This happen on the server since we need to call the file system (fs)
  const codeSnippetsContent: CodeSnippetsProps[] = await getMetadata({ paths });

  // Render the Code Snippets component
  // This happen on the client since we need to use the context
  return <CodeSnippetsClient content={codeSnippetsContent} />;
};
