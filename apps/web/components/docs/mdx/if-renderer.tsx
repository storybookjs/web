'use client';

import { useDocs } from '../../../app/docs/provider';
import { ReactNode } from 'react';

type IfRendererProps = {
  renderer: string | string[];
  children: ReactNode;
};

export const IfRenderer = ({ renderer, children }: IfRendererProps) => {
  const { activeRenderer } = useDocs();
  const rendererArray = Array.isArray(renderer) ? renderer : [renderer];

  // If there is no active renderer, don't render anything
  if (activeRenderer === null) return null;

  // If the active renderer is in the array of allowed renderers, render the children
  if (rendererArray.includes(activeRenderer)) return <>{children}</>;

  return null;
};
