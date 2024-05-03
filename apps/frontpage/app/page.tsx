import { Home } from '../components/home/home';
import {
  fetchDiscordMembers,
  fetchGithubContributorCount,
  fetchGithubCount,
  fetchNpmDownloads,
} from '@repo/utils';

export default async function Page() {
  const { number: githubCount } = await fetchGithubCount();
  const { formattedResult: npmDownloads } = await fetchNpmDownloads();
  const { formattedResult: contributorCount } =
    await fetchGithubContributorCount();
  const { formattedResult: discordMembers } = await fetchDiscordMembers();

  return (
    <Home
      githubCount={githubCount}
      npmDownloads={npmDownloads}
      contributorCount={contributorCount}
      discordMembers={discordMembers}
    />
  );
}
