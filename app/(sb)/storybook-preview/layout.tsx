import type { PropsWithChildren } from 'react';
import React from 'react';
import { Storybook } from './components/Storybook';

export default function NestedLayout({ children }: PropsWithChildren<{}>) {
  return <Storybook previewPath="storybook-preview">{children}</Storybook>;
}