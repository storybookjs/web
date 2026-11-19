'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';

// Set this to the study URL once it's published. While it's undefined, the
// "See the study" link stays hidden.
export const STUDY_URL: string | undefined = undefined;

interface Stat {
  value: string;
  label: string;
  metric: string;
  /** Result for agents with Storybook, as a percentage of agents without it. */
  withStorybook: number;
}

const stats: Stat[] = [
  {
    value: '23%',
    label: 'Faster tasks',
    metric: 'Task time',
    withStorybook: 77,
  },
  {
    value: '18%',
    label: 'Fewer tokens',
    metric: 'Token usage',
    withStorybook: 82,
  },
];

const card = 'rounded-lg border border-white/10 bg-white/[0.03]';

function Bar({
  label,
  percent,
  color,
  filled,
  delay,
}: {
  label: string;
  percent: number;
  color: string;
  filled: boolean;
  delay: number;
}) {
  return (
    <div className="grid gap-2 sm:col-span-2 sm:grid-cols-subgrid sm:items-center sm:gap-x-6">
      <dt className="text-white/70">{label}</dt>
      <dd className="m-0 flex items-center gap-3">
        {/* The bar shares the row with its value, so it scales against the
            space left after the value label. */}
        <div
          className="h-2 rounded-full transition-[width] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
          style={{
            backgroundColor: color,
            width: filled
              ? `calc((100% - 3rem) * ${String(percent / 100)})`
              : '0%',
            transitionDelay: `${String(delay)}ms`,
          }}
        />
        <span className="w-9 shrink-0 font-bold tabular-nums text-white">
          {percent}%
        </span>
      </dd>
    </div>
  );
}

export function AgentStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div className="flex flex-col gap-6" ref={ref}>
      {stats.map((stat, index) => (
        <div
          className="grid gap-3 sm:grid-cols-[200px_1fr] sm:gap-6 lg:grid-cols-[240px_1fr]"
          key={stat.metric}
        >
          <div className={`${card} flex flex-col justify-center p-6`}>
            <span className="text-5xl/none font-bold tabular-nums tracking-[-0.02em] text-[#66BF3C] md:text-[56px]/none">
              {stat.value}
            </span>
            <span className="pt-2 text-white/70">{stat.label}</span>
          </div>
          <div className={`${card} p-6 md:px-8`}>
            <h3 className="m-0 text-xs font-bold uppercase tracking-[0.2em] text-white">
              {stat.metric}
            </h3>
            <dl className="m-0 mt-5 grid gap-y-4 text-sm sm:grid-cols-[auto_1fr] sm:gap-x-6">
              <Bar
                color="#FC521F"
                delay={index * 150}
                filled={inView}
                label="Without Storybook"
                percent={100}
              />
              <Bar
                color="#66BF3C"
                delay={index * 150 + 200}
                filled={inView}
                label="With Storybook"
                percent={stat.withStorybook}
              />
            </dl>
          </div>
        </div>
      ))}
    </div>
  );
}
