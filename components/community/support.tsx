import {
  ChevronSmallRightIcon,
  GithubIcon,
  SearchIcon,
} from "@storybook/icons";
import { FC } from "react";
import { Section } from "./section";

export const Support: FC = () => {
  return (
    <Section id="support" className="relative mb-8 md:mb-16">
      <h2 className="font-bold text-2xl mb-2">Get Support</h2>
      <p className="mb-8">
        Storybook&apos;s thriving community can help answer your questions.
        Developers of all skill levels welcome.
      </p>
      <div className="border border-zinc-300 rounded p-6 md:p-8 flex gap-4 md:gap-6 lg:items-center mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          role="img"
          aria-label="search"
          className="w-10 h-10"
        >
          <g fill="none" fillRule="evenodd">
            <rect
              width="21.302"
              height="6"
              x="26.247"
              y="34.912"
              fill="#FFD476"
              rx="3"
              transform="rotate(-135 36.898 37.912)"
            ></rect>
            <path
              fill="#FFC445"
              d="M20.782 2.127c10.371 0 18.78 8.408 18.78 18.78 0 10.371-8.409 18.78-18.78 18.78-10.372 0-18.78-8.409-18.78-18.78 0-10.372 8.408-18.78 18.78-18.78Zm0 5.938c-7.093 0-12.842 5.75-12.842 12.842 0 7.092 5.75 12.842 12.842 12.842 7.092 0 12.842-5.75 12.842-12.842 0-7.093-5.75-12.842-12.842-12.842Z"
            ></path>
          </g>
        </svg>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between flex-1 lg:gap-8">
          <div className="mb-2 lg:mb-0">
            <h2 className="font-bold text-lg">Search the docs</h2>
            <p className="text-zinc-500">
              There&apos;s probably an article for your issue already.
            </p>
          </div>
          <button className="border rounded h-10 border-zinc-300 lg:w-60 xl:w-72 flex justify-between items-center px-3 hover:border-blue-500 transition-colors group">
            <div className="flex gap-2 items-center text-sm text-zinc-500">
              <SearchIcon className="group-hover:text-blue-500 transition-colors" />
              Search docs
            </div>
            <div className="text-sm text-zinc-500">⌘K</div>
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 border border-zinc-300 rounded p-6 md:p-8 flex gap-4 md:gap-6">
          <GithubIcon className="w-10 h-10" />
          <div className="flex-1">
            <h2 className="font-bold text-lg">
              Post a question in GitHub Discussions
            </h2>
            <p className="mb-3 text-zinc-500">
              Share your issues with our community and get help from other devs.
            </p>
            <a
              href="https://github.com/storybookjs/storybook/discussions"
              className="flex gap-2 items-center text-blue-500"
            >
              View GitHub Discussions
              <ChevronSmallRightIcon />
            </a>
          </div>
        </div>
        <div className="flex-1 border border-zinc-300 rounded p-6 md:p-8 flex gap-4 md:gap-6">
          <GithubIcon className="w-10 h-10" />
          <div className="flex-1">
            <h2 className="font-bold text-lg">File an issue on GitHub</h2>
            <p className="mb-3 text-zinc-500">
              Please report issues, someone else may have the same issue.
            </p>
            <a
              href="https://github.com/storybookjs/storybook"
              className="flex gap-2 items-center text-blue-500"
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
