import type { CodeSnippetsFiltersProps, CodeSnippetsProps } from '@repo/utils';

interface GetActiveContentProps {
  content: CodeSnippetsProps[];
  filters: CodeSnippetsFiltersProps;
  activePackageManager: string | null;
  activeLanguage: string | null;
  activeRenderer: string | null;
}

export const getActiveContent = ({
  content,
  filters,
  activePackageManager,
  activeLanguage,
  activeRenderer,
}: GetActiveContentProps): {
  activeContent: CodeSnippetsProps | null;
  error: string | null;
} => {
  let error: string | null = null;

  const filterByRenderer = content.filter((item) => {
    if (item.renderer === activeRenderer || item.renderer === 'common')
      return true;
    return false;
  });

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
      error = `This snippet doesn't exist for ${activeRenderer}.`;
    } else {
      // If there's react content, we need to show that
      filteredContent = reactContent;
      error = `This snippet doesn't exist for ${activeRenderer}. In the meantime, here's the React snippet.`;
    }
  }

  const filterByPackageManager = filteredContent.filter((item) => {
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

  const filterByLanguage = filterByPackageManager.filter((item) => {
    // If activeLanguage is null, we don't need to filter
    if (!activeLanguage) return true;

    // If there is only one language, we don't need to filter
    if (filters.languages.length <= 1) return true;

    // If there's a match, we return true
    if (item.language === activeLanguage) return true;

    return false;
  });

  if (activeLanguage === 'ts' && filterByLanguage.length === 0) {
    const getTsVersion = filterByPackageManager.find(
      (v) => v.language === 'ts-4-9',
    );
    if (getTsVersion) {
      filterByLanguage.push(getTsVersion);
    } else {
      // This mean there's an error
      // We need to show an error message
    }
  }

  if (activeLanguage === 'ts-4-9' && filterByLanguage.length === 0) {
    const getTsVersion = filterByPackageManager.find(
      (v) => v.language === 'ts',
    );
    if (getTsVersion) {
      filterByLanguage.push(getTsVersion);
    } else {
      // This mean there's an error
      // We need to show an error message
    }
  }

  if (filterByLanguage.length === 0) return { activeContent: null, error };

  return {
    activeContent: filterByLanguage[0] || null,
    error,
  };
};
