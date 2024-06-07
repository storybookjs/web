import React from 'react';
import { cn } from '@repo/utils';
import Link from 'next/link';
import Image from 'next/image';
import { DiscordIcon, GithubIcon } from '@storybook/icons';
import { Container } from '@repo/ui';
import { Button } from '../../ui/button';
import { AspectRatio } from '../../ui/aspect-ratio';
import { Community } from '../../community';
import { Youtube } from '../../logos/youtube';

const projects = [
  {
    name: 'Polaris',
    bgColor: '#377e62',
    width: 100,
    height: 28,
    logoAlt: 'Shopify',
    logoUrl: '/home/community/logos/shopify.svg',
    projectUrl: 'https://storybook.js.org/showcase/shopify-polaris-react',
  },
  {
    name: 'Psammead',
    bgColor: '#8F1F19',
    width: 102,
    height: 28,
    logoAlt: 'BBC',
    logoUrl: '/home/community/logos/bbc.svg',
    projectUrl: 'https://storybook.js.org/showcase/bbc-psammead',
  },
  {
    name: 'UI React',
    bgColor: '#333333',
    width: 88,
    height: 30,
    logoAlt: 'Audi UI React',
    logoUrl: '/home/community/logos/audi.svg',
    projectUrl: 'https://storybook.js.org/showcase/audi-ui-react',
  },
  {
    name: 'Fluent UI React',
    bgColor: '#0078d4',
    width: 40,
    height: 70,
    logoAlt: 'Fluent UI React',
    logoUrl: '/home/community/logos/fluent.svg',
    projectUrl: 'https://storybook.js.org/showcase/microsoft-fluent-ui-react',
  },
  {
    name: 'Gutenberg',
    bgColor: '#3171A6',
    width: 52,
    height: 52,
    logoAlt: 'WordPress Gutenberg',
    logoUrl: '/home/community/logos/wordpress.svg',
    projectUrl: 'https://storybook.js.org/showcase/wordpress-gutenberg',
  },
  {
    name: 'Explorer 1',
    bgColor: '#0b3d91',
    width: 100,
    height: 28,
    logoAlt: 'Nasa Explorer 1',
    logoUrl: '/home/community/logos/nasa.svg',
    projectUrl: 'https://storybook.js.org/showcase/nasa-jpl-explorer-1',
  },
  {
    name: 'React Spectrum',
    bgColor: '#e03422',
    width: 56,
    height: 48,
    logoAlt: 'Adobe',
    logoUrl: '/home/community/logos/adobe.svg',
    projectUrl:
      'https://storybook.js.org/showcase/adobe-spectrum-web-components',
  },
];

const storybooks = [
  {
    name: 'Monday.com',
    url: 'https://style.monday.com/',
    logo: 'https://avatars.githubusercontent.com/u/61420283?v=4',
    image: {
      src: '/home/community/storybooks/monday-com.webp',
      width: 1440,
      height: 1050,
    },
  },
  {
    name: 'Microsoft',
    url: 'https://master--628d031b55e942004ac95df1.chromatic.com/',
    logo: 'https://avatars.githubusercontent.com/u/6154722?v=4',
    image: {
      src: '/home/community/storybooks/microsoft.webp',
      width: 1440,
      height: 1050,
    },
  },
  {
    name: 'D2IQ',
    url: 'http://design-system.d2iq.com/',
    logo: 'https://avatars.githubusercontent.com/u/19392808?v=4',
    image: {
      src: '/home/community/storybooks/d2iq.webp',
      width: 1440,
      height: 1050,
    },
  },
  {
    name: 'Drei',
    url: 'https://drei.pmnd.rs/',
    logo: 'https://avatars.githubusercontent.com/u/45790596?v=4',
    image: {
      src: '/home/community/storybooks/drei.webp',
      width: 1440,
      height: 1050,
    },
  },
  {
    name: 'Shopify',
    url: 'https://main--5d559397bae39100201eedc1.chromatic.com/',
    logo: 'https://avatars.githubusercontent.com/u/8085?v=4',
    image: {
      src: '/home/community/storybooks/shopify.webp',
      width: 1440,
      height: 1050,
    },
  },
  {
    name: 'kickstartDS',
    url: 'https://www.kickstartds.com/storybook/',
    logo: 'https://avatars.githubusercontent.com/u/79609753?v=4',
    image: {
      src: '/home/community/storybooks/kickstart-ds.webp',
      width: 1440,
      height: 1050,
    },
  },
  {
    name: 'Grommet',
    url: 'https://master--5d9774839a6eff00203f5cbf.chromatic.com/',
    logo: 'https://avatars.githubusercontent.com/u/14203820?v=4',
    image: {
      src: '/home/community/storybooks/grommet.webp',
      width: 1440,
      height: 1050,
    },
  },
  {
    name: 'JSTOR',
    url: 'https://develop--60919c26122bd50039b34644.chromatic.com/',
    logo: 'https://avatars.githubusercontent.com/u/74469?v=4',
    image: {
      src: '/home/community/storybooks/jstor.webp',
      width: 1440,
      height: 1050,
    },
  },
];

