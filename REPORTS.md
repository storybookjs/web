# LLM Friendliness Changes - Report

Summary of all changes made to improve LLM accessibility of the Storybook website.

---

## 1. llms.txt and llms-full.txt Endpoints

**Commit:** `feat: add llms.txt and llms-full.txt endpoints for LLM discoverability`

**Files changed:**
- `apps/frontpage/app/llms.txt/route.ts` (new)
- `apps/frontpage/app/llms-full.txt/route.ts` (new)

**What it does:**
- `/llms.txt` - Serves a structured index of all documentation pages in the llms.txt standard format. Includes doc hierarchy, version info, and links to community resources.
- `/llms-full.txt` - Serves the complete documentation content as a single plain text file, with MDX components stripped out, suitable for direct LLM consumption.

**Impact:** HIGH - This is the primary mechanism for LLMs to discover and consume documentation. Without it, LLMs must scrape HTML and parse out navigation chrome, scripts, and styling. With it, they get clean, structured content instantly.

**Who else does this:**
- [Next.js](https://nextjs.org/llms.txt) - Provides `llms.txt` and `llms-full.txt` with versioned docs
- [Vercel](https://vercel.com/llms.txt) - Company-wide llms.txt
- [Anthropic](https://docs.anthropic.com/llms.txt) - Claude documentation llms.txt
- [Supabase](https://supabase.com/llms.txt) - Database platform docs
- [llmstxt.org](https://llmstxt.org/) - The standard specification and directory of adopters

---

## 2. Documentation Markdown API Endpoint

**Commit:** `feat: add docs markdown API endpoint for programmatic access`

**Files changed:**
- `apps/frontpage/app/docs/api/md/route.ts` (new)

**What it does:**
- `GET /docs/api/md` - Returns a JSON index of all doc pages with their slugs and markdown URLs
- `GET /docs/api/md?path=get-started` - Returns the raw markdown content of a specific doc page

**Impact:** HIGH - Provides a structured API for programmatic doc access. LLMs and developer tools can fetch exactly the page they need as clean markdown, without parsing HTML.

**Who else does this:**
- [Stripe Docs](https://docs.stripe.com) - Provides markdown content via API
- [MDN Web Docs](https://github.com/mdn/content) - Raw markdown available via GitHub API
- [Docusaurus](https://github.com/facebook/docusaurus) - Supports content API via plugins

---

## 3. Content Negotiation via Accept Headers

**Commit:** `feat: add content negotiation for markdown in docs middleware`

**Files changed:**
- `apps/frontpage/middleware.ts` (modified)

**What it does:**
When a request to `/docs/*` includes `Accept: text/markdown` (without `text/html`), the middleware transparently rewrites the request to the markdown API endpoint. This means LLM tools that send proper content negotiation headers automatically get markdown instead of HTML.

**Impact:** HIGH - This is the mechanism that Claude Code and similar tools use. When Claude Code fetches a URL, it sends `Accept: text/markdown, text/html` headers. With this change, fetching `https://storybook.js.org/docs/get-started` from an LLM tool returns clean markdown instead of a full HTML page with React hydration scripts.

**Who else does this:**
- [GitHub](https://docs.github.com/en/rest) - Supports `Accept: application/vnd.github.raw` for raw content
- [Docusaurus sites](https://docusaurus.io/) - Community plugins for content negotiation
- This pattern is explicitly recommended in the [llms.txt specification](https://llmstxt.org/)

---

## 4. AI Crawler Allowlisting in robots.txt

**Commit:** `feat: update robots.txt to explicitly allow AI crawlers`

**Files changed:**
- `apps/frontpage/app/robots.txt` (modified)

**What it does:**
Adds explicit `User-agent` + `Allow: /` directives for known AI crawlers: GPTBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, Amazonbot, Bytespider, cohere-ai, PerplexityBot, and Google-Extended. Also adds comments pointing to the llms.txt endpoint.

**Impact:** MEDIUM - While the existing `User-agent: *` already allows these crawlers, explicit allowlisting is a clear signal of intent. Some sites block AI crawlers, and being explicit avoids ambiguity. It also future-proofs against default changes in crawler behavior.

**Who else does this:**
- [Vercel docs](https://vercel.com/robots.txt) - Explicit AI crawler directives
- [Stripe docs](https://docs.stripe.com/robots.txt) - Explicit GPTBot allowlisting
- [MDN Web Docs](https://developer.mozilla.org/robots.txt) - AI crawler directives

---

## 5. JSON-LD Structured Data on Doc Pages

**Commit:** `feat: add JSON-LD structured data to documentation pages`

**Files changed:**
- `apps/frontpage/app/docs/[...slug]/page.tsx` (modified)

**What it does:**
Adds `TechArticle` schema.org structured data to every documentation page, including:
- Page title and URL
- Publisher (Storybook organization) with logo
- Parent website reference
- Software application context (Storybook as DeveloperApplication)
- Documentation version number

**Impact:** MEDIUM - Search engines and LLMs use structured data to understand page semantics. `TechArticle` schema explicitly marks content as technical documentation, improving relevance scoring.

**Who else does this:**
- [Google Developers](https://developers.google.com/) - Uses `TechArticle` schema extensively
- [MDN Web Docs](https://developer.mozilla.org/) - Structured data on all doc pages
- [Schema.org TechArticle spec](https://schema.org/TechArticle)
- [Stripe Docs](https://docs.stripe.com) - JSON-LD on documentation pages

---

## 6. llms.txt Link Discovery via HTML and HTTP Headers

**Commit:** `feat: add llms.txt link header and enhanced OpenGraph metadata`
**Commit:** `feat: add ai-plugin.json and Link response headers for docs`

**Files changed:**
- `apps/frontpage/app/layout.tsx` (modified)
- `apps/frontpage/next.config.js` (modified)

**What it does:**
- Adds `<link rel="alternate" type="text/plain" href="/llms.txt">` in the HTML `<head>` via Next.js `alternates.types` metadata
- Adds HTTP `Link: <https://storybook.js.org/llms.txt>; rel="llms"; type="text/plain"` response header on all `/docs/*` pages
- Enhances OpenGraph metadata with explicit type, title, and description

**Impact:** MEDIUM - Multiple discovery mechanisms ensure LLMs and crawlers can find the llms.txt endpoint regardless of how they access the site (HTML parsing, HTTP header inspection, or direct URL convention).

**Who else does this:**
- [llmstxt.org specification](https://llmstxt.org/) - Recommends Link header for discovery
- [Next.js docs](https://nextjs.org/) - Uses Link headers for related resources
- HTTP `Link` headers are a standard discovery mechanism ([RFC 8288](https://www.rfc-editor.org/rfc/rfc8288))

---

## 7. OpenAI AI Plugin Manifest

**Commit:** `feat: add ai-plugin.json and Link response headers for docs`

**Files changed:**
- `apps/frontpage/public/.well-known/ai-plugin.json` (new)

**What it does:**
Adds a `.well-known/ai-plugin.json` manifest following the OpenAI plugin specification. This includes:
- Human and model-readable descriptions
- API endpoint reference
- Logo and contact information

**Impact:** LOW-MEDIUM - While the OpenAI plugin ecosystem has evolved, the `.well-known/ai-plugin.json` convention is still used for LLM tool discovery. It provides another standardized way for AI systems to discover and understand the Storybook documentation API.

**Who else does this:**
- [OpenAI Plugin specification](https://platform.openai.com/docs/plugins/getting-started/plugin-manifest)
- Various ChatGPT plugins use this manifest format
- [Zapier AI Actions](https://actions.zapier.com/.well-known/ai-plugin.json)

---

## Summary

| Change | Impact | Primary Benefit |
|--------|--------|-----------------|
| llms.txt / llms-full.txt | HIGH | LLMs can discover and consume all docs |
| Docs Markdown API | HIGH | Programmatic access to individual pages |
| Content Negotiation | HIGH | Transparent markdown serving for LLM tools |
| AI Crawler robots.txt | MEDIUM | Clear intent to allow AI indexing |
| JSON-LD Structured Data | MEDIUM | Better semantic understanding by LLMs |
| Link Header Discovery | MEDIUM | Multiple discovery paths for llms.txt |
| AI Plugin Manifest | LOW-MEDIUM | OpenAI-ecosystem discoverability |
