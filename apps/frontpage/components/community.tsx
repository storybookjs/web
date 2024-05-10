'use client';

import React, { useState, useEffect, useRef, VideoHTMLAttributes } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const images = [
  '/home/community/community-michele.webp',
  '/home/community/community-gert.webp',
  '/home/community/community-yann.webp',
];

const videosA = [
  {
    src: '/home/community/brad.mp4',
    link: 'https://www.youtube.com/watch?v=jR0Gefa4lpg',
  },
  {
    src: '/home/community/esther.mp4',
    link: 'https://www.youtube.com/watch?v=U7lW6qAsvrg',
  },
  {
    src: '/home/community/jackherrington.mp4',
    link: 'https://www.youtube.com/watch?v=NgkYH97Z3nk',
  },
];
const videosB = [
  {
    src: '/home/community/jackpritchard.mp4',
    link: 'https://www.youtube.com/watch?v=8GxTENqNjYI',
  },
  {
    src: '/home/community/katerina.mp4',
    link: 'https://www.youtube.com/watch?v=VgxrR2Ypbuc',
  },
  {
    src: '/home/community/jarrod.mp4',
    link: 'https://www.youtube.com/watch?v=L4F5dSu0FcQ',
  },
];

const variants = {
  enter: {
    opacity: 0,
  },
  center: {
    zIndex: 1,
    opacity: 1,
  },
  exit: {
    zIndex: 0,
    opacity: 0,
  },
};

let count = 0;
const options = ['img', 'videoA', 'videoB'];

function nextOption() {
  const index = count % options.length;
  count += 1;
  return options[index];
}

function useAnimationState(totalCount: number, animate: boolean) {
  const [activeIndex, setActiveIndex] = useState({
    img: 0,
    videoA: 0,
    videoB: 0,
  });
  const [animateNext, setAnimateNext] = useState<'videoA' | 'videoB'>('videoB');

  useEffect(() => {
    if (!animate) return () => {};

    const id = setInterval(() => {
      const nextIndex =
        activeIndex[animateNext] === totalCount - 1
          ? 0
          : activeIndex[animateNext] + 1;
      setActiveIndex({ ...activeIndex, [animateNext]: nextIndex });
      setAnimateNext(nextOption() as 'videoA' | 'videoB');
    }, 6000);

    return () => {
      clearInterval(id);
    };
  }, [activeIndex, animateNext, totalCount, animate]);

  return activeIndex;
}

export function Community() {
  const sectionRef = useRef(null);
  const animate = useInView(sectionRef);
  const activeIndex = useAnimationState(3, animate);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [pauseVideoB, setPauseVideoB] = useState(false);

  useEffect(() => {
    const pauseVideo = () => {
      videoBRef.current && videoBRef.current.pause();
      videoBRef.current &&
        videoBRef.current.removeEventListener('loadeddata', pauseVideo);
    };

    if (videoBRef.current && !pauseVideoB) {
      videoBRef.current.addEventListener('loadeddata', pauseVideo);
      setPauseVideoB(true);
    }
  }, [videoBRef, pauseVideoB]);

  return (
    <div
      className="grid grid-cols-[repeat(4,_1fr)] auto-rows-[280px] gap-8"
      ref={sectionRef}
    >
      <div className="relative col-[1_/_-1] rounded-lg bg-zinc-600 sm:col-[1_/_3]">
        <AnimatePresence initial={false}>
          <motion.div
            animate="center"
            className="absolute top-0 bottom-0 left-0 right-0 bg-center bg-no-repeat bg-cover rounded-lg"
            exit="exit"
            initial="enter"
            key={activeIndex.img}
            style={{ backgroundImage: `url('${images[activeIndex.img]}')` }}
            transition={{
              opacity: { duration: 0.4 },
            }}
            variants={variants}
          />
        </AnimatePresence>
      </div>
      <a
        className="relative col-[1_/3] rounded-lg bg-zinc-600 sm:col-[3_/4]"
        href={videosA[activeIndex.videoA]?.link}
        rel="noopener nofollow noreferrer"
        target="_blank"
      >
        <AnimatePresence initial={false}>
          <motion.video
            animate="center"
            autoPlay
            className="absolute top-0 bottom-0 left-0 right-0 object-cover w-full h-full overflow-hidden rounded-lg"
            exit="exit"
            initial="enter"
            key={activeIndex.videoA}
            muted
            playsInline
            src={videosA[activeIndex.videoA]?.src}
            transition={{
              opacity: { duration: 0.8 },
            }}
            variants={variants}
          />
        </AnimatePresence>
      </a>
      <a
        className="relative col-[3_/5] rounded-lg bg-zinc-600 sm:col-[4_/5]"
        href={videosB[activeIndex.videoB]?.link}
        rel="noopener nofollow noreferrer"
        target="_blank"
      >
        <AnimatePresence initial={false}>
          <motion.video
            animate="center"
            autoPlay
            className="absolute top-0 bottom-0 left-0 right-0 object-cover w-full h-full overflow-hidden rounded-lg"
            exit="exit"
            initial="enter"
            key={activeIndex.videoB}
            muted
            playsInline
            ref={videoBRef}
            src={videosB[activeIndex.videoB]?.src}
            transition={{
              opacity: { duration: 0.8 },
            }}
            variants={variants}
          />
        </AnimatePresence>
      </a>
    </div>
  );
}
