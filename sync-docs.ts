import prompts from 'prompts';
const path = require('path');
import dotenv from 'dotenv';
import chalk from 'chalk';
import { docsVersions } from './packages/utils/src/docs-versions';
import * as fs from 'fs-extra';

dotenv.config();

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
  const exists = fs.existsSync(pathToStorybookDocs);

  if (!exists) {
    console.log(`✳︎ ${chalk.cyan(pathToStorybookDocs)} does not exists.`);
    process.exit(1);
  }

  const versionPrompt = await prompts({
    type: 'select',
    name: 'version',
    message: 'Pick a version to sync',
    choices: [
      ...docsVersions.map((version) => ({
        title: version.label,
        value: version.id,
      })),
    ],
    instructions: false,
  });

  const pathToLocalDocs = path.join(
    './apps/frontpage/content/docs',
    versionPrompt.version,
  );

  console.log('✳︎ Syncing the docs from Storybook to the your local docs...');

  fs.watch(pathToStorybookDocs, { recursive: true }, () => {
    console.log(`✳︎ Some changes were made. Refreshing the docs...`);

    // Move all files docs to the local docs
    fs.copySync(pathToStorybookDocs, pathToLocalDocs, {
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

    // Move snippets to the local snippets
    fs.copySync(
      path.join(pathToStorybookDocs, '_snippets'),
      path.join('./apps/frontpage/content/snippets', versionPrompt.version),
    );

    // Move assets to the local docs
    fs.copySync(
      path.join(pathToStorybookDocs, '_assets'),
      path.join('./apps/frontpage/public/docs', versionPrompt.version),
    );
  });
})();
