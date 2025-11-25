import React, { useEffect, useState, useRef } from 'react';
import { useReducedMotion, useInView } from 'framer-motion';
import Image from 'next/image';

const SLIDE_WIDTH = 400;
const ANIMATION_INTERVAL = 4000;

function getTranslateX(indexOffset : number ) {
  return indexOffset * SLIDE_WIDTH;
}

export const storybooks = [
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

export default function AutoSlider() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 'all' });
  const shouldReduceMotion = useReducedMotion();
  const centerIndex = Math.floor(storybooks.length / 2);

  const [animationState, setAnimationState] = useState({
    storybooks,
    isAnimating: false,
  });

  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;

    const timer = setTimeout(() => {
      setAnimationState((prev) => ({
        isAnimating: true,
        storybooks: [...prev.storybooks.slice(1), prev.storybooks[0]],
      }));
    }, ANIMATION_INTERVAL);

    return () => clearTimeout(timer);
  }, [animationState.storybooks, isInView, shouldReduceMotion]);

  return (
 
  
    <div
      ref={ref}
      className="relative flex h-[400px] mt-16 w-full items-center justify-center overflow-hidden"
    >
      <div className="relative flex w-full justify-center items-center gap-20">
        {animationState.storybooks.map((item, index) => {
          const offset = index - centerIndex;
          const isActive = offset === 0;
          return (
            <div
              key={item.name}
              className="absolute transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(${getTranslateX(offset)}px) scale(${
                  isActive ? 1 : 0.8
                })`,
                opacity: isActive ? 1 : 0.5,
                zIndex: isActive ? 10 : 1,
              }}
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-[300px] md:w-[400px] overflow-hidden rounded-lg bg-zinc-900 text-white shadow-lg"
              >
                <div className="flex h-5 items-center gap-1 border-y border-b-zinc-300 border-t-transparent bg-zinc-200 pl-2">
                  <div className="h-[5px] w-[5px] rounded-full bg-red-500" />
                  <div className="h-[5px] w-[5px] rounded-full bg-yellow-500" />
                  <div className="h-[5px] w-[5px] rounded-full bg-green-500" />
                </div>
                <Image
                  alt={item.name}
                  width={item.image.width}
                  height={item.image.height}
                  src={item.image.src}
                />
                <div className="mt-2 flex items-center gap-2 px-2 py-1">
                  <Image
                    alt={item.name}
                    src={item.logo}
                    width={20}
                    height={20}
                    className="rounded"
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
