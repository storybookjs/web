/* eslint-disable no-console -- OK */
'use server';

import dedent from 'dedent';
import { headers } from 'next/headers';
import fetch from 'node-fetch';
import { z } from 'zod';
import type { TreeProps } from '@repo/utils';
import { docsVersions } from '@repo/utils';
import { getAllTrees } from '../../../lib/get-all-trees';

const siteUrl = process.env.CONTEXT === 'production';

const schema = z.object({
  comment: z.string().optional(),
  feedback: z.string().optional(),
  language: z.string(),
  reaction: z.string(),
  renderer: z.string(),
  slug: z.string(),
  version: z.string(),
});

const versions = docsVersions.map(({ id }) => id);

const slugs = new Set<string>([]);

function addSlugs(tree: TreeProps[]) {
  tree.forEach((node) => {
    if (node.type === 'directory') {
      addSlugs(node.children!);
    } else {
      slugs.add(node.slug);
    }
  });
}

const listOfTrees = getAllTrees();

listOfTrees.forEach((tree) => {
  addSlugs(tree.children!);
});

const repositoryOwner = 'storybookjs';
const repositoryName = 'storybook';
const repositoryId = 'MDEwOlJlcG9zaXRvcnk1NDE3MzU5Mw==';
// Corresponds to "Documentation feedback" category
const categoryId = 'DIC_kwDOAzqfmc4CWGpo';

type Rating = 'up' | 'down';

function createTitle(path: string) {
  return `Feedback for ${path} docs page`;
}

function createRating(upOrDown: Rating, value: number | string) {
  return `<!--start-${upOrDown}-->${value.toString()}<!--end-${upOrDown}-->`;
}

const ratingSymbols = {
  up: '👍',
  down: '👎',
};

function createDiscussionBody(rating: Rating) {
  return [
    `| ${ratingSymbols.up} | ${ratingSymbols.down} |`,
    '| :-: | :-: |',
    `| ${createRating('up', rating === 'up' ? 1 : 0)} | ${createRating('down', rating === 'down' ? 1 : 0)} |`,
  ].join('\r\n');
}

function createCommentBody({
  slug,
  version,
  renderer,
  codeLanguage,
  rating,
  comment,
}: {
  slug: string;
  version: string;
  renderer: string;
  codeLanguage: string;
  rating: Rating;
  comment?: string;
}) {
  const link = `**[${slug}](https://storybook.js.org${slug})**`;

  const meta = [
    `| ${ratingSymbols[rating]} | v${version} | ${renderer} | ${codeLanguage} |`,
    '| - | - | - | - |',
  ].join('\r\n');

  return [link, meta, comment]
    .filter((block) => Boolean(block))
    .join('\r\n\r\n');
}

function updateRating(body: string, rating: Rating) {
  const regex = new RegExp(createRating(rating, '(\\d+)'));
  const currentRating = body.match(regex)?.[1];
  if (!currentRating) {
    throw new Error(`
  Could not find current ${rating} rating in:
  "${body}"
      `);
  }

  return body.replace(
    regex,
    createRating(rating, parseInt(currentRating, 10) + 1),
  );
}

async function queryGitHub<D extends object>(
  query: string,
  { variables = {} } = {},
): Promise<D> {
  const pat = process.env.GITHUB_STORYBOOK_BOT_PAT;
  if (!pat) {
    throw new Error('GITHUB_STORYBOOK_BOT_PAT not found in environment');
  }

  let response;
  try {
    response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(pat && {
          Authorization: `bearer ${pat}`,
          'User-Agent': 'storybook-bot',
        }),
      },
      body: JSON.stringify({ query, variables }),
    });

    if (response) {
      const { data, errors } = (await response.json()) as {
        data: D;
        errors: Error[];
      };
      if (!errors || errors.length === 0) {
        return data;
      }
      throw new Error(errors.map((error) => error.message).join('\n'));
    }
    throw new Error('No response');
  } catch (error) {
    throw new Error(
      [
        'Failed to fetch GitHub query',
        `Response: ${JSON.stringify(response, null, 2)}`,
        `Error: ${JSON.stringify(error, null, 2)}`,
        `Query: {${query}`,
        `variables: ${JSON.stringify(variables, null, 2)}`,
      ].join('\n'),
    );
  }
}

interface Discussion {
  body: string;
  closed: boolean;
  id: string;
  number: number;
  title: string;
  url: string;
}

