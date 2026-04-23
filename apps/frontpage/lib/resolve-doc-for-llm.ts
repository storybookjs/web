import fs from 'node:fs';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { type DocsVersion, renderers as allRenderersList, docsVersions, latestVersion } from '@repo/utils';
import { processHref } from '../components/docs/mdx/a';
import { getVersion } from './get-version';

interface CodeBlock {
  lang: string;
  value: string;
  meta: Record<string, string>;
}

export interface ResolveOptions {
  versionId: string;
  renderer?: string;
  language?: string;
  codeOnly?: boolean;
  pagePath: string[];
  isIndexPage: boolean;
  baseUrl: string;
}

export interface ResolveResult {
  content: string;
  availableRenderers: string[];
  availableLanguages: string[];
}

const RENDERER_NAMES: Record<string, string> = Object.fromEntries(
  allRenderersList.map((r) => [r.id, r.title]),
);

function getLangTitle(lang: string): string {
  if (lang === 'ts') return 'TypeScript';
  if (lang === 'js') return 'JavaScript';
  return lang;
}

/**
 * Resolve a version slug (e.g. "9", "8") to a version ID (e.g. "9.1", "8.6").
 * Returns the latest version if no match or no slug provided.
 */
export function resolveVersionFromSlug(slug?: string): string {
  return getVersion(slug ? [slug] : undefined).id;
}

/**
 * Get available version slugs for documentation in banner.
 */
export function getAvailableVersionSlugs(): string[] {
  return docsVersions.map((v) => v.inSlug ?? v.id);
}

/**
 * Parse a snippet markdown file and extract all code blocks with their metadata.
 */
function parseSnippetFile(filePath: string): CodeBlock[] {
  if (!fs.existsSync(filePath)) return [];

  const source = fs.readFileSync(filePath, 'utf8');
  const tree = unified().use(remarkParse).parse(source);

  const blocks: CodeBlock[] = [];
  for (const node of tree.children) {
    if (node.type === 'code') {
      const meta: Record<string, string> = {};
      const matches = node.meta?.match(/(?:\w+)="(?:[^"]*)"/g);
      if (matches) {
        for (const match of matches) {
          const parts = match.split('=').map((p: string) => p.replace(/"/g, ''));
          const key = parts[0];
          const value = parts[1];
          if (key && value) {
            meta[key] = value;
          }
        }
      }
      blocks.push({
        lang: node.lang ?? '',
        value: node.value ?? '',
        meta,
      });
    }
  }
  return blocks;
}

/**
 * Filter and select code blocks based on renderer and language preferences.
 * Returns matching blocks and tracks all available renderers/languages.
 */
function selectSnippets(
  blocks: CodeBlock[],
  renderer: string,
  language: string,
): { selected: CodeBlock[]; snippetRenderers: Set<string>; snippetLanguages: Set<string> } {
  const snippetRenderers = new Set<string>();
  const snippetLanguages = new Set<string>();

  // Collect all available renderers and languages
  for (const block of blocks) {
    if (block.meta.renderer && block.meta.renderer !== 'common') {
      snippetRenderers.add(block.meta.renderer);
    }
    if (block.meta.language) {
      snippetLanguages.add(block.meta.language);
    }
  }

  // Filter by renderer
  let filtered = blocks.filter((b) => {
    const r = b.meta.renderer;
    return !r || r === 'common' || r === renderer;
  });

  // Filter by language: prefer requested language, but if none match keep all
  const langMatches = filtered.filter(
    (b) => !b.meta.language || b.meta.language === language,
  );
  if (langMatches.length > 0) {
    filtered = langMatches;
  }

  return { selected: filtered, snippetRenderers, snippetLanguages };
}

/**
 * Format selected code blocks as markdown fenced code blocks.
 */
function formatSnippetsAsMarkdown(blocks: CodeBlock[]): string {
  if (blocks.length === 0) return '';

  const parts: string[] = [];
  for (const block of blocks) {
    const filename = block.meta.filename ?? '';
    const tabTitle = block.meta.tabTitle ?? '';
    const comment = [filename, tabTitle].filter(Boolean).join(' — ');
    const header = comment ? `// ${comment}\n` : '';
    parts.push(`\`\`\`${block.lang}\n${header}${block.value}\n\`\`\``);
  }
  return parts.join('\n\n');
}

/**
 * Resolve <IfRenderer> and <If> blocks based on the active renderer.
 */
function resolveIfRendererBlocks(content: string, renderer: string): string {
  let result = content;
  let changed = true;

  while (changed) {
    changed = false;
    const prevResult = result;

    // Match <IfRenderer renderer="X"> or <If renderer="X">
    // eslint-disable-next-line prefer-named-capture-group -- TS target does not support named capture groups
    const ifRendererRegex = /<(?:IfRenderer|If)\s+renderer="([^"]*)"[^>]*>([\s\S]*?)<\/(?:IfRenderer|If)>/g;
    result = result.replace(
      ifRendererRegex,
      (_match, rendererAttr: string, inner: string) => {
        const rendererList = rendererAttr.split(',').map((r) => r.trim());
        return rendererList.includes(renderer) ? inner : '';
      },
    );

    // Match <If notRenderer="X">
    // eslint-disable-next-line prefer-named-capture-group -- TS target does not support named capture groups
    const notRendererRegex = /<If\s+notRenderer="([^"]*)"[^>]*>([\s\S]*?)<\/If>/g;
    result = result.replace(
      notRendererRegex,
      (_match, notRendererAttr: string, inner: string) => {
        const excludeList = notRendererAttr.split(',').map((r) => r.trim());
        return excludeList.includes(renderer) ? '' : inner;
      },
    );

    if (result !== prevResult) {
      changed = true;
    }
  }

  return result;
}

