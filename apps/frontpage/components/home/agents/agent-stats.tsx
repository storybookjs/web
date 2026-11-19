import Link from 'next/link';
import { ChevronSmallRightIcon } from '@storybook/icons';

// Set this to the study URL once it's published. While it's undefined, the
// "See the study" link stays hidden.
export const STUDY_URL: string | undefined = undefined;

const stats = [
  {
    headline: '23% faster',
    label: 'to finish, compared to agents without Storybook',
  },
  {
    headline: '18% fewer tokens',
    label: 'read and written, compared to agents without Storybook',
  },
];

export function AgentStats({ studyUrl = STUDY_URL }: { studyUrl?: string }) {
  return (
    <div className="rounded-lg bg-white/[0.03] p-6 sm:p-8">
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-16">
        {stats.map((stat) => (
          <div key={stat.headline}>
            <div className="text-4xl font-bold text-[#FF4785] md:text-5xl">
              {stat.headline}
            </div>
            <div className="max-w-[320px] pt-2 text-white/70">{stat.label}</div>
          </div>
        ))}
      </div>
      <p className="max-w-[640px] pt-6 leading-7 text-white">
        In our tests, agents with Storybook skills spent less time searching the
        codebase and more time reading the design system.
        {studyUrl ? (
          <>
            {' '}
            <Link
              className="inline-flex items-center gap-1 font-bold text-blue-500"
              href={studyUrl}
            >
              See the study
              <ChevronSmallRightIcon aria-hidden />
            </Link>
          </>
        ) : null}
      </p>
    </div>
  );
}
