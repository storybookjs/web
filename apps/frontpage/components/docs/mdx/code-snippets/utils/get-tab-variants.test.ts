import { describe, expect, it } from 'vitest';
import { getTabVariants } from './get-tab-variants';

describe('getTabVariants', () => {
  it('returns only the id when it contains no aliased name', () => {
    expect(getTabVariants('CSF 3')).toEqual(['CSF 3']);
    expect(getTabVariants('Vite (CSF 3)')).toEqual(['Vite (CSF 3)']);
  });

  it('aliases the old name to the new name', () => {
    expect(getTabVariants('CSF Next 🧪')).toEqual(['CSF Next 🧪', 'CSF 4']);
  });

  it('aliases the new name to the old name', () => {
    expect(getTabVariants('CSF 4')).toEqual(['CSF 4', 'CSF Next 🧪']);
  });

  it('aliases a name inside parentheses', () => {
    expect(getTabVariants('Vite (CSF Next 🧪)')).toEqual(['Vite (CSF Next 🧪)', 'Vite (CSF 4)']);
    expect(getTabVariants('With Webpack (CSF 4)')).toEqual([
      'With Webpack (CSF 4)',
      'With Webpack (CSF Next 🧪)',
    ]);
  });

  it('aliases a name at the end of the id', () => {
    expect(getTabVariants('story CSF 4')).toEqual(['story CSF 4', 'story CSF Next 🧪']);
  });

  it('returns a variant for each other name in a group', () => {
    const aliases = [['A', 'B', 'C']];
    expect(getTabVariants('x (A)', aliases)).toEqual(['x (A)', 'x (B)', 'x (C)']);
  });

  it('applies each matching group', () => {
    const aliases = [
      ['A', 'B'],
      ['X', 'Y'],
    ];
    expect(getTabVariants('A X', aliases)).toEqual(['A X', 'B X', 'A Y']);
  });
});
