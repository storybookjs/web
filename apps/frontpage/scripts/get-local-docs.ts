/* eslint-disable no-await-in-loop -- TODO: Fix this */
import path from 'node:path';
import { emptyDir, mkdirp } from 'fs-extra';
import fetch from 'node-fetch';
import { x } from 'tar';
import type { DocsVersion } from '@repo/utils';
import { docsVersions } from '@repo/utils';

async function clean(): Promise<void> {
  await emptyDir(path.join(__dirname, '../content/docs'));
  await emptyDir(path.join(__dirname, '../content/snippets'));
  await emptyDir(path.join(__dirname, '../public/docs-assets'));

  // Create directories for each version
  for (const version of docsVersions) {
    await mkdirp(path.join(__dirname, `../content/docs/${version.id}`));
    await mkdirp(path.join(__dirname, `../content/snippets/${version.id}`));
    await mkdirp(path.join(__dirname, `../public/docs-assets/${version.id}`));
  }
}

async function fetchAndExtract(version: DocsVersion): Promise<void> {
  // eslint-disable-next-line no-console -- Showing off console.log
  console.log(
    `  ♠︎ Fetching docs for ${version.id} from ${version.branch || version.tag || version.commit}...`,
  );

  let url: string | null = null;
  if (version.branch)
    url = `https://github.com/storybookjs/storybook/archive/refs/heads/${version.branch}.tar.gz`;
  if (version.tag)
    url = `https://github.com/storybookjs/storybook/archive/refs/tags/${version.tag}.tar.gz`;
  if (version.commit)
    url = `https://github.com/storybookjs/storybook/archive/${version.commit}.tar.gz
    `;

  let folder = '';
  const versionWithoutPrefix = version.tag?.substring(1);
  if (version.branch) folder = `storybook-${version.branch}/docs`;
  if (version.tag) folder = `storybook-${versionWithoutPrefix}/docs`;
  if (version.commit) folder = `storybook-${version.commit}/docs`;

  const response = await fetch(url || '');

  if (!response.ok) {
    throw new Error(`unexpected response ${response.statusText}`);
  }

  await new Promise((resolve, reject) => {
    const extractDocs = new Promise((innerResolve, innerReject) => {
      if (response.body) {
        response.body
          .pipe(
            x(
              {
                strip: 2,
                C: path.join(__dirname, `../content/docs/${version.id}`),
                filter: (p: string) =>
                  !p.includes('_assets') &&
                  !p.includes('_versions') &&
                  !p.includes('_snippets') &&
                  !p.includes('.prettierignore') &&
                  !p.includes('.prettierrc'),
              },
              [folder],
            ),
          )
          .on('error', innerReject)
          .on('end', innerResolve);
      }
    });

    const extractSnippets = new Promise((innerResolve, innerReject) => {
      if (response.body) {
        response.body
          .pipe(
            x(
              {
                strip: 3,
                C: path.join(__dirname, `../content/snippets/${version.id}`),
                filter: (p: string) => p.includes('_snippets'),
              },
              [folder],
            ),
          )
          .on('error', innerReject)
          .on('end', innerResolve);
      }
    });

    const extractAssets = new Promise((innerResolve, innerReject) => {
      if (response.body) {
        response.body
          .pipe(
            x(
              {
                strip: 3,
                C: path.join(__dirname, `../public/docs-assets/${version.id}`),
                filter: (p: string) => p.includes('_assets'),
              },
              [folder],
            ),
          )
          .on('error', innerReject)
          .on('end', innerResolve);
      }
    });

    Promise.all([extractDocs, extractSnippets, extractAssets])
      .then(resolve)
      .catch(reject);
  });
}

void clean();

const arrayOfFetches = docsVersions.map((version) => fetchAndExtract(version));

void Promise.all(arrayOfFetches).then(() => {
  // eslint-disable-next-line no-console -- Showing off console.log
  console.log('  Done!');
  // eslint-disable-next-line no-console -- Showing off console.log
  console.log('');
});
