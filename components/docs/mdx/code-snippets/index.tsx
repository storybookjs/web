import { getMetadata } from "./utils/get-metadata";
import { CodeSnippetsClient } from "./client";

interface Props {
  paths: string[];
  activeVersion: string;
}

export const CodeSnippets = async ({ paths, activeVersion }: Props) => {
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

  // Get metadata for all files from the Code Snippets component
  // This happen on the server since we need to call the file system (fs)
  const codeSnippetsContent: CodeSnippetsProps[] = await getMetadata({
    paths,
    activeVersion,
  });

  // Render the Code Snippets component
  // This happen on the client since we need to use the context
  return <CodeSnippetsClient content={codeSnippetsContent} />;
};
