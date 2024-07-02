import { renderers } from '@repo/utils';
import {
  historicalVersions,
  versions6,
  versions7,
  versions8,
} from './constants';
import { RedirectData } from './types';

export const docsVersionsRedirects: RedirectData[] = [
  ...[...versions6, ...versions7].map((v) => ({
    source: `/docs/${v}`,
    destination: `/docs/${v.split('.')[0]}`,
    permanent: true,
  })),
  ...versions8.map((v) => ({
    source: `/docs/${v}`,
    destination: `/docs`,
    permanent: true,
  })),
  // The `/get-started` route is only valid for 8.0+
  ...historicalVersions.reduce<RedirectData[]>((acc, v) => {
    // Explicitly type the accumulator
    if (Number(v) < 8) {
      renderers.forEach((r) => {
        acc.push({
          source: `/docs/${v}/${r}/get-started`,
          destination: `/docs/${v.split('.')[0]}/get-started/install`,
          permanent: true,
        });
      });
    }
    return acc;
  }, []),
];
