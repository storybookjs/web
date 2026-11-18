/* eslint-disable jsx-a11y/no-static-element-interactions -- TODO: Add missing onKeyDown */
/* eslint-disable jsx-a11y/click-events-have-key-events -- TODO: Add missing onKeyDown */
'use client';

import Link from 'next/link';
import { cn, latestVersion } from '@repo/utils';
import { useAnalytics } from '@repo/utils/analytics';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, WandIcon } from '@storybook/icons';
import { Container, GradientBadge } from '@repo/ui';
import { Manager } from '../manager';
import { InitCommand } from './init-command';
import { Chrome } from './chrome';
import SocialProof from './social-proof';

// The Agents slide is index 0, so the rest line up with the Manager's slides
const features = [
  'Agents',
  'Development',
  'Interaction testing',
  'Visual testing',
  'Documentation',
];

function Star({ x = 0, y = 0, w = 14, delay = 0 }) {
  return (
    <motion.svg
      animate={{ rotate: 360, opacity: 1, scale: 1 }}
      className="absolute left-0 top-0"
      fill="none"
      height={w}
      initial={{ x, y, opacity: 0, scale: 0.5 }}
      style={{
        originX: `${(w / 2).toString()}px`,
        originY: `${(w / 2).toString()}px`,
      }}
      transition={{ duration: 2, repeat: Infinity, delay }}
      viewBox="0 0 14 14"
      width={w}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 0L8.89064 5.10936L14 7L8.89064 8.89064L7 14L5.10936 8.89064L0 7L5.10936 5.10936L7 0Z"
        fill="url(#paint0_linear_195_11225)"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_195_11225"
          x1="7"
          x2="7"
          y1="0"
          y2="14"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

export function Hero({
  npmDownloads,
  contributorCount,
}: {
  npmDownloads: string;
  contributorCount: string;
}) {
  const [slide, setSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const track = useAnalytics();

  const nextSlide = (s: number) => (s === features.length - 1 ? 0 : s + 1);
  const prevSlide = (s: number) => (s === 0 ? features.length - 1 : s - 1);

  // The Agents slide advances when its video ends, not on a timer
  useEffect(() => {
    if (!autoplay || slide === 0) return;
    const timeoutId = window.setTimeout(() => {
      setSlide(nextSlide);
    }, 4500);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [autoplay, slide]);

  const handleSlideChange = (newSlide: number) => {
    setSlide(newSlide);
    setAutoplay(false);
  };

  return (
    <Container className="relative z-20 justify-between gap-20 overflow-hidden pt-12 text-white md:pt-16 lg:px-8 lg:pt-24">
      <GradientBadge
        link="/blog/storybook-11/"
        icon={<WandIcon aria-hidden />}
        className="mb-8"
      >
        Storybook 11 is here
      </GradientBadge>
      <h1 className="flex-1 text-4xl font-bold md:text-[56px]/[70px]">
        Build UI with agents, using your components
      </h1>
      <div className="mb-8 flex-1 pt-4 md:mb-20">
        <p className="mb-8 max-w-[545px] leading-7 sm:mb-12">
          Storybook is a frontend workshop for building, testing, and
          documenting UI. Coding agents use it too: they reuse your components,
          write stories for what&apos;s new, and fix test failures before you
          review. It&apos;s open source and free.
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-8 sm:flex-row">
            <div className="flex gap-4">
              <Link
                className="text-md flex h-12 items-center justify-center rounded-full bg-white px-6 font-bold text-black"
                href="/docs"
                onClick={() => {
                  track('GetStartedClick', { location: 'hero' });
                }}
              >
                Get Started
              </Link>
              <InitCommand />
            </div>
            <div className="flex gap-6 sm:gap-10 md:hidden lg:flex">
              <a
                className="md:hidden"
                href="https://github.com/storybookjs/storybook/releases"
              >
                <div className="text-md text-white">
                  v{latestVersion.id.split('.')[0]}
                </div>
                <div className="text-sm text-white/60">Latest version</div>
              </a>
              <div>
                <div className="text-md text-white">{npmDownloads}</div>
                <div className="text-sm text-white/60">Installs per month</div>
              </div>
              <div>
                <div className="text-md text-white">{contributorCount}</div>
                <div className="text-sm text-white/60">Contributors</div>
              </div>
            </div>
          </div>
          <a
            className="hidden text-sm text-white/60 transition-colors hover:text-white md:flex md:items-end"
            href="https://github.com/storybookjs/storybook/releases"
            rel="noreferrer"
            target="_blank"
          >
            Version
            <div className="relative mx-3">
              <Image
                alt="Storybook 9"
                height={39}
                // Generated using Noto Sans font in Figma
                src="/home/version.svg"
                width={52}
              />
              <Star delay={1} x={-36} y={-10} />
              <Star delay={0.2} w={7} x={-16} y={-20} />
              <Star delay={2} x={24} y={-34} />
              <Star delay={0.4} w={7} x={52} y={28} />
            </div>
          </a>
        </div>
      </div>
      <div className="flex select-none justify-between border-t border-t-white/20 md:justify-center">
        <div className="flex h-20 w-full items-center justify-between md:hidden">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full text-white"
            onClick={() => {
              handleSlideChange(prevSlide(slide));
            }}
          >
            <ChevronLeftIcon />
          </div>
          <div className="text-md">{features[slide]}</div>
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full text-white"
            onClick={() => {
              handleSlideChange(nextSlide(slide));
            }}
          >
            <ChevronRightIcon />
          </div>
        </div>
        <div className="hidden h-20 gap-12 md:flex">
          {features.map((label, i) => (
            <button
              className={cn(
                'relative text-white/60 transition-colors hover:text-white',
                i === slide && 'text-white',
              )}
              key={label}
              onClick={() => {
                handleSlideChange(i);
              }}
              type="button"
            >
              {i === slide ? (
                <motion.div
                  className="absolute left-0 top-0 h-0.5 w-full bg-white"
                  layoutId="hero-slide-indicator"
                />
              ) : null}
              {label}
            </button>
          ))}
        </div>
      </div>
      {slide === 0 ? (
        <div className="flex h-[656px] items-center overflow-hidden rounded-md bg-black/40 ring-1 ring-white/10 sm:h-[756px]">
          <video
            autoPlay
            className="w-full"
            loop={!autoplay}
            muted
            onEnded={() => {
              setSlide(1);
            }}
            playsInline
            poster="/home/agents-hero.png"
          >
            <source src="/home/agents-hero.m4v" type="video/mp4" />
          </video>
        </div>
      ) : (
        <>
          <Chrome />
          <Manager slide={slide} />
        </>
      )}
      <SocialProof />
    </Container>
  );
}
