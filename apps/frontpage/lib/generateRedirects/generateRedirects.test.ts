import { expect, test } from 'vitest'

import { generateSequence, parseRawRedirects, generateRedirects } from './generateRedirects';

const inputString = `
# Multi-line preamble
# Should not be included

# 6.4
/docs/workflows/testing-with-storybook/          /docs/writing-tests/                                   308
/docs/workflows/unit-testing/                    /docs/writing-tests/stories-in-unit-tests/             308

# 7.1
/docs/writing-tests/importing-stories-in-tests/  /docs/writing-tests/stories-in-unit-tests/             308
`;

test('generateSequence, no pre-release', () => {
  const result = generateSequence(['8.1', '7.6', '6.5']);
  expect(result).toMatchInlineSnapshot(`
    [
      "8.1",
      "8.0",
      "7.6",
      "7.5",
      "7.4",
      "7.3",
      "7.2",
      "7.1",
      "7.0",
      "6.5",
      "6.4",
      "6.3",
      "6.2",
      "6.1",
      "6.0",
    ]
  `);
});

test('generateSequence, minor pre-release', () => {
  const result = generateSequence(['8.1', '8.2', '7.6']);
  expect(result).toMatchInlineSnapshot(`
    [
      "8.1",
      "8.0",
      "8.2",
      "7.6",
      "7.5",
      "7.4",
      "7.3",
      "7.2",
      "7.1",
      "7.0",
    ]
  `);
});

test('generateSequence, major pre-release', () => {
  const result = generateSequence(['8.4', '9.0', '7.6']);
  expect(result).toMatchInlineSnapshot(`
    [
      "8.4",
      "8.3",
      "8.2",
      "8.1",
      "8.0",
      "9.0",
      "7.6",
      "7.5",
      "7.4",
      "7.3",
      "7.2",
      "7.1",
      "7.0",
    ]
  `);
});

test('parseRawRedirects', () => {
  const result = parseRawRedirects(inputString);
  expect(result).toMatchInlineSnapshot(`
    [
      [
        "/docs/workflows/testing-with-storybook/",
        "/docs/writing-tests/",
        "308",
      ],
      [
        "/docs/workflows/unit-testing/",
        "/docs/writing-tests/stories-in-unit-tests/",
        "308",
      ],
      [
        "/docs/writing-tests/importing-stories-in-tests/",
        "/docs/writing-tests/stories-in-unit-tests/",
        "308",
      ],
    ]
  `);
});

test('generateRedirects, no pre-release', async () => {
  const result = await generateRedirects({
    rawRedirects: inputString,
    latestVersionString: '8.1',
    nextVersionString: null,
    renderers: [
      'react',
      'vue',
    ],
    versions: [
      { version: 8.1, string: '8.1', label: 'latest' },
      { version: 8.0, string: '8.0' },
      { version: 7.6, string: '7.6' },
      { version: 7, string: '7.0' },
      { string: 'next' },
    ],
  });
  expect(result).toMatchInlineSnapshot(`
    [
      {
        "destination": "/docs/writing-tests/",
        "permanent": true,
        "source": "/docs/workflows/testing-with-storybook/",
      },
      {
        "destination": "/docs/writing-tests/",
        "permanent": true,
        "source": "/docs/:renderer(react|vue)/workflows/testing-with-storybook/",
      },
      {
        "destination": "/docs/writing-tests/stories-in-unit-tests/",
        "permanent": true,
        "source": "/docs/workflows/unit-testing/",
      },
      {
        "destination": "/docs/writing-tests/stories-in-unit-tests/",
        "permanent": true,
        "source": "/docs/:renderer(react|vue)/workflows/unit-testing/",
      },
      {
        "destination": "/docs/writing-tests/stories-in-unit-tests/",
        "permanent": true,
        "source": "/docs/writing-tests/importing-stories-in-tests/",
      },
      {
        "destination": "/docs/writing-tests/stories-in-unit-tests/",
        "permanent": true,
        "source": "/docs/:renderer(react|vue)/writing-tests/importing-stories-in-tests/",
      },
      {
        "destination": "/docs/:path",
        "permanent": true,
        "source": "/docs/:renderer(react|vue)/:path*",
      },
      {
        "destination": "/docs/:path",
        "permanent": false,
        "source": "/docs/8.1/:path*",
      },
      {
        "destination": "/docs/8",
        "permanent": true,
        "source": "/docs/8.0",
      },
      {
        "destination": "/docs/8/:path",
        "permanent": true,
        "source": "/docs/8.0/:path*",
      },
      {
        "destination": "/docs/7/get-started/install/",
        "permanent": true,
        "source": "/docs/7.6",
      },
      {
        "destination": "/docs/7/:path",
        "permanent": true,
        "source": "/docs/7.6/:path*",
      },
      {
        "destination": "/docs/7/get-started/install/",
        "permanent": true,
        "source": "/docs/7.0",
      },
      {
        "destination": "/docs/7/:path",
        "permanent": true,
        "source": "/docs/7.0/:renderer(react|vue)/:path*",
      },
      {
        "destination": "/docs/8",
        "permanent": false,
        "source": "/docs/next",
      },
      {
        "destination": "/docs/8/:path",
        "permanent": false,
        "source": "/docs/next/:renderer(react|vue)/:path*",
      },
      {
        "destination": "/docs/8/:path",
        "permanent": false,
        "source": "/docs/next/:path*",
      },
      {
        "destination": "/releases/8.1",
        "permanent": false,
        "source": "/releases",
      },
    ]
  `);
});

