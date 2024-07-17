import {
  CalendarIcon,
  ChevronSmallRightIcon,
  DiscordIcon,
  TwitterIcon,
  YoutubeIcon,
} from '@storybook/icons';
import type { FC } from 'react';
import { useMemo } from 'react';
import { zonedTimeToUtc, format } from 'date-fns-tz';
import { isPast } from 'date-fns';
import { Youtube } from '../logos/youtube';
import { Section } from './section';

const rezoneDate = (date: Date) => zonedTimeToUtc(date, 'America/Los_Angeles');

const formatDate = (date: Date) => {
  // https://github.com/date-fns/date-fns/issues/946
  return {
    date: format(date, 'd LLLL, y, h:mmaaa (zzzz)'),
    dateShort: format(date, 'd LLL, y, haaa (zzz)'),
  };
};

interface Session {
  id: number;
  title: string;
  date: string;
  dateShort?: string;
  registrationLink: string;
}

const sessionsData: Session[] = [
  {
    id: 0,
    title: 'Storybook for Developers',
    date: 'July 20, 2023 8:30 AM',
    registrationLink:
      'https://docs.google.com/forms/d/e/1FAIpQLSeLAB8aoLNRiW5M5Jpn78qxVnnCETDJYpTAph5732tRFXoFDw/viewform?usp=pp_url&entry.146778204=July+20,+2023',
  },
  {
    id: 1,
    title: 'Storybook for Developers',
    date: 'Aug 29, 2023 7:00 AM',
    registrationLink:
      'https://docs.google.com/forms/d/e/1FAIpQLSeLAB8aoLNRiW5M5Jpn78qxVnnCETDJYpTAph5732tRFXoFDw/viewform?usp=pp_url&entry.146778204=Aug+29,+2023',
  },
  {
    id: 2,
    title: 'Chromatic & Storybook for Designers',
    date: 'Oct 12, 2023 8:30 AM',
    registrationLink:
      'https://docs.google.com/forms/d/e/1FAIpQLSeLAB8aoLNRiW5M5Jpn78qxVnnCETDJYpTAph5732tRFXoFDw/viewform?usp=pp_url&entry.146778204=Oct+12,+2023',
  },
  {
    id: 3,
    title: 'Storybook Workflows for Frontend Teams',
    date: 'Nov 7, 2023 9:00 AM',
    registrationLink:
      'https://docs.google.com/forms/d/e/1FAIpQLSeLAB8aoLNRiW5M5Jpn78qxVnnCETDJYpTAph5732tRFXoFDw/viewform?usp=pp_url&entry.146778204=Nov+7,+2023',
  },
];

