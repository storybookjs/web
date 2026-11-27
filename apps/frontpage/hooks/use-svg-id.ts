import { useId } from 'react';

/**
 * A per-instance prefix for ids inside an inline SVG (clipPath, mask,
 * gradient, pattern…). SVG ids are global to the document, so two inline
 * SVGs that both define `id="a"` resolve `url(#a)` to whichever comes first.
 * React's ids contain colons, which are stripped so the result is safe in
 * `url(#…)` and `href="#…"` references.
 */
export function useSvgId(): string {
  return useId().replace(/:/g, '');
}
