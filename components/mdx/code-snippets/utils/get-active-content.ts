import { languages } from "@/docs-languages";
import { packageManagers } from "@/docs-package-managers";
import { cookies } from "next/headers";

interface Props {
  codeSnippetsContent: CodeSnippetsProps[];
  filters: CodeSnippetsFiltersProps;
}

export const getActiveContent = ({
  codeSnippetsContent,
  filters,
}: Props): CodeSnippetsProps | null => {
  const cookieStore = cookies();
  const cookiePackageManager = cookieStore.get("sb-docs-package-manager");
  const packageManager = cookiePackageManager?.value ?? packageManagers[0].id;
  const cookieLanguage = cookieStore.get("sb-docs-language");
  const language = cookieLanguage?.value ?? languages[0].id;

  const filterByPackageManager = codeSnippetsContent.filter((item) => {
    // If there is only one package manager, we don't need to filter
    if (filters.packageManagers.length <= 1) return true;

    // Edge case to show npx snippets when npm is selected
    if (item.packageManager === "npx" && packageManager === "npm") return true;

    // If there's a match, we return true
    if (item.packageManager === packageManager) return true;

    return false;
  });

  let filterByLanguage = filterByPackageManager.filter((item) => {
    // If there is only one language, we don't need to filter
    if (filters.languages.length <= 1) return true;

    // If there's a match, we return true
    if (item.language === language) return true;

    return false;
  });

  if (language === "ts" && filterByLanguage.length === 0) {
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

  if (language === "ts-4-9" && filterByLanguage.length === 0) {
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