export const Events: FC = () => {
  const localizedSessions = useMemo(() => {
    return sessionsData
      .map((session) => {
        const date = rezoneDate(new Date(session.date));
        const info = formatDate(date);
        return {
          ...session,
          isPast: isPast(date),
          date: info.date,
          dateShort: info.dateShort,
          rawDate: new Date(session.date),
        };
      })
      .sort(
        (a, b) => new Date(a.rawDate).valueOf() - new Date(b.rawDate).valueOf(),
      )
      .reduce<{ upcoming: Session[]; past: Session[] }>(
        (acc, session) => {
          if (session.isPast) {
            acc.past.push(session);
          } else {
            acc.upcoming.push(session);
          }
          return acc;
        },
        { upcoming: [], past: [] },
      );
  }, []);

  return (
    <Section className="relative mb-8 md:mb-16" id="events-streams">
      <h2 className="mb-2 text-2xl font-bold">Join live events & streams</h2>
      <p className="mb-8">
        Storybook&apos;s thriving community can help answer your questions.
        Developers of all skill levels welcome.
      </p>
      <div className="mb-8 flex flex-col gap-8 md:flex-row">
        <div className="flex flex-1 gap-4 rounded border border-zinc-300 p-6 md:gap-6 md:p-8 dark:border-slate-700">
          <Youtube size={40} />
          <div className="flex-1">
            <h2 className="text-lg font-bold">Subscribe to YouTube channel</h2>
            <p className="mb-3 text-zinc-500">
              Watch insider previews, feature demos, and interviews.
            </p>
            <a
              className="flex items-center gap-2 text-blue-500"
              href="https://www.youtube.com/channel/UCr7Quur3eIyA_oe8FNYexfg"
            >
              Watch now
              <ChevronSmallRightIcon />
            </a>
          </div>
        </div>
        <div className="flex flex-1 gap-4 rounded border border-zinc-300 p-6 md:gap-6 md:p-8 dark:border-slate-700">
          <TwitterIcon className="h-10 w-10 text-[#4999e9]" />
          <div className="flex-1">
            <h2 className="text-lg font-bold">Twitter</h2>
            <p className="mb-3 text-zinc-500">
              Get the latest event updates from Storybook maintainers.
            </p>
            <a
              className="flex items-center gap-2 text-blue-500"
              href="https://twitter.com/storybookjs"
            >
              Follow now
              <ChevronSmallRightIcon />
            </a>
          </div>
        </div>
      </div>
      <div className="mb-8 flex flex-col gap-8 md:flex-row">
        <div className="flex flex-1 gap-4 rounded border border-zinc-300 p-6 md:gap-6 md:p-8 dark:border-slate-700">
          <DiscordIcon className="h-10 w-10 text-[#5a65ea]" />
          <div className="flex-1">
            <h2 className="text-lg font-bold">Follow #announcements chat</h2>
            <p className="mb-3 text-zinc-500">
              Join our community chat to learn about live events and streams.
            </p>
            <a
              className="flex items-center gap-2 text-blue-500"
              href="https://discord.gg/storybook"
            >
              Chat now
              <ChevronSmallRightIcon />
            </a>
          </div>
        </div>
        <div className="flex-1 px-6 md:px-8" />
      </div>
      <div>
        <h3 className="mb-3 text-lg font-bold">Storybook Sessions</h3>
        <div>
          <p>
            Join us for these 1-hour sessions, hosted by the{' '}
            <a href="https://www.chromatic.com/">
              <span>Chromatic</span>
            </a>{' '}
            team. We&apos;ll explore the component-driven approach to building,
            testing, and documenting UIs using Storybook. You&apos;ll learn how
            to:
          </p>
          <ul className="my-4 list-inside list-disc pl-4">
            <li>
              Utilize addons to debug CSS, verify event handlers, and mock API
              requests.
            </li>
            <li>
              Publish your Storybook to gather feedback and embed stories into
              other tools.
            </li>
            <li>
              Strategies for organizing your stories and auto-generating docs.
            </li>
            <li>
              Use stories to test components for visual, interaction, and
              accessibility purposes.
            </li>
            <li>
              Facilitate better designer-developer collaboration using the
              designs addon and the Storybook Connect plugin.
            </li>
          </ul>
        </div>
        <h3 className="mb-3 mt-6 text-lg font-bold">Upcoming</h3>
        <ul>
          {localizedSessions.upcoming.map((session) => (
            <li
              className="flex h-11 items-center justify-between border-b border-b-zinc-300 dark:border-b-slate-700"
              key={session.id}
            >
              <div className="flex items-center gap-4">
                <CalendarIcon className="h-4 w-4 text-zinc-500 dark:text-slate-400" />
                <div className="text-md font-bold">{session.title}</div>
                <div> — </div>
                <div className="text-md text-zinc-500 dark:text-slate-400">
                  {session.dateShort}
                </div>
              </div>
              <a
                className="flex items-center gap-2 text-blue-500"
                href={session.registrationLink}
                rel="noreferrer"
                target="_blank"
              >
                Register <ChevronSmallRightIcon />
              </a>
            </li>
          ))}
        </ul>
        {localizedSessions.upcoming.length === 0 && (
          <div className="rounded border border-dashed border-zinc-300 p-6 dark:border-slate-700">
            No upcoming sessions scheduled at the moment. To stay informed about
            new sessions, please sign up for our newsletter.
          </div>
        )}
        <h3 className="mb-3 mt-6 text-lg font-bold">Past</h3>
        <ul>
          {localizedSessions.past.map((session) => (
            <li
              className="flex h-11 items-center border-b border-b-zinc-300 dark:border-slate-700"
              key={session.id}
            >
              <div className="flex items-center gap-4">
                <CalendarIcon className="h-4 w-4 text-zinc-500 dark:text-slate-400" />
                <div className="text-md font-bold">{session.title}</div>
                <div> — </div>
                <div className="text-md text-zinc-500 dark:text-slate-400">
                  {session.dateShort}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};
