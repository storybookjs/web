import React, { FC } from "react";
import { cn, container } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Community } from "../../community";
import {
  DiscordIcon,
  GithubIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@storybook/icons";

const projects = [
  {
    name: "Polaris",
    bgColor: "#377e62",
    width: 100,
    height: 28,
    logoAlt: "Shopify",
    logoUrl: "/home/community/logos/shopify.svg",
    projectUrl: "https://storybook.js.org/showcase/shopify-polaris-react",
  },
  {
    name: "Psammead",
    bgColor: "#8F1F19",
    width: 102,
    height: 28,
    logoAlt: "BBC",
    logoUrl: "/home/community/logos/bbc.svg",
    projectUrl: "https://storybook.js.org/showcase/bbc-psammead",
  },
  {
    name: "UI React",
    bgColor: "#333333",
    width: 88,
    height: 30,
    logoAlt: "Audi",
    logoUrl: "/home/community/logos/audi.svg",
    projectUrl: "https://storybook.js.org/showcase/audi-ui-react",
  },
  {
    name: "Fluent UI React",
    bgColor: "#0078d4",
    width: 40,
    height: 70,
    logoAlt: "Audi",
    logoUrl: "/home/community/logos/fluent.svg",
    projectUrl: "https://storybook.js.org/showcase/microsoft-fluent-ui-react",
  },
  {
    name: "Gutenberg",
    bgColor: "#3171A6",
    width: 52,
    height: 52,
    logoAlt: "WordPress",
    logoUrl: "/home/community/logos/wordpress.svg",
    projectUrl: "https://storybook.js.org/showcase/wordpress-gutenberg",
  },
  {
    name: "Explorer 1",
    bgColor: "#0b3d91",
    width: 100,
    height: 28,
    logoAlt: "WordPress",
    logoUrl: "/home/community/logos/nasa.svg",
    projectUrl: "https://storybook.js.org/showcase/nasa-jpl-explorer-1",
  },
  {
    name: "React Spectrum",
    bgColor: "#e03422",
    width: 56,
    height: 48,
    logoAlt: "Adobe",
    logoUrl: "/home/community/logos/adobe.svg",
    projectUrl:
      "https://storybook.js.org/showcase/adobe-spectrum-web-components",
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

const socialCard =
  "flex flex-col justify-start items-start gap-6 border border-zinc-600 rounded-md p-6 sm:border-transparent";

export const SocialValidation: FC = () => {
  return (
    <section
      className="pt-12 sm:pt-20 md:pt-28"
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
      <div className="px-8 py-0 pb-4 mt-12 flex gap-8 scroll-p-8 sm:mt-20 mb-[calc(5rem-1rem)] md:mt-28 overflow-scroll snap-x">
        {projects.map((project) => (
          <a
            href={project.projectUrl}
            target="_blank"
            key={project.logoAlt}
            className="w-[240px] flex-none bg-red-500 rounded-md"
            style={{ backgroundColor: project.bgColor }}
          >
            <AspectRatio
              ratio={4 / 3}
              className="flex flex-col gap-2 items-center justify-center font-bold text-white"
            >
              <Image
                src={project.logoUrl}
                alt={project.logoAlt}
                width={project.width}
                height={project.height}
              />
              {project.name}
            </AspectRatio>
          </a>
        ))}
      </div>
      <div className={cn(container, "pt-0 pb-12 sm:pb-20 md:pb-28")}>
        <Community />
      </div>
      <div
        className={cn(
          container,
          "pb-12 grid grid-cols-[1fr] md:grid-cols-[repeat(2,_1fr)] lg:grid-cols-[repeat(4,_1fr)] gap-8"
        )}
      >
        <div className={cn(socialCard)}>
          <GithubIcon aria-label="Discord" className="text-white" size={48} />
          <div className="text-white text-md">
            {`Join ${githubContributorCount.toLocaleString()}+ contributors building the future of UI development.`}
          </div>
          <Button variant="outlineHome" rounded="full" jumpOnHover asChild>
            <a href="https://github.com/storybookjs/storybook">
              Star on Github
            </a>
          </Button>
          <div>
            <div className="text-sm text-white">{`${githubContributorCount.toLocaleString()}+`}</div>
            <div className="text-sm text-zinc-500">Contributors</div>
          </div>
        </div>
        <div className={cn(socialCard)}>
          <DiscordIcon
            aria-label="Discord"
            className="text-[#5A65EA]"
            size={48}
          />
          <div className="text-white text-md">
            {`Chat with ${discordMemberCount.toLocaleString()}+ frontend developers.`}
          </div>
          <Button variant="outlineHome" rounded="full" jumpOnHover asChild>
            <a href="https://discord.gg/storybook">Join Discord server</a>
          </Button>
          <div>
            <div className="text-sm text-white">{`${discordMemberCount.toLocaleString()}+`}</div>
            <div className="text-sm text-zinc-500">Server members</div>
          </div>
        </div>
        <div className={cn(socialCard)}>
          <TwitterIcon
            aria-label="Discord"
            className="text-[#4999E9]"
            size={48}
          />
          <div className="text-white text-md">
            Get the latest news and updates from Storybook maintainers.
          </div>
          <Button variant="outlineHome" rounded="full" jumpOnHover asChild>
            <a href="https://twitter.com/storybookjs">Follow on Twitter</a>
          </Button>
          <div>
            <div className="text-sm text-white">{`${twitterFollowerCount.toLocaleString()}+`}</div>
            <div className="text-sm text-zinc-500">Followers</div>
          </div>
        </div>
        <div className={cn(socialCard)}>
          <YoutubeIcon
            aria-label="Discord"
            className="text-[#EA3223]"
            size={48}
          />
          <div className="text-white text-md">
            Watch tutorials, feature previews, and interviews.
          </div>
          <Button variant="outlineHome" rounded="full" jumpOnHover asChild>
            <a href="https://www.youtube.com/channel/UCr7Quur3eIyA_oe8FNYexfg">
              Watch on YouTube
            </a>
          </Button>
          <div>
            <div className="text-sm text-white">{`${youTubeSubscriberCount.toLocaleString()}+`}</div>
            <div className="text-sm text-zinc-500">Subscribers</div>
          </div>
        </div>
      </div>
    </section>
  );
};
