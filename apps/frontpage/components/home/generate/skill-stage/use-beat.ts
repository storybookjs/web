import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * The three beats every skill visual plays, in order: the agent acts,
 * Storybook responds, then the result settles. The loop restarts after
 * `settle`.
 */
export const BEATS = ['act', 'respond', 'settle'] as const;
export type Beat = (typeof BEATS)[number];

/** How long each beat holds, in ms. Visuals can pass their own. */
export const BEAT_DURATION: Record<Beat, number> = {
  act: 2000,
  respond: 2200,
  settle: 3400,
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
