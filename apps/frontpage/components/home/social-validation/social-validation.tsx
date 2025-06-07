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
import   AutoSlider  from './slider';
import BlueskySvg from '../share/images/bluesky.svg';
import XSvg from '../share/images/x.svg';


const projects = [
  {
    name: 'Polaris',
    bgColor: '#377e62',
    width: 80,
    height: 28,
    logoAlt: 'Shopify',
    logoUrl: '/home/community/logos/shopify.svg',
    projectUrl: 'https://storybook.js.org/showcase/shopify-polaris-react',
  },
  {
    name: 'Psammead',
    bgColor: '#8F1F19',
    width: 80,
    height: 28,
    logoAlt: 'BBC',
    logoUrl: '/home/community/logos/bbc.svg',
    projectUrl: 'https://storybook.js.org/showcase/bbc-psammead',
  },
  {
    name: 'UI React',
    bgColor: '#333333',
    width: 80,
    height: 30,
    logoAlt: 'Audi UI React',
    logoUrl: '/home/community/logos/audi.svg',
    projectUrl: 'https://storybook.js.org/showcase/audi-ui-react',
  },
  {
    name: 'Fluent UI Web Compnents',
    bgColor: '#0078d4',
    width: 20,
    height: 40,
    logoAlt: 'Fluent UI Web Compnents',
    logoUrl: '/home/community/logos/fluent.svg',
    projectUrl:
      'https://storybook.js.org/showcase/microsoft-fluent-ui-web-components',
  },
  {
    name: 'Gutenberg',
    bgColor: '#3171A6',
    width: 40,
    height: 40,
    logoAlt: 'WordPress Gutenberg',
    logoUrl: '/home/community/logos/wordpress.svg',
    projectUrl: 'https://storybook.js.org/showcase/wordpress-gutenberg',
  },
  {
    name: 'Explorer 1',
    bgColor: '#0b3d91',
    width: 80,
    height: 28,
    logoAlt: 'Nasa Explorer 1',
    logoUrl: '/home/community/logos/nasa.svg',
    projectUrl: 'https://storybook.js.org/showcase/nasa-jpl-explorer-1',
  },
  {
    name: 'React Spectrum',
    bgColor: '#e03422',
    width: 36,
    height: 38,
    logoAlt: 'Adobe',
    logoUrl: '/home/community/logos/adobe.svg',
    projectUrl:
      'https://storybook.js.org/showcase/adobe-spectrum-web-components',
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
      <AutoSlider/>
      <div className="mb-[calc(5rem-1rem)] mt-12 flex snap-x scroll-p-8 gap-8 md:overflow-hidden overflow-x-scroll justify-center items-center px-8 py-0 pb-4 sm:mt-20 md:mt-28">
        {projects.map((project) => (
          <a
            className="w-[160px] flex-none rounded-md bg-red-500"
            href={project.projectUrl}
            key={project.logoAlt}
            rel="noopener"
            style={{ backgroundColor: project.bgColor }}
            target="_blank"
          >
            <AspectRatio
              className="flex flex-col items-center justify-center gap-4 font-bold text-white"
              ratio={4 / 3}
            >
              <Image
                alt={project.logoAlt}
                height={project.height}
                src={project.logoUrl}
                width={project.width}
              />
             <p className='text-sm text-center'>{project.name}</p>
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
            <div className="text-sm text-white">8,320+</div>
            <div className="text-sm text-zinc-500">Subscribers</div>
          </div>
        </div>
        <div className={cn(socialCard)}>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center">
              <Image src={BlueskySvg} alt="BlueSky" className="h-full w-full" />
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-md">
              <Image src={XSvg} alt="X" className="h-full w-full" />
            </div>
          </div>
          <div className="text-md text-white">
            Get the latest news and updates from Storybook maintainers.
          </div>
          <div className="flex gap-2">
            <Button asChild jumpOnHover rounded="full" variant="outlineHome">
              <a href="https://bsky.app/profile/storybook.js.org">
                Follow on BlueSky
              </a>
            </Button>
            <Button asChild jumpOnHover rounded="full" variant="outlineHome">
              <a href="https://twitter.com/storybookjs">And X</a>
            </Button>
          </div>
          <div>
            <div className="text-sm text-white">24,200+</div>
            <div className="text-sm text-zinc-500">Followers</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
