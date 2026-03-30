import type { CodeSnippetsProps, DocsVersion } from '@repo/utils';
import { getMetadata } from './utils/get-metadata';
import { CodeSnippetsClient } from './code-snippets';

interface LocalProps {
  path?: string;
  activeVersion: DocsVersion;

  /**
   * An optional event name to send to Plausible when the user copies the code snippet.
   * Still sends the CodeSnippetCopy event as well. Helps with building funnels as
   * Plausible doesn't allow filtering events per prop in funnel reports.
   */
  copyEvent?: string;

  /**
   * The new-users variant has much higher contrast on the copy button, to help users
   * locate it and learn about it. Currently only used for "create" code snippets.
   */
  variant?: "default" | "new-users";
}

export async function CodeSnippets({ path, activeVersion, copyEvent, variant = "default" }: LocalProps) {
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
  return <CodeSnippetsClient content={codeSnippetsContent} variant={variant} copyEvent={copyEvent} snippetPath={path} />;
}
