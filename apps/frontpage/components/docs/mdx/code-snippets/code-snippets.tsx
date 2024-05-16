'use client';

import { useEffect, useState, type FC } from 'react';
import type { CodeSnippetsProps } from '@repo/utils';
import type { DocsContextProps } from '../../../../app/docs/provider';
import { CodeWrapper } from './wrapper';
import { getFilters } from './utils/get-filters';
import { getActiveContent } from './utils/get-active-content';
import { Dropdown } from './dropdown';

interface CodeSnippetsClientProps {
  content: CodeSnippetsProps[];
  activeLanguage?: DocsContextProps['activeLanguage'];
  activePackageManager?: DocsContextProps['activePackageManager'];
  activeRenderer?: DocsContextProps['activeRenderer'];
  setLanguage: DocsContextProps['setLanguage'];
  setPackageManager: DocsContextProps['setPackageManager'];
}

export const CodeSnippetsComponent: FC<CodeSnippetsClientProps> = ({
  content,
  activeLanguage,
  activePackageManager,
  activeRenderer,
  setLanguage,
  setPackageManager,
}) => {
  const [lanLocal, setLanLocal] = useState<null | string>(null);
  const [pmLocal, setPmLocal] = useState<null | string>(null);
  const [rendererLocal, setRendererLocal] = useState<null | string>(null);

  console.log(lanLocal, pmLocal, rendererLocal);

  useEffect(() => {
    if (activeLanguage) setLanLocal(activeLanguage);
    if (activePackageManager) setPmLocal(activePackageManager);
    if (activeRenderer) setRendererLocal(activeRenderer);
  }, [activeLanguage, activePackageManager, activeRenderer]);

  const handleLanguage = (id: string) => {
    setLanLocal(id);
    setLanguage(id);
  };

  const handlePackageManager = (id: string) => {
    setPmLocal(id);
    setPackageManager(id);
  };

  // Get filters - If preformatted text, we don't need filters
  const filters = getFilters({ codeSnippetsContent: content });

  // Get active content for the Code Snippets component
  const activeContent = getActiveContent({
    codeSnippetsContent: content,
    filters,
    activeLanguage: lanLocal,
    activePackageManager: pmLocal,
    activeRenderer: rendererLocal,
  });

  // Helper
  // const contentWithoutCode = content?.map((obj) =>
  //   (({ content, ...o }) => o)(obj)
  // );

  return (
    <CodeWrapper
      options={
        <>
          {filters && filters.languages.length > 1 ? (
            <Dropdown
              action={handleLanguage}
              activeId={lanLocal}
              list={filters.languages}
              type="language"
            />
          ) : null}
          {filters && filters.packageManagers.length > 1 ? (
            <Dropdown
              action={handlePackageManager}
              activeId={pmLocal}
              list={filters.packageManagers}
              type="packageManager"
            />
          ) : null}
        </>
      }
      title="Code Snippets"
    >
      {activeContent?.content ? (
        <section
          dangerouslySetInnerHTML={{
            __html: activeContent.content,
          }}
        />
      ) : (
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
