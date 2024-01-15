import React, { FC } from "react";
import { motion } from "framer-motion";
import { cn, container } from "@/lib/tailwind";

const calendarVariants = {
  initial: { opacity: 0.5, filter: "grayscale(100%)" },
  animate: { opacity: 1, filter: "grayscale(0%)" },
};
const statusVariants = {
  initial: { x: "50%", y: "-50%" },
  spin: { rotate: 1440, x: "50%", y: "-50%", transition: { duration: 0.8 } },
  animate: {
    rotateY: 180,
    x: "50%",
    y: "-50%",
    transition: { delay: 1.6, duration: 0.8 },
  },
};
const decorationVariants = {
  initial: { y: "15%", opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

export const Publish: FC = () => {
  return (
    <figure className={cn(container)} data-chromatic="ignore">
      <div className="relative mt-12 mx-auto max-w-[400px] sm:mt-16">
        <motion.img
          className="absolute w-[8%] h-auto top-[73%] right-[15%] z-[2]"
          variants={decorationVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: "all" }}
          transition={{ duration: 0.3, delay: 1.8 }}
          src="/home/automate/arrow.svg"
          alt=""
        />
        <motion.img
          className="absolute w-[10%] h-auto left-[14%] bottom-[50%] z-[2]"
          variants={decorationVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: "all" }}
          transition={{ duration: 0.3, delay: 1.8 }}
          src="/home/automate/pointerhand.svg"
          alt=""
        />
        <motion.img
          className="block w-full"
          src="/home/automate/datepicker-compact-week.svg"
          alt=""
          variants={calendarVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: "all" }}
          transition={{ duration: 0.8 }}
        />
        <motion.div
          className="block absolute w-[8%] h-0 pb-[8%] top-0 right-0 transform-style-preserve-3d"
          style={{ perspective: "1000px" }}
          initial="initial"
          variants={statusVariants}
          whileInView={["spin", "animate"]}
          viewport={{ once: true, amount: "all" }}
        >
          <img
            className="rotate-0 w-full absolute top-0 left-0 right-0 bottom-0 z-[2]"
            style={{ backfaceVisibility: "hidden" }}
            src="/home/automate/status-publishing.svg"
            alt=""
          />
          <img
            className="rotate-180 w-full absolute top-0 left-0 right-0 bottom-0"
            src="/home/automate/status-published.svg"
            alt=""
          />
        </motion.div>
      </div>
    </figure>
  );
};
