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
    console.log(`✳︎ ${chalk.cyan(pathToStorybookDocs)} does not exist.`);
    process.exit(1);
  }

  function isLatest(version: DocsVersion) {
    return version.id === latestVersion.id;
  }

  function getChoiceTitle(version: DocsVersion) {
    let title = version.label;
    if (version.preRelease) {
      title = title.includes(')')
        ? title.replace(')', ', branched from next)')
        : `${title} (branched from next)`;
    }
    if (isLatest(version)) {
      title = title.includes(')')
        ? title.replace(')', ', branched from main)')
        : `${title} (branched from main)`;
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

  const pathToLocalDocs = path.join(
    './apps/frontpage/content/docs',
    versionPrompt.version.id,
  );

  if (!fs.existsSync(pathToLocalDocs)) {
    fs.mkdirSync(pathToLocalDocs);
  }

  console.log(
    `✳︎ Syncing the docs from Storybook to your local ${versionPrompt.version.label} docs`,
  );
  console.log(`✳︎ ${pathToStorybookDocs} → ./${pathToLocalDocs}`);

  const slugVersion = !isLatest(versionPrompt.version)
    ? versionPrompt.version.inSlug || versionPrompt.version.id
    : '';
  console.log(`\n✳︎ 👀 http://localhost:3000/docs/${slugVersion}\n`);

  fs.rmSync(pathToLocalDocs, { recursive: true });
  fs.cpSync(pathToStorybookDocs, pathToLocalDocs, { recursive: true });

  fs.watch(pathToStorybookDocs, { recursive: true }, (_, filename) => {
    const srcFilePath = path.join(pathToStorybookDocs, filename);
    const targetFilePath = path.join(pathToLocalDocs, filename);
    const targetDir = targetFilePath.split('/').slice(0, -1).join('/');

    // Syncs create file
    if (!fs.existsSync(targetFilePath)) {
      fs.mkdirSync(targetDir, { recursive: true });
      fs.closeSync(fs.openSync(targetFilePath, 'w'));
      console.log(`Created ${filename}`);
    }

    // Syncs remove file
    if (!fs.existsSync(srcFilePath)) {
      fs.unlinkSync(targetFilePath);
      console.log(`Removed ${filename}`);
      return;
    }

    // Syncs update file
    fs.copyFile(srcFilePath, targetFilePath, (err) => {
      console.log(`Updated ${filename}`);
      if (err) throw err;
    });
  });
})();
