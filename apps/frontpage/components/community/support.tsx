import { ChevronSmallRightIcon, GithubIcon } from '@storybook/icons';
import type { FC } from 'react';
import { Search } from '@repo/ui';
import { SearchIcon as SearchIllustration } from '../icons/search';
import { Section } from './section';

export const Support: FC = () => {
  return (
    <Section className="relative mb-8 md:mb-16" id="support">
      <h2 className="mb-2 text-2xl font-bold">Get Support</h2>
      <p className="mb-8">
        Storybook&apos;s thriving community can help answer your questions.
        Developers of all skill levels welcome.
      </p>
      <div className="mb-8 flex gap-4 rounded border border-zinc-300 p-6 md:gap-6 md:p-8 lg:items-center dark:border-slate-700">
        <SearchIllustration />
        <div className="flex flex-1 flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="mb-2 lg:mb-0">
            <h2 className="text-lg font-bold">Search the docs</h2>
            <p className="text-zinc-500 dark:text-slate-400">
              There&apos;s probably an article for your issue already.
            </p>
          </div>
          <Search
            algoliaApiKey={process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string}
          />
        </div>
      </div>
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex flex-1 gap-4 rounded border border-zinc-300 p-6 md:gap-6 md:p-8 dark:border-slate-700">
          <GithubIcon className="h-10 w-10" />
          <div className="flex-1">
            <h2 className="text-lg font-bold">
              Post a question in GitHub Discussions
            </h2>
            <p className="mb-3 text-zinc-500 dark:text-slate-400">
              Share your issues with our community and get help from other devs.
            </p>
            <a
              className="flex items-center gap-2 text-blue-500"
              href="https://github.com/storybookjs/storybook/discussions"
            >
              View GitHub Discussions
              <ChevronSmallRightIcon />
            </a>
          </div>
        </div>
        <div className="flex flex-1 gap-4 rounded border border-zinc-300 p-6 md:gap-6 md:p-8 dark:border-slate-700">
          <GithubIcon className="h-10 w-10" />
          <div className="flex-1">
            <h2 className="text-lg font-bold">File an issue on GitHub</h2>
            <p className="mb-3 text-zinc-500 dark:text-slate-400">
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
    </Section>
  );
};
