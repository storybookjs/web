import {
  ChevronSmallRightIcon,
  GithubIcon,
  SearchIcon,
} from '@storybook/icons';
import { FC } from 'react';
import { Section } from './section';
import { SearchIcon as SearchIllustration } from '../../components/icons/search';

export const Support: FC = () => {
  return (
    <Section id="support" className="relative mb-8 md:mb-16">
      <h2 className="mb-2 text-2xl font-bold">Get Support</h2>
      <p className="mb-8">
        Storybook&apos;s thriving community can help answer your questions.
        Developers of all skill levels welcome.
      </p>
      <div className="flex gap-4 p-6 mb-8 border rounded border-zinc-300 md:p-8 md:gap-6 lg:items-center">
        <SearchIllustration />
        <div className="flex flex-col flex-1 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="mb-2 lg:mb-0">
            <h2 className="text-lg font-bold">Search the docs</h2>
            <p className="text-zinc-500">
              There&apos;s probably an article for your issue already.
            </p>
          </div>
          <button className="flex items-center justify-between h-10 px-3 transition-colors border rounded border-zinc-300 lg:w-60 xl:w-72 hover:border-blue-500 group">
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <SearchIcon className="transition-colors group-hover:text-blue-500" />
              Search docs
            </div>
            <div className="text-sm text-zinc-500">⌘K</div>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex flex-1 gap-4 p-6 border rounded border-zinc-300 md:p-8 md:gap-6">
          <GithubIcon className="w-10 h-10" />
          <div className="flex-1">
            <h2 className="text-lg font-bold">
              Post a question in GitHub Discussions
            </h2>
            <p className="mb-3 text-zinc-500">
              Share your issues with our community and get help from other devs.
            </p>
            <a
              href="https://github.com/storybookjs/storybook/discussions"
              className="flex items-center gap-2 text-blue-500"
            >
              View GitHub Discussions
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
              href="https://github.com/storybookjs/storybook"
              className="flex items-center gap-2 text-blue-500"
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
