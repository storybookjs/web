import { renderers } from './constants';

export default [
  ...renderers.map((r) => ({
    source: `/docs/${r}/get-started/examples`,
    destination: '/showcase',
    permanent: true,
  })),
] as RedirectData[];
