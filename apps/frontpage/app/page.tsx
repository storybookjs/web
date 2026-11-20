import type { Metadata } from 'next';
import {
  fetchDiscordMembers,
  fetchGithubCount,
  fetchNpmDownloads,
} from '@repo/utils';
import { Home } from '../components/home/home';

const title = 'Storybook: Frontend workshop for UI development';
const description =
  "Storybook is a free, open source frontend workshop for building, testing, and documenting UI. The components and stories you build become context your agent can read to reuse your components, write stories, and run your tests before you review.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    url: 'https://storybook.js.org',
    siteName: 'Storybook',
    type: 'website',
    title,
    description,
  },
};

export default async function Page() {
  const { number: githubCount } = await fetchGithubCount();
  const { formattedResult: npmDownloads } = await fetchNpmDownloads();
  // const { formattedResult: contributorCount } =
  //   await fetchGithubContributorCount();
  const { formattedResult: discordMembers } = await fetchDiscordMembers();

  return (
    <Home
      contributorCount="2282"
      discordMembers={discordMembers}
      githubCount={githubCount}
      npmDownloads={npmDownloads}
    />
  );
}
