import fs from 'node:fs';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

import { docsVersions } from '@repo/utils';

const DOCS_CONTENT_DIR = path.resolve(__dirname, '../content/docs');
const DOCS_SNIPPETS_DIR = path.resolve(__dirname, '../content/snippets');

const FILE_DISALLOW_LIST = [
  // Content
  'api/cli-options.mdx',
  'configure/upgrading.mdx',
  // Snippets
  'storybook-upgrade.md',
  'storybook-upgrade-prerelease.md',
];

const PKG_DISALLOW_LIST = [
  '@storybook/addon-coverage',
  '@storybook/addon-webpack5-compiler-babel',
  '@storybook/addon-webpack5-compiler-swc',
];

const INLINE_CODE_REGEX = /`(?!`)(.*)`/g;
const CODE_BLOCK_REGEX = /```(?:sh|shell|bash).*\n\s*(?:#.*\n)?(.*)\n\s*```/g;

const INLINE_CODE_MATCH_LIST = (preRelease?: boolean) => [
  {
    test: /((?:npx|pnpm dlx|yarn dlx) storybook)(?:@\w+)? (add|automigrate|babelrc|extract|init|migrate|remove|upgrade)(?! --prerelease)/g,
    replacer: `$1${preRelease ? '@next' : '@latest'} $2`,
  },
];

const CODE_BLOCK_MATCH_LIST = (preRelease?: boolean) => [
  ...INLINE_CODE_MATCH_LIST(preRelease),
  {
    test: /(@storybook\/(?:\w+-?)+)(?:@\w+)?/g,
    replacer: (_: string, pkg: string) =>
      `${pkg}${preRelease && !PKG_DISALLOW_LIST.includes(pkg) ? '@next' : ''}`,
  },
  {
    test: /(storybook(?:@\w+)? remove) (@storybook\/(?:\w+-?)+)(?:@\w+)?/g,
    replacer: (_: string, start: string, pkg: string) => `${start} ${pkg}`,
  },
];

export function updateSnippet(
  snippetSrc: string,
  isBlockCodeSnippet?: boolean,
  preRelease?: boolean,
) {
  const matchList = isBlockCodeSnippet
    ? CODE_BLOCK_MATCH_LIST
    : INLINE_CODE_MATCH_LIST;

  let updatedSnippetSrc = snippetSrc;

  matchList(preRelease).forEach(({ test, replacer }) => {
    if (snippetSrc.match(test)) {
      // @ts-expect-error — The overload for `str.replace` which accepts a fn replacer isn't taking effect?
      updatedSnippetSrc = updatedSnippetSrc.replace(test, replacer);
    }
  });

  return updatedSnippetSrc;
}

export function updateFile(fileContents: string, preRelease?: boolean) {
  let updatedContents = fileContents;

  const inlineCodeSnippets = (fileContents.match(INLINE_CODE_REGEX) || []).map(
    (code) => code.replace(INLINE_CODE_REGEX, '$1'),
  );

  if (inlineCodeSnippets.length > 0) {
    inlineCodeSnippets.forEach((snippet) => {
      const updatedSnippet = updateSnippet(snippet, false, preRelease);
      updatedContents = updatedContents.replace(snippet, updatedSnippet);
    });
  }

  const blockCodeSnippets = (fileContents.match(CODE_BLOCK_REGEX) || []).map(
    (code) => code.replace(CODE_BLOCK_REGEX, '$1'),
  );

  if (blockCodeSnippets.length > 0) {
    blockCodeSnippets.forEach((snippet) => {
      const updatedSnippet = updateSnippet(snippet, true, preRelease);
      updatedContents = updatedContents.replace(snippet, updatedSnippet);
    });
  }

  return updatedContents;
}

// https://stackoverflow.com/a/45130990
async function getFiles(dir: string): Promise<string[]> {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    }),
  );
  return Array.prototype.concat(...files);
}

(async () => {
  docsVersions.forEach(async ({ id, preRelease }) => {
    const docsContentDir = `${DOCS_CONTENT_DIR}/${id}`;
    const docsSnippetsDir = `${DOCS_SNIPPETS_DIR}/${id}`;

    const docsContentFiles = (await getFiles(docsContentDir)).filter((file) =>
      file.endsWith('.mdx'),
    );
    const docsSnippetsFiles = (await getFiles(docsSnippetsDir)).filter((file) =>
      file.endsWith('.md'),
    );
    const docsFiles = [...docsContentFiles, ...docsSnippetsFiles];

    docsFiles.forEach((file) => {
      const shortFile = file
        .replace(`${docsContentDir}/`, '')
        .replace(`${docsSnippetsDir}/`, '');
      if (!FILE_DISALLOW_LIST.includes(shortFile)) {
        const fileContents = fs.readFileSync(file, 'utf8');
        const updatedContents = updateFile(fileContents, preRelease);
        fs.writeFileSync(file, updatedContents, 'utf8');
      }
    });
  });
})();
