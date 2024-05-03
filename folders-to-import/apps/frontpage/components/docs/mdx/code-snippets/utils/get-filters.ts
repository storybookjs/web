import {
  CodeSnippetsFiltersProps,
  CodeSnippetsProps,
  languages,
  packageManagers,
} from '@utils';

interface Props {
  codeSnippetsContent: CodeSnippetsProps[];
}

export const getFilters = ({ codeSnippetsContent }: Props) => {
  const listOfLanguages = [
    ...new Set(codeSnippetsContent.map((obj) => obj.language)),
  ].filter((r) => r !== null) as string[];

  const languagesWithData = listOfLanguages.map((obj) =>
    languages.find((r) => r.id === obj)
  );

  // Package managers
  const transformPackageManager = codeSnippetsContent.map((pm) => {
    if (pm.packageManager === 'npx') return 'npm';
    return pm.packageManager;
  });

  // Removing duplicates and null values
  const listOfPm = [...new Set(transformPackageManager)].filter(
    (r) => r !== null
  ) as string[];

  // Add the right data for each package manager
  const PmWithData = listOfPm.map((obj) =>
    packageManagers.find((r) => r.id === obj)
  );

  return {
    languages: languagesWithData,
    packageManagers: PmWithData,
  } as CodeSnippetsFiltersProps;
};
