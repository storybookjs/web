import fs from 'node:fs';
import path from 'node:path';
import {
  Container,
  Footer,
  Header,
  mdxComponents,
  MDXRemoteOptions,
  Pill,
  SubHeader,
} from '@repo/ui';
import { fetchRecipeDetailsData } from '../../../lib/fetch-recipe-details-data';
import { fetchRecipesData } from '../../../lib/fetch-recipes-data';
import { fetchGithubCount } from '@repo/utils';
import Image from 'next/image';
import { EmbeddedExample } from '../../../components/recipes/embedded-example';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface RecipeDetailsProps {
  params: {
    name: string[];
  };
}

export async function generateStaticParams() {
  const recipes = (await fetchRecipesData()) || [];
  const listOfNames = recipes.map((recipe) => ({
    name: [...recipe.split('/')],
  }));

  return listOfNames;
}

export default async function RecipeDetails({ params }: RecipeDetailsProps) {
  const { number: githubCount } = await fetchGithubCount();
  // TODO: Better decoding?
  const name = params.name.join('/').replace('%40', '@');
  const metadata = await fetchRecipeDetailsData(name);

  const mdx = await fs.promises.readFile(
    path.join(process.cwd(), 'content/recipes', `${name}.mdx`),
    'utf-8',
  );

  return (
    <>
      <Header
        algoliaApiKey={process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string}
        githubCount={githubCount}
      />
      <Container className="mb-16">
        <SubHeader leftLabel="Back to integrations" leftHref="/addons" />
        <div className="mx-auto flex max-w-[1024px] flex-col items-center justify-center pb-20">
          <div className="mb-8 flex gap-10">
            <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-[#ff4785]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width={48}
                height={48}
                fill="none"
              >
                <path
                  clip-rule="evenodd"
                  d="M7 2.111a2.413 2.413 0 0 0-2.26 2.5l1.486 39.62a2.413 2.413 0 0 0 2.304 2.32l32.213 1.447.108.002a2.413 2.413 0 0 0 2.413-2.413V2.413A2.413 2.413 0 0 0 40.7.004l-2.649.167.194 5.539a.36.36 0 0 1-.583.295l-1.784-1.406-2.114 1.603a.36.36 0 0 1-.577-.302l.226-5.44L7.001 2.111Zm27.441 16.276c-.849.66-7.173 1.11-7.173.17.134-3.582-1.47-3.739-2.361-3.739-.847 0-2.273.256-2.273 2.175 0 1.956 2.084 3.06 4.53 4.356 3.474 1.841 7.678 4.07 7.678 9.677 0 5.374-4.366 8.342-9.935 8.342-5.748 0-10.77-2.325-10.204-10.387.223-.947 7.53-.722 7.53 0-.089 3.327.669 4.305 2.584 4.305 1.47 0 2.14-.81 2.14-2.175 0-2.066-2.172-3.284-4.67-4.687-3.38-1.898-7.36-4.133-7.36-9.26 0-5.118 3.52-8.53 9.801-8.53 6.283 0 9.713 3.36 9.713 9.753Z"
                  fill-rule="evenodd"
                  fill="#fff"
                ></path>
              </svg>
            </div>
            <div
              className="flex h-20 w-20 items-center justify-center rounded-lg"
              style={{ backgroundColor: metadata?.accentColor || '#ff4785' }}
            >
              <Image
                src={metadata?.icon || ''}
                alt={metadata?.name || ''}
                width={48}
                height={48}
              />
            </div>
          </div>
          <h1 className="mb-4 text-center text-4xl font-bold">
            Integrate {metadata?.displayName} with Storybook
          </h1>
          <div className="mb-6 max-w-[640px] text-center text-2xl text-zinc-500">
            {metadata?.description}
          </div>
        </div>
        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="flex-1">
            <MDXRemote
              components={{ ...mdxComponents, EmbeddedExample }}
              options={MDXRemoteOptions}
              source={mdx}
            />
          </div>
          <div className="w-[250px] flex-shrink-0">
            <div className="mb-6 flex items-center text-sm font-bold">Tags</div>
            <ul className="mb-6 flex flex-wrap gap-2">
              {metadata?.tags?.map((tag) => <Pill>{tag.name}</Pill>)}
            </ul>
            <div className="mb-4 flex items-center py-2 text-sm font-bold">
              Contributors
            </div>
            <ul className="mb-6 flex flex-col gap-4">
              {metadata?.authors?.map((author) => (
                <li className="flex items-center gap-2" key={author.username}>
                  {author.gravatarUrl && (
                    <div className="relative h-7 w-7 overflow-hidden rounded-full">
                      <Image
                        src={`https:${author.gravatarUrl}`}
                        alt={author.username}
                        fill={true}
                      />
                    </div>
                  )}
                  {author.username}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
