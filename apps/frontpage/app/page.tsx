import type { Metadata } from 'next';
import {
  fetchDiscordMembers,
  fetchGithubCount,
  fetchNpmDownloads,
} from '@repo/utils';
import { Home } from '../components/home/home';

const title = 'Storybook: Frontend workshop for UI development';
const description =
  "Storybook is a frontend workshop for building, testing, and documenting UI. Coding agents use it too: they reuse your components, write stories for what's new, and fix test failures before you review. It's open source and free.";

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
