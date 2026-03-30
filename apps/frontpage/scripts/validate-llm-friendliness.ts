/**
 * Validate LLM Friendliness Infrastructure
 *
 * Standalone script to verify that all LLM-friendliness features are properly
 * configured and no new documentation pages are missing from the LLM endpoints.
 *
 * Run: npm run validate:llm (from apps/frontpage)
 */

import fs from 'node:fs';
import path from 'node:path';

const FRONTPAGE_ROOT = path.resolve(__dirname, '..');
let passed = 0;
let failed = 0;
const failures: string[] = [];

function check(name: string, condition: boolean, detail?: string) {
  if (condition) {
    console.log(`  ✅ ${name}`);
    passed++;
  } else {
    const msg = detail ? `${name}: ${detail}` : name;
    console.log(`  ❌ ${msg}`);
    failed++;
    failures.push(msg);
  }
}

function fileExists(relativePath: string): boolean {
  return fs.existsSync(path.join(FRONTPAGE_ROOT, relativePath));
}

function readFile(relativePath: string): string {
  return fs.readFileSync(path.join(FRONTPAGE_ROOT, relativePath), 'utf8');
}

// ── 1. Required files exist ──────────────────────────────────────────────

console.log('\n📁 Required LLM files exist:');

const REQUIRED_FILES = [
  'app/llms.txt/route.ts',
  'app/llms-full.txt/route.ts',
  'app/md-api/[...path]/route.ts',
  'app/robots.txt',
  'public/.well-known/ai-plugin.json',
  'lib/resolve-doc-for-llm.ts',
];

for (const file of REQUIRED_FILES) {
  check(file, fileExists(file), 'File not found');
}

// ── 2. robots.txt AI crawler coverage ────────────────────────────────────

console.log('\n🤖 robots.txt AI crawler coverage:');

const REQUIRED_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'Amazonbot',
  'cohere-ai',
  'PerplexityBot',
  'Google-Extended',
];

const robotsTxt = readFile('app/robots.txt');

for (const crawler of REQUIRED_CRAWLERS) {
  check(
    `User-agent: ${crawler}`,
    robotsTxt.includes(`User-agent: ${crawler}`),
    'Missing from robots.txt',
  );
}

check(
  'llms.txt reference in robots.txt',
  robotsTxt.includes('llms.txt') && robotsTxt.includes('llms-full.txt'),
  'robots.txt should reference llms.txt and llms-full.txt',
);

// ── 3. ai-plugin.json schema validation ──────────────────────────────────

console.log('\n🔌 ai-plugin.json validation:');

try {
  const pluginJson = JSON.parse(readFile('public/.well-known/ai-plugin.json'));

  const requiredFields = [
    'schema_version',
    'name_for_human',
    'name_for_model',
    'description_for_human',
    'description_for_model',
    'api',
    'logo_url',
    'contact_email',
    'legal_info_url',
  ];

  for (const field of requiredFields) {
    check(`Field: ${field}`, field in pluginJson, 'Missing required field');
  }

  check(
    'API has url',
    pluginJson.api?.url?.includes('storybook.js.org'),
    'API url should reference storybook.js.org',
  );
} catch (e) {
  check('ai-plugin.json is valid JSON', false, String(e));
}

// ── 4. Route handlers ────────────────────────────────────────────────────

console.log('\n🌲 Route handlers:');

const llmsTxtRoute = readFile('app/llms.txt/route.ts');
check(
  'llms.txt uses getAllTrees()',
  llmsTxtRoute.includes('getAllTrees'),
  'Should import and use getAllTrees to stay in sync with docs',
);

const llmsFullRoute = readFile('app/llms-full.txt/route.ts');
check(
  'llms-full.txt uses resolveDocForLLM()',
  llmsFullRoute.includes('resolveDocForLLM'),
  'Should use resolveDocForLLM to inline code snippets',
);
check(
  'llms-full.txt supports version param',
  llmsFullRoute.includes("get('version')"),
  'Should accept ?version= query param',
);

const mdRoute = readFile('app/md-api/[...path]/route.ts');
check(
  'Markdown route uses resolveDocForLLM()',
  mdRoute.includes('resolveDocForLLM'),
  'Should use resolveDocForLLM to inline code snippets',
);
check(
  'Markdown route supports version from path',
  mdRoute.includes('resolveVersionFromSlug'),
  'Should resolve version from path prefix',
);

// ── 5. Code snippet resolver ─────────────────────────────────────────────

