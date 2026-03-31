import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const FRONTPAGE_ROOT = path.resolve(__dirname, '..');

/**
 * These tests ensure that the LLM-friendliness infrastructure stays intact
 * as the codebase evolves. They verify structural contracts rather than
 * runtime behavior (which requires a running Next.js server).
 */

describe('LLM Friendliness', () => {
  describe('robots.txt', () => {
    const robotsTxt = fs.readFileSync(
      path.join(FRONTPAGE_ROOT, 'app/robots.txt'),
      'utf8',
    );

    const REQUIRED_AI_CRAWLERS = [
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

    it.each(REQUIRED_AI_CRAWLERS)(
      'allows AI crawler: %s',
      (crawler) => {
        expect(robotsTxt).toContain(`User-agent: ${crawler}`);
        const crawlerSection = robotsTxt.split(`User-agent: ${crawler}`)[1];
        expect(crawlerSection).toBeDefined();
        const nextDirective = crawlerSection?.split('\n').find(
          (line) => line.trim().startsWith('Allow:') || line.trim().startsWith('Disallow:'),
        );
        expect(nextDirective?.trim()).toBe('Allow: /');
      },
    );

    it('references llms.txt in comments', () => {
      expect(robotsTxt).toContain('llms.txt');
      expect(robotsTxt).toContain('llms-full.txt');
    });

    it('includes all sitemaps', () => {
      const expectedSitemaps = [
        'addons/sitemap.xml',
        'blog/sitemap.xml',
        'docs/sitemap.xml',
        'recipes/sitemap.xml',
        'releases/sitemap.xml',
        'showcase/sitemap.xml',
        'tutorials/sitemap.xml',
      ];
      for (const sitemap of expectedSitemaps) {
        expect(robotsTxt).toContain(sitemap);
      }
    });
  });

  describe('llms.txt route', () => {
    const routeCode = fs.readFileSync(
      path.join(FRONTPAGE_ROOT, 'app/llms.txt/route.ts'),
      'utf8',
    );

    it('uses getAllTrees() to dynamically build content', () => {
      expect(routeCode).toContain('getAllTrees');
      expect(routeCode).toContain('getFlatTree');
    });

    it('includes required sections', () => {
      expect(routeCode).toContain('## Documentation');
      expect(routeCode).toContain('## Markdown Access');
      expect(routeCode).toContain('## Docs Pages');
      expect(routeCode).toContain('## Community & Resources');
    });

    it('documents .md suffix convention', () => {
      expect(routeCode).toContain('.md');
    });

    it('documents query parameters', () => {
      expect(routeCode).toContain('### Query Parameters');
      expect(routeCode).toContain('renderer');
      expect(routeCode).toContain('language');
      expect(routeCode).toContain('codeOnly');
    });

    it('documents versioned access', () => {
      expect(routeCode).toContain('### Versioned Access');
    });
  });

  describe('llms-full.txt route', () => {
    const routeCode = fs.readFileSync(
      path.join(FRONTPAGE_ROOT, 'app/llms-full.txt/route.ts'),
      'utf8',
    );

    it('uses getAllTrees() to dynamically build content', () => {
      expect(routeCode).toContain('getAllTrees');
      expect(routeCode).toContain('getFlatTree');
    });

    it('uses resolveDocForLLM for snippet inlining', () => {
      expect(routeCode).toContain('resolveDocForLLM');
    });

    it('supports renderer, language, codeOnly, and version params', () => {
      expect(routeCode).toContain("get('renderer')");
      expect(routeCode).toContain("get('language')");
      expect(routeCode).toContain("get('codeOnly')");
      expect(routeCode).toContain("get('version')");
    });

    it('includes content banner', () => {
      expect(routeCode).toContain('getLlmsBannerLines');
    });
  });

  describe('markdown route handler', () => {
    const routeCode = fs.readFileSync(
      path.join(FRONTPAGE_ROOT, 'app/md-api/[...path]/route.ts'),
      'utf8',
    );

    it('serves markdown content type', () => {
      expect(routeCode).toContain("'Content-Type': 'text/markdown; charset=utf-8'");
    });

    it('returns 404 for missing pages', () => {
      expect(routeCode).toContain('status: 404');
    });

    it('uses resolveDocForLLM for snippet inlining', () => {
      expect(routeCode).toContain('resolveDocForLLM');
    });

    it('supports renderer, language, and codeOnly params', () => {
      expect(routeCode).toContain("get('renderer')");
      expect(routeCode).toContain("get('language')");
      expect(routeCode).toContain("get('codeOnly')");
    });

    it('extracts version from path prefix', () => {
      expect(routeCode).toContain('isVersion');
      expect(routeCode).toContain('resolveVersionFromSlug');
    });

    it('includes content banner', () => {
      expect(routeCode).toContain('buildContentBanner');
    });
  });

  describe('resolve-doc-for-llm utility', () => {
    const resolverCode = fs.readFileSync(
      path.join(FRONTPAGE_ROOT, 'lib/resolve-doc-for-llm.ts'),
      'utf8',
    );

    it('parses snippet files from content/snippets/', () => {
      expect(resolverCode).toContain("'snippets'");
      expect(resolverCode).toContain('parseSnippetFile');
    });

    it('resolves IfRenderer blocks', () => {
      expect(resolverCode).toContain('resolveIfRendererBlocks');
      expect(resolverCode).toContain('IfRenderer');
      expect(resolverCode).toContain('notRenderer');
    });

    it('inlines CodeSnippets components', () => {
      expect(resolverCode).toContain('inlineCodeSnippets');
      expect(resolverCode).toContain('CodeSnippets');
    });

    it('filters by renderer and language', () => {
      expect(resolverCode).toContain('selectSnippets');
      expect(resolverCode).toContain('renderer');
      expect(resolverCode).toContain('language');
    });

    it('supports codeOnly mode', () => {
      expect(resolverCode).toContain('codeOnly');
      expect(resolverCode).toContain('extractCodeBlocksOnly');
    });

    it('supports version resolution', () => {
      expect(resolverCode).toContain('resolveVersionFromSlug');
      expect(resolverCode).toContain('docsVersions');
    });

    it('builds content banner with all params', () => {
      expect(resolverCode).toContain('buildContentBanner');
      expect(resolverCode).toContain('codeOnly');
      expect(resolverCode).toContain('versionId');
    });

    it('strips remaining JSX components', () => {
      expect(resolverCode).toContain('stripRemainingJsx');
    });

    it('uses remark to parse snippet markdown', () => {
      expect(resolverCode).toContain('remarkParse');
      expect(resolverCode).toContain('unified');
    });
  });

  describe('content negotiation middleware', () => {
    const middlewareCode = fs.readFileSync(
      path.join(FRONTPAGE_ROOT, 'middleware.ts'),
      'utf8',
    );

    it('handles .md suffix for markdown access', () => {
      expect(middlewareCode).toContain("endsWith('.md')");
    });

    it('checks for text/markdown Accept header', () => {
      expect(middlewareCode).toContain('text/markdown');
    });

    it('excludes text/html requests (browser requests)', () => {
      expect(middlewareCode).toContain('text/html');
    });

    it('extracts version from URL path', () => {
      expect(middlewareCode).toContain('extractVersionAndPath');
      expect(middlewareCode).toContain('versionSlug');
    });

    it('forwards renderer, language, and codeOnly params', () => {
      expect(middlewareCode).toContain("get('renderer')");
      expect(middlewareCode).toContain("get('language')");
      expect(middlewareCode).toContain("get('codeOnly')");
    });

    it('excludes llms.txt and llms-full.txt from middleware matcher', () => {
      expect(middlewareCode).toContain('llms.txt');
      expect(middlewareCode).toContain('llms-full.txt');
    });
  });

  describe('JSON-LD structured data', () => {
    const pageCode = fs.readFileSync(
      path.join(FRONTPAGE_ROOT, 'app/docs/[...slug]/page.tsx'),
      'utf8',
    );

    it('includes TechArticle schema', () => {
      expect(pageCode).toContain("'@type': 'TechArticle'");
    });

    it('includes schema.org context', () => {
      expect(pageCode).toContain("'@context': 'https://schema.org'");
    });

    it('includes publisher organization', () => {
      expect(pageCode).toContain("'@type': 'Organization'");
      expect(pageCode).toContain("name: 'Storybook'");
    });

    it('renders JSON-LD script tag', () => {
      expect(pageCode).toContain('application/ld+json');
      expect(pageCode).toContain('JSON.stringify(jsonLd)');
    });
  });

  describe('layout metadata', () => {
    const layoutCode = fs.readFileSync(
      path.join(FRONTPAGE_ROOT, 'app/layout.tsx'),
      'utf8',
    );

    it('includes llms.txt alternate link', () => {
      expect(layoutCode).toContain("'text/plain': '/llms.txt'");
    });

    it('includes OpenGraph metadata', () => {
      expect(layoutCode).toContain('openGraph');
      expect(layoutCode).toContain('siteName');
    });
  });

});
