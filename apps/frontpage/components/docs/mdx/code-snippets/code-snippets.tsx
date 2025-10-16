/* eslint-disable no-nested-ternary -- TODO: Refactor */
'use client';

import { useEffect, useState, type FC } from 'react';
import { usePathname } from 'next/navigation';
import { type CodeSnippetsProps } from '@repo/utils';
import { CodeSnippetsWrapper, mdxComponents } from '@repo/ui';
import { InfoIcon } from '@storybook/icons';
import { useDocs } from '../../../../app/docs/provider';
import { getFilters } from './utils/get-filters';
import {
  getActiveContentTabs,
  getActiveContent,
} from './utils/get-active-content';
import { Dropdown } from './dropdown';
import { transformVueTabTitle } from './utils/transform-vue-tab-title';
import { type Tab, Tabs } from './tabs';

const Link = mdxComponents.A;

interface CodeSnippetsClientProps {
  content: CodeSnippetsProps[] | null;
}

const getInitialTab = (tabs: Tab[], activeSnippetTabs: string[]) => {
  let initialTab: Tab | undefined;
  
  activeSnippetTabs.forEach((localTab) => {
    initialTab ??= tabs.find((tab) => tab.id === localTab);
    initialTab ??= tabs.find((tab) => tab.id.includes(localTab) || localTab.includes(tab.id));
  });
  return initialTab;
};

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

/**
 * For the framework docs pages, we coerce the active renderer to the relevant one for that framework.
 * We do this _without_ affecting the actual activeRenderer value.
 */
const getActiveRenderer = (activeRendererIn: string | null, pathname: string) => {
  // eslint-disable-next-line prefer-named-capture-group -- TODO: Enable via TS config changes
  const matches = /\/docs\/get-started\/frameworks\/(.*)/.exec(pathname);
  
  if (!matches) return activeRendererIn;

  const framework = matches[1];
  const frameworkOrRendererPortion = framework.replace(/-(?:vite|webpack5)/, '') as keyof typeof map;
  
  const map = {
    'nextjs': 'react',
    'react-native-web': 'react',
    'sveltekit': 'svelte',
    'vue3': 'vue',
  };

  return  map[frameworkOrRendererPortion] ?? frameworkOrRendererPortion;
}

const getActiveInfo = (activeTab: string | null) => {
  if (activeTab?.includes('CSF Next')) {
    return (
      <div className="flex items-center gap-2 px-4 py-3 text-sm text-blue-900 bg-blue-100 border-t border-blue-300 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-600">
        <InfoIcon />
        <Link href="/docs/api/csf/csf-next" className="text-inherit hover:underline">Learn more about CSF Next</Link>
      </div>
    );
  }
}

export const CodeSnippetsClient: FC<CodeSnippetsClientProps> = ({
  content,
}) => {
  const {
    activeRenderer: activeRendererIn,
    activeLanguage,
    activePackageManager,
    activeSnippetTabs,
    setLanguage,
    setPackageManager,
    setSnippetTabs,
  } = useDocs();
  const [activeTab, setActiveTab] = useState<Tab['id'] | null>(null);

  const pathname = usePathname();
  const activeRenderer = getActiveRenderer(activeRendererIn, pathname);

  // Get filters - If preformatted text, we don't need filters
  const filters = getFilters({ content: content ?? [], activeRenderer });

  const handleLanguage = (id: string) => {
    setLanguage(id);
  };

  const handlePackageManager = (id: string) => {
    setPackageManager(id);
  };

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setSnippetTabs(id);
  };

  // Get possible tabs and their content
  const { activeContentTabs, error: errorTabs } = getActiveContentTabs({
    content: content ?? [],
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
      activeSnippetTabs &&
      tabs &&
      tabs.length > 0
    ) {
      const initialTab = activeSnippetTabs?.length > 0 ? getInitialTab(tabs, activeSnippetTabs) : undefined;
      if (initialTab) {
        setActiveTab(initialTab.id);
      } else if (!activeTab) {
        setActiveTab(tabs[0].id);
      }
    } else if (tabs && tabs.length === 0 && activeTab) {
      setActiveTab(null);
    }
  }, [activeTab, tabs, activeLanguage, activePackageManager, activeRenderer, activeSnippetTabs]);

  if (!content)
    return (
      <CodeSnippetsWrapper>
        <Error />
      </CodeSnippetsWrapper>
    );

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

  const error = errorTabs ?? errorActiveContent;

  return (
    <CodeSnippetsWrapper
      copy={activeContent?.raw ?? ''}
      top={
        tabs && tabs.length > 1 ? (
          <Tabs activeTab={activeTab} onTabChange={handleTabChange} tabs={tabs} />
        ) : null
      }
      bottom={getActiveInfo(activeTab)}
      options={
        <>
          {filters && filters.languages.length > 1 ? (
            <Dropdown
              action={handleLanguage}
              activeId={activeContent?.language ?? ''}
              list={filters.languages}
              type="language"
            />
          ) : null}
          {filters && filters.packageManagers.length > 1 ? (
            <Dropdown
              action={handlePackageManager}
              activeId={activeContent?.packageManager ?? ''}
              list={filters.packageManagers}
              type="packageManager"
            />
          ) : null}
        </>
      }
      title={activeContent?.filename ?? ''}
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
          {error ? (
            <div className="flex items-center gap-2 px-4 py-3 mb-4 text-orange-900 bg-orange-100 border border-orange-300 rounded dark:border-orange-800 dark:bg-orange-950 dark:text-orange-400">
              <InfoIcon />
              {error}
            </div>
          ) : null}
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
