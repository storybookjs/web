import path from 'node:path';
import fs from 'fs-extra';
import fetch from 'node-fetch';

async function getRemoteSitemapContent(p: string): Promise<string> {
  const response = await fetch(`https://storybook.js.org${p}`);
  const content = await response.text();
  return content;
}

const OTHER_SITEMAPS = {
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

function stripDirname(file: string): string {
  return file.replace(/.*(\/public\/.*)/, '$1');
}

async function copySitemaps(): Promise<void> {
  for (const sitemapId of Object.keys(OTHER_SITEMAPS)) {
    const directory = `${DESTINATION}/${sitemapId}`;
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }

    try {
      const file = `${DESTINATION}/${sitemapId}/${SITEMAP_FILENAME}`;
      const content =
        // eslint-disable-next-line no-await-in-loop -- TODO: Fix it
        await OTHER_SITEMAPS[
          sitemapId as keyof typeof OTHER_SITEMAPS
        ].getContent();
      fs.writeFileSync(file, content);
      // eslint-disable-next-line no-console -- Showing off console.log
      console.log('Wrote file:', stripDirname(file));
    } catch (error) {
      // eslint-disable-next-line no-console -- Showing off error handling
      console.error(error);
    }
  }
}

void (async () => {
  await copySitemaps();
})();
