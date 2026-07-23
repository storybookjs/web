import prompts from 'prompts';
const path = require('path');
import dotenv from 'dotenv';
import chalk from 'chalk';
import {
  DocsVersion,
  docsVersions,
  latestVersion,
} from './packages/utils/src/docs-versions';
import * as fs from 'fs-extra';

dotenv.config();

const LOCAL_CONTENT_PATH = './apps/frontpage/content';
const LOCAL_DOCS_PATH = path.join(LOCAL_CONTENT_PATH, 'docs');
const LOCAL_SNIPPETS_PATH = path.join(LOCAL_CONTENT_PATH, 'snippets');
const LOCAL_ASSETS_PATH = './apps/frontpage/public/docs-assets';

(async () => {
  const envVar = process.env.SB_DOCS_PATH;
  let monorepoRelativePath = envVar || '../storybook';

  if (!envVar) {
    console.log(`✳︎ the env var ${chalk.cyan('SB_DOCS_PATH')} is not set.`);

    const pathPrompt = await prompts({
      type: 'text',
      name: 'value',
      message: 'Where is Storybook monorepo located?',
      initial: '../storybook',
    });

    monorepoRelativePath = pathPrompt.value;

    const saveToEnvFile = await prompts({
      type: 'confirm',
      name: 'value',
      message: 'Would you like to save it in your .env file?',
      initial: true,
    });

    // Save the path to the .env file
    if (saveToEnvFile.value === true) {
      fs.appendFileSync(
        path.join(__dirname, './.env'),
        `\nSB_DOCS_PATH=${monorepoRelativePath}\n`,
      );
    }
  }

  // Check if the directory exists in path
  const pathToStorybookDocs = path.join(
    __dirname,
    `${monorepoRelativePath}/docs`,
  );
  const pathToStorybookSnippets = path.join(
    __dirname,
    `${monorepoRelativePath}/docs/_snippets`,
  );
  const pathToStorybookAssets = path.join(
    __dirname,
    `${monorepoRelativePath}/docs/_assets`,
  );

  const exists =
    fs.existsSync(pathToStorybookDocs) ||
    fs.existsSync(pathToStorybookSnippets) ||
    fs.existsSync(pathToStorybookAssets);

  if (!exists) {
    console.log(`✳︎ ${chalk.cyan(pathToStorybookDocs)} does not exist.`);
    process.exit(1);
  }

  function isLatest(version: DocsVersion) {
    return version.id === latestVersion.id;
  }

  function getChoiceTitle(version: DocsVersion) {
    let title = version.label;
    if (version.preRelease || isLatest(version)) {
      const branchOrigin = version.branch ?? version.commit ?? version.tag;
      title = title.includes(')')
        ? title.replace(')', `, branched from ${branchOrigin})`)
        : `${title} (branched from ${branchOrigin})`;
    }
    return title;
  }

  const versionPrompt = await prompts({
    type: 'select',
    name: 'version',
    message: 'Pick a version to sync',
    choices: docsVersions
      .sort((a, b) => {
        if (a.preRelease) return -1;
        if (b.preRelease) return 1;
        return 0;
      })
      .map((version) => ({
        title: getChoiceTitle(version),
        value: version,
      })),
    instructions: false,
  });
  const version = versionPrompt.version.id;

  if (!fs.existsSync(LOCAL_DOCS_PATH)) {
    fs.mkdirSync(LOCAL_DOCS_PATH);
  }
  if (!fs.existsSync(LOCAL_SNIPPETS_PATH)) {
    fs.mkdirSync(LOCAL_SNIPPETS_PATH);
  }
  if (!fs.existsSync(LOCAL_ASSETS_PATH)) {
    fs.mkdirSync(LOCAL_ASSETS_PATH);
  }

  const pathToLocalDocs = path.join(LOCAL_DOCS_PATH, version);
  const pathToLocalSnippets = path.join(LOCAL_SNIPPETS_PATH, version);
  const pathToLocalAssets = path.join(LOCAL_ASSETS_PATH, version);

  if (!fs.existsSync(pathToLocalDocs)) {
    fs.mkdirSync(pathToLocalDocs);
  }
  if (!fs.existsSync(pathToLocalSnippets)) {
    fs.mkdirSync(pathToLocalSnippets);
  }
  if (!fs.existsSync(pathToLocalAssets)) {
    fs.mkdirSync(pathToLocalAssets);
  }

  console.log(
    `\n✳︎ Syncing the docs from Storybook to your local ${versionPrompt.version.label} docs`,
  );
  console.log(`✳︎ Storybook path: ${pathToStorybookDocs}`);
  console.log(`✳︎ Docs path: ./${pathToLocalDocs}`);
  console.log(`\n✳︎ Now watching ...\n`);

  fs.watch(pathToStorybookDocs, { recursive: true }, (_, filename) => {
    console.log(`✳︎ ${filename} has been updated.`);

    // Remove all files in the local directories
    fs.rmSync(pathToLocalDocs, { recursive: true });
    fs.rmSync(pathToLocalSnippets, { recursive: true });
    fs.rmSync(pathToLocalAssets, { recursive: true });

    // Copy the docs files only to the local directories
    fs.cpSync(pathToStorybookDocs, pathToLocalDocs, {
      recursive: true,
      filter: (src) => {
        if (
          src.includes('.prettierignore') ||
          src.includes('.prettierrc') ||
          src.includes('_assets') ||
          src.includes('_snippets')
        )
          return false;
        return true;
      },
    });

    // Copy all snippets to the local snippets directory
    fs.cpSync(pathToStorybookSnippets, pathToLocalSnippets, {
      recursive: true,
    });

    // Copy all assets to the local assets directory
    fs.cpSync(pathToStorybookAssets, pathToLocalAssets, {
      recursive: true,
    });
  });
})();
