import path from "path";
import fs from "fs-extra";
import fetch from "node-fetch";
import tar from "tar";
import chalkAnimation from "chalk-animation";
import { DocsVersion, docsVersions } from "@/docs-versions";

const branchName = process.argv[2] || "main";

const raindow = chalkAnimation.rainbow(
  `Extracting docs & assets from the ${branchName} branch...`
);

async function clean() {
  await fs.emptyDir(path.join(__dirname, "../content/docs"));
  await fs.emptyDir(path.join(__dirname, "../public/docs"));
  // Create directories for each version

  for (const version of docsVersions) {
    await fs.mkdirp(path.join(__dirname, `../content/docs/${version.id}/docs`));
    await fs.mkdirp(
      path.join(__dirname, `../content/docs/${version.id}/snippets`)
    );
    await fs.mkdirp(path.join(__dirname, `../public/docs/${version.id}`));
  }
}

async function fetchAndExtract(version: DocsVersion) {
  raindow.start();

  let url: string | null = null;
  if (version.branch)
    url = `https://github.com/storybookjs/storybook/archive/refs/heads/${version.branch}.tar.gz`;
  if (version.tag)
    url = `https://github.com/storybookjs/storybook/archive/refs/tags/${version.tag}.tar.gz`;
  if (version.commit)
    url = `https://github.com/storybookjs/storybook/archive/${version.commit}.tar.gz
    `;

  let folder = "";
  const versionWithoutPrefix = version.tag?.substring(1);
  if (version.branch) folder = `storybook-${version.branch}/docs`;
  if (version.tag) folder = `storybook-${versionWithoutPrefix}/docs`;
  if (version.commit) folder = `storybook-${version.commit}/docs`;

  const response = await fetch(url || "");

  if (!response.ok) {
    throw new Error(`unexpected response ${response.statusText}`);
  }

  await new Promise((resolve, reject) => {
    const extractDocs = new Promise((resolve, reject) => {
      if (response && response.body) {
        response.body
          .pipe(
            tar.x(
              {
                strip: 2,
                C: path.join(__dirname, `../content/docs/${version.id}/docs`),
                filter: (path) =>
                  !path.includes("_assets") &&
                  !path.includes("_versions") &&
                  !path.includes("_snippets") &&
                  !path.includes(".prettierignore") &&
                  !path.includes(".prettierrc"),
              },
              [folder]
            )
          )
          .on("error", reject)
          .on("end", resolve);
      }
    });

    const extractSnippets = new Promise((resolve, reject) => {
      if (response.body) {
        response.body
          .pipe(
            tar.x(
              {
                strip: 3,
                C: path.join(
                  __dirname,
                  `../content/docs/${version.id}/snippets`
                ),
                filter: (path) => path.includes("_snippets"),
              },
              [folder]
            )
          )
          .on("error", reject)
          .on("end", resolve);
      }
    });

    const extractAssets = new Promise((resolve, reject) => {
      if (response.body) {
        response.body
          .pipe(
            tar.x(
              {
                strip: 3,
                C: path.join(__dirname, `../public/docs/${version.id}`),
                filter: (path) => path.includes("_assets"),
              },
              [folder]
            )
          )
          .on("error", reject)
          .on("end", resolve);
      }
    });

    Promise.all([extractDocs, extractSnippets, extractAssets])
      .then(resolve)
      .catch(reject);
  });
}

clean();

const arrayOfFetches = docsVersions.map((version) => fetchAndExtract(version));

Promise.all(arrayOfFetches).then(() => {
  raindow.stop();
});
