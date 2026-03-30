---
description: Validate that the Storybook website's LLM-friendliness infrastructure is complete and up-to-date
---

# Validate LLM Friendliness

When asked to verify or validate LLM friendliness of the Storybook website, follow these steps:

## Quick Validation

Run the validation script:
```bash
cd apps/frontpage && npx tsx scripts/validate-llm-friendliness.ts
```

And run the tests:
```bash
cd apps/frontpage && npx vitest run lib/llm-friendliness.test.ts
```

## What to Check

### Files That Must Exist
- `apps/frontpage/app/llms.txt/route.ts` — LLM index endpoint
- `apps/frontpage/app/llms-full.txt/route.ts` — Full docs dump endpoint
- `apps/frontpage/app/md-api/[...path]/route.ts` — Internal markdown route handler
- `apps/frontpage/app/robots.txt` — AI crawler allowlisting
- `apps/frontpage/lib/resolve-doc-for-llm.ts` — Core snippet inlining and resolution logic

### Dynamic Content Sync
LLM endpoints (`llms.txt`, `llms-full.txt`) MUST use `getAllTrees()` from `lib/get-all-trees.ts` to build their content. This ensures new docs are automatically included.

### Code Snippet Inlining
`resolve-doc-for-llm.ts` must:
1. Parse snippet files from `content/snippets/{version}/` using remark
2. Resolve `<IfRenderer>` and `<If notRenderer>` conditional blocks
3. Inline `<CodeSnippets path="..." />` components with actual code
4. Filter by `renderer` and `language` params
5. Support `codeOnly` mode (extract only code blocks)
6. Support version resolution via `resolveVersionFromSlug()`
7. Build a contextual banner with available alternatives

### .md Suffix Access
The middleware in `apps/frontpage/middleware.ts` must:
1. Detect `.md` suffix on `/docs/*.md` URLs and rewrite to `/md-api/`
2. Extract version prefixes (e.g., `/docs/9/foo.md` → version 9)
3. Forward `renderer`, `language`, `codeOnly` query params
4. Use `v/` sentinel in rewrite path to disambiguate version from doc path

### Content Negotiation
The middleware must also:
1. Check for `Accept: text/markdown` header
2. Exclude requests that also include `text/html`
3. Rewrite matching `/docs/*` requests to `/md-api/`
4. Support version extraction from content-negotiated URLs

### Version Support
- `.md` routes: `/docs/9/writing-stories/decorators.md`
- `llms-full.txt`: `?version=9` query param
- Latest version (`/docs/10.3/...`) redirects to `/docs/...` (308)
- Major-only slugs work: `/docs/9/` resolves to version 9.1

### AI Crawlers in robots.txt
Required crawlers: GPTBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, Amazonbot, cohere-ai, PerplexityBot, Google-Extended

### Structured Data
`apps/frontpage/app/docs/[...slug]/page.tsx` must render a `<script type="application/ld+json">` tag with `TechArticle` schema on every doc page.

### Discovery Headers
- `apps/frontpage/app/layout.tsx` must include `alternates.types['text/plain'] = '/llms.txt'`
- `apps/frontpage/next.config.js` must set a `Link` response header with `rel="llms"` on `/docs/:path*`

## Manual Testing

```bash
# .md suffix (like Stripe)
curl https://storybook.js.org/docs/writing-stories/decorators.md

# With renderer/language filtering
curl "https://storybook.js.org/docs/writing-stories/decorators.md?renderer=vue&language=js"

# Code only mode
curl "https://storybook.js.org/docs/writing-stories/decorators.md?codeOnly=true"

# Versioned access
curl https://storybook.js.org/docs/9/writing-stories/decorators.md

# Content negotiation (what Claude Code uses)
curl -H "Accept: text/markdown" https://storybook.js.org/docs/writing-stories/decorators

# Full docs dump
curl "https://storybook.js.org/llms-full.txt?renderer=react"
curl "https://storybook.js.org/llms-full.txt?version=9"

# Discovery
curl https://storybook.js.org/llms.txt
```

## When to Run This

- After adding new documentation sections
- After modifying the docs tree structure
- After changing middleware or routing
- Before deploying to production
- When upgrading Next.js or changing the content pipeline
- After adding new renderers or doc versions
