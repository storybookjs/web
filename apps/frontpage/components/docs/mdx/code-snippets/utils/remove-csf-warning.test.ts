import { describe, expect, it } from 'vitest';
import { removeCsfWarning } from './remove-csf-warning';

const warning =
  '⚠️ CSF versions 1, 2, and 3 will be removed in a future version of Storybook. Upgrade to CSF 4: https://storybook.js.org/docs/writing-stories/csf#upgrade-to-csf-4';

describe('removeCsfWarning', () => {
  it('removes a `//` comment', () => {
    expect(removeCsfWarning(`// ${warning}\nimport a from 'a';`)).toBe("import a from 'a';");
  });

  it('removes a `<!--` comment', () => {
    expect(removeCsfWarning(`<!-- ${warning} -->\n<Meta />`)).toBe('<Meta />');
  });

  it('removes a `{/*` comment', () => {
    expect(removeCsfWarning(`{/* ${warning} */}\n<Meta />`)).toBe('<Meta />');
  });

  it('removes a CRLF line ending', () => {
    expect(removeCsfWarning(`// ${warning}\r\nconst a = 1;`)).toBe('const a = 1;');
  });

  it('removes the comment when it is the only line', () => {
    expect(removeCsfWarning(`// ${warning}`)).toBe('');
  });

  it('keeps other first-line comments', () => {
    const code = '// Replace your-framework with the framework you are using\nconst a = 1;';
    expect(removeCsfWarning(code)).toBe(code);
  });

  it('keeps the warning when it is not the first line', () => {
    const code = `const a = 1;\n// ${warning}`;
    expect(removeCsfWarning(code)).toBe(code);
  });

  it('removes only the first line', () => {
    expect(removeCsfWarning(`// ${warning}\n// Second comment\nconst a = 1;`)).toBe(
      '// Second comment\nconst a = 1;',
    );
  });
});
