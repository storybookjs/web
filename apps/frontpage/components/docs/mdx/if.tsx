'use client';

import { useDocs } from '../../../app/docs/provider';
import { renderers } from '@utils';

type IfProps = {
  children: React.ReactNode;
  renderer?: string | string[];
  notRenderer?: string | string[];
};

const normalizeValue = (value: string | string[]) =>
  Array.isArray(value) ? value : [value];

export const If = ({ notRenderer, renderer, children }: IfProps) => {
  const { activeRenderer } = useDocs();
  const renderersList = renderers.map((r) => r.id);
  const notRendererArray = notRenderer && normalizeValue(notRenderer);

  const toRender = renderer
    ? normalizeValue(renderer)
    : renderersList.filter((r) => !notRendererArray?.includes(r));

  if (activeRenderer && toRender?.includes(activeRenderer)) return children;

  return null;
};
