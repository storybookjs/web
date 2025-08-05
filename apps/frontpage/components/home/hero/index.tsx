/* eslint-disable jsx-a11y/no-static-element-interactions -- TODO: Add missing onKeyDown */
/* eslint-disable jsx-a11y/click-events-have-key-events -- TODO: Add missing onKeyDown */
'use client';

import Link from 'next/link';
import { cn } from '@repo/utils';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@storybook/icons';
import { Container } from '@repo/ui';
import { Manager } from '../manager';
import { InitCommand } from './init-command';
import { Chrome } from './chrome';
import SocialProof from './social-proof';

const features = [
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
  const [slide, setSlide] = useState(1);
  const intervalId = useRef<number | null>(null);

  const setSlideInterval = () => {
    if (intervalId.current !== null) {
      window.clearInterval(intervalId.current);
    }

    intervalId.current = window.setInterval(() => {
      setSlide((s) => (s === 4 ? 1 : s + 1));
    }, 4500);
  };

  useEffect(() => {
    setSlideInterval();
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  const handleSlideChange = (newSlide: number) => {
    setSlide(newSlide);
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
  };

  return (
    <Container className="relative z-20 justify-between gap-20 overflow-hidden pt-12 text-white md:pt-24 lg:px-8">
      <h1 className="flex-1 text-4xl font-bold max-sm:max-w-80 md:text-[56px]/[70px]">
        Build, test & document components
      </h1>
      <div className="mb-8 flex-1 pt-4 md:mb-20">
        <p className="mb-8 max-w-[500px] leading-7 sm:mb-12">
          Storybook is a frontend workshop for building UI components and pages
          in isolation. Thousands of teams use it for UI development, testing,
          and documentation. It&apos;s open source and free.
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-8 sm:flex-row">
            <div className="flex gap-4">
              <Link
                className="text-md flex h-12 items-center justify-center rounded-full bg-white px-6 font-bold text-black"
                href="/docs"
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
                <div className="text-md text-white">v9</div>
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
                src="/home/nine.svg"
                width={26}
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
              handleSlideChange(slide === 1 ? 4 : slide - 1);
            }}
          >
            <ChevronLeftIcon />
          </div>
          <div className="text-md">{features[slide - 1]}</div>
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full text-white"
            onClick={() => {
              handleSlideChange(slide === 4 ? 1 : slide + 1);
            }}
          >
            <ChevronRightIcon />
          </div>
        </div>
        <div className="relative hidden h-20 gap-12 md:flex">
          <div
            className={cn(
              'absolute top-0 h-0.5 bg-white transition-all',
              slide === 1 && 'left-0 w-[96px]',
              slide === 2 && 'left-[144px] w-[132px]',
              slide === 3 && 'left-[324px] w-[101px]',
              slide === 4 && 'left-[474px] w-[110px]',
            )}
          />
          {features.map((label, i) => (
            <button
              className={cn(
                'text-white/60 transition-colors hover:text-white',
                i === slide - 1 && 'text-white',
              )}
              key={label}
              onClick={() => {
                handleSlideChange(i + 1);
              }}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <Chrome />
      <Manager slide={slide} />
      <SocialProof />
    </Container>
  );
}