type PartialDiscussion = Pick<Discussion, 'title' | 'id' | 'number' | 'closed'>;

async function getDiscussion(title: string) {
  console.info('Fetching discussions...');
  let discussions: PartialDiscussion[] = [];
  let after;
  do {
    const {
      repository: {
        discussions: {
          nodes: newDiscussions,
          // @ts-expect-error - The type of `pageInfo` is correct. And the types of these two properties are correct later. WTF?
          pageInfo: { hasNextPage, endCursor },
        },
      },
    } = await queryGitHub<{
      repository: {
        discussions: {
          nodes: PartialDiscussion[];
          pageInfo: { hasNextPage: boolean; endCursor: string };
        };
      };
    }>(
      dedent(`
        query GetDiscussions($owner: String!, $name: String!, $after: String, $categoryId: ID!) {
          repository(owner: $owner, name: $name) {
            discussions(first: 100, after: $after, categoryId: $categoryId) {
              nodes {
                title
                id
                number
                closed
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }
        }
      `),
      {
        variables: {
          owner: repositoryOwner,
          name: repositoryName,
          after,
          categoryId,
        },
      },
    );

    discussions = discussions.concat(newDiscussions);

    after = hasNextPage ? endCursor : undefined;
  } while (after);
  console.info('... done!');

  return discussions.find((discussion) => discussion.title === title);
}

async function updateDiscussion({
  number,
  id,
  rating,
}: Pick<Discussion, 'id' | 'number'> & { rating: Rating }) {
  const {
    repository: {
      discussion: { body: currentBody },
    },
  } = await queryGitHub<{
    repository: {
      discussion: {
        body: string;
      };
    };
  }>(
    dedent(`
        query GetDiscussion($owner: String!, $name: String!, $number: Int!) {
          repository(owner: $owner, name: $name) {
            discussion(number: $number) {
              body
            }
          }
        }
      `),
    {
      variables: {
        owner: repositoryOwner,
        name: repositoryName,
        number,
      },
    },
  );

  console.info('Updating discussion with new rating...');
  const {
    updateDiscussion: {
      discussion: { body: updatedBody },
    },
  } = await queryGitHub<{
    updateDiscussion: {
      discussion: {
        body: string;
      };
    };
  }>(
    dedent(`
        mutation UpdateDiscussion($discussionId: ID!, $body: String!) { 
          updateDiscussion(input: {
            discussionId: $discussionId,
            body: $body,
          }) {
            discussion {
              body
            }
          }
        }
      `),
    {
      variables: {
        discussionId: id,
        body: updateRating(currentBody, rating),
      },
    },
  );
  console.info('... done!', 'Updated body:\n', updatedBody);
}

async function reOpenDiscussion({ id }: Pick<Discussion, 'id'>) {
  console.info('Re-opening discussion...');
  await queryGitHub(
    dedent(`
        mutation ReopenDiscussion($discussionId: ID!) {
          reopenDiscussion(input: {
            discussionId: $discussionId
          }) {
            discussion {
              closed
            }
          }
        }
      `),
    {
      variables: {
        discussionId: id,
        closed: false,
      },
    },
  );
  console.info('... done!');
}

async function addDiscussionComment({
  id,
  slug,
  version,
  renderer,
  codeLanguage,
  rating,
  comment,
}: Pick<Discussion, 'id'> & {
  slug: string;
  version: string;
  renderer: string;
  codeLanguage: string;
  rating: Rating;
  comment?: string;
}) {
  console.info('Adding comment to discussion...');
  const {
    addDiscussionComment: {
      comment: { body: addedComment, url },
    },
  } = await queryGitHub<{
    addDiscussionComment: {
      comment: {
        body: string;
        url: string;
      };
    };
  }>(
    dedent(`
        mutation AddDiscussionComment($discussionId: ID!, $body: String!) {
          addDiscussionComment(input: {
            discussionId: $discussionId,
            body: $body,
          }) {
            comment {
              body
              url
            }
          }
        }
      `),
    {
      variables: {
        discussionId: id,
        body: createCommentBody({
          slug,
          version,
          renderer,
          codeLanguage,
          rating,
          comment,
        }),
      },
    },
  );
  console.info('... done!, Added comment:', '\n', url, '\n', addedComment);
  return url;
}

