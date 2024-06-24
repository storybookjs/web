import type { MDXComponents } from 'mdx/types';

import { mdxComponents } from '@repo/ui';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  };
}
