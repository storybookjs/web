import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  HTMLMotionProps,
  ForwardRefComponent,
} from "framer-motion";
import { cn, container } from "@/lib/utils";

const images = [
  "/home/community/community-michele.webp",
  "/home/community/community-gert.webp",
  "/home/community/community-yann.webp",
];

const videosA = [
  {
    src: "/home/community/brad.mp4",
    link: "https://www.youtube.com/watch?v=jR0Gefa4lpg",
  },
  {
    src: "/home/community/esther.mp4",
    link: "https://www.youtube.com/watch?v=U7lW6qAsvrg",
  },
  {
    src: "/home/community/jackherrington.mp4",
    link: "https://www.youtube.com/watch?v=NgkYH97Z3nk",
  },
];
const videosB = [
  {
    src: "/home/community/jackpritchard.mp4",
    link: "https://www.youtube.com/watch?v=8GxTENqNjYI",
  },
  {
    src: "/home/community/katerina.mp4",
    link: "https://www.youtube.com/watch?v=VgxrR2Ypbuc",
  },
  {
    src: "/home/community/jarrod.mp4",
    link: "https://www.youtube.com/watch?v=L4F5dSu0FcQ",
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
const options = ["img", "videoA", "videoB"];

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
  const [animateNext, setAnimateNext] = useState<"videoA" | "videoB">("videoB");

  useEffect(() => {
    if (!animate) return () => {};

    const id = setInterval(() => {
      const nextIndex =
        activeIndex[animateNext] === totalCount - 1
          ? 0
          : activeIndex[animateNext] + 1;
      setActiveIndex({ ...activeIndex, [animateNext]: nextIndex });
      setAnimateNext(nextOption() as "videoA" | "videoB");
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
  const videoBRef = useRef(null);
  const [pauseVideoB, setPauseVideoB] = useState(false);

  // TODO: Fix this
  // Pause Video B (on first load)
  // so that only one video is playing at a time
  useEffect(() => {
    const pauseVideo = () => {
      // videoBRef?.current && videoBRef.current.pause();
      // videoBRef?.current &&
      //   videoBRef.current.removeEventListener("loadeddata", pauseVideo);
    };

    if (videoBRef.current && !pauseVideoB) {
      // videoBRef.current.addEventListener("loadeddata", pauseVideo);
      setPauseVideoB(true);
    }
  }, [videoBRef, pauseVideoB]);

  return (
    <div
      ref={sectionRef}
      className={cn(
        container,
        "grid grid-cols-[repeat(4,_1fr)] auto-rows-[280px] gap-8 pt-0 pb-12 sm:pb-20 md:pb-28"
      )}
    >
      <div className="relative col-[1_/_-1] rounded-lg bg-zinc-600 sm:col-[1_/_3]">
        <AnimatePresence initial={false}>
          <motion.div
            className="rounded-lg bg-cover bg-center bg-no-repeat absolute top-0 left-0 right-0 bottom-0"
            key={activeIndex.img}
            style={{ backgroundImage: `url('${images[activeIndex.img]}')` }}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 0.4 },
            }}
          />
        </AnimatePresence>
      </div>
      <a
        className="relative col-[1_/3] rounded-lg bg-zinc-600 sm:col-[3_/4]"
        href={videosA[activeIndex.videoA].link}
        target="_blank"
        rel="noopener nofollow noreferrer"
      >
        <AnimatePresence initial={false}>
          <motion.video
            className="rounded-lg overflow-hidden w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0"
            key={activeIndex.videoA}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 0.8 },
            }}
            src={videosA[activeIndex.videoA].src}
            autoPlay
            playsInline
            muted
          />
        </AnimatePresence>
      </a>
      <a
        className="relative col-[3_/5] rounded-lg bg-zinc-600 sm:col-[4_/5]"
        href={videosB[activeIndex.videoB].link}
        target="_blank"
        rel="noopener nofollow noreferrer"
      >
        <AnimatePresence initial={false}>
          <motion.video
            className="rounded-lg overflow-hidden w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0"
            ref={videoBRef}
            key={activeIndex.videoB}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 0.8 },
            }}
            src={videosB[activeIndex.videoB].src}
            autoPlay
            playsInline
            muted
          />
        </AnimatePresence>
      </a>
    </div>
  );
}
