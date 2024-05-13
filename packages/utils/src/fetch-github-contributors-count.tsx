export const fetchGithubContributorCount = async (): Promise<{
  number: string | number | undefined;
  formattedResult: string;
}> => {
  try {
    // The trick here is to enable pagination to 1 and
    // then read the Link header to get the last page number
    // The Github API doesn't give a contributor count
    const response = await fetch(
      `https://api.github.com/repos/storybookjs/storybook/contributors?per_page=1&anon=1`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${process.env.GITHUB_STORYBOOK_BOT_PAT}`,
          'User-Agent': 'storybook-bot',
        },
      },
    );

    const headers = response.headers;
    const linkHeader = headers.get('link');
    const link = linkHeader ? linkHeader.split(';')[1] : null;

    // Parse contributor count
    const match = link && /&page=(?<temp1>\d+)/.exec(link);
    const contributorCount = match ? match[1] : 0;

    return {
      number: contributorCount,
      formattedResult: `${contributorCount.toLocaleString()}+`,
    };
  } catch (error) {
    return { number: 0, formattedResult: '0' };
  }
};
