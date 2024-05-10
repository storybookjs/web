import type { FC } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { AspectRatio } from "../../ui/aspect-ratio";
import { IntegrationsCarousel } from './integrations-carousel';

const Connector: FC<{ name: string; style: React.CSSProperties }> = ({ name, ...props }) => {
  return (
    <AnimatePresence>
      <motion.svg
        className="block w-[24%] h-auto absolute"
        data-chromatic="ignore"
        fill="none"
        height="145"
        initial="initial"
        transition={{ duration: 0.4, when: 'beforeChildren' }}
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1 },
        }}
        viewBox="0 0 263 145"
        viewport={{
          margin: '-25% 0px -25% 0px',
        }}
        whileInView="animate"
        width="263"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <motion.circle
          cx="256"
          cy="140"
          fill="#1EA7FD"
          r="5"
          transition={{ duration: 0.2, delay: 0.6 }}
          variants={{
            initial: { scale: 0 },
            animate: { scale: 1 },
          }}
        />
        <path
          d="M252.5 134.5C195.5 53.001 98.4998 0.999337 10.0003 0.999647"
          mask={`url(#${name}-connector-mask)`}
          stroke="#1EA7FD"
          strokeDasharray="6 4"
          strokeWidth="2"
        />
        <defs>
          <mask id={`${name}-connector-mask`} maskUnits="userSpaceOnUse">
            <motion.path
              d="M10.0003,0.999647C98.4998,0.999337 195.5,53.001 252.5,134.5"
              stroke="#fff"
              strokeDasharray="0 1"
              strokeWidth="4"
              transition={{ duration: 0.8 }}
              variants={{
                initial: { pathLength: 0 },
                animate: { pathLength: 1 },
              }}
            />
          </mask>
        </defs>
      </motion.svg>
    </AnimatePresence>
  );
};

const embedIntegrations = [
  {
    index: 1,
    name: 'NextJS',
    image: '/home/share/next-js.svg',
    color: '#000',
    media: (
      // transform is to prevent the slight jump before the animation starts
      <AspectRatio ratio={1202 / 910} style={{ transform: 'translate(0, 0)' }}>
        <img
          alt="Embed stories using iframes in your NextJS sites"
          className="block w-full h-auto"
          src="/home/share/next.png"
        />
        <Connector
          key="nextjs"
          name="NextJS"
          style={{ top: '51%', left: '37%' }}
        />
      </AspectRatio>
    ),
  },
  {
    index: 2,
    name: 'Figma',
    image: '/home/share/figma.svg',
    color: '#000',
    media: (
      <AspectRatio ratio={1202 / 910} style={{ transform: 'translate(0, 0)' }}>
        <img
          alt="Use the Storybook Connect plugin to embed stories in a Figma file"
          className="block w-full h-auto"
          src="/home/share/figma.png"
        />
        <Connector
          key="figma"
          name="Figma"
          style={{ top: '52%', left: '1%' }}
        />
      </AspectRatio>
    ),
  },
  {
    index: 3,
    name: 'Notion',
    image: '/home/share/notion.svg',
    color: '#fff',
    media: (
      <AspectRatio ratio={1202 / 910} style={{ transform: 'translate(0, 0)' }}>
        <img
          alt="Embed stories in Notion documents using the oEmbed support"
          className="block w-full h-auto"
          src="/home/share/notion.png"
        />
        <Connector
          key="notion"
          name="Notion"
          style={{ top: '55%', left: '7%' }}
        />
      </AspectRatio>
    ),
  },
  {
    index: 4,
    name: 'Medium',
    image: '/home/share/medium.svg',
    color: '#F5C347',
    media: (
      <AspectRatio ratio={1202 / 910} style={{ transform: 'translate(0, 0)' }}>
        <img
          alt="Embed stories in Medium articles using the oEmbed support"
          className="block w-full h-auto"
          src="/home/share/medium.png"
        />
        <Connector name="Medium" style={{ top: '53%', left: '28%' }} />
      </AspectRatio>
    ),
  },
];

export const EmbedIntegrations = React.forwardRef<HTMLImageElement>(
  (_, ref) => {
    return (
      <div className="w-full relative max-w-[800px] ml-[30px] sm:ml-[30px] md:w-[150%] md:col-[2/3] lg:ml-[120px]">
        <IntegrationsCarousel integrations={embedIntegrations} />
        <Image
          alt=""
          className="block w-[56%] max-w-[440px] h-auto absolute top-[22%] left-[-30%] opacity-100 user-select-none pointer-events-none sm:left-[-60px] lg:[-120px]"
          height="244"
          ref={ref}
          src="/home/share/time-frame-picker.svg"
          style={{ opacity: 0 }}
          width="458"
        />
      </div>
    );
  }
);

EmbedIntegrations.displayName = 'EmbedIntegrations';
