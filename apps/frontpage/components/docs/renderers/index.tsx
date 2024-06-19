import { FC } from 'react';

import { RenderersClient } from './client';
import { cookies } from 'next/headers';
import { cookieRenderId } from '../../../constants';

export const Renderers: FC = () => {
  const cookieStore = cookies().get(cookieRenderId);

  return <RenderersClient serverActiveRenderer={cookieStore?.value || ''} />;
};
