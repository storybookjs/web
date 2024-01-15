interface Props {
  codeSnippetsContent: CodeSnippetsProps[];
  filters: CodeSnippetsFiltersProps;
  activePackageManager: string | null;
  activeLanguage: string | null;
}

export const getActiveContent = ({
  codeSnippetsContent,
  filters,
  activePackageManager,
  activeLanguage,
}: Props): CodeSnippetsProps | null => {
  const filterByPackageManager = codeSnippetsContent.filter((item) => {
    // If there is only one package manager, we don't need to filter
    if (filters.packageManagers.length <= 1) return true;

    // Edge case to show npx snippets when npm is selected
    if (item.packageManager === "npx" && activePackageManager === "npm")
      return true;

    // If there's a match, we return true
    if (item.packageManager === activePackageManager) return true;

    return false;
  });

  let filterByLanguage = filterByPackageManager.filter((item) => {
    // If there is only one language, we don't need to filter
    if (filters.languages.length <= 1) return true;

    // If there's a match, we return true
    if (item.language === activeLanguage) return true;

    return false;
  });

  if (activeLanguage === "ts" && filterByLanguage.length === 0) {
    const getTsVersion = filterByPackageManager.find(
      (v) => v.language === "ts-4-9"
    );
    if (getTsVersion) {
      filterByLanguage.push(getTsVersion);
    } else {
      // This mean there's an error
      // We need to show an error message
    }
  }

  if (activeLanguage === "ts-4-9" && filterByLanguage.length === 0) {
    const getTsVersion = filterByPackageManager.find(
      (v) => v.language === "ts"
    );
    if (getTsVersion) {
      filterByLanguage.push(getTsVersion);
    } else {
      // This mean there's an error
      // We need to show an error message
    }
  }

  if (filterByLanguage.length === 0) return null;

  // console.log("filterByPackageManager", filterByPackageManager);
  // console.log("filterByLanguage", filterByLanguage);

  return filterByLanguage[0];
};