const contributors = [
  '/home/community/contributor6.jpg',
  '/home/community/contributor5.jpg',
  '/home/community/contributor4.jpg',
  '/home/community/contributor3.jpg',
  '/home/community/contributor2.jpg',
  '/home/community/contributor1.jpg',
];

const socialCard =
  'flex flex-col justify-start items-start gap-6 border border-zinc-600 rounded-md p-6 sm:border-transparent';

interface SocialValidationProps {
  contributorCount: string;
  discordMembers: string;
}

export function SocialValidation({
  contributorCount,
  discordMembers,
}: SocialValidationProps) {
  return (
    <section
      className="pt-12 sm:pt-20 md:pt-28"
      style={{ scrollbarWidth: 'none' }}
    >
      <Container className="justify-between gap-20 text-white md:flex lg:px-8">
        <h2 className="flex-1 text-4xl font-bold md:text-[56px]/[70px]">
          Made for frontend developers
        </h2>
        <div className="flex-1 pt-4">
          <p className="mb-6 leading-7">
            The top frontend engineering teams rely on Storybook to ship
            world-changing products. Join our open source community to learn new
            techniques and get support.
          </p>
          <div className="flex items-center gap-8">
            <Button asChild jumpOnHover rounded="full" variant="outlineHome">
              <Link href="/community/">Get involved</Link>
            </Button>
            <div className="flex min-w-0 flex-row-reverse items-center">
              {contributors.map((image) => (
                <Image
                  alt=""
                  className="odd:none -ml-1 block h-10 w-10 rounded-full last:ml-0 sm:odd:block"
                  height={40}
                  key={image}
                  loading="lazy"
                  src={image}
                  width={40}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
      <div className="mb-[calc(5rem-1rem)] mt-12 flex snap-x scroll-p-8 gap-8 overflow-scroll px-8 py-0 pb-4 text-white sm:mt-20 md:mt-28">
        {storybooks.map((storybookProject) => (
          <a
            className="block w-[240px] flex-none no-underline sm:w-[480px]"
            href={storybookProject.url}
            key={storybookProject.name}
            rel="noopener nofollow noreferrer"
            target="_blank"
          >
            <div className="overflow-hidden rounded-md">
              <div className="flex h-4 w-full items-center gap-1 border-y border-b-zinc-300 border-t-transparent bg-zinc-200 pl-2">
                <div className="h-[5px] w-[5px] rounded-full bg-red-500" />
                <div className="h-[5px] w-[5px] rounded-full bg-yellow-500" />
                <div className="h-[5px] w-[5px] rounded-full bg-green-500" />
              </div>
              <Image
                alt={storybookProject.name}
                height={storybookProject.image.height}
                src={storybookProject.image.src}
                width={storybookProject.image.width}
              />
            </div>
            <div className="mt-3 flex items-center text-white">
              <Image
                alt={storybookProject.name}
                className="mr-2 h-5 w-5"
                height={20}
                src={storybookProject.logo}
                width={20}
              />
              <span className="text-sm">{storybookProject.name}</span>
            </div>
          </a>
        ))}
      </div>
      <div className="mb-[calc(5rem-1rem)] mt-12 flex snap-x scroll-p-8 gap-8 overflow-scroll px-8 py-0 pb-4 sm:mt-20 md:mt-28">
        {projects.map((project) => (
          <a
            className="w-[240px] flex-none rounded-md bg-red-500"
            href={project.projectUrl}
            key={project.logoAlt}
            rel="noopener"
            style={{ backgroundColor: project.bgColor }}
            target="_blank"
          >
            <AspectRatio
              className="flex flex-col items-center justify-center gap-2 font-bold text-white"
              ratio={4 / 3}
            >
              <Image
                alt={project.logoAlt}
                height={project.height}
                src={project.logoUrl}
                width={project.width}
              />
              {project.name}
            </AspectRatio>
          </a>
        ))}
      </div>
      <Container className="pb-12 pt-0 sm:pb-20 md:pb-28">
        <Community />
      </Container>
      <Container className="grid grid-cols-[1fr] gap-8 pb-12 md:grid-cols-[repeat(2,_1fr)] lg:grid-cols-[repeat(4,_1fr)]">
        <div className={cn(socialCard)}>
          <GithubIcon aria-label="Discord" className="text-white" size={48} />
          <div className="text-md text-white">
            {`Join ${contributorCount} contributors building the future of UI development.`}
          </div>
          <Button asChild jumpOnHover rounded="full" variant="outlineHome">
            <a href="https://github.com/storybookjs/storybook">
              Star on Github
            </a>
          </Button>
          <div>
            <div className="text-sm text-white">{contributorCount}</div>
            <div className="text-sm text-zinc-500">Contributors</div>
          </div>
        </div>
        <div className={cn(socialCard)}>
          <DiscordIcon
            aria-label="Discord"
            className="text-[#5A65EA]"
            size={48}
          />
          <div className="text-md text-white">
            {`Chat with ${discordMembers} frontend developers.`}
          </div>
          <Button asChild jumpOnHover rounded="full" variant="outlineHome">
            <a href="https://discord.gg/storybook">Join Discord server</a>
          </Button>
          <div>
            <div className="text-sm text-white">{discordMembers}</div>
            <div className="text-sm text-zinc-500">Server members</div>
          </div>
        </div>
        <div className={cn(socialCard)}>
          <div className="flex h-12 w-12 items-center justify-center">
            <svg
              aria-label="Twitter"
              fill="none"
              height="40"
              viewBox="0 0 14 14"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.02.446h2.137L8.49 5.816l5.51 7.28H9.67L6.298 8.683l-3.88 4.413H.282l5.004-5.735L0 .446h4.442l3.064 4.048L11.02.446zm-.759 11.357h1.18L3.796 1.655H2.502l7.759 10.148z"
                fill="#fff"
              />
            </svg>
          </div>
          <div className="text-md text-white">
            Get the latest news and updates from Storybook maintainers.
          </div>
          <Button asChild jumpOnHover rounded="full" variant="outlineHome">
            <a href="https://twitter.com/storybookjs">Follow on X</a>
          </Button>
          <div>
            <div className="text-sm text-white">24,200+</div>
            <div className="text-sm text-zinc-500">Followers</div>
          </div>
        </div>
        <div className={cn(socialCard)}>
          <div className="flex h-12 w-12 items-center justify-center">
            <Youtube />
          </div>
          <div className="text-md text-white">
            Watch tutorials, feature previews, and interviews.
          </div>
          <Button asChild jumpOnHover rounded="full" variant="outlineHome">
            <a href="https://www.youtube.com/channel/UCr7Quur3eIyA_oe8FNYexfg">
              Watch on YouTube
            </a>
          </Button>
          <div>
            <div className="text-sm text-white">7,020+</div>
            <div className="text-sm text-zinc-500">Subscribers</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
