import { Footer, Header } from '@repo/ui';
import { fetchGithubCount } from '@repo/utils';
import {
  ChevronSmallRightIcon,
  DiscordIcon,
  GithubIcon,
  SearchIcon,
} from '@storybook/icons';
import { PuzzlePieces } from '../components/puzzle-pieces';
import { SearchIcon as SearchIllustration } from '../components/icons/search';

export default async function NotFound() {
  const { number: githubCount } = await fetchGithubCount();

  return (
    <div>
      <Header githubCount={githubCount} variant="system" />
      <div className="m-auto max-w-[960px] flex flex-col items-center pt-24 px-8 mb-24">
        <div className="w-full sm:w-[460px] sm:h-[460px] relative flex items-center justify-center flex-col gap-4 mb-24 aspect-square">
          <h2 className="relative z-10 text-5xl font-bold">404</h2>
          <p className="relative z-10 text-center max-w-80">
            The page you were looking for couldn&apos;t be found. It may have
            moved. Try double-checking the link or going back.
          </p>
          <PuzzlePieces />
        </div>
        <div className="flex w-full gap-4 p-6 mb-8 border rounded border-zinc-300 md:p-8 md:gap-6 lg:items-center">
          <SearchIllustration />
          <div className="flex flex-col flex-1 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="mb-2 lg:mb-0">
              <h2 className="text-lg font-bold">Search the docs</h2>
              <p className="text-zinc-500">
                There&apos;s probably an article for your issue already.
              </p>
            </div>
            <button
              className="flex items-center justify-between h-10 px-3 transition-colors border rounded border-zinc-300 lg:w-60 xl:w-72 hover:border-blue-500 group"
              type="button"
            >
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <SearchIcon className="transition-colors group-hover:text-blue-500" />
                Search docs
              </div>
              <div className="text-sm text-zinc-500">⌘K</div>
            </button>
          </div>
        </div>
        <div className="flex flex-col w-full gap-8 md:flex-row">
          <div className="flex flex-1 gap-4 p-6 border rounded border-zinc-300 md:p-8 md:gap-6">
            <DiscordIcon className="w-10 h-10 text-[#5B65EA]" />
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
          <div className="flex flex-1 gap-4 p-6 border rounded border-zinc-300 md:p-8 md:gap-6">
            <GithubIcon className="w-10 h-10" />
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
