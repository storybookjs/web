'use client';

import React, { useEffect } from 'react';
import { STORY_PREPARED } from '@storybook/nextjs-server/core-events';
import type { Args, Parameters, StoryId, StrictArgTypes } from '@storybook/nextjs-server/types';
import { addons } from '@storybook/nextjs-server/preview-api';

export type StoryAnnotations<TArgs extends Args> = {
  id: StoryId;
  parameters: Parameters;
  argTypes: StrictArgTypes<TArgs>;
  initialArgs: TArgs;
  args: TArgs;
};

// A component to emit the prepared event
export function Prepare<TArgs extends Args>({ story }: { story: StoryAnnotations<TArgs> }) {
  const channel = addons.getChannel();
  useEffect(() => {
    if (story) {
      channel.emit(STORY_PREPARED, { ...story });
    }
  }, [channel, story]);

  return <></>;
}
