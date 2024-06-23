import type { MDXComponents } from 'mdx/types';

import { mdxComponents } from '@repo/ui';
import { EmbeddedExample } from './components/embedded-example';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    EmbeddedExample,
    ...components,
  };
}
