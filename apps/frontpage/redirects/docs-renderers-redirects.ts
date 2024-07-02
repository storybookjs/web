import { renderers } from './constants';
import { RedirectData } from './types';

export const docsRenderersRedirects: RedirectData[] = [
  ...renderers.map((r) => ({
    source: `/docs/${r}/get-started/examples`,
    destination: '/showcase',
    permanent: true,
  })),
];
