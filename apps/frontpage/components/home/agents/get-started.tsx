import Image from 'next/image';
import Link from 'next/link';
import { ChevronSmallRightIcon, StorybookIcon } from '@storybook/icons';

const options = [
  { name: 'Agent skills', icon: <StorybookIcon className="text-[#FF4785]" /> },
  {
    name: 'Claude Code plugin',
    icon: (
      <Image
        alt=""
        className="h-5 w-5 rounded"
        height={20}
        src="/images/logos/integrations/integrations-claude.svg"
        width={20}
      />
    ),
  },
  {
    name: 'Codex plugin',
    icon: (
      <Image
        alt=""
        className="h-5 w-5 rounded"
        height={20}
        src="/images/logos/integrations/integrations-openai.svg"
        width={20}
      />
    ),
  },
];

export function GetStarted() {
  return (
    <div className="flex flex-col gap-6 border-y border-zinc-600 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
      <p className="m-0 max-w-[520px] leading-7 text-white">
        Storybook includes agent skills that teach coding agents your UI
        workflow, also available as Claude Code and Codex plugins.
      </p>
      <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center">
        <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
          {options.map((option) => (
            <li key={option.name}>
              <Link
                className="flex h-10 items-center gap-2 rounded-full border border-zinc-600 pl-3 pr-4 text-sm font-bold text-white transition-colors hover:border-blue-500 focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-homeBackground"
                href="/docs/ai"
              >
                {option.icon}
                {option.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          className="flex items-center gap-2 font-bold text-blue-500"
          href="/docs/ai"
        >
          Read the docs
          <ChevronSmallRightIcon />
        </Link>
      </div>
    </div>
  );
}
