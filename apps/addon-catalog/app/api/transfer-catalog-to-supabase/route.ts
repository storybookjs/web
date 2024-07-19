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
        })),
        {
          onConflict: 'name',
        },
      )
      .select();

    if (errorAddons) throw new Error(errorAddons.message);

    const authorsPerAddon: { author: number; addon: number }[] = addons
      .map((addon) =>
        addon?.authors
          ? addon.authors.map((author) => {
              const addonId = addonsOnSupabase.find(
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- TODO
                (a) => a.name === addon.name,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- TODO
              )?.id;
              const authorId = authorsOnSupabase.find(
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- TODO
                (a) => a.name === author.name,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- TODO
              )?.id;

              return {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- TODO
                name: `${addonId}_${authorId}`,
                addon: addonId,
                author: authorId,
              };
            })
          : [],
      )
      .flat();

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
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
    return NextResponse.json({ error: 'An unknown error occurred' });
  }
}
