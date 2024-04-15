export const fetchGithubCount = async () => {
  const response = await fetch(
    'https://api.github.com/repos/storybookjs/storybook'
  );
  const data = await response.json();

  if (!response.ok) return 0;

  return data.stargazers_count;
};
