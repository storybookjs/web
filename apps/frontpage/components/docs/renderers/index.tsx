import { type FC } from 'react';
import { cookies } from 'next/headers';
import { cookieRenderId } from '../../../constants';
import { RenderersClient } from './client';

export const Renderers: FC = () => {
  const cookieStore = cookies();
  const activeRenderer = cookieStore.get(cookieRenderId)?.value ?? 'react';

  return <RenderersClient serverActiveRenderer={activeRenderer} />;
};
