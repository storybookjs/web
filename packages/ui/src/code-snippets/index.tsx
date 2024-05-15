import type { FC } from 'react';
import type { CodeSnippetsProps } from '@repo/utils';
import { CodeWrapper } from './wrapper';
import { getFilters } from './get-filters';
import { getActiveContent } from './get-active-content';
import { Dropdown } from './dropdown';

interface CodeSnippetsClientProps {
  content: CodeSnippetsProps[];
  activeLanguage: string;
  activePackageManager: string;
  setLanguage: (language: string) => void;
  setPackageManager: (packageManager: string) => void;
}

export const CodeSnippets: FC<CodeSnippetsClientProps> = ({
  content,
  activeLanguage,
  activePackageManager,
  setLanguage,
  setPackageManager,
}) => {
  // Get filters - If preformatted text, we don't need filters
  // const filters = getFilters({ codeSnippetsContent: content });

  // Get active content for the Code Snippets component
  // const activeContent = getActiveContent({
  //   codeSnippetsContent: content,
  //   filters,
  //   activeLanguage,
  //   activePackageManager,
  // });

  // Helper
  // const contentWithoutCode = content?.map((obj) =>
  //   (({ content, ...o }) => o)(obj)
  // );

  return <div>Hello world</div>;

  return (
    <CodeWrapper
      options={
        <>
          {filters.languages.length > 1 ? (
            <Dropdown
              action={setLanguage}
              activeId={activeLanguage}
              list={filters.languages}
              type="language"
            />
          ) : null}
          {filters.packageManagers.length > 1 ? (
            <Dropdown
              action={setPackageManager}
              activeId={activePackageManager}
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
