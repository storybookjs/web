/** Slide indices, in the order the hero carousel shows them */
export const SLIDES = {
  development: 0,
  testing: 1,
  docs: 2,
  agents: 3,
} as const;

/** How long autoplay stays on a slide, in ms */
export const SLIDE_DURATION = 4500;

/** The testing slide runs interactions, then visual tests, so it stays longer */
export const TESTING_SLIDE_DURATION = 7500;
