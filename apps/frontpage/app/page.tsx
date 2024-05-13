import {
  fetchDiscordMembers,
  fetchGithubContributorCount,
  fetchGithubCount,
  fetchNpmDownloads,
} from '@repo/utils';
import { Home } from '../components/home/home';

export default async function Page() {
  const { number: githubCount } = await fetchGithubCount();
  const { formattedResult: npmDownloads } = await fetchNpmDownloads();
  const { formattedResult: contributorCount } =
    await fetchGithubContributorCount();
  const { formattedResult: discordMembers } = await fetchDiscordMembers();

  return (
    <Home
      contributorCount={contributorCount}
      discordMembers={discordMembers}
      githubCount={githubCount}
      npmDownloads={npmDownloads}
    />
  );
}
