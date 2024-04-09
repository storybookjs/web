import React, { useEffect, useState, useRef, FC } from 'react';
import { useReducedMotion, useInView } from 'framer-motion';
import { cn, container } from '@utils';
import Boolean from './images/Boolean.svg';
import Cascade from './images/Cascade.svg';
import DatePicker from './images/DatePicker.svg';
import Headings from './images/Headings.svg';
import Histogram from './images/Histogram.svg';
import Icons from './images/Icons.svg';
import LineGraphCoral from './images/LineGraph-coral.svg';
import LineGraphTeal from './images/LineGraph-teal.svg';
import MarketingButtons from './images/MarketingButtons.svg';
import PieChart from './images/PieChart.svg';
import Slider from './images/Slider.svg';
import Image from 'next/image';

const workflowWidth = 210;
const initialAnimationLength = 0;
const eachWorkflowAnimationLength = 4000;
const easing = 'ease-in-out';

/**
 * Note: the z-index and relative positioning on the Wrapper should not be
 * deleted. While it has no visual effect, it solved a problem where the
 * animation was causing a repaint at the very end.
 */

function getWorkflowTranslateValue(currentIndexOffset: number) {
  const base = currentIndexOffset * workflowWidth;
  const modifier = 25;
  if (currentIndexOffset > 0) return base + modifier;
  if (currentIndexOffset < 0) return base - modifier;
  return base;
}

const lineSize = 3;
const lineAnimationLength = 1550;
const lineAnimationDelay = 500;

interface PureUITestsProps {
  forwardRef: React.RefObject<HTMLDivElement>;
  activeIndex: number;
  isAnimatingLoop: boolean;
  isPaused: boolean | null;
  workflows: { src: string }[];
}

const PureUITests: FC<PureUITestsProps> = ({
  forwardRef,
  activeIndex,
  isAnimatingLoop,
  // isPaused,
  workflows,
}) => {
  return (
    <figure className={cn(container)} ref={forwardRef}>
      {/* TODO: Find a way to bring back the isPaused */}
      <div className="realtive z-[1] mt-12 sm:mt-16">
        <div
          className="relative flex text-white flex-nowrap"
          style={{ height: workflowWidth }}
        >
          {workflows.map((workflow, index) => {
            const isActive = index - activeIndex === 0;
            const done = index <= activeIndex;

            return (
              <div
                key={index}
                className="absolute flex justify-center transition-transform ease-in-out left-1/2 duration-350 will-change-transform"
                style={{
                  transform: `translateX(${getWorkflowTranslateValue(
                    index - activeIndex
                  )}px)`,
                  marginLeft: -workflowWidth / 2,
                  width: workflowWidth,
                  height: workflowWidth,
                }}
              >
                <div
                  className="w-full h-full transition bg-white rounded"
                  style={{
                    transform: `scale(${isActive ? 1 : 0.76}) translateY(${
                      isActive ? 0 : 33
                    }px)`,
                    opacity: done ? 1 : 0.5,
                    boxShadow: isActive
                      ? `
                    0 1.7px 2.2px rgba(0, 0, 0, 0.028),
                    0 4px 5.3px rgba(0, 0, 0, 0.04),
                    0 7.5px 10px rgba(0, 0, 0, 0.05),
                    0 13.4px 17.9px rgba(0, 0, 0, 0.06),
                    0 25.1px 33.4px rgba(0, 0, 0, 0.072),
                    0 60px 80px rgba(0, 0, 0, 0.1)
                  `
                      : `
                    0 0.6px 2.2px rgba(0, 0, 0, 0.02),
                    0 1.3px 5.3px rgba(0, 0, 0, 0.028),
                    0 2.5px 10px rgba(0, 0, 0, 0.035),
                    0 4.5px 17.9px rgba(0, 0, 0, 0.042),
                    0 8.4px 33.4px rgba(0, 0, 0, 0.05),
                    0 20px 80px rgba(0, 0, 0, 0.07)
                `,
                  }}
                >
                  <Image
                    className="w-full h-full"
                    loading="lazy"
                    src={workflow.src}
                    width={180}
                    height={180}
                    alt=""
                  />
                </div>
                <div className="absolute overflow-hidden left-[-15px] w-[240px] h-[240px] top-[-15px]">
                  <div
                    className={cn(
                      'rounded-[1rem] absolute bg-[rgba(255,_68,_0,_0.8)] opacity-0 will-change-transform',
                      'top-3 left-0',
                      isActive ? 'visible' : 'hidden'
                    )}
                    style={{
                      width: workflowWidth + 30,
                      height: lineSize,
                      animation:
                        isActive && isAnimatingLoop
                          ? `homeAutomateHorizontal ${lineAnimationLength}ms ${easing} ${lineAnimationDelay}ms`
                          : undefined,
                    }}
                  />
                  <div
                    className={cn(
                      'rounded-[1rem] absolute bg-[rgba(255,_68,_0,_0.8)] opacity-0 will-change-transform',
                      'top-0 left-3',
                      isActive ? 'visible' : 'hidden'
                    )}
                    style={{
                      width: lineSize,
                      height: 240,
                      animation:
                        isActive && isAnimatingLoop
                          ? `homeAutomateVertical ${lineAnimationLength}ms ${easing} ${lineAnimationDelay}ms`
                          : undefined,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </figure>
  );
};

export const baseWorkflows = [
  Boolean,
  Cascade,
  DatePicker,
  Headings,
  Histogram,
  Icons,
  LineGraphCoral,
  LineGraphTeal,
  MarketingButtons,
  PieChart,
  Slider,
];

export function UITests() {
  const ref = useRef(null);
  // Pause animation if not in viewport
  const isInView = useInView(ref, { once: true, amount: 'all' });
  const shouldReduceMotion = useReducedMotion();

  const isPaused = shouldReduceMotion;
  const activeIndex = Math.floor(baseWorkflows.length / 2 - 1);
  const [animationState, setAnimationState] = useState({
    didQueueTimer: false,
    workflows: baseWorkflows,
    isAnimatingLoop: false,
  });

  const { workflows, isAnimatingLoop } = animationState;

  useEffect(() => {
    if (isPaused || !isInView) return;

    setAnimationState({
      // The entire purpose of didQueueTimer is to sync up the initial
      // fade out animation with the timer that is set below. Without
      // this logic, the `useEffect` and `setTimeout` calls _could_ cause
      // the CSS animation timing defined in the initial state  of components
      // above to fall out of sync with the timer below because the CSS
      // animations start immediately, whereas the timer has to wait for the
      // event loop.
      didQueueTimer: true,
      workflows,
      isAnimatingLoop,
    });

    const timer = setTimeout(
      () => {
        setAnimationState({
          didQueueTimer: true,
          isAnimatingLoop: true,
          // Move the first workflow to the end of the list
          workflows: [...workflows.slice(1), ...workflows.slice(0, 1)],
        });
      },
      isAnimatingLoop ? eachWorkflowAnimationLength : initialAnimationLength
    );

    return () => clearTimeout(timer);
  }, [isAnimatingLoop, workflows, isPaused, isInView]);

  return (
    <PureUITests
      forwardRef={ref}
      activeIndex={activeIndex}
      isAnimatingLoop={animationState.isAnimatingLoop}
      isPaused={isPaused}
      workflows={animationState.workflows}
    />
  );
}
