'use client';

import { type FC, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getVersion, renderers as fullRenderers } from '@repo/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui';
import { useMediaQuery } from '../../../hooks/use-media-query';
import { useDocs } from '../../../app/docs/provider';
import { Button } from './button';

export const Renderers: FC = () => {
  const pathname = usePathname();
  const activeVersion = getVersion(pathname.replace('/docs/', '').split('/'));
  const { activeRenderer, setRenderer } = useDocs();
  const renderers =
    Number(activeVersion.id) < 8.5
      ? fullRenderers.filter((r) => r.id !== 'react-native-web')
      : fullRenderers;

  type Renderer = (typeof renderers)[number];

  const [isMobile] = useMediaQuery('(max-width: 480px)');
  const [firstList, setFirstList] = useState<Renderer[]>(renderers.slice(0, 3));
  const [lastRenderer, setLastRenderer] = useState<Renderer>(renderers[3]);

  useEffect(() => {
    const isInFirstList = firstList.some(
      (renderer) => renderer.id === activeRenderer,
    );

    const activeRendererObj = renderers.find(
      (renderer) => renderer.id === activeRenderer,
    );

    if (!isInFirstList && activeRendererObj) {
      setLastRenderer(activeRendererObj);
    }
  }, [activeRenderer, firstList, isMobile, renderers]);

  useEffect(() => {
    // On mobile we only show the first two renderers
    if (isMobile) {
      setFirstList(renderers.slice(0, 2));
      setLastRenderer(renderers[2]);
    } else {
      setFirstList(renderers.slice(0, 3));
      setLastRenderer(renderers[3]);
    }
  // TODO: Are we somehow mutating `renderers` in this hook callback?
  // eslint-disable-next-line react-hooks/exhaustive-deps -- Adding `renderers` throws `Maximum update depth exceeded` errors
  }, [activeRenderer, isMobile]);

  const restRenderers = renderers.filter((r) => {
    return !firstList.includes(r) && r !== lastRenderer;
  });

  return (
    <div className="mb-8 flex gap-2">
      {firstList.map((renderer) => (
        <Button
          active={renderer.id === activeRenderer}
          key={renderer.id}
          onClick={() => {
            setRenderer(renderer.id);
          }}
        >
          {renderer.title}
        </Button>
      ))}
      <Button
        active={lastRenderer?.id === activeRenderer}
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
