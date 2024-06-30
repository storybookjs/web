'use client';

import { useEffect, useState, type FC } from 'react';
import { cn, type CodeSnippetsProps } from '@repo/utils';
import { CodeSnippetsWrapper } from '@repo/ui';
import { useDocs } from '../../../../app/docs/provider';
import { getFilters } from './utils/get-filters';
import {
  getActiveContentTabs,
  getActiveContent,
} from './utils/get-active-content';
import { Dropdown } from './dropdown';
import { InfoIcon } from '@storybook/icons';
import { transformVueTabTitle } from './utils/transform-vue-tab-title';
import { Tab, Tabs } from './tabs';

interface CodeSnippetsClientProps {
  content: CodeSnippetsProps[] | null;
}

const Error = () => {
  return (
    <div>
      <div>Oh no! We could not find the code you are looking for.</div>
      <div>
        Please use the feedback button on the bottom of this page to let us
        know.
      </div>
    </div>
  );
};

export const CodeSnippetsClient: FC<CodeSnippetsClientProps> = ({
  content,
}) => {
  const {
    activeRenderer,
    activeLanguage,
    activePackageManager,
    setLanguage,
    setPackageManager,
  } = useDocs();
  const [activeTab, setTab] = useState<Tab['id'] | null>(null);

  if (!content)
    return (
      <CodeSnippetsWrapper>
        <Error />
      </CodeSnippetsWrapper>
    );

  // Get filters - If preformatted text, we don't need filters
  const filters = getFilters({ content, activeRenderer });

  const handleLanguage = (id: string) => {
    setLanguage(id);
  };

  const handlePackageManager = (id: string) => {
    setPackageManager(id);
  };

  // Get possible tabs and their content
  const { activeContentTabs, error: errorTabs } = getActiveContentTabs({
    content,
    filters,
    activeLanguage,
    activePackageManager,
    activeRenderer,
  });

  const tabs = activeContentTabs
    ?.filter((item) => Boolean(item.tabTitle))
    .map((item) => {
      let tabTitle = item.tabTitle;
      if (tabTitle && activeRenderer === 'vue') {
        tabTitle = transformVueTabTitle(tabTitle, activeContentTabs);
      }
      return {
        id: item.tabTitle,
        title: tabTitle,
      };
    }) as Tab[] | undefined;

  useEffect(() => {
    if (
      activeLanguage &&
      activePackageManager &&
      activeRenderer &&
      tabs &&
      tabs.length > 0 &&
      !activeTab
    ) {
      setTab(tabs[0].id);
    } else if (tabs && tabs.length === 0 && activeTab) {
      setTab(null);
    }
  }, [activeTab, tabs, activeLanguage, activePackageManager, activeRenderer]);

  // Get active snippet content
  const { activeContent, error: errorActiveContent } = getActiveContent({
    activeContentTabs,
    content,
    filters,
    activeLanguage,
    activePackageManager,
    activeRenderer,
    activeTab,
  });

  const error = errorTabs || errorActiveContent;

  return (
    <CodeSnippetsWrapper
      copy={activeContent?.raw || ''}
      top={
        tabs && tabs.length > 1 ? (
          <Tabs activeTab={activeTab} onTabChange={setTab} tabs={tabs} />
        ) : null
      }
      options={
        <>
          {filters && filters.languages.length > 1 ? (
            <Dropdown
              action={handleLanguage}
              activeId={activeContent?.language || ''}
              list={filters.languages}
              type="language"
            />
          ) : null}
          {filters && filters.packageManagers.length > 1 ? (
            <Dropdown
              action={handlePackageManager}
              activeId={activeContent?.packageManager || ''}
              list={filters.packageManagers}
              type="packageManager"
            />
          ) : null}
        </>
      }
      title={activeContent?.filename || ''}
      iconLanguage={
        activeContent?.packageManager
          ? 'sh'
          : activeContent?.language
            ? ['ts', 'ts-4-9'].includes(activeContent?.language)
              ? 'ts'
              : 'js'
            : null
      }
    >
      {activeContent?.content ? (
        <>
          {error && (
            <div className="flex items-center gap-2 px-4 py-3 mb-4 text-orange-900 bg-orange-100 border border-orange-300 rounded dark:border-orange-800 dark:bg-orange-950 dark:text-orange-400">
              <InfoIcon />
              {error}
            </div>
          )}
          <section
            dangerouslySetInnerHTML={{
              __html: activeContent.content,
            }}
          />
        </>
      ) : (
        <Error />
      )}
    </CodeSnippetsWrapper>
  );
};
