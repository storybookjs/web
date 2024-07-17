import { type CodeSnippetsProps } from '@repo/utils';

export function transformVueTabTitle(
  tabTitle: string,
  tabs: CodeSnippetsProps[],
) {
  const createVersionRegex = (version: string) => new RegExp(`^(${version})$`);
  const createVersionSuffixRegex = (version: string) =>
    new RegExp(`^(.*)-(${version})$`);
  // Only do the transformation if both Vue 2 and Vue 3 tabs are present
  if (
    tabs.find(
      (tab) =>
        tab.tabTitle?.match(createVersionRegex('2')) ??
        tab.tabTitle?.match(createVersionSuffixRegex('2')),
    ) &&
    tabs.find(
      (tab) =>
        tab.tabTitle?.match(createVersionRegex('3')) ??
        tab.tabTitle?.match(createVersionSuffixRegex('3')),
    )
  ) {
    return tabTitle
      .replace(createVersionRegex('\\d'), 'Vue $1')
      .replace(createVersionSuffixRegex('\\d'), '$1 (Vue $2)');
  }
  // Otherwise just remove the version number
  return tabTitle
    .replace(createVersionRegex('\\d'), '')
    .replace(createVersionSuffixRegex('\\d'), '$1');
}
