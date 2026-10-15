import { describe, expect, it } from 'vitest';
import {
  docsVersionOffersRenamedCsfTabs,
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
