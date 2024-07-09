import { docsCommonRedirects } from './docs-common-redirects';
import { docsRenderersRedirects } from './docs-renderers-redirects';
import { docsVersionsRedirects } from './docs-versions-redirects';
import { redirectsTags } from './redirects_tags';
import { RedirectData } from './types';

// Merge all redirects into a single list
// The order of the list is important
// The first matching redirect will be used

export const listOfRedirects: RedirectData[] = [
  ...docsVersionsRedirects,
  ...docsRenderersRedirects,
  ...docsCommonRedirects,
  ...redirectsTags,
];
