import prompts from 'prompts';
const fs = require('fs');
const path = require('path');
import dotenv from 'dotenv';
import chalk from 'chalk';
import { docsVersions } from './packages/utils/src/docs-versions';

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
  const monorepoAbsolutePath = path.join(__dirname, monorepoRelativePath);
  const exists = fs.existsSync(`${monorepoAbsolutePath}/docs`);

  if (!exists) {
    console.log(
      `✳︎ ${chalk.cyan(`${monorepoAbsolutePath}/docs`)} does not exists.`,
    );
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

  const pathToDocs = path.join(
    './apps/frontpage/content/docs',
    versionPrompt.version,
  );
  const pathToSnippets = path.join(
    './apps/frontpage/content/snippets',
    versionPrompt.version,
  );

  fs.watch(monorepoAbsolutePath, { recursive: true }, () => {
    console.log(`✳︎ Some changes were made in. Refreshing the docs...`);
  });
})();
