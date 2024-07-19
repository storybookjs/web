import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { fetchMongodbAddons } from '../../../lib/fetch-mongodb-addons';
import { createClient } from '../../../utils/supabase/server';
import { fetchMongodbTags } from '../../../lib/fetch-mongodb-tags';

export async function GET() {
  try {
    // Get Supabase client
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // First get all active addons + authors
    const { addons, authors } = await fetchMongodbAddons();
    const { tags } = await fetchMongodbTags();

    if (authors && tags && addons) {
      const { data: authorsOnSupabase, error: errorAuthors } = await supabase
        .from('authors')
        .upsert(authors, {
          onConflict: 'name',
        })
        .select();

      if (errorAuthors) throw new Error(errorAuthors.message);

      const { data: tagsOnSupabase, error: errorTags } = await supabase
        .from('tags')
        .upsert(
          tags.map((tag) => ({
            name: tag.name,
            display_name: tag.displayName,
            is_category: tag.isCategory,
            description: tag.description,
            disabled: tag.disabled ?? false,
            aliases: tag.aliases,
          })),
          {
            onConflict: 'name',
          },
        )
        .select();

      if (errorTags) throw new Error(errorTags.message);

      const { data: addonsOnSupabase, error: errorAddons } = await supabase
        .from('addons')
        .upsert(
          addons.map((addon) => ({
            name: addon.name,
            description: addon.description,
            repository_url: addon.repositoryUrl,
            homepage_url: addon.homepageUrl,
            display_name: addon.displayName,
            icon: addon.icon,
            verified: addon.verified,
            status: addon.status,
            weekly_downloads: addon.weeklyDownloads,
            readme: addon.readme,
            npm_url: addon.npmUrl,
            renderers: addon.supportedFrameworks,
          })),
          {
            onConflict: 'name',
          },
        )
        .select();

      if (errorAddons) throw new Error(errorAddons.message);

      const authorsPerAddon: { author: number; addon: number; name: string }[] =
        addons
          .map((addon) =>
            addon?.authors
              ? addon.authors.map((author) => {
                  const addonId = addonsOnSupabase.find(
                    (a) => a.name === addon.name,
                  )?.id;
                  const authorId = authorsOnSupabase.find(
                    (a) => a.name === author.name,
                  )?.id;

                  if (!addonId || !authorId) return null;

                  return {
                    name: `${addonId.toString()}_${authorId.toString()}`,
                    addon: addonId,
                    author: authorId,
                  };
                })
              : [],
          )
          .flat()
          .filter((a) => a !== null);

      const { data: addonAuthorOnSupabase, error: errorAddonAuthor } =
        await supabase
          .from('addon_author')
          .upsert(authorsPerAddon, {
            onConflict: 'name',
          })
          .select();

      if (errorAddonAuthor) throw new Error(errorAddonAuthor.message);

      const tagsPerAddon: { tag: number; addon: number; name: string }[] =
        addons
          .map((addon) =>
            addon?.tags
              ? addon.tags.map((tag) => {
                  const addonId = addonsOnSupabase.find(
                    (a) => a.name === addon.name,
                  )?.id;
                  const tagId = tagsOnSupabase.find((a) => a.name === tag)?.id;

                  if (!addonId || !tagId) return null;

                  return {
                    name: `${addonId.toString()}_${tagId.toString()}`,
                    addon: addonId,
                    tag: tagId,
                  };
                })
              : [],
          )
          .flat()
          .filter((a) => a !== null);

      const { data: addonTagOnSupabase, error: errorAddonTag } = await supabase
        .from('addon_tag')
        .upsert(tagsPerAddon, {
          onConflict: 'name',
          ignoreDuplicates: true,
        })
        .select();

      if (errorAddonTag) throw new Error(errorAddonTag.message);

      return NextResponse.json({
        countUpdatedAuthors: authorsOnSupabase.length,
        countUpdatedTags: tagsOnSupabase.length,
        countUpdatedAddons: addonsOnSupabase.length,
        countUpdatedAddonAuthors: addonAuthorOnSupabase.length,
        countUpdatedAddonTags: addonTagOnSupabase.length,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
    return NextResponse.json({ error: 'An unknown error occurred' });
  }
}
