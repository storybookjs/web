import type { MDXComponents } from 'mdx/types';

import { Callout } from './components/callout';
import { EmbeddedExample } from './components/embedded-example';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Callout,
    EmbeddedExample,
    ...components,
  };
}
