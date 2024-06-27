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

interface CodeSnippetsClientProps {
  content: CodeSnippetsProps[];
}

interface Tab {
  id: string;
  title: string;
}

function transformVueTabTitle(tabTitle: string, tabs: CodeSnippetsProps[]) {
  const createVersionRegex = (version: string) => new RegExp(`^(${version})$`);
  const createVersionSuffixRegex = (version: string) =>
    new RegExp(`^(.*)-(${version})$`);
  // Only do the transformation if both Vue 2 and Vue 3 tabs are present
  if (
    tabs.find(
      ({ tabTitle }) =>
        tabTitle?.match(createVersionRegex('2')) ||
        tabTitle?.match(createVersionSuffixRegex('2')),
    ) &&
    tabs.find(
      ({ tabTitle }) =>
        tabTitle?.match(createVersionRegex('3')) ||
        tabTitle?.match(createVersionSuffixRegex('3')),
    )
  ) {
    return tabTitle
      .replace(createVersionRegex('\\d'), 'Vue $1')
      .replace(createVersionSuffixRegex('\\d'), '$1 (Vue $2)');
  }
  // Otherwise just remove the version number
  return tabTitle
    .replace(createVersionRegex('\\d'), '')
    .replace(createVersionSuffixRegex('\\d'), '$1');
}

const Tabs = ({
  activeTab,
  onTabChange,
  tabs,
}: {
  activeTab: string | null;
  onTabChange: (tabId: string) => void;
  tabs: Tab[];
}) => (
  <div className="flex gap-2">
    {tabs.map((tab, index) => (
      <button
        key={index}
        className={cn(
          'flex h-7 items-center justify-center rounded border px-2 text-sm transition-colors',
          activeTab === tab.id &&
            'border-slate-500 bg-slate-500 text-white dark:border-slate-700 dark:bg-slate-700 dark:text-slate-400',
          activeTab !== tab.id &&
            'border-zinc-300 hover:border-blue-500 hover:text-blue-500 dark:border-slate-700 dark:text-slate-500 dark:hover:border-blue-500 dark:hover:text-blue-500',
        )}
        onClick={() => {
          onTabChange(tab.id);
        }}
      >
        {tab.title}
      </button>
    ))}
  </div>
);

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
  }, [
    activeTab,
    tabs,
    activeLanguage,
    activePackageManager,
    activeRenderer,
  ]);

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
            <div className="mb-4 flex items-center gap-2 rounded border border-orange-300 bg-orange-100 px-4 py-3 text-orange-900 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-400">
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
        <div>
          <div>Oh no! We could not find the code you are looking for.</div>
          <div>
            Please use the feedback button on the bottom of this page to let us
            know.
          </div>
        </div>
      )}
    </CodeSnippetsWrapper>
  );
};
