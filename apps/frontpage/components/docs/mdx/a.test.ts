import { describe, expect, it, vi } from 'vitest';
import { processHref } from './a';

const latestVersion = { id: '10.2', label: 'Version 10.2' };
const otherVersion = { id: '10.3', label: 'Version 10.3', inSlug: '10.3' };
const olderVersionWithDifferentSlug = { id: '9.1', label: 'Version 9', inSlug: '9' };

vi.mock('@repo/utils', () => ({
  latestVersion: { id: '10.2', label: 'Version 10.2' },
}));

describe('processHref', () => {
  describe('latest version', () => {
    it('resolves ./ on index page', () => {
      const result = processHref({
        activeVersion: latestVersion,
        href: './args.mdx',
        isIndexPage: true,
        pagePath: ['10.2', 'writing-stories'],
      });
      expect(result).toBe('/docs/writing-stories/args');
    });

    it('resolves ../ on index page', () => {
      const result = processHref({
        activeVersion: latestVersion,
        href: '../writing-tests/index.mdx',
        isIndexPage: true,
        pagePath: ['10.2', 'writing-stories'],
      });
      expect(result).toBe('/docs/writing-tests');
    });

    it('resolves ./ on non-index page', () => {
      const result = processHref({
        activeVersion: latestVersion,
        href: './tags.mdx',
        isIndexPage: false,
        pagePath: ['10.2', 'writing-stories', 'args'],
      });
      expect(result).toBe('/docs/writing-stories/tags');
    });

    it('resolves ../ on non-index page', () => {
      const result = processHref({
        activeVersion: latestVersion,
        href: '../writing-tests/index.mdx',
        isIndexPage: false,
        pagePath: ['10.2', 'writing-stories', 'args'],
      });
      expect(result).toBe('/docs/writing-tests');
    });
  });

  describe('non-latest version', () => {
    it('resolves ./ on index page', () => {
      const result = processHref({
        activeVersion: otherVersion,
        href: './args.mdx',
        isIndexPage: true,
        pagePath: ['10.3', 'writing-stories'],
      });
      expect(result).toBe('/docs/10.3/writing-stories/args');
    });

    it('resolves ../ on index page', () => {
      const result = processHref({
        activeVersion: otherVersion,
        href: '../writing-tests/index.mdx',
        isIndexPage: true,
        pagePath: ['10.3', 'writing-stories'],
      });
      expect(result).toBe('/docs/10.3/writing-tests');
    });

    it('resolves ./ on non-index page', () => {
      const result = processHref({
        activeVersion: otherVersion,
        href: './tags.mdx',
        isIndexPage: false,
        pagePath: ['10.3', 'writing-stories', 'args'],
      });
      expect(result).toBe('/docs/10.3/writing-stories/tags');
    });

    it('resolves ../ on non-index page', () => {
      const result = processHref({
        activeVersion: otherVersion,
        href: '../writing-tests/index.mdx',
        isIndexPage: false,
        pagePath: ['10.3', 'writing-stories', 'args'],
      });
      expect(result).toBe('/docs/10.3/writing-tests');
    });

    it('uses inSlug when different from id', () => {
      const result = processHref({
        activeVersion: olderVersionWithDifferentSlug,
        href: './args.mdx',
        isIndexPage: true,
        pagePath: ['9', 'writing-stories'],
      });
      expect(result).toBe('/docs/9/writing-stories/args');
    });
  });

  describe('href transformations', () => {
    it('transforms release-X-Y/docs paths to docs/X paths', () => {
      const result = processHref({
        activeVersion: latestVersion,
        href: '../../release-7-6/docs/migration-guide.mdx',
        isIndexPage: true,
        pagePath: ['10.2', 'writing-stories'],
      });
      expect(result).toBe('/docs/7/migration-guide');
    });

    it('transforms release-X-Y/docs paths to docs/X paths when not on latest version', () => {
      const result = processHref({
        activeVersion: otherVersion,
        href: '../../release-7-6/docs/migration-guide.mdx',
        isIndexPage: true,
        pagePath: ['10.2', 'writing-stories'],
      });
      expect(result).toBe('/docs/7/migration-guide');
    });

    it('preserves hash fragments when stripping .mdx', () => {
      const result = processHref({
        activeVersion: latestVersion,
        href: './migration-guide.mdx#major-breaking-changes',
        isIndexPage: true,
        pagePath: ['10.2', 'writing-stories'],
      });
      expect(result).toBe('/docs/writing-stories/migration-guide#major-breaking-changes');
    });
  });

  describe('edge cases', () => {
    it('handles multiple ../ navigations', () => {
      const result = processHref({
        activeVersion: latestVersion,
        href: '../../nested/path.mdx',
        isIndexPage: false,
        pagePath: ['10.2', 'writing-stories', 'args', 'deep'],
      });
      expect(result).toBe('/docs/nested/path');
    });

    it('handles deep nested paths', () => {
      const result = processHref({
        activeVersion: latestVersion,
        href: './deep/nested/path.mdx',
        isIndexPage: true,
        pagePath: ['10.2', 'writing-stories'],
      });
      expect(result).toBe('/docs/writing-stories/deep/nested/path');
    });

    it('handles single segment href without ./', () => {
      const result = processHref({
        activeVersion: latestVersion,
        href: 'args.mdx',
        isIndexPage: true,
        pagePath: ['10.2', 'writing-stories'],
      });
      expect(result).toBe('/docs/writing-stories/args');
    });

    it('ignores hash-only link', () => {
      const result = processHref({
        activeVersion: latestVersion,
        href: '#test-behavior',
        isIndexPage: false,
        pagePath: ['10.2', 'writing-tests', 'accessibility-testing'],
      });
      expect(result).toBe('#test-behavior');
    });
  });
});
