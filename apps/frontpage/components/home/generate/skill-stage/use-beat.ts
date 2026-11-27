import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * The three beats every skill visual plays, in order: the agent acts,
 * Storybook responds, then the result settles. The loop restarts after
 * `settle`.
 */
export const BEATS = ['act', 'respond', 'settle'] as const;
export type Beat = (typeof BEATS)[number];

/**
 * How much slower than the first cut (2, 2.2 and 3.4 second beats) the
 * skill visuals run. Visuals multiply their own inner timings by it, so
 * every step stretches with the beats and all five stay in step.
 */
export const PACE = 1.5;

/**
 * How long each beat holds, in ms: a 12 second loop. The settle beat gets
 * an extra 0.6 seconds so the green result holds a little longer.
 */
export const BEAT_DURATION: Record<Beat, number> = {
  act: 2000 * PACE,
  respond: 2200 * PACE,
  settle: 3400 * PACE + 600,
};

/** Shared ease for anything that moves inside a skill visual */
export const beatEase = [0.16, 1, 0.3, 1] as const;

/**
 * Loops through the three beats. Pass `beat` to hold one beat (for stories
 * and screenshots). Under reduced motion it holds the final frame.
 */
export function useBeat(
  beat?: Beat,
  duration: Record<Beat, number> = BEAT_DURATION,
): Beat {
  const reduceMotion = useReducedMotion();
  const frozen = beat ?? (reduceMotion ? 'settle' : undefined);
  const [current, setCurrent] = useState<Beat>('act');

  useEffect(() => {
    if (frozen) return;
    const timer = setTimeout(() => {
      setCurrent((b) => BEATS[(BEATS.indexOf(b) + 1) % BEATS.length]);
    }, duration[current]);
    return () => {
      clearTimeout(timer);
    };
  }, [current, frozen, duration]);

  return frozen ?? current;
}
