'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'framer-motion';
import { ChevronSmallRightIcon } from '@storybook/icons';

// Set this to the study URL once it's published. While it's undefined, the
// "See the study" link stays hidden.
export const STUDY_URL: string | undefined = undefined;

const agentStatRows = [
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

const agentLogos = [
  {
    name: 'Cursor',
    logo: '/images/logos/integrations/integrations-cursor.svg',
  },
  {
    name: 'OpenAI',
    logo: '/images/logos/integrations/integrations-openai.svg',
  },
  {
    name: 'Copilot',
    logo: '/images/logos/integrations/integrations-copilot.svg',
  },
  {
    name: 'Claude',
    logo: '/images/logos/integrations/integrations-claude.svg',
  },
  {
    name: 'Gemini',
    logo: '/images/logos/integrations/integrations-gemini.svg',
  },
  {
    name: 'VS Code',
    logo: '/images/logos/integrations/integrations-vscode.svg',
  },
  {
    name: 'JetBrains',
    logo: '/images/logos/integrations/integrations-jetbrains.svg',
  },
];

function MiniBar({
  percent,
  color,
  filled,
  delay,
}: {
  percent: number;
  color: string;
  filled: boolean;
  delay: number;
}) {
  return (
    <i
      className="block h-1 rounded-full transition-[width] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
      style={{
        backgroundColor: color,
        width: filled ? `${String(percent)}%` : '0%',
        transitionDelay: `${String(delay)}ms`,
      }}
    />
  );
}

export function BenchmarkReadout() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div
      className="overflow-hidden rounded-[10px] border border-slate-700 bg-[#1d1f24] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5),0_2px_6px_rgba(0,0,0,0.3)]"
      ref={ref}
    >
      <div className="relative flex gap-2 border-b border-slate-700 p-3">
        <i className="h-2.5 w-2.5 rounded-full bg-[#fc521f]" />
        <i className="h-2.5 w-2.5 rounded-full bg-[#ffae00]" />
        <i className="h-2.5 w-2.5 rounded-full bg-[#66bf3c]" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-xs text-zinc-400">
          benchmark results
        </span>
      </div>
      <div className="bg-[#282C34] px-5 py-6 font-mono text-sm/[1.6] sm:px-6 sm:py-7">
        {/* Narrow screens: one block per metric, so the result stays visible */}
        <dl className="m-0 grid gap-6 sm:hidden">
          {agentStatRows.map((stat, index) => (
            <div className="grid gap-3" key={stat.metric}>
              <dt className="border-b border-dashed border-[#3f4652] pb-2 text-zinc-400">
                {stat.metric}
              </dt>
              <dd className="m-0 flex items-baseline gap-3">
                <span className="text-[28px]/none font-bold tabular-nums text-[#66BF3C]">
                  {stat.value}
                </span>
                <span className="text-[13px] text-zinc-400">{stat.label}</span>
              </dd>
              <dd className="m-0 grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-2 text-[13px] tabular-nums">
                <span className="text-zinc-400">Without Storybook</span>
                <MiniBar
                  color="#FC521F"
                  delay={index * 150}
                  filled={inView}
                  percent={100}
                />
                <span>100%</span>
                <span className="text-zinc-400">With Storybook</span>
                <MiniBar
                  color="#66BF3C"
                  delay={index * 150 + 200}
                  filled={inView}
                  percent={stat.withStorybook}
                />
                <span>{stat.withStorybook}%</span>
              </dd>
            </div>
          ))}
        </dl>
        <table className="hidden w-full border-collapse sm:table">
          <thead>
            <tr>
              {['Metric', 'Without Storybook', 'With Storybook', 'Result'].map(
                (heading) => (
                  <th
                    className="border-b border-dashed border-[#3f4652] pb-3 pr-3 text-left font-normal text-zinc-400"
                    key={heading}
                    scope="col"
                  >
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {agentStatRows.map((stat, index) => (
              <tr key={stat.metric}>
                <td className="pr-3 pt-4 align-top">{stat.metric}</td>
                <td className="pr-3 pt-4 align-top tabular-nums">100%</td>
                <td className="pr-3 pt-4 align-top tabular-nums">
                  {stat.withStorybook}%
                  <span
                    aria-hidden="true"
                    className="mt-2 grid w-[120px] gap-[5px]"
                  >
                    <MiniBar
                      color="#FC521F"
                      delay={index * 150}
                      filled={inView}
                      percent={100}
                    />
                    <MiniBar
                      color="#66BF3C"
                      delay={index * 150 + 200}
                      filled={inView}
                      percent={stat.withStorybook}
                    />
                  </span>
                </td>
                <td className="pr-3 pt-4 align-top text-[28px]/none font-bold tabular-nums text-[#66BF3C]">
                  {stat.value}
                  <div className="pt-1.5 text-[13px]/normal font-normal text-zinc-400">
                    {stat.label}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** The docs link and the agents Storybook works with */
export function AgentSkills() {
  return (
    <div className="flex flex-col gap-10">
      <Link
        className="flex w-fit items-center gap-2 font-bold text-blue-500"
        href="/docs/ai"
      >
        Read the docs
        <ChevronSmallRightIcon />
      </Link>
      {/* Same label and icon squares as the Context section's "Made for" row */}
      <div className="flex flex-col gap-4">
        <div className="text-xs font-bold uppercase tracking-widest text-zinc-300">
          Works with your coding agent
        </div>
        {/* Seven squares fit one row at 375px with the tighter mobile gap */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          {agentLogos.map((logo) => (
            <div
              className="flex h-10 w-10 items-center justify-center rounded border border-zinc-700"
              key={logo.name}
            >
              <Image
                alt={logo.name}
                className="h-6 w-6 rounded-sm"
                height={24}
                src={logo.logo}
                width={24}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
