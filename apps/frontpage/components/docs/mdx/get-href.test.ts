import { describe, expect, test } from 'vitest';
import { getHref } from "./a";

test("external link", () => {
  const href = "https://example.com";
  expect(getHref({ href })).toBe(href);
});

describe("links on non-index page", () => {
  test("same level", () => {
    const href = "./foo/bar.mdx";
    expect(getHref({ href })).toBe("../foo/bar/");
  });

  test("up one level", () => {
    const href = "../foo/bar.mdx";
    expect(getHref({ href })).toBe("../../foo/bar/");
  });

  test("link to index page", () => {
    const href = "./foo/index.mdx";
    expect(getHref({ href })).toBe("../foo/");
  });

  test("with anchor", () => {
    const href = "./foo/bar.mdx#baz";
    expect(getHref({ href })).toBe("../foo/bar/#baz");
  });

  test("non-index page, link to prior release", () => {
    const href = "../../release-7-6/docs/migration-guide.mdx";
    expect(getHref({ href })).toBe("../../../docs/7/migration-guide/");
  });
});

describe("links on index page", () => {
  test("same level", () => {
    const href = "./foo/bar.mdx";
    const indexPagePath = ["docs", "get-started"];
    expect(getHref({ href, indexPagePath })).toBe("./foo/bar/");
  });

  test("up one level", () => {
    const href = "../foo/bar.mdx";
    const indexPagePath = ["docs", "get-started"];
    expect(getHref({ href, indexPagePath })).toBe("../foo/bar/");
  });
});