import {
  CalendarIcon,
  ChevronSmallRightIcon,
  DiscordIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@storybook/icons";
import { FC, useMemo } from "react";
import { zonedTimeToUtc, format } from "date-fns-tz";
import { isPast } from "date-fns";

const rezoneDate = (date: Date) => zonedTimeToUtc(date, "America/Los_Angeles");

const formatDate = (date: Date) => {
  // https://github.com/date-fns/date-fns/issues/946
  return {
    date: format(date, "d LLLL, y, h:mmaaa (zzzz)"),
    dateShort: format(date, "d LLL, y, haaa (zzz)"),
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
    title: "Storybook for Developers",
    date: "July 20, 2023 8:30 AM",
    registrationLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSeLAB8aoLNRiW5M5Jpn78qxVnnCETDJYpTAph5732tRFXoFDw/viewform?usp=pp_url&entry.146778204=July+20,+2023",
  },
  {
    id: 1,
    title: "Storybook for Developers",
    date: "Aug 29, 2023 7:00 AM",
    registrationLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSeLAB8aoLNRiW5M5Jpn78qxVnnCETDJYpTAph5732tRFXoFDw/viewform?usp=pp_url&entry.146778204=Aug+29,+2023",
  },
  {
    id: 2,
    title: "Chromatic & Storybook for Designers",
    date: "Oct 12, 2023 8:30 AM",
    registrationLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSeLAB8aoLNRiW5M5Jpn78qxVnnCETDJYpTAph5732tRFXoFDw/viewform?usp=pp_url&entry.146778204=Oct+12,+2023",
  },
  {
    id: 3,
    title: "Storybook Workflows for Frontend Teams",
    date: "Nov 7, 2023 9:00 AM",
    registrationLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSeLAB8aoLNRiW5M5Jpn78qxVnnCETDJYpTAph5732tRFXoFDw/viewform?usp=pp_url&entry.146778204=Nov+7,+2023",
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
        (a, b) => new Date(a.rawDate).valueOf() - new Date(b.rawDate).valueOf()
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
        { upcoming: [], past: [] }
      );
  }, []);

  return (
    <div className="relative mb-8 md:mb-16">
      <div id="events-streams" className="absolute -top-28" />
      <h2 className="font-bold text-2xl mb-2">Join live events & streams</h2>
      <p className="mb-8">
        Storybook&apos;s thriving community can help answer your questions.
        Developers of all skill levels welcome.
      </p>
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-1 border border-zinc-300 rounded p-6 md:p-8 flex gap-4 md:gap-6">
          <YoutubeIcon className="w-10 h-10 text-[#ea3223]" />
          <div className="flex-1">
            <h2 className="font-bold text-lg">Subscribe to YouTube channel</h2>
            <p className="mb-3 text-zinc-500">
              Watch insider previews, feature demos, and interviews.
            </p>
            <a
              href="https://www.youtube.com/channel/UCr7Quur3eIyA_oe8FNYexfg"
              className="flex gap-2 items-center text-blue-500"
            >
              Watch now
              <ChevronSmallRightIcon />
            </a>
          </div>
        </div>
        <div className="flex-1 border border-zinc-300 rounded p-6 md:p-8 flex gap-4 md:gap-6">
          <TwitterIcon className="w-10 h-10 text-[#4999e9]" />
          <div className="flex-1">
            <h2 className="font-bold text-lg">Twitter</h2>
            <p className="mb-3 text-zinc-500">
              Get the latest event updates from Storybook maintainers.
            </p>
            <a
              href="https://twitter.com/storybookjs"
              className="flex gap-2 items-center text-blue-500"
            >
              Follow now
              <ChevronSmallRightIcon />
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-1 border border-zinc-300 rounded p-6 md:p-8 flex gap-4 md:gap-6">
          <DiscordIcon className="w-10 h-10 text-[#5a65ea]" />
          <div className="flex-1">
            <h2 className="font-bold text-lg">Follow #announcements chat</h2>
            <p className="mb-3 text-zinc-500">
              Join our community chat to learn about live events and streams.
            </p>
            <a
              href="https://discord.gg/storybook"
              className="flex gap-2 items-center text-blue-500"
            >
              Chat now
              <ChevronSmallRightIcon />
            </a>
          </div>
        </div>
        <div className="flex-1 px-6 md:px-8" />
      </div>
      <div>
        <h3 className="font-bold text-lg mb-3">Storybook Sessions</h3>
        <div>
          <p>
            Join us for these 1-hour sessions, hosted by the{" "}
            <a href="https://www.chromatic.com/">
              <span>Chromatic</span>
            </a>{" "}
            team. We&apos;ll explore the component-driven approach to building,
            testing, and documenting UIs using Storybook. You&apos;ll learn how
            to:
          </p>
          <ul className="list-inside list-disc pl-4 my-4">
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
        <h3 className="font-bold text-lg mb-3 mt-6">Upcoming</h3>
        <ul>
          {localizedSessions.upcoming.map((session) => (
            <li
              key={session.id}
              className="flex items-center h-11 border-b border-b-zinc-300 justify-between"
            >
              <div className="flex items-center gap-4">
                <CalendarIcon className="w-4 h-4 text-zinc-500" />
                <div className="text-md font-bold">{session.title}</div>
                <div> — </div>
                <div className="text-md text-zinc-500">{session.dateShort}</div>
              </div>
              <a
                href={session.registrationLink}
                target="_blank"
                className="flex gap-2 items-center text-blue-500"
              >
                Register <ChevronSmallRightIcon />
              </a>
            </li>
          ))}
        </ul>
        {localizedSessions.upcoming.length === 0 && (
          <div className="border border-dashed border-zinc-300 rounded p-6">
            No upcoming sessions scheduled at the moment. To stay informed about
            new sessions, please sign up for our newsletter.
          </div>
        )}
        <h3 className="font-bold text-lg mb-3 mt-6">Past</h3>
        <ul>
          {localizedSessions.past.map((session) => (
            <li
              key={session.id}
              className="flex items-center h-11 border-b border-b-zinc-300"
            >
              <div className="flex items-center gap-4">
                <CalendarIcon className="w-4 h-4 text-zinc-500" />
                <div className="text-md font-bold">{session.title}</div>
                <div> — </div>
                <div className="text-md text-zinc-500">{session.dateShort}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
