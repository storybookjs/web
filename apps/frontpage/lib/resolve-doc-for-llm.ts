import fs from 'node:fs';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { renderers as allRenderersList } from '@repo/utils';

interface CodeBlock {
  lang: string;
  value: string;
  meta: Record<string, string>;
}

interface ResolveOptions {
  versionId: string;
  renderer?: string;
  language?: string;
}

interface ResolveResult {
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
    result = result.replace(
      /<(?:IfRenderer|If)\s+renderer="(?<rendererAttr>[^"]*)"[^>]*>(?<inner>[\s\S]*?)<\/(?:IfRenderer|If)>/g,
      (_match, rendererAttr: string, inner: string) => {
        const rendererList = rendererAttr.split(',').map((r) => r.trim());
        return rendererList.includes(renderer) ? inner : '';
      },
    );

    // Match <If notRenderer="X">
    result = result.replace(
      /<If\s+notRenderer="(?<notRendererAttr>[^"]*)"[^>]*>(?<inner>[\s\S]*?)<\/If>/g,
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

  const result = content.replace(
    /<CodeSnippets\s+path="(?<snippetPath>[^"]*)"[^/]*\/>/g,
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

      for (const rr of snippetRenderers) collectedRenderers.add(rr);
      for (const ll of snippetLanguages) collectedLanguages.add(ll);

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
    cleaned = cleaned.replace(
      /<(?<tag>[A-Z][A-Za-z]*)[^>]*>(?<inner>[\s\S]*?)<\/\1>/g,
      '$2',
    );
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
 * Build the contextual banner shown at the top of markdown responses.
 */
function buildBanner(
  renderer: string,
  language: string,
  rendererList: string[],
  languageList: string[],
): string {
  const rendererTitle = RENDERER_NAMES[renderer] ?? renderer;
  const langTitle = getLangTitle(language);

  const otherRenderers = rendererList
    .filter((r) => r !== renderer)
    .map((r) => RENDERER_NAMES[r] ?? r);

  const otherLanguages = languageList
    .filter((l) => l !== language)
    .map((l) => getLangTitle(l));

  if (otherRenderers.length === 0 && otherLanguages.length === 0) {
    return '';
  }

  const lines = [
    `> **Note:** This documentation is shown for **${rendererTitle}** with **${langTitle}**.`,
  ];

  const alternatives: string[] = [];
  if (otherRenderers.length > 0) {
    alternatives.push(`renderers: ${otherRenderers.join(', ')}`);
  }
  if (otherLanguages.length > 0) {
    alternatives.push(`languages: ${otherLanguages.join(', ')}`);
  }

  lines.push(`> It is also available for ${alternatives.join(' and ')}.`);

  const exampleRenderer = rendererList.find((r) => r !== renderer) ?? renderer;
  const exampleLanguage = languageList.find((l) => l !== language) ?? language;
  lines.push(`> To switch, re-fetch with query parameters: \`?renderer=${exampleRenderer}&language=${exampleLanguage}\``);
  lines.push('');

  return lines.join('\n');
}

/**
 * Resolve an MDX document for LLM consumption.
 *
 * - Inlines code snippets from snippet files
 * - Resolves <IfRenderer> conditional blocks
 * - Strips remaining JSX components
 * - Adds contextual banner with available renderers/languages
 */
export function resolveDocForLLM(
  rawContent: string,
  options: ResolveOptions,
): ResolveResult {
  const renderer = options.renderer ?? 'react';
  const language = options.language ?? 'ts';
  const { versionId } = options;

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

  return {
    content,
    availableRenderers: [...collectedRenderers].sort(),
    availableLanguages: [...collectedLanguages].sort(),
  };
}

/**
 * Build the banner string from resolve result.
 */
export function buildContentBanner(
  renderer: string,
  language: string,
  rendererList: string[],
  languageList: string[],
): string {
  return buildBanner(renderer, language, rendererList, languageList);
}
