export const fetchGithubCount = async () => {
  const response = await fetch(
    'https://api.github.com/repos/storybookjs/storybook'
  );
  const data = await response.json();

  if (!response.ok) return { number: 0, formattedResult: '0' };

  return {
    number: data.stargazers_count,
    formattedResult: `${data.stargazers_count.toLocaleString()}+`,
  };
};
