import type { FC } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@repo/utils';

/** One sweep of the highlight across a block, in seconds */
const SWEEP = 1.3;
/** The pause before the next sweep, so the page breathes between passes */
const REST = 0.5;

/**
 * A grey loading block with a soft light sweeping across it, for the parts
 * of a skill visual's window that fill in later. Same sweep as the Develop
 * demo's Loading story (develop/demo/range-slider.tsx).
 *
 * Give blocks lower down the page a slightly larger `delay` so the sweep
 * runs top to bottom. Unmount it when the content arrives; under reduced
 * motion it's a static block.
 */
export const Skeleton: FC<{
  /** Size, shape and fill; defaults to a grey pill */
  className?: string;
  /** Seconds before the first sweep, for the top-to-bottom stagger */
  delay?: number;
}> = ({ className, delay = 0 }) => {
  const reduceMotion = useReducedMotion();
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-full bg-[#E8ECEF]',
        className,
      )}
    >
      {reduceMotion ? null : (
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/80 to-white/0"
          data-chromatic="ignore"
          initial={{ x: '-100%' }}
          transition={{
            duration: SWEEP,
            delay,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: REST,
          }}
        />
      )}
    </div>
  );
};
