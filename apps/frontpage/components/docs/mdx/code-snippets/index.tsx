import type { CodeSnippetsProps, DocsVersion } from '@repo/utils';
import { getMetadata } from './utils/get-metadata';
import { CodeSnippetsClient } from './code-snippets';
import {
  cookieLanguageId,
  cookiePackageManagerId,
  cookieRenderId,
} from '../../../../constants';
import { cookies } from 'next/headers';

interface LocalProps {
  path?: string;
  activeVersion: DocsVersion;
}

export async function CodeSnippets({ path, activeVersion }: LocalProps) {
  const cookieStore = cookies();
  const activeRenderer = cookieStore.get(cookieRenderId)?.value ?? 'react';
  const activeLanguage = cookieStore.get(cookieLanguageId)?.value ?? 'js';
  const activePackageManager =
    cookieStore.get(cookiePackageManagerId)?.value ?? 'npm';

  // If there is no path or active version, return null
  // TODO: Perhaps we could return a message saying that there are no code snippets
  if (!path || !activeVersion) return null;

  // Get metadata for all files from the Code Snippets component
  // This happen on the server since we need to call the file system (fs)
  const codeSnippetsContent: CodeSnippetsProps[] = await getMetadata({
    path,
    activeVersion,
  });

  // Render the Code Snippets component
  // This happen on the client since we need to use the context
  return (
    <CodeSnippetsClient
      serverActiveRenderer={activeRenderer}
      serverActiveLanguage={activeLanguage}
      serverActivePackageManager={activePackageManager}
      content={codeSnippetsContent}
    />
  );
}
