import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const checksVariants = {
  initial: {
    borderColor: "transparent",
    boxShadow:
      "0px 8.808px 50px 0px rgba(0, 0, 0, 0.3), 0px 6.406px 18.417px 0px rgba(0, 0, 0, 0.1)",
  },
  checking: {
    borderColor: "rgba(254, 187, 48, 1)",
    boxShadow:
      "0px 8.808px 50px 0px rgba(254, 187, 48, 0.3), 0px 6.406px 18.417px 0px rgba(254, 210, 48, 0.1)",
    transition: {
      duration: 0.4,
    },
  },
  checked: {
    borderColor: "green",
    boxShadow:
      "0px 8.808px 50px 0px rgba(133, 191, 60, 0.3), 0px 6.406px 18.417px 0px rgba(102, 191, 60, 0.1)",
    transition: {
      duration: 0.4,
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};
const statusVariants = {
  initial: { rotateY: 0 },
  checked: { rotateY: 180 },
};
const textVariantsChecking = {
  initial: { opacity: 1 },
  checked: { opacity: 0 },
};
const textVariantsChecked = {
  initial: { opacity: 0 },
  checked: { opacity: 1 },
};

const checks = [
  {
    id: 1,
    label: "Storybook Publish",
    checking: "Publishing UI…",
    done: "Ready to share!",
  },
  {
    id: 2,
    label: "UI Tests",
    checking: "Running tests…",
    done: "2 changes accepted as baselines",
  },
  {
    id: 3,
    label: "UI Review",
    checking: "Awaiting reviewers…",
    done: "3 discussions resolved",
  },
];

export function MergeAndShip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: "all" });
  const [state, setState] = useState("initial");

  useEffect(() => {
    let id: NodeJS.Timeout;
    if (isInView) {
      setState("checking");
      id = setTimeout(() => {
        setState("checked");
      }, 1000);
    }

    return () => {
      clearTimeout(id);
    };
  }, [isInView]);

  return (
    <figure className="m-0 px-5">
      <div className="relative mt-12 mx-auto max-w-[440px] sm:mt-16">
        <motion.div
          className="rounded overflow-hidden bg-white border border-green-500 shadow-xl"
          layout
          ref={ref}
          variants={checksVariants}
          initial="initial"
          animate={state}
        >
          <div className="py-4 px-[18px] flex items-center gap-2 border-b border-zinc-300">
            <motion.div
              className="w-7 h-7"
              style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
              variants={statusVariants}
              transition={{ duration: 0.4, delay: 1.4 }}
            >
              <img
                className="w-full absolute top-0 left-0 right-0 bottom-0 z-[2]"
                style={{ backfaceVisibility: "hidden", transform: "rotate(0)" }}
                src="/home/automate/ci-check-yellow.svg"
                alt=""
              />
              <img
                className="w-full absolute top-0 left-0 right-0 bottom-0"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
                src="/home/automate/ci-check-green.svg"
                alt=""
              />
            </motion.div>
            <div className="relative w-full h-6 font-bold">
              <motion.div
                className="absolute top-0 left-0 w-full truncate"
                variants={textVariantsChecked}
                transition={{ duration: 0.4, delay: 1.4 }}
              >
                All CI checks have passed!
              </motion.div>
              <motion.div
                className="absolute top-0 left-0 w-full truncate"
                variants={textVariantsChecking}
                transition={{ duration: 0.4, delay: 1.4 }}
              >
                Running CI checks on components
              </motion.div>
            </div>
          </div>
          {checks.map(({ id, label, checking, done }) => (
            <div
              key={id}
              className="py-4 px-5 flex items-center gap-2 border-b border-zinc-300 last:border-b-0"
            >
              <motion.div
                className="w-6 h-6"
                style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
                variants={statusVariants}
                transition={{ duration: 0.4 }}
              >
                <img
                  className="w-full absolute top-0 left-0 right-0 bottom-0 z-[2]"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(0deg)",
                  }}
                  src="/home/automate/progress.svg"
                  alt=""
                />
                <img
                  className="w-full absolute top-0 left-0 right-0 bottom-0"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                  src="/home/automate/passed.svg"
                  alt=""
                />
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="relative w-full h-6">
                  <motion.div
                    className="absolute top-0 left-0 w-full overflow-ellipsis"
                    variants={textVariantsChecked}
                    transition={{ duration: 0.4 }}
                  >
                    <b>{label}</b> – {done}
                  </motion.div>
                  <motion.div
                    className="absolute top-0 left-0 w-full overflow-ellipsis"
                    variants={textVariantsChecking}
                    transition={{ duration: 0.4 }}
                  >
                    <b>{label}</b> – {checking}
                  </motion.div>
                </div>
              </div>
              <img
                className="block w-[22px] h-[22px]"
                src="home/automate/icon-chromatic.svg"
                alt=""
              />
            </div>
          ))}
        </motion.div>
      </div>
    </figure>
  );
}
