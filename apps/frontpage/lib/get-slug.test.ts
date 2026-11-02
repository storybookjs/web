import { describe, expect, it, vi } from 'vitest';
import { getSlug } from './get-slug';

vi.mock('@repo/utils', () => ({
  latestVersion: { id: '10.6' },
  docsVersions: [
    { id: '10.6' },
    { id: '11.0', inSlug: '11' },
    { id: '9.1', inSlug: '9' },
  ],
}));

describe('getSlug', () => {
  describe('latest version', () => {
    it('drops the version and extension', () => {
      expect(
        getSlug(
          'content/docs/10.6/writing-tests/integrations/vitest-addon/migration-guide.mdx',
        ),
      ).toBe('/docs/writing-tests/integrations/vitest-addon/migration-guide');
    });

    it('resolves an index page to its directory', () => {
      expect(
        getSlug(
          'content/docs/10.6/writing-tests/integrations/vitest-addon/index.mdx',
        ),
      ).toBe('/docs/writing-tests/integrations/vitest-addon');
    });

    it('handles .md files', () => {
      expect(getSlug('content/docs/10.6/api/csf/index.md')).toBe(
        '/docs/api/csf',
      );
    });

    it('handles directories', () => {
      expect(getSlug('content/docs/10.6/api/csf')).toBe('/docs/api/csf');
    });
  });

  describe('other versions', () => {
    it('uses inSlug for a non-index page', () => {
      expect(
        getSlug(
          'content/docs/11.0/writing-tests/integrations/vitest-addon/migration-guide.mdx',
        ),
      ).toBe('/docs/11/writing-tests/integrations/vitest-addon/migration-guide');
    });

    it('uses inSlug for an index page', () => {
      expect(getSlug('content/docs/9.1/api/csf/index.mdx')).toBe(
        '/docs/9/api/csf',
      );
    });
  });
});
