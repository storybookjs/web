import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, container } from '@utils';
import { ArrowRightIcon, ChevronSmallRightIcon } from '@storybook/icons';
import { Button } from '../ui/button';
import Link from 'next/link';

type Alignment = 'left' | 'right';

interface FeatureItem {
  media: string;
  poster: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  link: { label: string; href: string; LinkWrapper?: React.ComponentType<any> };
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
  lockUpHeight,
  bgColor,
  ...props
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFeature = features[activeIndex];
  const [direction, setDirection] = useState('down');

  return (
    <div
      className={cn(
        container,
        'flex items-center flex-col pb-0 pt-12 sm:pt-20 md:grid md:justify-center md:items-start md:grid-cols-[repeat(2,_minmax(auto,_1fr))] md:grid-rows-[minmax(50vh,_max-content)] md:gap-20 md:pt-28 lg:grid-cols-[repeat(2,_minmax(auto,_1fr))] min-[1416px]:grid-cols-[repeat(2,_1fr)]'
      )}
      {...props}
    >
      {/* Desktop video */}
      <div
        className={cn(
          'rounded-lg relative overflow-hidden hidden h-full min-h-[640px] md:block lg:max-h-[640px] min-[1416px]:ml-0 min-[1416px]:mr-0 min-[1416px]:rounded-lg',
          alignment === 'left'
            ? 'order-1 md:-ml-12 md:rounded-tl-none md:-border-bl-none'
            : 'order-2 md:-mr-12 md:rounded-tr-none md:-border-br-none'
        )}
        style={{ backgroundColor: bgColor }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            className="absolute top-0 bottom-0 left-0 right-0"
            key={activeFeature.title}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <video
              className="absolute top-0 w-full scale-125 pointer-events-none select-none blur"
              src={activeFeature.media}
              playsInline
            />
            <video
              className="relative"
              src={activeFeature.media}
              autoPlay
              loop
              playsInline
              muted
              poster={activeFeature.poster}
            />
          </motion.div>
        </AnimatePresence>
        <Link
          href={activeFeature.link.href}
          className={cn(
            'absolute top-5 z-10 flex gap-2 items-center bg-black/50 text-white pl-4 pr-3 rounded-full text-xs font-bold h-7 hover:bg-black/60 transition-all hover:-translate-y-0.5',
            alignment === 'left' ? 'right-5' : 'left-5'
          )}
        >
          {activeFeature.link.label} <ChevronSmallRightIcon />
        </Link>
      </div>
      <ul
        className={cn(
          'flex flex-col gap-5 p-0 m-0 w-full min-w-0',
          alignment === 'left' ? 'order-2' : 'order-1'
        )}
      >
        {features.map((feature, index) => (
          <li key={feature.title} className="m-0 list-none">
            <button
              className={cn(
                'border border-zinc-600 rounded text-left flex w-full p-5 items-center cursor-pointer transition-all duration-200 ease-in-out outline-0 gap-5 hover:border-blue-500 hover:-translate-y-1',
                activeIndex === index && 'border-blue-500'
              )}
              aria-pressed={index === activeIndex ? 'true' : 'false'}
              onClick={() => {
                setDirection(index > activeIndex ? 'down' : 'up');
                setActiveIndex(index);
              }}
            >
              <div className="w-10 h-10">{feature.icon}</div>
              <div>
                <div className="font-bold text-white text-md">
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
                    className="overflow-hidden"
                    layout
                    key={feature.title}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: 'auto', marginTop: 20 },
                      collapsed: { opacity: 0, height: 0, marginTop: 0 },
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                  >
                    <div
                      className="relative block overflow-hidden rounded aspect-square md:hidden"
                      style={{ backgroundColor: bgColor }}
                    >
                      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                      <video
                        src={feature.media}
                        autoPlay
                        loop
                        playsInline
                        preload="auto"
                        poster={feature.poster}
                      />
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
    </div>
  );
};