test('generateRedirects, minor pre-release', async () => {
  const result = await generateRedirects({
    rawRedirects: `
/docs/workflows/unit-testing/ /docs/writing-tests/stories-in-unit-tests/ 308
    `,
    latestVersionString: '8.1',
    nextVersionString: '8.2',
    renderers: [
      'react',
      'vue',
    ],
    versions: [
      { version: 8.1, string: '8.1', label: 'latest' },
      { version: 8.0, string: '8.0' },
      { version: 7.6, string: '7.6' },
      { version: 7, string: '7.0' },
      { version: 8.2, string: '8.2', label: 'alpha' },
      { string: 'next' },
    ],
  });
  expect(result).toMatchInlineSnapshot(`
    [
      {
        "destination": "/docs/writing-tests/stories-in-unit-tests/",
        "permanent": true,
        "source": "/docs/workflows/unit-testing/",
      },
      {
        "destination": "/docs/writing-tests/stories-in-unit-tests/",
        "permanent": true,
        "source": "/docs/:renderer(react|vue)/workflows/unit-testing/",
      },
      {
        "destination": "/docs/:path",
        "permanent": true,
        "source": "/docs/:renderer(react|vue)/:path*",
      },
      {
        "destination": "/docs/:path",
        "permanent": false,
        "source": "/docs/8.1/:path*",
      },
      {
        "destination": "/docs/8",
        "permanent": true,
        "source": "/docs/8.0",
      },
      {
        "destination": "/docs/8/:path",
        "permanent": true,
        "source": "/docs/8.0/:path*",
      },
      {
        "destination": "/docs/7/get-started/install/",
        "permanent": true,
        "source": "/docs/7.6",
      },
      {
        "destination": "/docs/7/:path",
        "permanent": true,
        "source": "/docs/7.6/:path*",
      },
      {
        "destination": "/docs/7/get-started/install/",
        "permanent": true,
        "source": "/docs/7.0",
      },
      {
        "destination": "/docs/7/:path",
        "permanent": true,
        "source": "/docs/7.0/:renderer(react|vue)/:path*",
      },
      {
        "destination": "/docs/8.2",
        "permanent": false,
        "source": "/docs/next",
      },
      {
        "destination": "/docs/8.2/:path",
        "permanent": false,
        "source": "/docs/next/:renderer(react|vue)/:path*",
      },
      {
        "destination": "/docs/8.2/:path",
        "permanent": false,
        "source": "/docs/next/:path*",
      },
      {
        "destination": "/releases/8.1",
        "permanent": false,
        "source": "/releases",
      },
    ]
  `);
});

test('generateRedirects, major pre-release', async () => {
  const result = await generateRedirects({
    rawRedirects: `
/docs/workflows/unit-testing/ /docs/writing-tests/stories-in-unit-tests/ 308
    `,
    latestVersionString: '8.1',
    nextVersionString: '9.0',
    renderers: [
      'react',
      'vue',
    ],
    versions: [
      { version: 8.1, string: '8.1', label: 'latest' },
      { version: 8.0, string: '8.0' },
      { version: 7.6, string: '7.6' },
      { version: 7, string: '7.0' },
      { version: 9.0, string: '9.0', label: 'alpha' },
      { string: 'next' },
    ],
  });
  expect(result).toMatchInlineSnapshot(`
    [
      {
        "destination": "/docs/writing-tests/stories-in-unit-tests/",
        "permanent": true,
        "source": "/docs/workflows/unit-testing/",
      },
      {
        "destination": "/docs/writing-tests/stories-in-unit-tests/",
        "permanent": true,
        "source": "/docs/:renderer(react|vue)/workflows/unit-testing/",
      },
      {
        "destination": "/docs/:path",
        "permanent": true,
        "source": "/docs/:renderer(react|vue)/:path*",
      },
      {
        "destination": "/docs/:path",
        "permanent": false,
        "source": "/docs/8.1/:path*",
      },
      {
        "destination": "/docs/8",
        "permanent": true,
        "source": "/docs/8.0",
      },
      {
        "destination": "/docs/8/:path",
        "permanent": true,
        "source": "/docs/8.0/:path*",
      },
      {
        "destination": "/docs/7/get-started/install/",
        "permanent": true,
        "source": "/docs/7.6",
      },
      {
        "destination": "/docs/7/:path",
        "permanent": true,
        "source": "/docs/7.6/:path*",
      },
      {
        "destination": "/docs/7/get-started/install/",
        "permanent": true,
        "source": "/docs/7.0",
      },
      {
        "destination": "/docs/7/:path",
        "permanent": true,
        "source": "/docs/7.0/:renderer(react|vue)/:path*",
      },
      {
        "destination": "/docs/9",
        "permanent": true,
        "source": "/docs/9.0",
      },
      {
        "destination": "/docs/9/:path",
        "permanent": true,
        "source": "/docs/9.0/:path*",
      },
      {
        "destination": "/docs/9",
        "permanent": false,
        "source": "/docs/next",
      },
      {
        "destination": "/docs/9/:path",
        "permanent": false,
        "source": "/docs/next/:renderer(react|vue)/:path*",
      },
      {
        "destination": "/docs/9/:path",
        "permanent": false,
        "source": "/docs/next/:path*",
      },
      {
        "destination": "/releases/8.1",
        "permanent": false,
        "source": "/releases",
      },
    ]
  `);
});