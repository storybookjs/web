import type { CodeSnippetsFiltersProps, CodeSnippetsProps } from '@repo/utils';

interface GetActiveContentProps {
  activeContentTabs?: CodeSnippetsProps[] | null;
  content: CodeSnippetsProps[];
  filters: CodeSnippetsFiltersProps;
  activePackageManager: string | null;
  activeLanguage: string | null;
  activeRenderer: string | null;
  activeTab: string | null;
}

export const getActiveContentTabs = ({
  content,
  filters,
  activePackageManager,
  activeLanguage,
  activeRenderer,
}: Omit<GetActiveContentProps, 'activeContentTabs' | 'activeTab'>): {
  activeContentTabs: CodeSnippetsProps[] | null;
  error: string | null;
} => {
  let error: string | null = null;

  const filterByLanguage = content.filter((item) => {
    // If activeLanguage is null, we don't need to filter
    if (!activeLanguage) return true;

    // If there is only one language, we don't need to filter
    if (filters.languages.length <= 1) return true;

    // If there's a match, we return true
    if (item.language === activeLanguage) return true;

    return false;
  });

  if (activeLanguage === 'ts' && filterByLanguage.length === 0) {
    const tsVersions = content.filter(
      (v) => v.language === 'ts-4-9',
    );
    const jsVersions = content.filter(
      (v) => v.language === 'js',
    );
    if (tsVersions.length > 0) {
      filterByLanguage.splice(-1, 0, ...tsVersions);
    } else if (jsVersions.length > 0) {
      filterByLanguage.splice(-1, 0, ...jsVersions);
    } else {
      // This mean there's an error
      // We need to show an error message
    }
  }

  if (activeLanguage === 'ts-4-9' && filterByLanguage.length === 0) {
    const tsVersions = content.filter(
      (v) => v.language === 'ts',
    );
    const jsVersions = content.filter(
      (v) => v.language === 'js',
    );
    if (tsVersions.length > 0) {
      filterByLanguage.splice(-1, 0, ...tsVersions);
    } else if (jsVersions.length > 0) {
      filterByLanguage.splice(-1, 0, ...jsVersions);
    } else {
      // This mean there's an error
      // We need to show an error message
    }
  }

  const filterByRenderer = filterByLanguage.reduce<CodeSnippetsProps[]>(
    (acc, item) => {
      if (item.renderer !== activeRenderer && item.renderer !== 'common') {
        return acc;
      }

      const existingIndex = acc.findIndex(
        (existing) => decodeURIComponent(existing.tabTitle ?? '') === decodeURIComponent(item.tabTitle ?? ''),
      );

      if (existingIndex === -1) {
        acc.push(item);
      } else if (item.renderer !== 'common' && acc[existingIndex].renderer === 'common') {
        acc[existingIndex] = item;
      }

      return acc;
    },
    [],
  );

  let filteredContent = filterByRenderer;

  if (filterByRenderer.length === 0) {
    // If there's no content after filtering, we need to return a default value
    // Trying to find if there's any react content
    const reactContent = content.filter((item) => {
      if (item.renderer === 'react') return true;
      return false;
    });

    if (reactContent.length === 0) {
      // If there's no react content, we need to return the first content
      filteredContent = content;
      error = `This snippet doesn't exist for ${activeRenderer ?? ''}.`;
    } else {
      // If there's react content, we need to show that
      filteredContent = reactContent;
      // RNW snippets fallback to React snippets with no warning
      if (activeRenderer !== 'react-native-web') {
        error = `This snippet doesn't exist for ${activeRenderer ?? ''}. In the meantime, here's the React snippet.`;
      }
    }
  }

  filteredContent = filteredContent.filter((item) => {
    // If activePackageManager is null, we don't need to filter
    if (!activePackageManager) return true;

    // If there is only one package manager, we don't need to filter
    if (filters.packageManagers.length <= 1) return true;

    // Edge case to show npx snippets when npm is selected
    if (item.packageManager === 'npx' && activePackageManager === 'npm')
      return true;

    // If there's a match, we return true
    if (item.packageManager === activePackageManager) return true;

    return false;
  });

  if (filteredContent.length === 0) return { activeContentTabs: null, error };

  return {
    activeContentTabs: filteredContent || null,
    error,
  };
};

export const getActiveContent = ({
  activeContentTabs: activeContentTabsProp,
  content,
  filters,
  activePackageManager,
  activeLanguage,
  activeRenderer,
  activeTab,
}: GetActiveContentProps): {
  activeContent: CodeSnippetsProps | null;
  error: string | null;
} => {
  let tabs = activeContentTabsProp;
  let error: string | null = null;

  if (!tabs) {
    const { activeContentTabs, error: errorTabs } = getActiveContentTabs({
      content,
      filters,
      activePackageManager,
      activeLanguage,
      activeRenderer,
    });
    tabs = activeContentTabs;
    error = errorTabs;
  }

  if (activeTab) {
    const filterByTab = tabs?.filter((item) => {
      if (item.tabTitle === activeTab) return true;
      return false;
    });

    return {
      activeContent: filterByTab?.[0] ?? null,
      error: null,
    };
  }

  return {
    activeContent: tabs?.[0] ?? null,
    error,
  };
};
