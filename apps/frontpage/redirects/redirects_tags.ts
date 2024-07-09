import { RedirectData } from './types';

export const redirectsTags: RedirectData[] = [
  {
    source: '/tag/:path',
    destination: '/addons/tag/:path',
    permanent: true,
  },
];
