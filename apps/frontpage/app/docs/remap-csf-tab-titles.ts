import { getCookie, setCookie } from 'cookies-next';
import type { DocsVersion } from '@repo/utils';
import { cookieSnippetTabsId } from '../../constants';

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
 * A tab title that only exists on pages carrying the renamed (v11+) CSF tab
 * titles: the plain forms (`CSF`, `CSF (Legacy)`) or a parenthesized-qualifier
 * compound (`Head (CSF)`, `Head (CSF Legacy)`). Matching is whole-title, so
 * unrelated titles (`Svelte CSF`) never count.
 */
const RENAMED_CSF_TAB_TITLE_PATTERN =
  /(?:^CSF$|^CSF \(Legacy\)$)| \(CSF(?: Legacy)?\)$/;

/**
 * A tab title that only exists on pages carrying the pre-rename CSF tab titles:
 * the plain forms (`CSF 3`, `CSF Next 🧪`) or a parenthesized-qualifier compound
 * (`Head (CSF 3)`, `Head (CSF Next 🧪)`).
 */
const PRE_RENAME_CSF_TAB_TITLE_PATTERN =
  /(?:^CSF 3$|^CSF Next 🧪$)| \(CSF(?: 3| Next 🧪)\)$/;

/**
 * Which way stored snippet-tab preferences should be remapped, derived from the
 * tabs the current page actually offers: pages carrying the renamed titles remap
 * old→new, pages carrying the pre-rename titles remap new→old, and pages
 * carrying neither keep every stored value untouched. Without the offered tabs
 * (`undefined`) the pre-existing forward behavior applies.
 */
function deriveCsfTabMigrationDirection(
  availableTabTitles?: readonly string[],
): 'forward' | 'reverse' | 'none' {
  if (availableTabTitles === undefined) return 'forward';

  if (
    availableTabTitles.some((title) => RENAMED_CSF_TAB_TITLE_PATTERN.test(title))
  ) {
    return 'forward';
  }

  if (
    availableTabTitles.some((title) =>
      PRE_RENAME_CSF_TAB_TITLE_PATTERN.test(title),
    )
  ) {
    return 'reverse';
  }

  return 'none';
}

/**
 * Whole-title inverses of the {@link CSF_TAB_TITLE_RENAMES} entries, applied in
 * reverse order. Plain titles match by exact equality and compound titles by
 * the parenthesized-qualifier suffix the forward rename produced — substring
 * inversion is deliberately not used, because it is unsafe in this direction
 * (`CSF 3` contains `CSF`, `(CSF Legacy)` contains `CSF`).
 */
const CSF_TAB_TITLE_RENAMES_REVERSE: readonly {
  matches: (tabTitle: string) => boolean;
  target: (tabTitle: string) => string;
}[] = [
  // Inverse of ['CSF 3', 'CSF (Legacy)'] — plain titles only.
  {
    matches: (tabTitle) => tabTitle === 'CSF (Legacy)',
    target: () => 'CSF 3',
  },
  // Inverse of ['CSF Next 🧪', 'CSF'] — plain titles, plus the compound forms
  // the parenthesized qualifier produced (`Head (CSF Next 🧪)` → `Head (CSF)`).
  {
    matches: (tabTitle) => tabTitle === 'CSF' || tabTitle.endsWith(' (CSF)'),
    target: (tabTitle) =>
      tabTitle === 'CSF'
        ? 'CSF Next 🧪'
        : `${tabTitle.slice(0, -' (CSF)'.length)} (CSF Next 🧪)`,
  },
  // Inverse of ['(CSF 3)', '(CSF Legacy)'] — the parenthesized qualifiers.
  {
    matches: (tabTitle) => tabTitle.endsWith(' (CSF Legacy)'),
    target: (tabTitle) =>
      `${tabTitle.slice(0, -' (CSF Legacy)'.length)} (CSF 3)`,
  },
];

function remapCsfTabTitleReverse(
  tabTitle: string,
  availableTabTitles: readonly string[] | undefined,
): string {
  for (const { matches, target } of CSF_TAB_TITLE_RENAMES_REVERSE) {
    if (!matches(tabTitle)) continue;

    const remapped = target(tabTitle);
    const isTargetOffered =
      availableTabTitles === undefined || availableTabTitles.includes(remapped);

    if (!isTargetOffered) continue;

    return remapped;
  }

  return tabTitle;
}

function remapCsfTabTitleForward(
  tabTitle: string,
  availableTabTitles: readonly string[] | undefined,
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
 * Remap a stored snippet-tab title through the CSF rename migration, in the
 * direction the current page dictates: pages offering the renamed titles apply
 * the forward {@link CSF_TAB_TITLE_RENAMES} (old→new), pages offering the
 * pre-rename titles apply its inverse (new→old) — so a reader keeps their tab
 * whichever generation of titles the page carries, and the stored cookie is
 * rewritten to the title the page actually offers.
 *
 * Matching is whole-title, and every remap is conservative: values that match
 * no entry (e.g. `Svelte CSF`) pass through untouched, and a remap is only
 * adopted when the target tab exists on the page — docs versions pinned to
 * other refs keep the titles they have, and the cookie is site-wide.
 */
export function remapCsfTabTitle(
  tabTitle: string,
  availableTabTitles?: readonly string[],
): string {
  switch (deriveCsfTabMigrationDirection(availableTabTitles)) {
    case 'reverse':
      return remapCsfTabTitleReverse(tabTitle, availableTabTitles);
    case 'none':
      return tabTitle;
    default:
      return remapCsfTabTitleForward(tabTitle, availableTabTitles);
  }
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

/**
 * Migrate stored snippet-tab preferences through the RENAMES list, conservatively: a
 * value is only remapped when `availableTabTitles` — the tabs the current page
 * actually offers — contains its target. MRU order is preserved and unmatched values
 * pass through untouched. `changed` says whether any stored value was rewritten, i.e.
 * whether the store should be written back.
 */
export function migrateStoredSnippetTabs(
  storedTabs: readonly string[],
  availableTabTitles?: readonly string[],
): { tabs: string[]; changed: boolean } {
  const tabs = storedTabs.map((tab) => remapCsfTabTitle(tab, availableTabTitles));
  return {
    tabs,
    changed: tabs.some((tab, index) => tab !== storedTabs[index]),
  };
}

/**
 * Read-migrate-write for the site-wide `sb-docs-snippet-tabs` cookie: reads the
 * stored values, migrates them conservatively against `availableTabTitles` (the tabs
 * the current page offers), writes the cookie back only when a value actually
 * changed, and returns the migrated MRU list. Callers that hold the tabs the current
 * page offers must decide when to invoke this — a page that offers no renamed tab
 * leaves the cookie untouched.
 */
export function migrateStoredSnippetTabsCookie(
  availableTabTitles?: readonly string[],
): { tabs: string[]; changed: boolean } | null {
  const cookie = getCookie(cookieSnippetTabsId);
  if (!cookie) return null;

  const { tabs, changed } = migrateStoredSnippetTabs(
    cookie.split(',').map(decodeURIComponent),
    availableTabTitles,
  );

  if (changed) {
    setCookie(cookieSnippetTabsId, tabs.join(','));
  }

  return { tabs, changed };
}
