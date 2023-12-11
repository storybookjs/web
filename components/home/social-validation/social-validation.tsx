import React, { FC } from "react";
// import {
//   styles,
//   SectionLede,
//   ProjectCard,
//   HorizontalScroll,
//   StorybookProject,
//   SocialCard,
//   ColoredIcon,
// } from "@storybook/components-marketing";
// import GatsbyLinkWrapper from "../../basics/GatsbyLinkWrapper";
// import { Community } from "../../layout/Community";
import { cn, container } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    name: "Design System",
    accentColor: {
      hex: "#4c35f5",
    },
    height: 288,
    width: 746,
    logoAlt: "Monday.com",
    logoUrl: "https://media.graphassets.com/BBM6cBTiTuLlPvAGtXab",
    projectUrl:
      "https://storybook.js.org/showcase/mondaycom-vibe-design-system",
  },
  {
    name: "Polaris",
    accentColor: {
      hex: "#377e62",
    },
    height: 33,
    width: 118,
    logoAlt: "Shopify",
    logoUrl: "https://media.graphassets.com/GNpyBL6rTJyyruBSsG4v",
    projectUrl: "https://storybook.js.org/showcase/shopify-polaris-react",
  },
  {
    name: "React Spectrum",
    accentColor: {
      hex: "#e03422",
    },
    height: 32,
    width: 130,
    logoAlt: "Adobe",
    logoUrl: "https://media.graphassets.com/voJpj5ySbjALyJ7RUlfw",
    projectUrl:
      "https://storybook.js.org/showcase/adobe-spectrum-web-components",
  },
  {
    name: "Psammead",
    accentColor: {
      hex: "#8F1F19",
    },
    height: 32,
    width: 120,
    logoAlt: "BBC",
    logoUrl: "https://media.graphassets.com/To5iQm5VRRGdr5upBBml",
    projectUrl: "https://storybook.js.org/showcase/bbc-psammead",
  },
  {
    name: "UI React",
    accentColor: {
      hex: "#000000",
    },
    height: 99,
    width: 284,
    logoAlt: "Audi",
    logoUrl: "https://media.graphassets.com/rdYLCbE5Qgm5xGeUfxxJ",
    projectUrl: "https://storybook.js.org/showcase/audi-ui-react",
  },
  {
    name: "Gutenberg",
    accentColor: {
      hex: "#3171A6",
    },
    height: 80,
    width: 80,
    logoAlt: "WordPress",
    logoUrl: "https://media.graphassets.com/b6N8K1VSuym28UndT2wW",
    projectUrl: "https://storybook.js.org/showcase/wordpress-gutenberg",
  },
];

const storybooks = [
  {
    name: "Monday.com",
    url: "https://style.monday.com/",
    logo: "https://avatars.githubusercontent.com/u/61420283?v=4",
    image: {
      src: "/home/community/storybooks/monday-com.webp",
      width: 1440,
      height: 1050,
    },
  },
  {
    name: "Microsoft",
    url: "https://master--628d031b55e942004ac95df1.chromatic.com/",
    logo: "https://avatars.githubusercontent.com/u/6154722?v=4",
    image: {
      src: "/home/community/storybooks/microsoft.webp",
      width: 1440,
      height: 1050,
    },
  },
  {
    name: "D2IQ",
    url: "http://design-system.d2iq.com/",
    logo: "https://avatars.githubusercontent.com/u/19392808?v=4",
    image: {
      src: "/home/community/storybooks/d2iq.webp",
      width: 1440,
      height: 1050,
    },
  },
  {
    name: "Drei",
    url: "https://drei.pmnd.rs/",
    logo: "https://avatars.githubusercontent.com/u/45790596?v=4",
    image: {
      src: "/home/community/storybooks/drei.webp",
      width: 1440,
      height: 1050,
    },
  },
  {
    name: "Shopify",
    url: "https://main--5d559397bae39100201eedc1.chromatic.com/",
    logo: "https://avatars.githubusercontent.com/u/8085?v=4",
    image: {
      src: "/home/community/storybooks/shopify.webp",
      width: 1440,
      height: 1050,
    },
  },
  {
    name: "kickstartDS",
    url: "https://www.kickstartds.com/storybook/",
    logo: "https://avatars.githubusercontent.com/u/79609753?v=4",
    image: {
      src: "/home/community/storybooks/kickstart-ds.webp",
      width: 1440,
      height: 1050,
    },
  },
  {
    name: "Grommet",
    url: "https://master--5d9774839a6eff00203f5cbf.chromatic.com/",
    logo: "https://avatars.githubusercontent.com/u/14203820?v=4",
    image: {
      src: "/home/community/storybooks/grommet.webp",
      width: 1440,
      height: 1050,
    },
  },
  {
    name: "JSTOR",
    url: "https://develop--60919c26122bd50039b34644.chromatic.com/",
    logo: "https://avatars.githubusercontent.com/u/74469?v=4",
    image: {
      src: "/home/community/storybooks/jstor.webp",
      width: 1440,
      height: 1050,
    },
  },
];

