'use client';

import type { FC } from 'react';

interface NumbersProps {
  githubCount: string;
  contributorsCount: string;
  discordMembersCount: string;
  npmDownloadsCount: string;
}

export const Numbers: FC<NumbersProps> = ({
  githubCount,
  contributorsCount,
  discordMembersCount,
  npmDownloadsCount,
}) => {
  return (
    <div className="my-12 grid grid-cols-2 gap-6 border-b border-b-zinc-300 pb-12 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 dark:border-b-slate-700">
      {[
        {
          number: npmDownloadsCount,
          label: 'Downloads/month',
        },
        {
          number: '400+',
          label: 'Integrations',
        },
        {
          number: githubCount,
          label: 'GitHub Stars',
        },
        {
          number: contributorsCount,
          label: 'Contributors',
        },
        {
          number: discordMembersCount,
          label: 'Discord members',
        },
        {
          number: '18,350',
          label: 'Twitter followers',
        },
        {
          number: '6,440',
          label: 'YouTube subscribers',
        },
      ].map(({ number, label }) => (
        <div className="" key={label}>
          <div className="text-md font-bold">{number}</div>
          <div className="text-sm text-zinc-500">{label}</div>
        </div>
      ))}
    </div>
  );
};
