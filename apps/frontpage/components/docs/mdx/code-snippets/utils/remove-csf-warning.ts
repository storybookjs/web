/** Matches a first-line comment that begins "⚠️ CSF", in `//`, `<!--`, or `{/*` style */
const csfWarningRegex = /^\s*(?:\/\/|<!--|\{\/\*)\s*⚠️ CSF.*(?:\r?\n|$)/;

/**
 * CSF 3 snippets begin with a comment that warns about removal of older CSF versions. On the site,
 * the snippet shows that warning as a banner (see `ActiveInfo`), so remove the comment from the code.
 */
export function removeCsfWarning(code: string) {
  return code.replace(csfWarningRegex, '');
}
