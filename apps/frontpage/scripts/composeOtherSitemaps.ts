import fs from 'fs-extra';
import fetch from 'node-fetch';
import path from 'path';

async function getRemoteSitemapContent(path: string) {
  const response = await fetch(`https://storybook.js.org${path}`);
  const content = await response.text();
  return content;
}

const OTHER_SITEMAPS = {
  addons: {
    async getContent() {
      return getRemoteSitemapContent('/sitemap/sitemap-0.xml');
    },
  },
  blog: {
    async getContent() {
      return getRemoteSitemapContent('/blog/sitemap/sitemap-0.xml');
    },
  },
  showcase: {
    async getContent() {
      return getRemoteSitemapContent('/showcase/sitemap-0.xml');
    },
  },
  tutorials: {
    async getContent() {
      return getRemoteSitemapContent('/tutorials/sitemap/sitemap-0.xml');
    },
  },
};

const DESTINATION = path.join(__dirname, '../public/sitemap');
const SITEMAP_FILENAME = 'sitemap.xml';
const SITEMAP_INDEX = `${DESTINATION}/sitemap-index.xml`;
const SITEMAP_INDEX_ALL = `${DESTINATION}/sitemap-index-all.xml`;

function stripDirname(file: string) {
  return file.replace(/.*(\/public\/.*)/, '$1');
}

async function copySitemaps() {
  for (const sitemapId of Object.keys(OTHER_SITEMAPS)) {
    const directory = `${DESTINATION}/${sitemapId}`;
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }

    try {
      const file = `${DESTINATION}/${sitemapId}/${SITEMAP_FILENAME}`;
      const content = await OTHER_SITEMAPS[
        sitemapId as keyof typeof OTHER_SITEMAPS
      ].getContent();
      fs.writeFileSync(file, content);
      console.log('Wrote file:', stripDirname(file));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

async function updateSitemapIndex(
  sitemapIndex: string,
  includedSitemaps = Object.keys(OTHER_SITEMAPS)
) {
  const data = await fs.promises.readFile(sitemapIndex);
  const originalContents = data.toString();

  const newLocations = Object.keys(OTHER_SITEMAPS)
    .filter((sitemapId) => includedSitemaps.includes(sitemapId))
    .map(
      (sitemapId) =>
        // prettier-ignore
        `<sitemap><loc>https://storybook.js.org/sitemap/${sitemapId}/${SITEMAP_FILENAME}</loc></sitemap>`
    )
    .join('\n');

  const newContent = originalContents.replace(
    '<!-- INSERT -->',
    newLocations
  );

  fs.writeFileSync(sitemapIndex, newContent);
  console.log(`Updated ${stripDirname(sitemapIndex)}:`);
  console.log(newContent);
}

(async () => {
  await copySitemaps();
  await updateSitemapIndex(SITEMAP_INDEX);
  await updateSitemapIndex(SITEMAP_INDEX_ALL, ['addons']);
})();
