'use client';

import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { GridBento } from './grid-bento';
import { GridCards } from './grid-cards';
import { GridCurrent } from './grid-current';
import { GridList } from './grid-list';
import { GridMatrix } from './grid-matrix';
import { GridSequence } from './grid-sequence';

export type FeatureGridVariant = 'current' | 1 | 2 | 3 | 4 | 5;

const variants = {
  current: GridCurrent,
  1: GridCards,
  2: GridBento,
  3: GridSequence,
  4: GridList,
  5: GridMatrix,
} satisfies Record<FeatureGridVariant, FC>;

export const FeatureGrid: FC<{ variant?: FeatureGridVariant }> = ({
  variant = 'current',
}) => {
  const Grid = variants[variant];
  return (
    <div data-verify-grid={variant}>
      <Grid />
    </div>
  );
};

/**
 * TODO: temporary. Remove once a Verify grid design is picked.
 * `?verify-grid=1` to `5` swaps in a variant for side-by-side review on the
 * preview. It reads the URL after mount, so the static HTML every visitor
 * gets always contains the current grid.
 */
export const FeatureGridWithUrlSwitch: FC = () => {
  const [variant, setVariant] = useState<FeatureGridVariant>('current');

  useEffect(() => {
    const value = Number(
      new URLSearchParams(window.location.search).get('verify-grid'),
    );
    if (value >= 1 && value <= 5) setVariant(value as FeatureGridVariant);
  }, []);

  return <FeatureGrid variant={variant} />;
};
