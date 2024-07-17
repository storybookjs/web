'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { renderers } from '@repo/utils';
import { useDocs } from './provider';

export const RendererCookie = () => {
  const { setRenderer } = useDocs();
  const searchParams = useSearchParams();
  const rendererParam = searchParams.get('renderer');

  useEffect(() => {
    if (rendererParam) {
      const findRenderer = renderers.find(
        (renderer) => renderer.id === rendererParam,
      );
      if (findRenderer) {
        setRenderer(rendererParam);
      }
    }
  }, [rendererParam, setRenderer]);

  return null;
};
