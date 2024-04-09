'use client';

import { renderers } from '@utils';
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
    (renderer) => renderer.id === activeRenderer
  );
  const isInFirstFour = renderers
    .slice(0, 4)
    .some((renderer) => renderer.id === activeRenderer);
  const activeRendererObj = renderers.find(
    (renderer) => renderer.id === activeRenderer
  );
  const wc = renderers.find((renderer) => renderer.id === 'web-components');
  const restRenderers =
    !isInFirstFour && wc
      ? [wc, ...renderers.slice(4)].filter((r) => r.id !== activeRenderer)
      : renderers.slice(4);

  return (
    <div className="flex gap-2 mb-8">
      {firstThreeRenderers.map((renderer) => (
        <Button
          key={renderer.id}
          active={renderer.id === activeRenderer}
          onClick={() => setRenderer(renderer.id)}
          title={renderer.title}
        />
      ))}
      {!isInFirstThree && activeRendererObj ? (
        <Button
          active={activeRendererObj.id === activeRenderer}
          onClick={() => setRenderer(activeRendererObj.id)}
          title={activeRendererObj.title}
        />
      ) : (
        <Button
          active={renderers[3].id === activeRenderer}
          onClick={() => setRenderer(renderers[3].id)}
          title={renderers[3].title}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button title="More" arrow />
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
