'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDocs } from './provider';

export const RendererCookie = () => {
  const { setRenderer } = useDocs();
  const searchParams = useSearchParams();
  const rendererParam = searchParams.get('renderer');

  useEffect(() => {
    if (rendererParam) setRenderer(rendererParam);
  }, [rendererParam]);
  return null;
};