/**
 * Replace <CodeSnippets path="..." /> with actual code content.
 */
function inlineCodeSnippets(
  content: string,
  versionId: string,
  renderer: string,
  language: string,
): { result: string; collectedRenderers: Set<string>; collectedLanguages: Set<string> } {
  const collectedRenderers = new Set<string>();
  const collectedLanguages = new Set<string>();

  // eslint-disable-next-line prefer-named-capture-group -- TS target does not support named capture groups
  const codeSnippetsRegex = /<CodeSnippets\s+path="([^"]*)"[^/]*\/>/g;
  const result = content.replace(
    codeSnippetsRegex,
    (_match, snippetPath: string) => {
      const filePath = path.join(
        process.cwd(),
        'content',
        'snippets',
        versionId,
        snippetPath,
      );

      const blocks = parseSnippetFile(filePath);
      if (blocks.length === 0) return '';

      const { selected, snippetRenderers, snippetLanguages } = selectSnippets(
        blocks,
        renderer,
        language,
      );

      snippetRenderers.forEach((rr: string) => collectedRenderers.add(rr));
      snippetLanguages.forEach((ll: string) => collectedLanguages.add(ll));

      return formatSnippetsAsMarkdown(selected);
    },
  );

  return { result, collectedRenderers, collectedLanguages };
}

/**
 * Strip remaining JSX components, keeping their text content where applicable.
 */
function stripRemainingJsx(content: string): string {
  let cleaned = content;

  // Remove import statements
  cleaned = cleaned.replace(/^import\s+.*$/gm, '');

  // Remove self-closing JSX components: <Component ... />
  cleaned = cleaned.replace(/<[A-Z][A-Za-z]*\s[^>]*\/>/g, '');
  cleaned = cleaned.replace(/<[A-Z][A-Za-z]*\s*\/>/g, '');

  // Remove block JSX components but keep their text content
  let prev = '';
  while (prev !== cleaned) {
    prev = cleaned;
    // eslint-disable-next-line prefer-named-capture-group -- TS target does not support named capture groups
    const jsxBlockRegex = /<([A-Z][A-Za-z]*)[^>]*>([\s\S]*?)<\/\1>/g;
    cleaned = cleaned.replace(jsxBlockRegex, '$2');
  }

  // Remove JSX comments: {/* ... */}
  cleaned = cleaned.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');

  // Remove HTML comments
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');

  // Remove consecutive blank lines (more than 2)
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  return cleaned.trim();
}

/**
 * Extract only code blocks from resolved content (for codeOnly mode).
 */
function extractCodeBlocksOnly(content: string): string {
  const codeBlockRegex = /```[\s\S]*?```/g;
  const matches = content.match(codeBlockRegex);
  if (!matches) return '';
  return matches.join('\n\n');
}

/**
 * Build the contextual banner shown at the top of markdown responses.
 */