console.log('\n📝 Code snippet resolution:');

const resolver = readFile('lib/resolve-doc-for-llm.ts');
check(
  'Resolver parses snippet files',
  resolver.includes('parseSnippetFile') && resolver.includes("'snippets'"),
  'Should read from content/snippets/',
);
check(
  'Resolver handles IfRenderer blocks',
  resolver.includes('resolveIfRendererBlocks') && resolver.includes('IfRenderer'),
  'Should resolve conditional renderer blocks',
);
check(
  'Resolver inlines CodeSnippets',
  resolver.includes('inlineCodeSnippets') && resolver.includes('CodeSnippets'),
  'Should inline code snippet components',
);
check(
  'Resolver supports codeOnly mode',
  resolver.includes('codeOnly') && resolver.includes('extractCodeBlocksOnly'),
  'Should support extracting only code blocks',
);
check(
  'Resolver supports version resolution',
  resolver.includes('resolveVersionFromSlug') && resolver.includes('docsVersions'),
  'Should resolve version slugs to version IDs',
);
check(
  'Resolver builds content banner',
  resolver.includes('buildContentBanner'),
  'Should generate banner with available alternatives',
);

// ── 6. Middleware ─────────────────────────────────────────────────────────

console.log('\n🔀 Middleware:');

const middleware = readFile('middleware.ts');
check(
  'Middleware handles .md suffix',
  middleware.includes("endsWith('.md')"),
  'Should rewrite .md suffix URLs',
);
check(
  'Middleware checks Accept: text/markdown',
  middleware.includes('text/markdown'),
  'Should detect text/markdown Accept header',
);
check(
  'Middleware extracts version from path',
  middleware.includes('extractVersionAndPath'),
  'Should parse version slug from URL',
);
check(
  'Middleware forwards codeOnly param',
  middleware.includes("get('codeOnly')"),
  'Should forward codeOnly query param',
);

// ── 7. JSON-LD structured data ───────────────────────────────────────────

console.log('\n📊 JSON-LD structured data:');

const docPage = readFile('app/docs/[...slug]/page.tsx');
check(
  'Uses TechArticle schema type',
  docPage.includes("'TechArticle'"),
  'Should use TechArticle schema.org type',
);
check(
  'Includes schema.org context',
  docPage.includes('schema.org'),
  'Should reference schema.org',
);
check(
  'Renders JSON-LD script tag',
  docPage.includes('application/ld+json'),
  'Should render JSON-LD as script tag',
);

// ── 8. Layout & headers ─────────────────────────────────────────────────

console.log('\n🔗 Layout metadata & headers:');

const layout = readFile('app/layout.tsx');
check(
  'Layout has llms.txt alternate link',
  layout.includes("'text/plain': '/llms.txt'"),
  'Should add alternate link for llms.txt',
);

const nextConfig = readFile('next.config.js');
check(
  'next.config.js has Link header for /docs',
  nextConfig.includes('rel="llms"') && nextConfig.includes('/docs/:path*'),
  'Should set Link header on /docs pages',
);

// ── 9. Documentation content ─────────────────────────────────────────────

console.log('\n📄 Documentation content:');

const contentDocsPath = path.join(FRONTPAGE_ROOT, 'content/docs');
const hasContentDocs = fs.existsSync(contentDocsPath);

if (hasContentDocs) {
  const versions = fs
    .readdirSync(contentDocsPath, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  check(
    'Content docs directory has version folders',
    versions.length > 0,
    'No version folders found in content/docs/',
  );

  if (versions.length > 0) {
    const latestDir = path.join(contentDocsPath, versions[versions.length - 1]);
    let docCount = 0;

    function countDocs(dir: string) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          countDocs(path.join(dir, entry.name));
        } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
          docCount++;
        }
      }
    }

    countDocs(latestDir);
    check(
      `Latest version has ${docCount} doc files`,
      docCount > 0,
      'No documentation files found',
    );
  }
} else {
  console.log(
    '  ⏭️  content/docs/ not found (run `npm run fetch-docs` first)',
  );
}

// ── Summary ──────────────────────────────────────────────────────────────

console.log('\n' + '═'.repeat(50));
console.log(`\n📋 Results: ${passed} passed, ${failed} failed\n`);

if (failures.length > 0) {
  console.log('Failures:');
  for (const f of failures) {
    console.log(`  • ${f}`);
  }
  console.log('');
  process.exit(1);
}

console.log('🎉 All LLM friendliness checks passed!\n');
