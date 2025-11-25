import { renderers } from '@repo/utils';
import type { RedirectData } from './types';

const renderersPathWildcardWithRegex = `:renderer(${renderers.join('|')})`;

export const docsRenderersRedirects: RedirectData[] = [
  {
    source: `/docs/${renderersPathWildcardWithRegex}/get-started/examples`,
    destination: '/showcase/',
    permanent: true,
  },
];