export function buildContentBanner(options: {
  renderer: string;
  language: string;
  rendererList: string[];
  languageList: string[];
  versionId: string;
  codeOnly?: boolean;
  slug: string;
}): string {
  const { renderer, language, rendererList, languageList, versionId, codeOnly, slug } = options;
  const rendererTitle = RENDERER_NAMES[renderer] ?? renderer;
  const langTitle = getLangTitle(language);

  const version = docsVersions.find((v) => v.id === versionId);
  const versionLabel = version?.label ?? versionId;

  const otherRenderers = rendererList
    .filter((r) => r !== renderer)

  const otherLanguages = languageList
    .filter((l) => l !== language)
    .map((l) => getLangTitle(l));

  const lines = [
    `> **${versionLabel}** — **${rendererTitle}** / **${langTitle}**${codeOnly ? ' (code snippets only)' : ''}`,
  ];

  const paramParts: string[] = [];
  if (otherRenderers.length > 0) {
    paramParts.push(`\`?renderer=${rendererList.find((r) => r !== renderer) ?? 'vue'}\` for ${otherRenderers.join(', ')}`);
  }
  if (otherLanguages.length > 0) {
    paramParts.push(`\`?language=${languageList.find((l) => l !== language) ?? 'js'}\` for ${otherLanguages.join(', ')}`);
  }
  paramParts.push('`?codeOnly=true` for code snippets only');

  const otherVersions = docsVersions
    .filter((v) => v.id !== versionId)
    .map((v) => v.id === latestVersion.id ? `${v.label} (latest) (\`/docs/${slug}.md\`)` : `${v.label} (\`/docs/${v.inSlug ?? v.id}/${slug}.md\`)`)
    .join(', ');
  if (otherVersions) {
    paramParts.push(`other versions: ${otherVersions}`);
  }

  lines.push(`> Also available:\n- ${paramParts.join('\n- ')}`);
  lines.push('');
  lines.push('');

  return lines.join('\n');
}

/**
 * Resolve relative markdown links to absolute URLs with .md extension.
 * Reuses the same path resolution logic as the <A> component.
 */
export function resolveMarkdownLinks(
  content: string,
  options: {
    activeVersion: DocsVersion;
    pagePath: string[];
    isIndexPage: boolean;
    baseUrl: string;
  },
): string {
  // Match markdown links: [text](href) but not images ![alt](src)
  // eslint-disable-next-line prefer-named-capture-group -- TS target does not support named capture groups
  return content.replace(/(?<!!)\[([^\]]*)\]\(([^)]+)\)/g, (_match, text: string, href: string) => {
    // Skip external links, hash-only links, and already-absolute URLs
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('/')) {
      return `[${text}](${href})`;
    }

    const resolved = processHref({
      activeVersion: options.activeVersion,
      href,
      isIndexPage: options.isIndexPage,
      pagePath: options.pagePath,
    });

    // Convert /docs/... path to absolute URL with .md extension
    // Preserve any hash fragment
    const hashIndex = resolved.indexOf('#');
    const pathPart = hashIndex >= 0 ? resolved.slice(0, hashIndex) : resolved;
    const hashPart = hashIndex >= 0 ? resolved.slice(hashIndex) : '';

    return `[${text}](${options.baseUrl}${pathPart}.md${hashPart})`;
  });
}

/**
 * Resolve an MDX document for LLM consumption.
 */
export function resolveDocForLLM(
  rawContent: string,
  options: ResolveOptions,
): ResolveResult {
  const renderer = options.renderer ?? 'react';
  const language = options.language ?? 'ts';
  const { versionId, codeOnly, pagePath, isIndexPage, baseUrl } = options;

  // 1. Resolve <IfRenderer> and <If> blocks
  let content = resolveIfRendererBlocks(rawContent, renderer);

  // 2. Inline code snippets
  const { result: withSnippets, collectedRenderers, collectedLanguages } = inlineCodeSnippets(
    content,
    versionId,
    renderer,
    language,
  );
  content = withSnippets;

  // 3. Strip remaining JSX
  content = stripRemainingJsx(content);

  // 4. Resolve relative links to absolute URLs with .md extension
  const activeVersion = docsVersions.find((v) => v.id === versionId) ?? latestVersion;
  content = resolveMarkdownLinks(content, {
    activeVersion,
    pagePath,
    isIndexPage,
    baseUrl,
  });

  // 5. If codeOnly, extract only code blocks
  if (codeOnly) {
    content = extractCodeBlocksOnly(content);
  }

  return {
    content,
    // eslint-disable-next-line @typescript-eslint/require-array-sort-compare -- sorting primitive strings
    availableRenderers: [...collectedRenderers].sort(),
    // eslint-disable-next-line @typescript-eslint/require-array-sort-compare -- sorting primitive strings
    availableLanguages: [...collectedLanguages].sort(),
  };
}
