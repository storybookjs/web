import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { fetchMongodbAddons } from '../../../lib/fetch-mongodb-addons';
import { createClient } from '../../../utils/supabase/server';

export async function GET() {
  try {
    // Get Supabase client
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // First get all active addons + authors
    const { addons, authors } = await fetchMongodbAddons();

    if (authors) {
      const { data: authorsOnSupabase, error: errorAuthors } = await supabase
        .from('authors')
        .upsert(authors, {
          onConflict: 'name',
        })
        .select();

      if (errorAuthors) throw new Error(errorAuthors.message);

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

      return NextResponse.json({
        countUpdatedAuthors: authorsOnSupabase.length,
        countUpdatedAddons: addonsOnSupabase.length,
        countUpdatedAddonAuthors: addonAuthorOnSupabase.length,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
    return NextResponse.json({ error: 'An unknown error occurred' });
  }
}
