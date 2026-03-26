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
- [Supabase](https://supabase.com/llms.txt) - Database platform docs
- [Stripe](https://docs.stripe.com/llms.txt) - Stripe documentation
- [llmstxt.org](https://llmstxt.org/) - The standard specification and directory of adopters

**Try it yourself:**

```bash
# Storybook (after this change)
curl https://storybook.js.org/llms.txt

# Compare with others:
curl https://nextjs.org/llms.txt
curl https://vercel.com/llms.txt
curl https://supabase.com/llms.txt
curl https://docs.stripe.com/llms.txt
```

<details>
<summary>Example output from Next.js llms.txt</summary>

```
# Next.js Documentation

@doc-version: 16.2.1
@doc-version-notes: Some features may have extended or refined behavior in minor or patch releases

- [Getting Started](https://nextjs.org/docs/app/getting-started): Learn how to create full-stack web applications with the Next.js App Router.
  - [Installation](https://nextjs.org/docs/app/getting-started/installation): Learn how to create a new Next.js application...
  - [Project Structure](https://nextjs.org/docs/app/getting-started/project-structure): Learn the folder and file conventions...
  ...
```
</details>

<details>
<summary>Example output from Vercel llms.txt</summary>

```
# Vercel Documentation

[Vercel Documentation](https://vercel.com/docs): Vercel is the AI Cloud...

- [Getting Started](https://vercel.com/docs/getting-started-with-vercel): Install the Vercel CLI...
- [Fundamental Concepts](https://vercel.com/docs/fundamentals): Learn about the core concepts...
  - [Request Lifecycle](https://vercel.com/docs/fundamentals/infrastructure): Learn how Vercel routes...
  ...
```
</details>

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
- [Stripe Docs](https://docs.stripe.com/testing.md) - Append `.md` to any doc URL to get markdown
- [Next.js Docs](https://nextjs.org/docs/app/getting-started) - Returns markdown when fetched by LLM tools
- [MDN Web Docs](https://github.com/mdn/content) - Raw markdown available via GitHub API

**Try it yourself – Stripe `.md` convention:**

```bash
# ❌ WITHOUT: Regular HTML page (huge, full of scripts/chrome)
curl -s https://docs.stripe.com/testing | head -20
# Returns: Full HTML page with <script> tags, navigation, React hydration, etc.

# ✅ WITH: Append .md to get clean markdown
curl -s https://docs.stripe.com/testing.md | head -20
```

<details>
<summary>Stripe .md output (first 15 lines)</summary>

```markdown
# Testing

Simulate payments to test your integration.

Test your integration in a *sandbox* by simulating transactions with test
values—these transactions don't move funds.

Test cards act as "fake" credit cards, and allow you to simulate:

- Successful payments by card brand or country
- Card errors due to declines, fraud, or invalid data
- Disputes and refunds
- Authentication with 3D Secure and PINs
```
</details>

**Try it yourself – Storybook (after this change):**

```bash
# Get the index of all available doc pages
curl https://storybook.js.org/docs/api/md

# Get a specific page as markdown
curl https://storybook.js.org/docs/api/md?path=get-started
```

---

## 3. Content Negotiation via Accept Headers

**Commit:** `feat: add content negotiation for markdown in docs middleware`

**Files changed:**
- `apps/frontpage/middleware.ts` (modified)

**What it does:**
When a request to `/docs/*` includes `Accept: text/markdown` (without `text/html`), the middleware transparently rewrites the request to the markdown API endpoint. This means LLM tools that send proper content negotiation headers automatically get markdown instead of HTML.

**Impact:** HIGH - This is the mechanism that Claude Code and similar tools use. When Claude Code fetches a URL, it sends `Accept: text/markdown, text/html` headers. With this change, fetching `https://storybook.js.org/docs/get-started` from an LLM tool returns clean markdown instead of a full HTML page with React hydration scripts.

**Who else does this:**
- [Next.js Docs](https://nextjs.org/docs/app/getting-started) - Returns markdown frontmatter + content when fetched with LLM-style headers
- [GitHub API](https://docs.github.com/en/rest) - Supports `Accept: application/vnd.github.raw` for raw content
- This pattern is explicitly recommended in the [llms.txt specification](https://llmstxt.org/)

**Try it yourself – compare WITH and WITHOUT the Accept header:**

```bash
# ❌ WITHOUT content negotiation (browser-style request)
# Returns full HTML with scripts, stylesheets, navigation chrome
curl -s https://storybook.js.org/docs/get-started | head -5
# <html>...<script>...</script>...<nav>...</nav>...

# ✅ WITH content negotiation (LLM-style request)
# Returns clean markdown content
curl -s -H "Accept: text/markdown" https://storybook.js.org/docs/get-started | head -20
# # Get started with Storybook
# Storybook is a frontend workshop for building UI components...
```

**How Next.js does it** (they return markdown with frontmatter when fetched by tools):

```bash
# Next.js returns markdown-style content for LLM consumers:
curl -s https://nextjs.org/docs/app/getting-started | head -10
```

<details>
<summary>Next.js content-negotiated output</summary>

```markdown
---
title: Getting Started
description: Learn how to create full-stack web applications with the Next.js App Router.
url: "https://nextjs.org/docs/app/getting-started"
version: 16.2.1
lastUpdated: 2026-03-25
---

Welcome to the Next.js documentation!
```
</details>

**How Claude Code triggers this:** Claude Code's WebFetch tool automatically sends `Accept: text/markdown, text/html` headers. This middleware detects the `text/markdown` preference and transparently serves markdown instead of HTML—no special URL needed.

---

## 4. AI Crawler Allowlisting in robots.txt

**Commit:** `feat: update robots.txt to explicitly allow AI crawlers`

**Files changed:**
- `apps/frontpage/app/robots.txt` (modified)

**What it does:**
Adds explicit `User-agent` + `Allow: /` directives for known AI crawlers: GPTBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, Amazonbot, Bytespider, cohere-ai, PerplexityBot, and Google-Extended. Also adds comments pointing to the llms.txt endpoint.

**Impact:** MEDIUM - While the existing `User-agent: *` already allows these crawlers, explicit allowlisting is a clear signal of intent. Some sites block AI crawlers, and being explicit avoids ambiguity. It also future-proofs against default changes in crawler behavior.

**Who else does this:**
- [Vercel](https://vercel.com/robots.txt) - Allows all crawlers with specific API path restrictions
- [MDN Web Docs](https://developer.mozilla.org/robots.txt) - Simple allow-all with sitemap

**Try it yourself:**

```bash
# Compare robots.txt files:
curl https://storybook.js.org/robots.txt
curl https://vercel.com/robots.txt
curl https://developer.mozilla.org/robots.txt
curl https://docs.stripe.com/robots.txt
```

<details>
<summary>MDN robots.txt (minimal, allows all)</summary>

```
User-agent: *
Sitemap: https://developer.mozilla.org/sitemap.xml

Disallow: /api/
Disallow: /*/files/
Disallow: /media
```
</details>

> **Note:** Many major sites (Twitter/X, Reddit, NYT) actively _block_ AI crawlers. By explicitly allowing them, Storybook signals that its docs are meant to be consumed by AI tools—an important distinction for open-source documentation.

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

**Try it yourself – inspect a doc page's structured data:**

```bash
# Look for the JSON-LD script tag in any doc page:
curl -s https://storybook.js.org/docs/get-started | grep -o '<script type="application/ld+json">.*</script>' | python3 -m json.tool
```

<details>
<summary>Expected JSON-LD output</summary>

```json
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Get started with Storybook",
  "url": "https://storybook.js.org/docs/get-started",
  "publisher": {
    "@type": "Organization",
    "name": "Storybook",
    "url": "https://storybook.js.org",
    "logo": {
      "@type": "ImageObject",
      "url": "https://storybook.js.org/icon.svg"
    }
  },
  "isPartOf": {
    "@type": "WebSite",
    "name": "Storybook",
    "url": "https://storybook.js.org"
  },
  "about": {
    "@type": "SoftwareApplication",
    "name": "Storybook",
    "applicationCategory": "DeveloperApplication"
  },
  "version": "8.6"
}
```
</details>

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
- HTTP `Link` headers are a standard discovery mechanism ([RFC 8288](https://www.rfc-editor.org/rfc/rfc8288))

**Try it yourself – check HTTP response headers:**

```bash
# Check for Link header pointing to llms.txt:
curl -sI https://storybook.js.org/docs/get-started | grep -i "^link:"
# Link: <https://storybook.js.org/llms.txt>; rel="llms"; type="text/plain"

# Check for the <link> tag in HTML <head>:
curl -s https://storybook.js.org/ | grep -o '<link[^>]*llms.txt[^>]*>'
# <link rel="alternate" type="text/plain" href="/llms.txt">
```

> **How discovery works:** An LLM crawler visiting any docs page can discover the llms.txt endpoint via 3 independent methods:
> 1. **URL convention**: Try `/llms.txt` directly (most common)
> 2. **HTTP header**: Inspect `Link` response headers on any page
> 3. **HTML `<link>` tag**: Parse the `<head>` of any page

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
- [Zapier AI Actions](https://actions.zapier.com/.well-known/ai-plugin.json) - Full plugin manifest with OAuth
- [OpenAI Plugin specification](https://platform.openai.com/docs/plugins/getting-started/plugin-manifest)

**Try it yourself:**

```bash
# Storybook (after this change)
curl -s https://storybook.js.org/.well-known/ai-plugin.json | python3 -m json.tool

# Compare with Zapier's manifest:
curl -s https://actions.zapier.com/.well-known/ai-plugin.json | python3 -m json.tool
```

<details>
<summary>Zapier's ai-plugin.json (real example)</summary>

```json
{
  "schema_version": "v1",
  "name_for_model": "Zapier",
  "name_for_human": "Zapier",
  "description_for_model": "Zapier plugin helps users in two main ways...",
  "description_for_human": "Interact with over 5,000+ apps like Google Sheets, Gmail, HubSpot...",
  "auth": {
    "type": "oauth",
    "client_url": "https://actions.zapier.com/oauth/authorize/",
    "scope": "nla:exposed_actions:execute",
    "authorization_url": "https://actions.zapier.com/oauth/token/"
  },
  "api": {
    "type": "openapi",
    "url": "https://actions.zapier.com/api/v1/dynamic/openapi.json"
  },
  "logo_url": "https://cdn.zappy.app/8f853364f9b383d65b44e184e04689ed.png",
  "contact_email": "nla@zapier.com",
  "legal_info_url": "https://zapier.com/legal"
}
```
</details>

---

## 8. Code Snippet Inlining with Renderer/Language Filtering

**Commit:** `feat: inline code snippets and resolve conditional renderer blocks in markdown API`

**Files changed:**
- `apps/frontpage/lib/resolve-doc-for-llm.ts` (new)
- `apps/frontpage/app/docs/api/md/[...path]/route.ts` (modified)
- `apps/frontpage/app/docs/api/md/route.ts` (modified)
- `apps/frontpage/app/llms-full.txt/route.ts` (modified)
- `apps/frontpage/app/llms.txt/route.ts` (modified)
- `apps/frontpage/middleware.ts` (modified)

**What it does:**
All `<CodeSnippets path="..." />` components are resolved server-side by reading snippet files from `content/snippets/{version}/`, parsing them with remark, and filtering by renderer and language. `<IfRenderer>` / `<If notRenderer>` conditional blocks are also resolved. A contextual banner at the top tells the consumer which renderer/language variant they're seeing and how to switch.

**Impact:** CRITICAL — Code examples are the most important part of Storybook documentation. Without this, LLMs get docs with placeholder gaps where every code example should be. With it, they get complete, framework-specific code examples that match what users see in the browser.

**Who else does this:**
- [Stripe Docs](https://docs.stripe.com/testing.md) — Language-specific code via `.md` suffix (but no renderer filtering)
- No other documentation site offers this level of framework-specific code filtering for LLM consumption

**Try it yourself — compare renderers:**

```bash
# Default (React + TypeScript)
curl -s https://storybook.js.org/docs/api/md/writing-stories/decorators | head -30

# Vue + TypeScript
curl -s "https://storybook.js.org/docs/api/md/writing-stories/decorators?renderer=vue" | head -30

# Angular + JavaScript
curl -s "https://storybook.js.org/docs/api/md/writing-stories/decorators?renderer=angular&language=js" | head -30

# Via content negotiation (what Claude Code uses)
curl -s -H "Accept: text/markdown" "https://storybook.js.org/docs/writing-stories/decorators?renderer=svelte"
```

<details>
<summary>Example banner output</summary>

```
> **Note:** This documentation is shown for **React** with **TypeScript**.
> It is also available for renderers: Angular, HTML, Solid, Svelte, Vue, Web Components and languages: JavaScript.
> To switch, re-fetch with query parameters: `?renderer=angular&language=js`
```
</details>

---

## Summary

| Change | Impact | Primary Benefit | Quick Test |
|--------|--------|-----------------|------------|
| llms.txt / llms-full.txt | HIGH | LLMs can discover and consume all docs | `curl https://storybook.js.org/llms.txt` |
| Docs Markdown API | HIGH | Programmatic access to individual pages | `curl https://storybook.js.org/docs/api/md/get-started` |
| Content Negotiation | HIGH | Transparent markdown for LLM tools | `curl -H "Accept: text/markdown" https://storybook.js.org/docs/get-started` |
| **Code Snippet Inlining** | **CRITICAL** | **Complete code examples in LLM output** | `curl https://storybook.js.org/docs/api/md/writing-stories/decorators` |
| AI Crawler robots.txt | MEDIUM | Clear intent to allow AI indexing | `curl https://storybook.js.org/robots.txt` |
| JSON-LD Structured Data | MEDIUM | Better semantic understanding by LLMs | Inspect `<script type="application/ld+json">` on any doc page |
| Link Header Discovery | MEDIUM | Multiple discovery paths for llms.txt | `curl -sI https://storybook.js.org/docs/get-started \| grep link` |
| AI Plugin Manifest | LOW-MEDIUM | OpenAI-ecosystem discoverability | `curl https://storybook.js.org/.well-known/ai-plugin.json` |

## Cross-Reference: Who Does What

| Feature | Storybook | Next.js | Stripe | Vercel | Supabase | MDN |
|---------|:---------:|:-------:|:------:|:------:|:--------:|:---:|
| `/llms.txt` | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| `/llms-full.txt` | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `.md` URL suffix | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Markdown API | ✅ | ❌ | ✅ | ❌ | ❌ | via GitHub |
| Content negotiation | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Code snippet inlining** | **✅** | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Renderer/language filtering** | **✅** | ❌ | ❌ | ❌ | ❌ | ❌ |
| AI crawler robots.txt | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| JSON-LD structured data | ✅ | ❌ | ✅ | ❌ | ❌ | ✅ |
| HTTP Link header | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| ai-plugin.json | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
