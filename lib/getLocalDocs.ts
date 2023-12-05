import path from "path";
import fs from "fs-extra";
import fetch from "node-fetch";
import tar from "tar";
import chalkAnimation from "chalk-animation";

const branchName = process.argv[2] || "main";

const raindow = chalkAnimation.rainbow(
  `Extracting docs & assets from the ${branchName} branch...`
);

async function fetchAndExtract() {
  raindow.start();
  await fs.emptyDir(path.join(__dirname, "../content/docs"));
  await fs.emptyDir(path.join(__dirname, "../content/snippets"));
  await fs.emptyDir(path.join(__dirname, "../public/docs"));

  const response = await fetch(
    `https://codeload.github.com/storybookjs/storybook/tar.gz/${branchName}`
  );

  if (!response.ok) {
    throw new Error(`unexpected response ${response.statusText}`);
  }

  await new Promise((resolve, reject) => {
    const extractDocs = new Promise((resolve, reject) => {
      if (response.body) {
        response.body
          .pipe(
            tar.x(
              {
                strip: 2,
                C: path.join(__dirname, "../content/docs"),
                filter: (path) =>
                  !path.includes("_assets") &&
                  !path.includes("_versions") &&
                  !path.includes("_snippets") &&
                  !path.includes(".prettierignore") &&
                  !path.includes(".prettierrc"),
              },
              [`storybook-${branchName}/docs`]
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
                C: path.join(__dirname, "../content/snippets"),
                filter: (path) => path.includes("_snippets"),
              },
              [`storybook-${branchName}/docs`]
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
                C: path.join(__dirname, "../public/docs"),
                filter: (path) => path.includes("_assets"),
              },
              [`storybook-${branchName}/docs`]
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

fetchAndExtract().then(() => {
  raindow.stop();
});
