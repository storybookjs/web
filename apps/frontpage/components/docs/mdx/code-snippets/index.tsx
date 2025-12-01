import type { CodeSnippetsProps, DocsVersion } from '@repo/utils';
import { getMetadata } from './utils/get-metadata';
import { CodeSnippetsClient } from './code-snippets';

interface LocalProps {
  path?: string;
  activeVersion: DocsVersion;
  variant?: "default" | "new-users";
}

export async function CodeSnippets({ path, activeVersion, variant = "default" }: LocalProps) {
  // If there is no path or active version, return null
  // TODO: Perhaps we could return a message saying that there are no code snippets
  if (!path || !activeVersion) return null;

  // Get metadata for all files from the Code Snippets component
  // This happen on the server since we need to call the file system (fs)
  const codeSnippetsContent: CodeSnippetsProps[] | null = await getMetadata({
    path,
    activeVersion,
  });

  // Render the Code Snippets component
  // This happen on the client since we need to use the context
  return <CodeSnippetsClient content={codeSnippetsContent} variant={variant} />;
}
