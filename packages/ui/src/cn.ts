import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Components inside @repo/ui MUST use this cn (not the one from @repo/utils):
// the package's Tailwind config emits classes with the 'ui-' prefix, and
// twMerge needs to know about that prefix to dedupe correctly.
const twMerge = extendTailwindMerge({ prefix: 'ui-' });

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
