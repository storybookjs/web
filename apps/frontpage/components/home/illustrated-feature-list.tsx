import type { FC } from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@repo/utils';
import { ArrowRightIcon, ChevronSmallRightIcon } from '@storybook/icons';
import Link from 'next/link';
import { Container } from '@repo/ui';
import { Button } from '../ui/button';

type Alignment = 'left' | 'right';

interface FeatureItem {
  media: string;
  poster: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  link: { label: string; href: string; LinkWrapper?: React.ComponentType };
}

interface IllustratedFeatureListProps {
  features: FeatureItem[];
  alignment?: Alignment;
  lockUpHeight?: number;
  bgColor?: string;
}

const duration = 0.3;

const variants = {
  enter: (direction: 'up' | 'down') => ({
    y: direction === 'up' ? '-5%' : '5%',
    opacity: 0,
    transition: { duration },
  }),
  center: {
    y: '0%',
    opacity: 1,
    zIndex: 1,
    transition: { duration, delay: 0.2 },
  },
  exit: (direction: 'up' | 'down') => ({
    zIndex: 0,
    y: direction === 'up' ? '5%' : '-5%',
    opacity: 0,
    transition: { duration },
  }),
};

export const IllustratedFeatureList: FC<IllustratedFeatureListProps> = ({
  features,
  alignment = 'left',
  bgColor,
  ...props
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFeature = features[activeIndex];
  const [direction, setDirection] = useState('down');

  return (
    <Container
      className="flex flex-col items-center pb-0 pt-12 sm:pt-20 md:grid md:grid-cols-[repeat(2,_minmax(auto,_1fr))] md:grid-rows-[minmax(50vh,_max-content)] md:items-start md:justify-center md:gap-20 md:pt-28 lg:grid-cols-[repeat(2,_minmax(auto,_1fr))] min-[1416px]:grid-cols-[repeat(2,_1fr)]"
      {...props}
    >
      {/* Desktop video */}
      <div
        className={cn(
          'relative hidden h-full min-h-[640px] overflow-hidden rounded-lg md:block lg:max-h-[640px] min-[1416px]:ml-0 min-[1416px]:mr-0 min-[1416px]:rounded-lg',
          alignment === 'left'
            ? 'md:-border-bl-none order-1 md:-ml-12 md:rounded-tl-none'
            : 'md:-border-br-none order-2 md:-mr-12 md:rounded-tr-none',
        )}
        style={{ backgroundColor: bgColor }}
      >
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            animate="center"
            className="absolute bottom-0 left-0 right-0 top-0"
            custom={direction}
            exit="exit"
            initial="enter"
            key={activeFeature.title}
            variants={variants}
          >
            <video
              className="pointer-events-none absolute top-0 w-full scale-125 select-none blur"
              playsInline
              src={activeFeature.media}
            >
              <track kind="captions" />
            </video>
            <video
              autoPlay
              className="relative"
              loop
              muted
              playsInline
              poster={activeFeature.poster}
              src={activeFeature.media}
            />
          </motion.div>
        </AnimatePresence>
        <Link
          className={cn(
            'absolute top-5 z-10 flex h-7 items-center gap-2 rounded-full bg-black/50 pl-4 pr-3 text-xs font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-black/60',
            alignment === 'left' ? 'right-5' : 'left-5',
          )}
          href={activeFeature.link.href || ''}
        >
          {activeFeature.link.label} <ChevronSmallRightIcon />
        </Link>
      </div>
      <ul
        className={cn(
          'm-0 flex w-full min-w-0 flex-col gap-5 p-0',
          alignment === 'left' ? 'order-2' : 'order-1',
        )}
      >
        {features.map((feature, index) => (
          <li className="m-0 list-none" key={feature.title}>
            <button
              aria-pressed={index === activeIndex ? 'true' : 'false'}
              className={cn(
                'flex w-full cursor-pointer items-center gap-5 rounded border border-zinc-600 p-5 text-left outline-0 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-blue-500',
                activeIndex === index && 'border-blue-500',
              )}
              onClick={() => {
                setDirection(index > activeIndex ? 'down' : 'up');
                setActiveIndex(index);
              }}
              type="button"
            >
              <div className="h-10 w-10 flex-none">{feature.icon}</div>
              <div>
                <div className="text-md font-bold text-white">
                  {feature.title}
                </div>
                <div className="text-sm text-white">{feature.description}</div>
              </div>
            </button>
            {/* mobile video */}
            <div className="block md:hidden">
              <AnimatePresence initial={false}>
                {index === activeIndex && (
                  <motion.div
                    animate="open"
                    className="overflow-hidden"
                    exit="collapsed"
                    initial="collapsed"
                    key={feature.title}
                    layout
                    transition={{
                      duration: 0.4,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                    variants={{
                      open: { opacity: 1, height: 'auto', marginTop: 20 },
                      collapsed: { opacity: 0, height: 0, marginTop: 0 },
                    }}
                  >
                    <div
                      className="relative block aspect-square overflow-hidden rounded md:hidden"
                      style={{ backgroundColor: bgColor }}
                    >
                      <video
                        autoPlay
                        loop
                        playsInline
                        poster={feature.poster}
                        preload="auto"
                        src={feature.media}
                      >
                        <track kind="captions" />
                      </video>
                      <Button size="sm">
                        <Link href={feature.link.href}>
                          {feature.link.label} <ArrowRightIcon />
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
};
