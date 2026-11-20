'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'framer-motion';
import { ChevronSmallRightIcon } from '@storybook/icons';
import { Container, StorybookIcon } from '@repo/ui';
import { STUDY_URL } from './agent-stats';

const agentStatRows = [
  { value: '23%', label: 'Faster tasks', metric: 'Task time', withStorybook: 77 },
  { value: '18%', label: 'Fewer tokens', metric: 'Token usage', withStorybook: 82 },
];

const skillLinks: { name: string; href: string; icon: string | null }[] = [
  { name: 'Agent skills', href: '/docs/ai', icon: null },
  {
    name: 'Claude Code plugin',
    href: 'https://github.com/storybookjs/storybook/tree/next/code/lib/claude-plugin#readme',
    icon: '/images/logos/integrations/integrations-claude.svg',
  },
  {
    name: 'Codex plugin',
    href: 'https://github.com/storybookjs/storybook/tree/next/code/lib/codex-plugin#readme',
    icon: '/images/logos/integrations/integrations-openai.svg',
  },
];

const agentLogos = [
  { name: 'Cursor', logo: '/images/logos/integrations/integrations-cursor.svg' },
  { name: 'OpenAI', logo: '/images/logos/integrations/integrations-openai.svg' },
  { name: 'Copilot', logo: '/images/logos/integrations/integrations-copilot.svg' },
  { name: 'Claude', logo: '/images/logos/integrations/integrations-claude.svg' },
  { name: 'Gemini', logo: '/images/logos/integrations/integrations-gemini.svg' },
  { name: 'VS Code', logo: '/images/logos/integrations/integrations-vscode.svg' },
  { name: 'JetBrains', logo: '/images/logos/integrations/integrations-jetbrains.svg' },
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

function BenchmarkReadout() {
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
      <div className="overflow-x-auto bg-[#282C34] px-6 py-7 font-mono text-sm/[1.6]">
        <table className="w-full min-w-[420px] border-collapse">
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
                  <span aria-hidden="true" className="mt-2 grid w-[120px] gap-[5px]">
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

export function Agents({ studyUrl = STUDY_URL }: { studyUrl?: string }) {
  return (
    <section className="overflow-hidden border-b border-zinc-600 py-[72px] text-white min-[960px]:py-28">
      <Container className="lg:px-8">
        <div className="grid items-center gap-12 min-[960px]:grid-cols-[5fr_6fr] min-[960px]:gap-[72px]">
          <div className="grid content-start gap-6">
            <h2 className="text-4xl font-bold md:text-[56px]/[70px]">
              Agents work faster with Storybook
            </h2>
            <p className="m-0 max-w-[56ch] leading-7 text-white/80">
              In our benchmarks, agents with Storybook skills spent less time
              searching the codebase and more time reading the design system.
            </p>
            {studyUrl ? (
              <Link
                className="flex items-center gap-2 font-bold text-blue-500"
                href={studyUrl}
              >
                See the study
                <ChevronSmallRightIcon />
              </Link>
            ) : null}
            <div className="mt-4 grid gap-5 border-t border-zinc-600 pt-7">
              <p className="m-0 max-w-[46ch] text-lg/[1.6] font-bold">
                Storybook includes agent skills that teach coding agents your UI
                workflow, also available as Claude Code and Codex plugins.
              </p>
              <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
                {skillLinks.map((skill) => (
                  <li key={skill.name}>
                    <Link
                      className="flex h-10 items-center gap-2 rounded-full border border-zinc-600 pl-3 pr-4 text-sm font-bold text-white transition-colors hover:border-blue-500 focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-homeBackground"
                      href={skill.href}
                    >
                      {skill.icon ? (
                        <Image
                          alt=""
                          className="h-5 w-5 rounded"
                          height={20}
                          src={skill.icon}
                          width={20}
                        />
                      ) : (
                        <StorybookIcon size={20} />
                      )}
                      {skill.name}
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
          <BenchmarkReadout />
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
          <span className="w-full text-center text-sm text-white/60">
            Works with your coding agent
          </span>
          {agentLogos.map((logo) => (
            <Image
              alt={logo.name}
              className="h-9 w-9 rounded-md ring-1 ring-white/10"
              height={36}
              key={logo.name}
              src={logo.logo}
              width={36}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
