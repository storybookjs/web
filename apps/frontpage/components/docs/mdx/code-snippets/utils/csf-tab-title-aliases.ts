/**
 * Pre-rename → renamed suffixes of CSF snippet tab titles (`CSF 3` → `CSF (Legacy)`,
 * `Head (CSF 3)` → `Head (CSF Legacy)`). The rename happens in the storybookjs/storybook
 * `docs/_snippets` files, but only on newer docs versions, so the site-wide
 * `sb-docs-snippet-tabs` cookie can hold titles from either generation.
 *
 * Parenthesized suffixes come first, so `Head (CSF)` is not read as a plain `CSF` title.
 */
const CSF_TAB_TITLE_SUFFIX_RENAMES: readonly (readonly [string, string])[] = [
  ['(CSF Next 🧪)', '(CSF)'],
  ['(CSF 3)', '(CSF Legacy)'],
  ['CSF Next 🧪', 'CSF'],
  ['CSF 3', 'CSF (Legacy)'],
];

/**
 * The other generation's title for a CSF snippet tab, if its title ends with a renamed
 * suffix. Titles that were never renamed can also get an alias (`Svelte CSF` →
 * `Svelte CSF Next 🧪`), but no page offers it, so it never matches a tab.
 */
export const getCsfTabTitleAlias = (tabTitle: string) => {
  for (const [before, after] of CSF_TAB_TITLE_SUFFIX_RENAMES) {
    for (const [from, to] of [
      [before, after],
      [after, before],
    ]) {
      if (tabTitle === from || tabTitle.endsWith(` ${from}`)) {
        return `${tabTitle.slice(0, -from.length)}${to}`;
      }
    }
  }
  return undefined;
};
