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

export const getNpmDownloads = async () => {
  try {
    const promises = npmApi.map(async (uri) => {
      const response = await fetch(uri);
      const json = await response.json();

      return json.downloads;
    });

    const results = await Promise.all(promises);

    return results.reduce((a, b) => a + b, 0);
  } catch (error) {
    console.log(error);
    return 15578172;
  }
};
