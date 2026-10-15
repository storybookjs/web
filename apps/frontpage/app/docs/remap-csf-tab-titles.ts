import type { DocsVersion } from '@repo/utils';

/**
 * Ordered old→new mappings for the CSF snippet tab rename.
 *
 * The tab titles change at the source in storybookjs/storybook (the `docs/_snippets`
 * fences); this list only migrates reader preferences — the `sb-docs-snippet-tabs`
 * cookie stores the very same strings, so stored values stop matching once upstream
 * titles change.
 *
 * Applied in order: parenthesized qualifiers first (simplified, no nested parens —
 * `Head (CSF 3)` → `Head (CSF Legacy)`), then plain titles.
 */
export const CSF_TAB_TITLE_RENAMES: readonly (readonly [string, string])[] = [
  ['(CSF 3)', '(CSF Legacy)'],
  ['CSF Next 🧪', 'CSF'],
  ['CSF 3', 'CSF (Legacy)'],
];

/**
 * Remap a stored snippet-tab title through the ordered {@link CSF_TAB_TITLE_RENAMES} list.
 *
 * Replacements are exact-string replaces inside the full stored title: values that
 * match no entry (e.g. `Svelte CSF`) pass through untouched, and already-renamed
 * titles are left as they are.
 *
 * When `availableTabTitles` is given (the tabs the current page actually offers), a
 * rename is only adopted when the target tab exists there — docs versions pinned to
 * pre-rename refs keep the old titles, and the cookie is site-wide.
 */
export function remapCsfTabTitle(
  tabTitle: string,
  availableTabTitles?: readonly string[],
): string {
  let result = tabTitle;

  for (const [from, to] of CSF_TAB_TITLE_RENAMES) {
    if (!result.includes(from)) continue;

    const remapped = result.replaceAll(from, to);
    const isTargetOffered =
      availableTabTitles === undefined || availableTabTitles.includes(remapped);

    if (!isTargetOffered) continue;

    result = remapped;
  }

  return result;
}

/**
 * The first docs version whose content carries the renamed CSF tab titles: the rename
 * ships on `next`, which publishes as version 11. Older pinned docs versions keep the
 * pre-rename titles.
 */
const CSF_TAB_RENAME_MAJOR_VERSION = 11;

/**
 * Whether a docs version's pages offer the renamed CSF tab titles. This is the
 * conservative gate for migrating the site-wide `sb-docs-snippet-tabs` cookie: stored
 * values may only be remapped when the current page is on a docs version that could
 * actually offer the target tab.
 */
export function docsVersionOffersRenamedCsfTabs(version: DocsVersion): boolean {
  const [major] = version.id.split('.').map(Number);
  return Number.isInteger(major) && major >= CSF_TAB_RENAME_MAJOR_VERSION;
}
