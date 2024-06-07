'use client';

import { renderers } from '@repo/utils';
import { useEffect, useState, type FC } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui';
import { useDocs } from '../../../app/docs/provider';
import { Button } from './button';
import { useMediaQuery } from '../../../hooks/use-media-query';

interface RenderersProps {
  activeRenderer: string;
}

export const Renderers: FC<RenderersProps> = () => {
  const { activeRenderer, setRenderer } = useDocs();
  const [isMobile] = useMediaQuery('(max-width: 480px)');
  const [firstList, setFirstList] = useState(renderers.slice(0, 3));
  const [lastRenderer, setLastRenderer] = useState(renderers[3]);
  const [localRenderer, setLocalRenderer] = useState('react');

  useEffect(() => {
    if (isMobile) {
      setFirstList(renderers.slice(0, 2));
      setLastRenderer(renderers[2]);
    } else {
      setFirstList(renderers.slice(0, 3));
      setLastRenderer(renderers[3]);
    }

    const isInFirstList = firstList.some(
      (renderer) => renderer.id === localRenderer,
    );
    const activeRendererObj = renderers.find(
      (renderer) => renderer.id === localRenderer,
    );

    if (!isInFirstList && activeRendererObj) {
      setLastRenderer(activeRendererObj);
    }
  }, [isMobile, activeRenderer]);

  useEffect(() => {
    if (activeRenderer) setLocalRenderer(activeRenderer);
  }, [activeRenderer]);

  const restRenderers = renderers.filter((r) => {
    return !firstList.includes(r) && r !== lastRenderer;
  });

  return (
    <div className="mb-8 flex gap-2">
      {firstList.map((renderer) => (
        <Button
          active={renderer.id === localRenderer}
          key={renderer.id}
          onClick={() => {
            setRenderer(renderer.id);
          }}
        >
          {renderer.title}
        </Button>
      ))}
      <Button
        active={lastRenderer?.id === localRenderer}
        onClick={() => {
          setRenderer(lastRenderer?.id || '');
        }}
      >
        {lastRenderer?.title || ''}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button arrow>More</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" collisionPadding={8}>
          {restRenderers.map((renderer) => (
            <DropdownMenuItem
              key={renderer.id}
              onClick={() => {
                setRenderer(renderer.id);
              }}
            >
              {renderer.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
