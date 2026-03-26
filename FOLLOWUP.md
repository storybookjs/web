# LLM Friendliness - Follow-up Items

Items that could not be implemented in the current pass but would further improve LLM accessibility.

## 1. MCP (Model Context Protocol) Server for Storybook Docs

**Description:** Build a dedicated MCP server that exposes Storybook documentation as structured tools/resources for LLM agents. This would allow tools like Claude Code to query docs natively rather than fetching web pages.

**Impact:** High - Direct integration with LLM tool ecosystems.

**References:**
- [Anthropic MCP Specification](https://modelcontextprotocol.io/)
- [Stripe MCP Server](https://github.com/stripe/agent-toolkit)

## 2. Versioned llms.txt Files

**Description:** Generate version-specific llms.txt files (e.g., `/docs/9/llms.txt`, `/docs/8/llms.txt`) so LLMs can access documentation for specific Storybook versions.

**Impact:** Medium - Helps LLMs working with older Storybook projects.

**References:**
- [Next.js versioned llms.txt](https://nextjs.org/llms.txt) (includes version links)

## 3. Algolia/Search API Exposure for LLMs

**Description:** Expose a simplified search API that LLMs can use to search docs programmatically (the current Algolia integration is client-side only).

**Impact:** Medium - Enables targeted doc lookup without downloading all content.

**References:**
- [Algolia AI Search](https://www.algolia.com/products/ai-search/)
- [Stripe Docs search API](https://docs.stripe.com)

## 4. Code Snippet Extraction API

**Description:** Build an API that returns only code examples from docs, grouped by framework/renderer. LLMs often need just the code, not the prose.

**Impact:** Medium - Code-focused retrieval is the most common LLM doc use case.

## 5. Changelog/Migration Guide llms.txt

**Description:** Create a dedicated llms.txt endpoint for migration guides and changelogs, enabling LLMs to help users upgrade between versions.

**Impact:** Medium - One of the most common support requests.

## 6. OpenAPI Specification for Docs API

**Description:** Add a proper OpenAPI/Swagger spec for the `/docs/api/md` endpoint so LLM tools can auto-discover the API schema.

**Impact:** Low-Medium - Standard API documentation practice.

**References:**
- [OpenAI Plugin API spec](https://platform.openai.com/docs/plugins/getting-started)

## 7. Documentation Freshness Headers

**Description:** Add `Last-Modified` and `ETag` headers to docs responses so LLM caches can efficiently check for updates without re-downloading content.

**Impact:** Low - Reduces bandwidth for repeated access.

## 8. Semantic Chunking of Documentation

**Description:** Pre-chunk documentation into semantically meaningful sections with metadata (topic, component, framework) for RAG (Retrieval Augmented Generation) pipelines.

**Impact:** High - Directly improves quality of LLM answers about Storybook.

**References:**
- [LangChain Document Loaders](https://python.langchain.com/docs/modules/data_connection/document_loaders/)
- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs)

## 9. Framework-Specific Documentation Filtering

**Description:** Allow the markdown API to filter docs by framework/renderer (React, Vue, Angular, etc.) so LLMs get only relevant content.

**Impact:** Medium - Reduces noise in LLM context windows.

## 10. Recipes and Addons llms.txt

**Description:** Extend llms.txt to cover recipes and addon documentation, not just core docs.

**Impact:** Medium - These are frequently referenced by developers using Storybook.
