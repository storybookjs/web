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

/**
 * The agents slide writes a story, then publishes a review, so it stays
 * longer too: about four seconds on the review summary.
 */
export const AGENTS_SLIDE_DURATION = 9000;

/** How long autoplay stays on the given slide, in ms */
export function slideDuration(slide: number) {
  if (slide === SLIDES.testing) return TESTING_SLIDE_DURATION;
  if (slide === SLIDES.agents) return AGENTS_SLIDE_DURATION;
  return SLIDE_DURATION;
}
