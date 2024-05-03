'use client';

import { renderers } from '@repo/utils';
import { FC } from 'react';
import { useDocs } from '../../../app/docs/provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui';
import { Button } from './button';

interface RenderersProps {
  activeRenderer: string;
}

export const Renderers: FC<RenderersProps> = () => {
  const { activeRenderer, setRenderer } = useDocs();

  const firstThreeRenderers = renderers.slice(0, 3);
  const isInFirstThree = firstThreeRenderers.some(
    (renderer) => renderer.id === activeRenderer,
  );
  const isInFirstFour = renderers
    .slice(0, 4)
    .some((renderer) => renderer.id === activeRenderer);
  const activeRendererObj = renderers.find(
    (renderer) => renderer.id === activeRenderer,
  );
  const fourthRenderer = renderers[3];
  const restRenderers =
    !isInFirstFour && fourthRenderer
      ? [fourthRenderer, ...renderers.slice(4)].filter(
          (r) => r.id !== activeRenderer,
        )
      : renderers.slice(4);

  return (
    <div className="flex gap-2 mb-8">
      {firstThreeRenderers.map((renderer) => (
        <Button
          key={renderer.id}
          active={renderer.id === activeRenderer}
          onClick={() => setRenderer(renderer.id)}
        >
          {renderer.title}
        </Button>
      ))}
      {!isInFirstThree && activeRendererObj ? (
        <Button
          active={activeRendererObj.id === activeRenderer}
          onClick={() => setRenderer(activeRendererObj.id)}
        >
          {activeRendererObj.title}
        </Button>
      ) : (
        <Button
          active={fourthRenderer.id === activeRenderer}
          onClick={() => setRenderer(fourthRenderer.id)}
        >
          {fourthRenderer.title}
        </Button>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button arrow>More</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {restRenderers.map((renderer) => (
            <DropdownMenuItem
              key={renderer.id}
              onClick={() => setRenderer(renderer.id)}
            >
              {renderer.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
