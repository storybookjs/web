// Set this to the study URL once it's published. While it's undefined, the
// "See the study" link stays hidden.
export const STUDY_URL: string | undefined = undefined;

interface Stat {
  value: string;
  unit: string;
  label: string;
  /** Bar length for agents with Storybook, relative to agents without it. */
  withStorybook: number;
}

const stats: Stat[] = [
  {
    value: '23%',
    unit: 'faster',
    label: 'to finish, compared to agents without Storybook',
    withStorybook: 77,
  },
  {
    value: '18%',
    unit: 'fewer tokens',
    label: 'read and written, compared to agents without Storybook',
    withStorybook: 82,
  },
];

function ComparisonBars({ withStorybook }: { withStorybook: number }) {
  return (
    <div
      aria-hidden
      className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 text-sm sm:gap-x-6"
    >
      <span className="text-white/60">Without Storybook</span>
      <div className="h-2.5 w-full rounded-full bg-zinc-600" />
      <span className="font-bold text-white">With Storybook</span>
      <div
        className="h-2.5 rounded-full bg-[#FF4785]"
        style={{ width: `${String(withStorybook)}%` }}
      />
    </div>
  );
}

export function AgentStats() {
  return (
    <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
      {stats.map((stat) => (
        <div className="border-t border-zinc-600 pt-8" key={stat.unit}>
          <p className="m-0 flex flex-wrap items-baseline gap-x-4">
            <span className="text-[72px]/none font-bold tracking-[-0.03em] text-[#FF4785] tabular-nums sm:text-[96px]/none lg:text-[112px]/none">
              {stat.value}
            </span>
            <span className="text-2xl font-bold text-white md:text-[32px]/[40px]">
              {stat.unit}
            </span>
          </p>
          <p className="m-0 max-w-[420px] text-balance pt-3 leading-7 text-white/70">
            {stat.label}
          </p>
          <div className="pt-8">
            <ComparisonBars withStorybook={stat.withStorybook} />
          </div>
        </div>
      ))}
    </div>
  );
}
