/**
 * Fetch NPM downloads
 */
const npmApiBase = `https://api.npmjs.org/downloads/point/last-month`;
const npmApi = [
  `${npmApiBase}/@storybook/react`,
  `${npmApiBase}/@storybook/react-native`,
  `${npmApiBase}/@storybook/vue`,
  `${npmApiBase}/@storybook/angular`,
  `${npmApiBase}/@storybook/ember`,
  `${npmApiBase}/@storybook/html`,
  `${npmApiBase}/@storybook/svelte`,
  `${npmApiBase}/@storybook/mithril`,
  `${npmApiBase}/@storybook/riot`,
  `${npmApiBase}/@storybook/polymer`,
  `${npmApiBase}/@storybook/preact`,
];

interface JsonResponse {
  downloads: number;
}

export const fetchNpmDownloads = async (): Promise<{
  number: number;
  formattedResult: string;
}> => {
  try {
    const promises = npmApi.map(async (uri) => {
      const response = await fetch(uri);
      const json = await (response.json() as Promise<JsonResponse>);

      return json.downloads;
    });

    const results = await Promise.all(promises);
    const result = results.reduce((a, b) => a + b, 0);

    let npmDownloadsFixed = parseInt((result / 1000).toFixed(0), 10);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- false positive
    let npmDownloadsDisplay = `${npmDownloadsFixed}k`;
    if (npmDownloadsFixed >= 1000) {
      npmDownloadsFixed = parseFloat((npmDownloadsFixed / 1000).toFixed(2));
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- false positive
      npmDownloadsDisplay = `${npmDownloadsFixed}m`;
    }

    return {
      number: results.reduce((a, b) => a + b, 0),
      formattedResult: npmDownloadsDisplay,
    };
  } catch (error) {
    return { number: 0, formattedResult: '0' };
  }
};