async function createDiscussion({
  path,
  rating,
  title,
}: Pick<Discussion, 'title'> & {
  path: string;
  rating: Rating;
}): Promise<PartialDiscussion> {
  console.info(`Creating new discussion for ${path}...`);
  const {
    createDiscussion: {
      discussion: {
        title: addedTitle,
        id,
        number,
        closed,
        body: addedBody,
        url,
      },
    },
  } = await queryGitHub<{
    createDiscussion: {
      discussion: Discussion;
    };
  }>(
    dedent(`
        mutation CreateDiscussion($repositoryId: ID!, $categoryId: ID!, $title: String!, $body: String!) { 
          createDiscussion(input: {
            repositoryId: $repositoryId,
            categoryId: $categoryId,
            title: $title,
            body: $body
          }) {
            discussion {
              title
              id
              number
              closed
              body
              url
            }
          }
        }
      `),
    {
      variables: {
        repositoryId,
        categoryId,
        title,
        body: createDiscussionBody(rating),
      },
    },
  );
  console.info(
    '... done!, Added discussion:',
    '\n',
    url,
    '\n',
    addedTitle,
    '\n',
    addedBody,
  );

  return {
    title,
    id,
    number,
    closed,
  };
}

export interface FeedbackState {
  status?: 'ok' | 'fail';
  message?: string;
  url?: string;
}

export async function sendFeedback(
  prevState: FeedbackState,
  formData: FormData,
): Promise<FeedbackState> {
  const parse = schema.safeParse({
    feedback: formData.get('feedback'),
    language: formData.get('language'),
    reaction: formData.get('reaction'),
    renderer: formData.get('renderer'),
    slug: formData.get('slug'),
    spuriousComment: formData.get('comment'),
    version: formData.get('version'),
  });

  if (!parse.success) {
    console.error('Failed to parse form data', parse.error);
    return {
      status: 'fail',
      message: 'Could not submit feedback. Please try again.',
    };
  }

  const data = parse.data;

  const requestsCache: Record<string, number> = {};

  const slug = data.slug;
  const version = data.version;
  const renderer = data.renderer;
  const codeLanguage = data.language;
  const rating = data.reaction as Rating;
  const comment = data.feedback;
  const spuriousComment = data.comment;

  const now = Date.now();

  const headersList = headers();

  try {
    const ip =
      headersList.get('x-real-ip') ??
      headersList.get('x-forwarded-for') ??
      'unknown';
    if (requestsCache[ip] && now - requestsCache[ip] < 1000) {
      throw new Error(`Too many requests from ${ip}, ignoring`);
    }
    requestsCache[ip] = now;

    const path = slug.replace('/docs', '');

    const hasValidOrigin = siteUrl
      ? headersList.get('origin') === process.env.URL
      : true;
    const hasValidReferer = headersList.get('referer')?.endsWith(path);

    if (!hasValidOrigin || !hasValidReferer || spuriousComment) {
      console.info(
        JSON.stringify(
          {
            hasValidOrigin,
            siteUrl,
            hasValidReferer,
            path,
            headers,
          },
          null,
          2,
        ),
      );
      throw new Error('Invalid request, ignoring');
    }

    const hasValidSlug = slugs.has(slug);
    const hasValidVersion = versions.includes(version);
    const hasValidRating =
      rating && Object.keys(ratingSymbols).includes(rating);

    if (!hasValidVersion || !hasValidRating) {
      console.info(
        JSON.stringify(
          {
            renderer,
            hasValidSlug,
            slug,
            hasValidVersion,
            version,
            hasValidRating,
            rating,
          },
          null,
          2,
        ),
      );
      throw new Error('Invalid data, ignoring');
    }

    const title = createTitle(path);

    let currentDiscussion = await getDiscussion(title);

    if (currentDiscussion) {
      console.info(`Found discussion for ${path}`);

      await updateDiscussion({ ...currentDiscussion, rating });
    } else {
      currentDiscussion = await createDiscussion({ path, rating, title });
    }

    if (comment && currentDiscussion.closed) {
      console.info('Discussion is closed');
      await reOpenDiscussion(currentDiscussion);
    }

    const url = await addDiscussionComment({
      ...currentDiscussion,
      slug,
      version,
      renderer,
      codeLanguage,
      rating,
      comment,
    });

    return {
      status: 'ok',
      url,
    };
  } catch (error) {
    return {
      status: 'fail',
      message: 'Could not submit feedback. Please try again.',
    };
  }
}