const contributors = [
  "/home/community/contributor6.jpg",
  "/home/community/contributor5.jpg",
  "/home/community/contributor4.jpg",
  "/home/community/contributor3.jpg",
  "/home/community/contributor2.jpg",
  "/home/community/contributor1.jpg",
];

// TODO: Bring back live data
const githubContributorCount = 2129;
const discordMemberCount = 20218;
const twitterFollowerCount = 18350;
const youTubeSubscriberCount = 6340;

export const SocialValidation: FC = () => {
  return (
    <section
      className="pt-12 border-b border-zinc-600 sm:pt-20 md:pt-28"
      style={{ scrollbarWidth: "none" }}
    >
      <div
        className={cn(
          container,
          "lg:px-8 text-white md:flex justify-between gap-20"
        )}
      >
        <h2 className="flex-1 text-4xl md:text-[56px]/[70px] font-bold">
          Made for frontend developers
        </h2>
        <div className="flex-1 pt-4">
          <p className="mb-6 leading-7">
            The top frontend engineering teams rely on Storybook to ship
            world-changing products. Join our open source community to learn new
            techniques and get support.
          </p>
          <div className="flex gap-8 items-center">
            <Button variant="outlineHome" rounded="full" jumpOnHover asChild>
              <Link href="/community/">Get involved</Link>
            </Button>
            <div className="min-w-0 flex items-center flex-row-reverse">
              {contributors.map((image) => (
                <Image
                  className="block w-10 h-10 rounded-full -ml-1 last:ml-0 odd:none sm:odd:block"
                  loading="lazy"
                  width={40}
                  height={40}
                  key={image}
                  src={image}
                  alt=""
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="px-8 py-0 pb-4 mt-12 text-white flex gap-8 scroll-p-8 sm:mt-20 mb-[calc(5rem-1rem)] md:mt-28 overflow-scroll snap-x">
        {storybooks.map((storybookProject) => (
          <a
            className="block no-underline w-[240px] sm:w-[480px] flex-none"
            href={storybookProject.url}
            key={storybookProject.name}
            target="_blank"
            rel="noopener nofollow noreferrer"
          >
            <div className="rounded-md overflow-hidden">
              <div className="h-4 bg-zinc-200 border-y border-t-transparent border-b-zinc-300 w-full flex items-center pl-2 gap-1">
                <div className="bg-red-500 w-[5px] h-[5px] rounded-full" />
                <div className="bg-yellow-500 w-[5px] h-[5px] rounded-full" />
                <div className="bg-green-500 w-[5px] h-[5px] rounded-full" />
              </div>
              <Image
                src={storybookProject.image.src}
                alt={storybookProject.name}
                width={storybookProject.image.width}
                height={storybookProject.image.height}
              />
            </div>
            <div className="flex items-center mt-3 text-white">
              <Image
                className="w-5 h-5 mr-2"
                src={storybookProject.logo}
                width={20}
                height={20}
                alt={storybookProject.name}
              />
              <span className="text-sm">{storybookProject.name}</span>
            </div>
          </a>
        ))}
      </div>
      {/* <Projects gap="30px" scrollPadding="0 30px">
        {projects.map((project) => (
          <ProjectCard key={project.logoAlt} {...project} />
        ))}
      </Projects>
      <Community inverse />
      <SocialCTAs>
        <SocialCard
          inverse
          icon={<ColoredIcon icon="github" aria-label="Github" color="#fff" />}
          description={`Join ${githubContributorCount.toLocaleString()}+ contributors building the future of UI development.`}
          link={{
            label: "Star on GitHub",
            href: "https://github.com/storybookjs/storybook",
          }}
          stat={{
            count: `${githubContributorCount.toLocaleString()}+`,
            label: "Contributors",
          }}
        />
        <SocialCard
          inverse
          icon={
            <ColoredIcon icon="discord" aria-label="Discord" color="#5A65EA" />
          }
          description={`Chat with ${discordMemberCount.toLocaleString()}+ frontend developers.`}
          link={{
            label: "Join Discord server",
            href: "https://discord.gg/storybook",
          }}
          stat={{
            count: `${discordMemberCount.toLocaleString()}+`,
            label: "Server members",
          }}
        />
        <SocialCard
          inverse
          icon={
            <ColoredIcon icon="twitter" aria-label="Twitter" color="#4999E9" />
          }
          description="Get the latest news and updates from Storybook maintainers."
          link={{
            label: "Follow on Twitter",
            href: "https://twitter.com/storybookjs",
          }}
          stat={{
            count: `${twitterFollowerCount.toLocaleString()}+`,
            label: "Followers",
          }}
        />
        <SocialCard
          inverse
          icon={
            <YouTubeIcon>
              <ColoredIcon
                icon="youtube"
                aria-label="YouTube"
                color="#EA3223"
              />
            </YouTubeIcon>
          }
          description="Watch tutorials, feature previews, and interviews."
          link={{
            label: "Watch on YouTube",
            href: "https://www.youtube.com/channel/UCr7Quur3eIyA_oe8FNYexfg",
          }}
          stat={{
            count: `${youTubeSubscriberCount.toLocaleString()}+`,
            label: "Subscribers",
          }}
        />
      </SocialCTAs> */}
    </section>
  );
};
