'use client';

import { FC } from 'react';
import { CodeWrapper } from './wrapper';
import { getFilters } from './utils/get-filters';
import { getActiveContent } from './utils/get-active-content';
import { useDocs } from '../../../../app/docs/provider';
import { Dropdown } from './dropdown';
import { CodeSnippetsProps } from '@utils';

interface CodeSnippetsClientProps {
  content: CodeSnippetsProps[];
}

export const CodeSnippetsClient: FC<CodeSnippetsClientProps> = ({
  content,
}) => {
  const {
    activeLanguage,
    activePackageManager,
    setLanguage,
    setPackageManager,
  } = useDocs();

  // Get filters - If preformatted text, we don't need filters
  const filters = getFilters({ codeSnippetsContent: content });

  // Get active content for the Code Snippets component
  const activeContent = getActiveContent({
    codeSnippetsContent: content,
    filters,
    activeLanguage,
    activePackageManager,
  });

  // Helper
  // const contentWithoutCode = content?.map((obj) =>
  //   (({ content, ...o }) => o)(obj)
  // );

  return (
    <CodeWrapper
      title="Code Snippets"
      options={
        <>
          {filters && filters.languages.length > 1 && (
            <Dropdown
              list={filters.languages}
              activeId={activeLanguage}
              type="language"
              action={setLanguage}
            />
          )}
          {filters && filters.packageManagers.length > 1 && (
            <Dropdown
              list={filters.packageManagers}
              activeId={activePackageManager}
              type="packageManager"
              action={setPackageManager}
            />
          )}
        </>
      }
    >
      {activeContent?.content ? (
        <section
          dangerouslySetInnerHTML={{
            __html: activeContent?.content,
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
