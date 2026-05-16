interface GithubRepoData {
  stargazers_count: number;
  // include other properties you expect to receive
}

export const fetchGithubCount = async (): Promise<{
  number: number;
  formattedResult: string;
}> => {
  const response = await fetch(
    'https://api.github.com/repos/storybookjs/storybook',
  );
  const data = (await response.json()) as GithubRepoData;

  if (!response.ok) return { number: 0, formattedResult: '0' };

  return {
    number: data.stargazers_count,
    formattedResult: `${data.stargazers_count.toLocaleString()}+`,
  };
};
