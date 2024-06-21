import { Footer, Header, Search } from '@repo/ui';
import { fetchGithubCount } from '@repo/utils';
import {
  ChevronSmallRightIcon,
  DiscordIcon,
  GithubIcon,
} from '@storybook/icons';
import { PuzzlePieces } from '../components/puzzle-pieces';
import { SearchIcon as SearchIllustration } from '../components/icons/search';

export default async function NotFound() {
  const { number: githubCount } = await fetchGithubCount();

  return (
    <div>
      <Header
        algoliaApiKey={process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string}
        githubCount={githubCount}
      />
      <div className="m-auto mb-24 flex max-w-[960px] flex-col items-center px-8 pt-24">
        <div className="relative mb-24 flex aspect-square w-full flex-col items-center justify-center gap-4 sm:h-[460px] sm:w-[460px]">
          <h2 className="relative z-10 text-5xl font-bold">404</h2>
          <p className="relative z-10 max-w-80 text-center">
            The page you were looking for couldn&apos;t be found. It may have
            moved. Try double-checking the link or going back.
          </p>
          <PuzzlePieces />
        </div>
        <div className="mb-8 flex w-full gap-4 rounded border border-zinc-300 p-6 md:gap-6 md:p-8 lg:items-center dark:border-slate-800">
          <SearchIllustration />
          <div className="flex flex-1 flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="mb-2 lg:mb-0">
              <h2 className="text-lg font-bold">Search the docs</h2>
              <p className="text-zinc-500">
                There&apos;s probably an article for your issue already.
              </p>
            </div>
            <Search
              algoliaApiKey={process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string}
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-8 md:flex-row">
          <div className="flex flex-1 gap-4 rounded border border-zinc-300 p-6 md:gap-6 md:p-8 dark:border-slate-800">
            <DiscordIcon className="h-10 w-10 text-[#5B65EA]" />
            <div className="flex-1">
              <h2 className="text-lg font-bold">
                Ask a question in #support chat
              </h2>
              <p className="mb-3 text-zinc-500">
                Resolve issues with community help. A maintainer is usually
                online.
              </p>
              <a
                className="flex items-center gap-2 text-blue-500"
                href="https://discord.gg/storybook"
              >
                Chat now
                <ChevronSmallRightIcon />
              </a>
            </div>
          </div>
          <div className="flex flex-1 gap-4 rounded border border-zinc-300 p-6 md:gap-6 md:p-8 dark:border-slate-800">
            <GithubIcon className="h-10 w-10" />
            <div className="flex-1">
              <h2 className="text-lg font-bold">File an issue on GitHub</h2>
              <p className="mb-3 text-zinc-500">
                Please report issues, someone else may have the same issue.
              </p>
              <a
                className="flex items-center gap-2 text-blue-500"
                href="https://github.com/storybookjs/storybook"
              >
                View GitHub Issues
                <ChevronSmallRightIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
