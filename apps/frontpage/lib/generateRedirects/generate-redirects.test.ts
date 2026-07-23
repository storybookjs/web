import { describe, expect, test } from 'vitest';
import {
  generateRedirects,
  generateInstallRedirects,
  generateSpecificPathRedirects,
  generateWildcardRedirects,
} from './generate-redirects';

// Only boundary-significant versions: era transitions and one representative per supported major.
// Unversioned: 6.0 | Versioned+renderer: 6.4, 7.0, 7.4 | Non-renderer: 7.5 | Supported system: 8.0, 8.6, 9.0, 9.1, 10.0, 10.3
const defaultHistorical = [
  '6.0',
  '6.4',
  '7.0',
  '7.4',
  '7.5',
  '8.0',
  '8.6',
  '9.0',
  '9.1',
  '10.0',
  '10.3',
];

const renderers = ['react', 'vue'];

describe('generateRedirects', () => {
  describe('Specific Path Redirects', () => {
    test('SP-1: Header at 6.4 (unversioned era only)', () => {
      const result = generateSpecificPathRedirects({
        rawRedirects: `# 6.4\n/docs/the/from/path /docs/the/to/path 301`,
        renderers,
        historicalVersions: defaultHistorical,
        supportedVersions: ['10.3', '9.1', '8.6'],
        latestVersion: '10.3',
        nextVersion: null,
      });

      expect(result).toEqual([
        ['/docs/react/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/vue/the/from/path', '/docs/the/to/path', '301'],
      ]);
    });

    test('SP-2: Header at 7.1 (versioned + renderer era)', () => {
      const result = generateSpecificPathRedirects({
        rawRedirects: `# 7.1\n/docs/the/from/path /docs/the/to/path 301`,
        renderers,
        historicalVersions: defaultHistorical,
        supportedVersions: ['10.3', '9.1', '8.6'],
        latestVersion: '10.3',
        nextVersion: null,
      });

      expect(result).toEqual([
        ['/docs/react/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/vue/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/6.4/react/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/6.4/vue/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/7.0/react/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/7.0/vue/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/7/react/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/7/vue/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/next/react/the/from/path', '/docs/the/to/path', '302'],
        ['/docs/next/vue/the/from/path', '/docs/the/to/path', '302'],
      ]);
    });

    test('SP-3: Header at 7.6 (spans renderer boundary)', () => {
      const result = generateSpecificPathRedirects({
        rawRedirects: `# 7.6\n/docs/the/from/path /docs/the/to/path 301`,
        renderers,
        historicalVersions: defaultHistorical,
        supportedVersions: ['10.3', '9.1', '8.6'],
        latestVersion: '10.3',
        nextVersion: null,
      });

      expect(result).toEqual([
        ['/docs/react/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/vue/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/6.4/react/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/6.4/vue/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/7.0/react/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/7.0/vue/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/7/react/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/7/vue/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/7.4/react/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/7.4/vue/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/next/react/the/from/path', '/docs/the/to/path', '302'],
        ['/docs/next/vue/the/from/path', '/docs/the/to/path', '302'],
        ['/docs/7.5/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/next/the/from/path', '/docs/the/to/path', '302'],
      ]);
    });

    test('SP-4a: Header at 8.2 (supported versions)', () => {
      const result = generateSpecificPathRedirects({
        rawRedirects: `# 8.2\n/docs/the/from/path /docs/the/to/path 301`,
        renderers,
        historicalVersions: defaultHistorical,
        supportedVersions: ['10.3', '9.1', '8.6'],
        latestVersion: '10.3',
        nextVersion: null,
      });

      expect(result).toEqual([
        ['/docs/react/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/vue/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/6.4/react/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/6.4/vue/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/7.0/react/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/7.0/vue/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/7/react/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/7/vue/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/7.4/react/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/7.4/vue/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/next/react/the/from/path', '/docs/the/to/path', '302'],
        ['/docs/next/vue/the/from/path', '/docs/the/to/path', '302'],
        ['/docs/7.5/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/8.0/the/from/path', '/docs/8/the/to/path', '301'],
        ['/docs/next/the/from/path', '/docs/the/to/path', '302'],
      ]);
    });

    test('SP-4b: Header at 11.0, latest 11.1 (latest-major special case)', () => {
      const historical = [
        '6.0',
        '6.4',
        '7.0',
        '7.4',
        '7.5',
        '8.0',
        '8.6',
        '9.0',
        '9.1',
        '10.0',
        '10.2',
        '11.0',
        '11.1',
      ];

      const result = generateSpecificPathRedirects({
        rawRedirects: `# 11.0\n/docs/the/from/path /docs/the/to/path 301`,
        renderers,
        historicalVersions: historical,
        supportedVersions: ['11.1', '10.2', '9.1'],
        latestVersion: '11.1',
        nextVersion: null,
      });

      expect(result).toEqual([
        ['/docs/react/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/vue/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/6.4/react/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/6.4/vue/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/7.0/react/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/7.0/vue/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/7/react/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/7/vue/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/7.4/react/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/7.4/vue/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/next/react/the/from/path', '/docs/the/to/path', '302'],
        ['/docs/next/vue/the/from/path', '/docs/the/to/path', '302'],
        ['/docs/7.5/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/8.0/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/8/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/8.6/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/9.0/the/from/path', '/docs/9/the/to/path', '301'],
        ['/docs/9.1/the/from/path', '/docs/9/the/to/path', '301'],
        ['/docs/10.0/the/from/path', '/docs/10/the/to/path', '301'],
        ['/docs/10.2/the/from/path', '/docs/10/the/to/path', '301'],
        ['/docs/11.0/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/11/the/from/path', '/docs/the/to/path', '301'],
        ['/docs/next/the/from/path', '/docs/the/to/path', '302'],
      ]);
    });

    test('preserves non-301 status codes from raw rules', () => {
      const result = generateSpecificPathRedirects({
        rawRedirects: `# 6.4\n/docs/the/from/path /docs/the/to/path 308`,
        renderers,
        historicalVersions: defaultHistorical,
        supportedVersions: ['10.3', '9.1', '8.6'],
        latestVersion: '10.3',
        nextVersion: null,
      });

      expect(result).toEqual([
        ['/docs/react/the/from/path', '/docs/the/to/path', '308'],
        ['/docs/vue/the/from/path', '/docs/the/to/path', '308'],
      ]);
    });

    test('to paths with hardcoded versions are used as-is', () => {
      const result = generateSpecificPathRedirects({
        rawRedirects: `# 8.2\n/docs/the/from/path /docs/8/writing-tests/storyshots-migration-guide 301`,
        renderers,
        historicalVersions: defaultHistorical,
        supportedVersions: ['10.3', '9.1', '8.6'],
        latestVersion: '10.3',
        nextVersion: null,
      });

      // All entries should use the hardcoded to path as-is
      for (const entry of result) {
        expect(entry[1]).toBe('/docs/8/writing-tests/storyshots-migration-guide');
      }
    });
  });

  describe('Wildcard Redirects', () => {
    test('WC-1: Latest 10.1, no pre-release', () => {
      const historical = [
        '6.0',
        '6.4',
        '7.0',
        '7.4',
        '7.5',
        '8.0',
        '8.6',
        '9.0',
        '9.1',
        '10.0',
        '10.1',
      ];

      const result = generateWildcardRedirects({
        rawRedirects: '',
        renderers,
        historicalVersions: historical,
        supportedVersions: ['10.1', '9.1', '8.6'],
        latestVersion: '10.1',
        nextVersion: null,
      });

      expect(result).toEqual([
        ['/docs/react/*', '/docs/:splat', '301'],
        ['/docs/vue/*', '/docs/:splat', '301'],
        ['/docs/6.4/react/*', '/docs/:splat', '301'],
        ['/docs/6.4/vue/*', '/docs/:splat', '301'],
        ['/docs/7.0/react/*', '/docs/:splat', '301'],
        ['/docs/7.0/vue/*', '/docs/:splat', '301'],
        ['/docs/7/react/*', '/docs/:splat', '301'],
        ['/docs/7/vue/*', '/docs/:splat', '301'],
        ['/docs/7.4/react/*', '/docs/:splat', '301'],
        ['/docs/7.4/vue/*', '/docs/:splat', '301'],
        ['/docs/next/react/*', '/docs/:splat', '302'],
        ['/docs/next/vue/*', '/docs/:splat', '302'],
        ['/docs/7.5/*', '/docs/:splat', '301'],
        ['/docs/8.0/*', '/docs/8/:splat', '301'],
        ['/docs/8.6/*', '/docs/8/:splat', '301'],
        ['/docs/9.0/*', '/docs/9/:splat', '301'],
        ['/docs/9.1/*', '/docs/9/:splat', '301'],
        ['/docs/10.0/*', '/docs/:splat', '302'],
        ['/docs/10/*', '/docs/:splat', '302'],
        ['/docs/10.1/*', '/docs/:splat', '302'],
        ['/docs/next/*', '/docs/:splat', '302'],
      ]);
    });

    test('WC-2: Latest 10.1, minor pre-release 10.2', () => {
      const historical = [
        '6.0',
        '6.4',
        '7.0',
        '7.4',
        '7.5',
        '8.0',
        '8.6',
        '9.0',
        '9.1',
        '10.0',
        '10.1',
      ];

      const result = generateWildcardRedirects({
        rawRedirects: '',
        renderers,
        historicalVersions: historical,
        supportedVersions: ['10.1', '9.1', '8.6'],
        latestVersion: '10.1',
        nextVersion: '10.2',
      });

      expect(result).toEqual([
        ['/docs/react/*', '/docs/:splat', '301'],
        ['/docs/vue/*', '/docs/:splat', '301'],
        ['/docs/6.4/react/*', '/docs/:splat', '301'],
        ['/docs/6.4/vue/*', '/docs/:splat', '301'],
        ['/docs/7.0/react/*', '/docs/:splat', '301'],
        ['/docs/7.0/vue/*', '/docs/:splat', '301'],
        ['/docs/7/react/*', '/docs/:splat', '301'],
        ['/docs/7/vue/*', '/docs/:splat', '301'],
        ['/docs/7.4/react/*', '/docs/:splat', '301'],
        ['/docs/7.4/vue/*', '/docs/:splat', '301'],
        ['/docs/next/react/*', '/docs/:splat', '302'],
        ['/docs/next/vue/*', '/docs/:splat', '302'],
        ['/docs/7.5/*', '/docs/:splat', '301'],
        ['/docs/8.0/*', '/docs/8/:splat', '301'],
        ['/docs/8.6/*', '/docs/8/:splat', '301'],
        ['/docs/9.0/*', '/docs/9/:splat', '301'],
        ['/docs/9.1/*', '/docs/9/:splat', '301'],
        ['/docs/10.0/*', '/docs/:splat', '302'],
        ['/docs/10/*', '/docs/:splat', '302'],
        ['/docs/10.1/*', '/docs/:splat', '302'],
        ['/docs/next/*', '/docs/10.2/:splat', '302'],
      ]);
    });

    test('WC-3: Latest 10.2, major pre-release 11.0', () => {
      const historical = [
        '6.0',
        '6.4',
        '7.0',
        '7.4',
        '7.5',
        '8.0',
        '8.6',
        '9.0',
        '9.1',
        '10.0',
        '10.2',
      ];

      const result = generateWildcardRedirects({
        rawRedirects: '',
        renderers,
        historicalVersions: historical,
        supportedVersions: ['10.2', '9.1', '8.6'],
        latestVersion: '10.2',
        nextVersion: '11.0',
      });

      expect(result).toEqual([
        ['/docs/react/*', '/docs/:splat', '301'],
        ['/docs/vue/*', '/docs/:splat', '301'],
        ['/docs/6.4/react/*', '/docs/:splat', '301'],
        ['/docs/6.4/vue/*', '/docs/:splat', '301'],
        ['/docs/7.0/react/*', '/docs/:splat', '301'],
        ['/docs/7.0/vue/*', '/docs/:splat', '301'],
        ['/docs/7/react/*', '/docs/:splat', '301'],
        ['/docs/7/vue/*', '/docs/:splat', '301'],
        ['/docs/7.4/react/*', '/docs/:splat', '301'],
        ['/docs/7.4/vue/*', '/docs/:splat', '301'],
        ['/docs/next/react/*', '/docs/:splat', '302'],
        ['/docs/next/vue/*', '/docs/:splat', '302'],
        ['/docs/7.5/*', '/docs/:splat', '301'],
        ['/docs/8.0/*', '/docs/8/:splat', '301'],
        ['/docs/8.6/*', '/docs/8/:splat', '301'],
        ['/docs/9.0/*', '/docs/9/:splat', '301'],
        ['/docs/9.1/*', '/docs/9/:splat', '301'],
        ['/docs/10.0/*', '/docs/:splat', '302'],
        ['/docs/10/*', '/docs/:splat', '302'],
        ['/docs/10.2/*', '/docs/:splat', '302'],
        ['/docs/11.0/*', '/docs/11/:splat', '302'],
        ['/docs/next/*', '/docs/11/:splat', '302'],
      ]);
    });

    test('WC-4: Latest 11.0, no pre-release (major 8 now unsupported)', () => {
      const historical = [
        '6.0',
        '6.4',
        '7.0',
        '7.4',
        '7.5',
        '8.0',
        '8.6',
        '9.0',
        '9.1',
        '10.0',
        '10.2',
        '11.0',
      ];

      const result = generateWildcardRedirects({
        rawRedirects: '',
        renderers,
        historicalVersions: historical,
        supportedVersions: ['11.0', '10.2', '9.1'],
        latestVersion: '11.0',
        nextVersion: null,
      });

      expect(result).toEqual([
        ['/docs/react/*', '/docs/:splat', '301'],
        ['/docs/vue/*', '/docs/:splat', '301'],
        ['/docs/6.4/react/*', '/docs/:splat', '301'],
        ['/docs/6.4/vue/*', '/docs/:splat', '301'],
        ['/docs/7.0/react/*', '/docs/:splat', '301'],
        ['/docs/7.0/vue/*', '/docs/:splat', '301'],
        ['/docs/7/react/*', '/docs/:splat', '301'],
        ['/docs/7/vue/*', '/docs/:splat', '301'],
        ['/docs/7.4/react/*', '/docs/:splat', '301'],
        ['/docs/7.4/vue/*', '/docs/:splat', '301'],
        ['/docs/next/react/*', '/docs/:splat', '302'],
        ['/docs/next/vue/*', '/docs/:splat', '302'],
        ['/docs/7.5/*', '/docs/:splat', '301'],
        ['/docs/8.0/*', '/docs/:splat', '301'],
        ['/docs/8.6/*', '/docs/:splat', '301'],
        ['/docs/9.0/*', '/docs/9/:splat', '301'],
        ['/docs/9.1/*', '/docs/9/:splat', '301'],
        ['/docs/10.0/*', '/docs/10/:splat', '301'],
        ['/docs/10.2/*', '/docs/10/:splat', '301'],
        ['/docs/11.0/*', '/docs/:splat', '302'],
        ['/docs/11/*', '/docs/:splat', '302'],
        ['/docs/next/*', '/docs/:splat', '302'],
      ]);
    });
  });

  describe('Install Redirects', () => {
    test('only produces redirects for pre-8 versions (old install slug)', () => {
      const result = generateInstallRedirects({
        rawRedirects: '',
        renderers,
        historicalVersions: defaultHistorical,
        supportedVersions: ['10.3', '9.1', '8.6'],
        latestVersion: '10.3',
        nextVersion: null,
      });

      expect(result).toEqual([
        // Renderer group — all pre-8 versions use old install slug
        ['/docs/react', '/docs/get-started/install/', '301'],
        ['/docs/vue', '/docs/get-started/install/', '301'],
        ['/docs/6.4/react', '/docs/get-started/install/', '301'],
        ['/docs/6.4/vue', '/docs/get-started/install/', '301'],
        ['/docs/7.0/react', '/docs/get-started/install/', '301'],
        ['/docs/7.0/vue', '/docs/get-started/install/', '301'],
        ['/docs/7/react', '/docs/get-started/install/', '301'],
        ['/docs/7/vue', '/docs/get-started/install/', '301'],
        ['/docs/7.4/react', '/docs/get-started/install/', '301'],
        ['/docs/7.4/vue', '/docs/get-started/install/', '301'],
        // Non-renderer group — only 7.5 (pre-8 versioned)
        ['/docs/7.5', '/docs/get-started/install/', '301'],
      ]);
    });

    test('output is independent of supported/latest/next params', () => {
      const historical = [
        '6.0',
        '6.4',
        '7.0',
        '7.4',
        '7.5',
        '8.0',
        '8.6',
        '9.0',
        '9.1',
        '10.0',
        '10.2',
        '11.0',
      ];

      const base = {
        rawRedirects: '',
        renderers,
        historicalVersions: historical,
      };

      const a = generateInstallRedirects({
        ...base,
        supportedVersions: ['10.2', '9.1', '8.6'],
        latestVersion: '10.2',
        nextVersion: '11.0',
      });

      const b = generateInstallRedirects({
        ...base,
        supportedVersions: ['11.0', '10.2', '9.1'],
        latestVersion: '11.0',
        nextVersion: null,
      });

      expect(a).toEqual(b);
    });
  });

  describe('Combined: specific path + wildcard redirects', () => {
    test('specific path redirects appear before wildcard redirects', () => {
      const result = generateRedirects({
        rawRedirects: `# 6.4\n/docs/the/from/path /docs/the/to/path 301`,
        renderers,
        historicalVersions: defaultHistorical,
        supportedVersions: ['10.3', '9.1', '8.6'],
        latestVersion: '10.3',
        nextVersion: null,
      });

      // Specific path entries come first
      const specificEntries = result.filter(
        ([from]) => !from.endsWith('/*')
      );
      const wildcardEntries = result.filter(([from]) => from.endsWith('/*'));

      expect(specificEntries.length).toBeGreaterThan(0);
      expect(wildcardEntries.length).toBeGreaterThan(0);

      // All specific entries should precede all wildcard entries
      const lastSpecificIndex = result.findIndex(
        ([from]) => from.endsWith('/*')
      );
      for (let i = 0; i < lastSpecificIndex; i++) {
        expect(result[i][0].endsWith('/*')).toBe(false);
      }
    });
  });

  describe('Edge cases', () => {
    test('empty raw redirects produces no specific path redirects', () => {
      const result = generateSpecificPathRedirects({
        rawRedirects: '',
        renderers,
        historicalVersions: defaultHistorical,
        supportedVersions: ['10.3', '9.1', '8.6'],
        latestVersion: '10.3',
        nextVersion: null,
      });

      expect(result).toEqual([]);
    });

    test('multiple raw redirect rules are all expanded', () => {
      const result = generateRedirects({
        rawRedirects: [
          '# 6.4',
          '/docs/old/path-a /docs/new/path-a 301',
          '/docs/old/path-b /docs/new/path-b 308',
        ].join('\n'),
        renderers,
        historicalVersions: defaultHistorical,
        supportedVersions: ['10.3', '9.1', '8.6'],
        latestVersion: '10.3',
        nextVersion: null,
      });

      const specificEntries = result.filter(
        ([from]) => !from.endsWith('/*')
      );

      // Both rules should produce entries for each renderer
      const pathAEntries = specificEntries.filter(([from]) =>
        from.includes('path-a')
      );
      const pathBEntries = specificEntries.filter(([from]) =>
        from.includes('path-b')
      );

      expect(pathAEntries.length).toBe(2); // react + vue
      expect(pathBEntries.length).toBe(2);

      // Status codes preserved independently
      for (const entry of pathAEntries) {
        expect(entry[2]).toBe('301');
      }
      for (const entry of pathBEntries) {
        expect(entry[2]).toBe('308');
      }
    });

    test('rules across multiple version headers', () => {
      const result = generateRedirects({
        rawRedirects: [
          '# 6.4',
          '/docs/old-a /docs/new-a 301',
          '',
          '# 7.6',
          '/docs/old-b /docs/new-b 301',
        ].join('\n'),
        renderers,
        historicalVersions: defaultHistorical,
        supportedVersions: ['10.3', '9.1', '8.6'],
        latestVersion: '10.3',
        nextVersion: null,
      });

      const specificEntries = result.filter(
        ([from]) => !from.endsWith('/*')
      );

      const entriesA = specificEntries.filter(([from]) =>
        from.includes('old-a')
      );
      const entriesB = specificEntries.filter(([from]) =>
        from.includes('old-b')
      );

      // Rule A (header 6.4): only unversioned entries (2 renderers)
      expect(entriesA.length).toBe(2);

      // Rule B (header 7.6): unversioned + versioned renderer entries + non-renderer + next entries
      // Should be significantly more than Rule A
      expect(entriesB.length).toBeGreaterThan(entriesA.length);
    });

    test('throws when a redirect line appears before a valid version header', () => {
      expect(() =>
        generateSpecificPathRedirects({
          rawRedirects: '/docs/old/path /docs/new/path 301',
          renderers,
          historicalVersions: defaultHistorical,
          supportedVersions: ['10.3', '9.1', '8.6'],
          latestVersion: '10.3',
          nextVersion: null,
        })
      ).toThrow('Redirect rule appears before a valid version header');
    });

    test('comment lines within a version section are ignored', () => {
      const result = generateSpecificPathRedirects({
        rawRedirects: [
          '# 6.4',
          '/docs/old/path /docs/new/path 301',
          '# This is a comment, not a version header',
          '/docs/another/old /docs/another/new 301',
        ].join('\n'),
        renderers,
        historicalVersions: defaultHistorical,
        supportedVersions: ['10.3', '9.1', '8.6'],
        latestVersion: '10.3',
        nextVersion: null,
      });

      // Both redirect lines should use 6.4 as the header version,
      // producing unversioned-era entries (one per renderer)
      const pathEntries = result.filter(([from]) =>
        from.includes('old/path')
      );
      const anotherEntries = result.filter(([from]) =>
        from.includes('another/old')
      );

      expect(pathEntries).toEqual([
        ['/docs/react/old/path', '/docs/new/path', '301'],
        ['/docs/vue/old/path', '/docs/new/path', '301'],
      ]);
      expect(anotherEntries).toEqual([
        ['/docs/react/another/old', '/docs/another/new', '301'],
        ['/docs/vue/another/old', '/docs/another/new', '301'],
      ]);
    });

    test('raw redirects with extra whitespace are parsed correctly', () => {
      const result = generateRedirects({
        rawRedirects: `# 6.4\n  /docs/the/from/path   /docs/the/to/path   301  `,
        renderers,
        historicalVersions: defaultHistorical,
        supportedVersions: ['10.3', '9.1', '8.6'],
        latestVersion: '10.3',
        nextVersion: null,
      });

      expect(result).toEqual(
        expect.arrayContaining([
          ['/docs/react/the/from/path', '/docs/the/to/path', '301'],
          ['/docs/vue/the/from/path', '/docs/the/to/path', '301'],
        ])
      );
    });
  });
});
