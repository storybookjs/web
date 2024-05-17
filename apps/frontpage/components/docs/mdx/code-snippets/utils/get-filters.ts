import type { CodeSnippetsFiltersProps, CodeSnippetsProps } from '@repo/utils';
import { languages, packageManagers } from '@repo/utils';
import type { DocsContextProps } from '../../../../../app/docs/provider';

interface GetFiltersProps {
  content: CodeSnippetsProps[];
  activeRenderer: DocsContextProps['activeRenderer'];
}

export const getFilters = ({ content, activeRenderer }: GetFiltersProps) => {
  // Filter content by renderer
  const filterByRenderer = content.filter((item) => {
    if (item.renderer === activeRenderer) return true;
    return false;
  });

  const listOfLanguages = [
    ...new Set(filterByRenderer.map((obj) => obj.language)),
  ].filter((r) => r !== null && r !== undefined) as string[];

  const languagesWithData = listOfLanguages
    .map((obj) => languages.find((r) => r.id === obj))
    .filter((r) => r !== null && r !== undefined);

  // Package managers
  const transformPackageManager = content.map((pm) => {
    if (pm.packageManager === 'npx') return 'npm';
    return pm.packageManager;
  });

  // Removing duplicates, null and undefined values
  const listOfPm = [...new Set(transformPackageManager)].filter(
    (r) => r !== null && r !== undefined,
  ) as string[];

  // Add the right data for each package manager
  const PmWithData = listOfPm.map((obj) =>
    packageManagers.find((r) => r.id === obj),
  );

  return {
    languages: languagesWithData,
    packageManagers: PmWithData,
  } as CodeSnippetsFiltersProps;
};
