import { describe, expect, it } from 'vitest';
import { getCsfTabTitleAlias } from './csf-tab-title-aliases';

describe('getCsfTabTitleAlias', () => {
  it('maps pre-rename titles to renamed titles', () => {
    expect(getCsfTabTitleAlias('CSF 3')).toBe('CSF (Legacy)');
    expect(getCsfTabTitleAlias('CSF Next 🧪')).toBe('CSF');
    expect(getCsfTabTitleAlias('Head (CSF 3)')).toBe('Head (CSF Legacy)');
    expect(getCsfTabTitleAlias('Head (CSF Next 🧪)')).toBe('Head (CSF)');
    expect(getCsfTabTitleAlias('story CSF Next 🧪')).toBe('story CSF');
  });

  it('maps renamed titles back to pre-rename titles', () => {
    expect(getCsfTabTitleAlias('CSF (Legacy)')).toBe('CSF 3');
    expect(getCsfTabTitleAlias('CSF')).toBe('CSF Next 🧪');
    expect(getCsfTabTitleAlias('With Webpack (CSF Legacy)')).toBe('With Webpack (CSF 3)');
    expect(getCsfTabTitleAlias('With Webpack (CSF)')).toBe('With Webpack (CSF Next 🧪)');
    expect(getCsfTabTitleAlias('story CSF (Legacy)')).toBe('story CSF 3');
  });

  it('returns undefined for titles that were not renamed', () => {
    expect(getCsfTabTitleAlias('Svelte CSF')).toBeUndefined();
    expect(getCsfTabTitleAlias('vite-env')).toBeUndefined();
  });
});
