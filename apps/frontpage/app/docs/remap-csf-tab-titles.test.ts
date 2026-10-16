import { describe, expect, it, beforeEach } from 'vitest';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { cookieSnippetTabsId } from '../../constants';
import {
  docsVersionOffersRenamedCsfTabs,
  migrateStoredSnippetTabs,
  migrateStoredSnippetTabsCookie,
  remapCsfTabTitle,
} from './remap-csf-tab-titles';

describe('remapCsfTabTitle', () => {
  it('remaps the plain legacy title', () => {
    expect(remapCsfTabTitle('CSF 3')).toBe('CSF (Legacy)');
  });

  it('remaps the experimental CSF Next title', () => {
    expect(remapCsfTabTitle('CSF Next 🧪')).toBe('CSF');
  });

  it('remaps parenthesized qualifiers without nesting parens', () => {
    expect(remapCsfTabTitle('Head (CSF 3)')).toBe('Head (CSF Legacy)');
    expect(remapCsfTabTitle('Head (CSF Legacy)')).toBe('Head (CSF Legacy)');
  });

  it('passes through titles that match no rename entry', () => {
    expect(remapCsfTabTitle('Svelte CSF')).toBe('Svelte CSF');
    expect(remapCsfTabTitle('vite-env')).toBe('vite-env');
  });

  it('passes through already-renamed titles', () => {
    expect(remapCsfTabTitle('CSF')).toBe('CSF');
    expect(remapCsfTabTitle('CSF (Legacy)')).toBe('CSF (Legacy)');
  });

  describe('reverse direction (page offers the pre-rename titles)', () => {
    it('remaps the plain legacy title back to CSF 3', () => {
      expect(
        remapCsfTabTitle('CSF (Legacy)', ['CSF 3', 'CSF Next 🧪']),
      ).toBe('CSF 3');
    });

    it('remaps the plain current title back to CSF Next 🧪, not CSF 3', () => {
      expect(remapCsfTabTitle('CSF', ['CSF 3', 'CSF Next 🧪'])).toBe(
        'CSF Next 🧪',
      );
    });

    it('remaps compound titles back to their pre-rename forms', () => {
      expect(
        remapCsfTabTitle('Head (CSF)', ['Head (CSF 3)', 'Head (CSF Next 🧪)']),
      ).toBe('Head (CSF Next 🧪)');
      expect(
        remapCsfTabTitle('Head (CSF Legacy)', [
          'Head (CSF 3)',
          'Head (CSF Next 🧪)',
        ]),
      ).toBe('Head (CSF 3)');
    });

    it('never corrupts values through substring inversion', () => {
      // 'CSF 3' contains 'CSF' and '(CSF Legacy)' contains 'CSF', so a naive
      // replaceAll in this direction would yield e.g. 'CSF Next 🧪 3'.
      expect(remapCsfTabTitle('CSF 3', ['CSF 3', 'CSF Next 🧪'])).toBe('CSF 3');
      expect(
        remapCsfTabTitle('CSF Next 🧪', ['CSF 3', 'CSF Next 🧪']),
      ).toBe('CSF Next 🧪');
      expect(remapCsfTabTitle('Svelte CSF', ['CSF 3', 'CSF Next 🧪'])).toBe(
        'Svelte CSF',
      );
    });

    it('passes through when the page offers no pre-rename target', () => {
      expect(remapCsfTabTitle('CSF (Legacy)', ['CSF Next 🧪'])).toBe(
        'CSF (Legacy)',
      );
      expect(remapCsfTabTitle('CSF', ['CSF 3'])).toBe('CSF');
      expect(remapCsfTabTitle('Head (CSF)', ['Head (CSF 3)'])).toBe(
        'Head (CSF)',
      );
    });

    it('leaves values untouched on pages offering neither title generation', () => {
      expect(remapCsfTabTitle('CSF (Legacy)', ['vite-env'])).toBe(
        'CSF (Legacy)',
      );
      expect(remapCsfTabTitle('CSF', ['Svelte CSF'])).toBe('CSF');
    });
  });

  it('only remaps when the page offers the target tab', () => {
    expect(remapCsfTabTitle('CSF 3', ['CSF'])).toBe('CSF 3');
    expect(remapCsfTabTitle('CSF 3', ['CSF (Legacy)'])).toBe('CSF (Legacy)');
    expect(remapCsfTabTitle('CSF Next 🧪', ['CSF'])).toBe('CSF');
    expect(
      remapCsfTabTitle('CSF Next 🧪', ['CSF 3', 'CSF Next 🧪']),
    ).toBe('CSF Next 🧪');
    expect(remapCsfTabTitle('Head (CSF 3)', ['CSF (Legacy)'])).toBe(
      'Head (CSF 3)',
    );
    expect(
      remapCsfTabTitle('Head (CSF 3)', ['Head (CSF Legacy)']),
    ).toBe('Head (CSF Legacy)');
  });
});

