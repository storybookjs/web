import { describe, expect, it, vi } from 'vitest';
import { resolveMarkdownLinks } from './resolve-doc-for-llm';

const latestVersion = { id: '10.2', label: 'Version 10.2' };
const olderVersion = { id: '9.1', label: 'Version 9', inSlug: '9' };

vi.mock('@repo/utils', () => ({
  latestVersion: { id: '10.2', label: 'Version 10.2' },
  docsVersions: [
    { id: '10.2', label: 'Version 10.2' },
    { id: '9.1', label: 'Version 9', inSlug: '9' },
  ],
  renderers: [
    { id: 'react', title: 'React' },
    { id: 'vue', title: 'Vue' },
  ],
}));

describe('resolveMarkdownLinks', () => {
  describe('latest version', () => {
    it('resolves relative ./ links on index pages', () => {
      const result = resolveMarkdownLinks(
        'See [Args](./args.mdx) for more.',
        {
          activeVersion: latestVersion,
          pagePath: ['10.2', 'writing-stories'],
          isIndexPage: true,
          baseUrl: 'https://storybook.js.org',
        },
      );
      expect(result).toBe(
        'See [Args](https://storybook.js.org/docs/writing-stories/args.md) for more.',
      );
    });

    it('resolves relative ../ links on index pages', () => {
      const result = resolveMarkdownLinks(
        'See [Testing](../writing-tests/index.mdx) for more.',
        {
          activeVersion: latestVersion,
          pagePath: ['10.2', 'writing-stories'],
          isIndexPage: true,
          baseUrl: 'https://storybook.js.org',
        },
      );
      expect(result).toBe(
        'See [Testing](https://storybook.js.org/docs/writing-tests.md) for more.',
      );
    });

    it('resolves relative ./ links on non-index pages', () => {
      const result = resolveMarkdownLinks(
        'See [Tags](./tags.mdx) for more.',
        {
          activeVersion: latestVersion,
          pagePath: ['10.2', 'writing-stories', 'args'],
          isIndexPage: false,
          baseUrl: 'https://storybook.js.org',
        },
      );
      expect(result).toBe(
        'See [Tags](https://storybook.js.org/docs/writing-stories/tags.md) for more.',
      );
    });

    it('resolves relative ../ links on non-index pages', () => {
      const result = resolveMarkdownLinks(
        'See [Testing](../writing-tests/index.mdx) for more.',
        {
          activeVersion: latestVersion,
          pagePath: ['10.2', 'writing-stories', 'args'],
          isIndexPage: false,
          baseUrl: 'https://storybook.js.org',
        },
      );
      expect(result).toBe(
        'See [Testing](https://storybook.js.org/docs/writing-tests.md) for more.',
      );
    });
  });

  describe('non-latest version', () => {
    it('includes version slug in resolved URLs', () => {
      const result = resolveMarkdownLinks(
        'See [Args](./args.mdx) for more.',
        {
          activeVersion: olderVersion,
          pagePath: ['9.1', 'writing-stories'],
          isIndexPage: true,
          baseUrl: 'https://storybook.js.org',
        },
      );
      expect(result).toBe(
        'See [Args](https://storybook.js.org/docs/9/writing-stories/args.md) for more.',
      );
    });

    it('resolves ../ links with version slug', () => {
      const result = resolveMarkdownLinks(
        'See [Testing](../writing-tests/index.mdx).',
        {
          activeVersion: olderVersion,
          pagePath: ['9.1', 'writing-stories', 'args'],
          isIndexPage: false,
          baseUrl: 'https://storybook.js.org',
        },
      );
      expect(result).toBe(
        'See [Testing](https://storybook.js.org/docs/9/writing-tests.md).',
      );
    });
  });

  describe('link types to skip', () => {
    it('preserves external links', () => {
      const result = resolveMarkdownLinks(
        'See [React](https://reactjs.org) for more.',
        {
          activeVersion: latestVersion,
          pagePath: ['10.2', 'writing-stories'],
          isIndexPage: true,
          baseUrl: 'https://storybook.js.org',
        },
      );
      expect(result).toBe('See [React](https://reactjs.org) for more.');
    });

    it('preserves hash-only links', () => {
      const result = resolveMarkdownLinks(
        'See [below](#details) for more.',
        {
          activeVersion: latestVersion,
          pagePath: ['10.2', 'writing-stories'],
          isIndexPage: true,
          baseUrl: 'https://storybook.js.org',
        },
      );
      expect(result).toBe('See [below](#details) for more.');
    });

    it('preserves absolute path links', () => {
      const result = resolveMarkdownLinks(
        'See [Home](/docs/get-started) for more.',
        {
          activeVersion: latestVersion,
          pagePath: ['10.2', 'writing-stories'],
          isIndexPage: true,
          baseUrl: 'https://storybook.js.org',
        },
      );
      expect(result).toBe('See [Home](/docs/get-started) for more.');
    });

    it('does not transform image references', () => {
      const result = resolveMarkdownLinks(
        '![Screenshot](./screenshot.png)',
        {
          activeVersion: latestVersion,
          pagePath: ['10.2', 'writing-stories'],
          isIndexPage: true,
          baseUrl: 'https://storybook.js.org',
        },
      );
      expect(result).toBe('![Screenshot](./screenshot.png)');
    });
  });

  describe('hash fragments', () => {
    it('preserves hash fragments in resolved links', () => {
      const result = resolveMarkdownLinks(
        'See [Migration](./migration-guide.mdx#major-breaking-changes).',
        {
          activeVersion: latestVersion,
          pagePath: ['10.2', 'writing-stories'],
          isIndexPage: true,
          baseUrl: 'https://storybook.js.org',
        },
      );
      expect(result).toBe(
        'See [Migration](https://storybook.js.org/docs/writing-stories/migration-guide.md#major-breaking-changes).',
      );
    });
  });

  describe('multiple links', () => {
    it('resolves all links in the same content', () => {
      const result = resolveMarkdownLinks(
        'See [Args](./args.mdx) and [Tags](./tags.mdx) for more.',
        {
          activeVersion: latestVersion,
          pagePath: ['10.2', 'writing-stories'],
          isIndexPage: true,
          baseUrl: 'https://storybook.js.org',
        },
      );
      expect(result).toBe(
        'See [Args](https://storybook.js.org/docs/writing-stories/args.md) and [Tags](https://storybook.js.org/docs/writing-stories/tags.md) for more.',
      );
    });

    it('handles mix of internal and external links', () => {
      const result = resolveMarkdownLinks(
        'See [Args](./args.mdx) and [React](https://reactjs.org).',
        {
          activeVersion: latestVersion,
          pagePath: ['10.2', 'writing-stories'],
          isIndexPage: true,
          baseUrl: 'https://storybook.js.org',
        },
      );
      expect(result).toBe(
        'See [Args](https://storybook.js.org/docs/writing-stories/args.md) and [React](https://reactjs.org).',
      );
    });
  });

  describe('cross-version links', () => {
    it('transforms release-X-Y/docs paths', () => {
      const result = resolveMarkdownLinks(
        'See [Migration](../../release-7-6/docs/migration-guide.mdx).',
        {
          activeVersion: latestVersion,
          pagePath: ['10.2', 'writing-stories'],
          isIndexPage: true,
          baseUrl: 'https://storybook.js.org',
        },
      );
      expect(result).toBe(
        'See [Migration](https://storybook.js.org/docs/7/migration-guide.md).',
      );
    });
  });

  describe('baseUrl', () => {
    it('uses the provided baseUrl in resolved links', () => {
      const result = resolveMarkdownLinks(
        'See [Args](./args.mdx) for more.',
        {
          activeVersion: latestVersion,
          pagePath: ['10.2', 'writing-stories'],
          isIndexPage: true,
          baseUrl: 'http://localhost:3000',
        },
      );
      expect(result).toBe(
        'See [Args](http://localhost:3000/docs/writing-stories/args.md) for more.',
      );
    });
  });
});
