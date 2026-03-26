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
- `apps/frontpage/app/docs/api/md/route.ts` — Markdown API endpoint
- `apps/frontpage/app/robots.txt` — AI crawler allowlisting
- `apps/frontpage/public/.well-known/ai-plugin.json` — OpenAI plugin manifest

### Dynamic Content Sync
All three LLM endpoints (`llms.txt`, `llms-full.txt`, `docs/api/md`) MUST use `getAllTrees()` from `lib/get-all-trees.ts` to build their content. This ensures new docs are automatically included. If any endpoint hardcodes doc paths instead, it will go stale.

### Content Negotiation
The middleware in `apps/frontpage/middleware.ts` must:
1. Check for `Accept: text/markdown` header
2. Exclude requests that also include `text/html`
3. Rewrite matching `/docs/*` requests to `/docs/api/md`
4. NOT rewrite `/docs/api/*` routes

### AI Crawlers in robots.txt
Required crawlers: GPTBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, Amazonbot, cohere-ai, PerplexityBot, Google-Extended

### Structured Data
`apps/frontpage/app/docs/[...slug]/page.tsx` must render a `<script type="application/ld+json">` tag with `TechArticle` schema on every doc page.

### Discovery Headers
- `apps/frontpage/app/layout.tsx` must include `alternates.types['text/plain'] = '/llms.txt'`
- `apps/frontpage/next.config.js` must set a `Link` response header with `rel="llms"` on `/docs/:path*`

## When to Run This

- After adding new documentation sections
- After modifying the docs tree structure
- After changing middleware or routing
- Before deploying to production
- When upgrading Next.js or changing the content pipeline