describe('migrateStoredSnippetTabs', () => {
  it('remaps only values whose target the page offers, preserving MRU order', () => {
    const { tabs, changed } = migrateStoredSnippetTabs(
      ['CSF 3', 'vite-env', 'CSF Next 🧪'],
      ['CSF (Legacy)', 'CSF'],
    );
    expect(tabs).toEqual(['CSF (Legacy)', 'vite-env', 'CSF']);
    expect(changed).toBe(true);
  });

  it('changes nothing when the page offers no target tab', () => {
    const { tabs, changed } = migrateStoredSnippetTabs(
      ['CSF 3', 'CSF Next 🧪'],
      ['vite-env'],
    );
    expect(tabs).toEqual(['CSF 3', 'CSF Next 🧪']);
    expect(changed).toBe(false);
  });

  it('remaps stored new-title values back on a pre-rename page, preserving MRU order', () => {
    const { tabs, changed } = migrateStoredSnippetTabs(
      ['CSF', 'vite-env', 'CSF (Legacy)'],
      ['CSF 3', 'CSF Next 🧪'],
    );
    expect(tabs).toEqual(['CSF Next 🧪', 'vite-env', 'CSF 3']);
    expect(changed).toBe(true);
  });

  it('changes nothing on a pre-rename page whose offered tabs miss the targets', () => {
    expect(migrateStoredSnippetTabs(['CSF (Legacy)'], ['CSF Next 🧪'])).toEqual({
      tabs: ['CSF (Legacy)'],
      changed: false,
    });
    expect(migrateStoredSnippetTabs(['CSF'], ['CSF 3'])).toEqual({
      tabs: ['CSF'],
      changed: false,
    });
  });
});

describe('migrateStoredSnippetTabsCookie', () => {
  beforeEach(() => {
    deleteCookie(cookieSnippetTabsId);
  });

  it('rewrites the stored cookie when the page offers the target tab', () => {
    setCookie(cookieSnippetTabsId, 'CSF 3,vite-env');

    const result = migrateStoredSnippetTabsCookie(['CSF (Legacy)', 'CSF']);

    expect(result).toEqual({
      tabs: ['CSF (Legacy)', 'vite-env'],
      changed: true,
    });
    expect(getCookie(cookieSnippetTabsId)).toBe('CSF (Legacy),vite-env');
  });

  it('leaves the stored cookie untouched when the page offers no target tab', () => {
    setCookie(cookieSnippetTabsId, 'CSF 3,vite-env');

    const result = migrateStoredSnippetTabsCookie(['vite-env']);

    expect(result).toEqual({ tabs: ['CSF 3', 'vite-env'], changed: false });
    expect(getCookie(cookieSnippetTabsId)).toBe('CSF 3,vite-env');
  });

  it('rewrites the stored cookie back to the pre-rename titles the page offers', () => {
    setCookie(cookieSnippetTabsId, 'CSF (Legacy),CSF,vite-env');

    const result = migrateStoredSnippetTabsCookie(['CSF 3', 'CSF Next 🧪']);

    expect(result).toEqual({
      tabs: ['CSF 3', 'CSF Next 🧪', 'vite-env'],
      changed: true,
    });
    expect(getCookie(cookieSnippetTabsId)).toBe('CSF 3,CSF Next 🧪,vite-env');
  });

  it('leaves the stored cookie untouched when the page offers no pre-rename target', () => {
    setCookie(cookieSnippetTabsId, 'CSF (Legacy),vite-env');

    const result = migrateStoredSnippetTabsCookie(['CSF Next 🧪']);

    expect(result).toEqual({
      tabs: ['CSF (Legacy)', 'vite-env'],
      changed: false,
    });
    expect(getCookie(cookieSnippetTabsId)).toBe('CSF (Legacy),vite-env');
  });

  it('leaves the stored cookie untouched when only unoffered reverse targets apply', () => {
    setCookie(cookieSnippetTabsId, 'CSF,vite-env');

    const result = migrateStoredSnippetTabsCookie(['CSF 3']);

    expect(result).toEqual({ tabs: ['CSF', 'vite-env'], changed: false });
    expect(getCookie(cookieSnippetTabsId)).toBe('CSF,vite-env');
  });

  it('does nothing when no cookie is stored', () => {
    const result = migrateStoredSnippetTabsCookie(['CSF']);

    expect(result).toBeNull();
    expect(getCookie(cookieSnippetTabsId)).toBeUndefined();
  });
});

describe('docsVersionOffersRenamedCsfTabs', () => {
  it('offers the renamed titles on version 11 and later', () => {
    expect(docsVersionOffersRenamedCsfTabs({ id: '11.0', label: 'Version 11' })).toBe(
      true,
    );
    expect(docsVersionOffersRenamedCsfTabs({ id: '12.0', label: 'Version 12' })).toBe(
      true,
    );
  });

  it('keeps the pre-rename titles on older pinned versions', () => {
    expect(
      docsVersionOffersRenamedCsfTabs({ id: '10.6', label: 'Version 10.6' }),
    ).toBe(false);
    expect(docsVersionOffersRenamedCsfTabs({ id: '9.1', label: 'Version 9' })).toBe(
      false,
    );
    expect(docsVersionOffersRenamedCsfTabs({ id: '8.6', label: 'Version 8' })).toBe(
      false,
    );
  });
});
