/**
 * Pre-rename → renamed CSF snippet tab titles. The rename happens in the
 * storybookjs/storybook `docs/_snippets` files, but only on newer docs versions, so
 * the site-wide `sb-docs-snippet-tabs` cookie can hold titles from either generation.
 */
const CSF_TAB_TITLE_RENAMES: readonly (readonly [string, string])[] = [
  ['CSF 3', 'CSF (Legacy)'],
  ['CSF Next 🧪', 'CSF'],
  ['story CSF 3', 'story CSF (Legacy)'],
  ['story CSF Next 🧪', 'story CSF'],
  ...['Body', 'component', 'Head', 'library', 'Preview', 'Vite', 'Webpack', 'With Vite', 'With Webpack'].flatMap(
    (prefix) =>
      [
        [`${prefix} (CSF 3)`, `${prefix} (CSF Legacy)`],
        [`${prefix} (CSF Next 🧪)`, `${prefix} (CSF)`],
      ] as const,
  ),
];

const CSF_TAB_TITLE_ALIASES = new Map<string, string>(
  CSF_TAB_TITLE_RENAMES.flatMap(([before, after]) => [
    [before, after],
    [after, before],
  ]),
);

/** The other generation's title for a CSF snippet tab, if it was renamed. */
export const getCsfTabTitleAlias = (tabTitle: string) => CSF_TAB_TITLE_ALIASES.get(tabTitle);
