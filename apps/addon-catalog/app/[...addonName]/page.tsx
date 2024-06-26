import { fetchAddonDetailsData } from '../../lib/fetch-addon-details-data';
import { SubHeader } from '@repo/ui';
import { cn } from '@repo/utils';
import { AddonHero } from '../../components/addon/addon-hero';
import { AddonSidebar } from '../../components/addon/addon-sidebar';
import { Highlight } from '../../components/highlight';

interface AddonDetailsProps {
  params: {
    addonName: string[];
  };
}

// export async function generateStaticParams() {
//   const addons = (await fetchAddonsData()) || [];
//   return addons.map((name) => ({ params: { addonName: name?.split('/') } }));
// }

export default async function AddonDetails({ params }: AddonDetailsProps) {
  // TODO: Better decoding?
  const name = params.addonName.join('/').replace('%40', '@');
  const addon = await fetchAddonDetailsData(name);

  if (!addon) {
    return <div>Not found.</div>;
  }

  return (
    <main className="mb-20">
      <SubHeader leftLabel="Back to integrations" leftHref="/" />
      <AddonHero addon={addon} />
      <div className="flex flex-col gap-12 lg:flex-row">
        <div className="min-w-0 flex-1">
          {addon.readme ? (
            <Highlight withHTMLChildren={false}>
              <div
                /**
                 * These are copied from @repo/ui/src/components/mdx/...
                 *
                 * TODO: Tweak these styles
                 */
                className={cn(
                  '[&_a]:text-blue-500',
                  '[&_code]:text-sm',
                  '[&_h1]:font-bold',
                  '[&_h1]:mb-6',
                  '[&_h1]:mt-0',
                  '[&_h1]:text-4xl',
                  '[&_h2]:font-bold',
                  '[&_h2]:mb-6',
                  '[&_h2]:mt-10',
                  '[&_h2]:text-2xl',
                  '[&_h3]:font-bold',
                  '[&_h3]:mb-4',
                  '[&_h3]:mt-10',
                  '[&_h3]:text-xl',
                  '[&_h4]:font-bold',
                  '[&_h4]:mb-4',
                  '[&_h4]:text-xl',
                  '[&_hr]:my-10',
                  '[&_li]:text-md',
                  '[&_li]:mb-2',
                  '[&_li]:pl-4',
                  '[&_li>p]:inline',
                  '[&_ol]:mb-6',
                  '[&_ol]:list-inside',
                  '[&_ol]:list-decimal',
                  '[&_ul]:mb-6',
                  '[&_ul]:list-inside',
                  '[&_ul]:list-disc',
                  '[&_p]:text-md',
                  '[&_p>code]:text-md',
                  '[&_p>code]:mb-6',
                  '[&_p>code]:mt-0',
                  '[&_p>code]:leading-7',
                  '[&_p>a]:text-blue-500',
                  '[&_pre]:my-6',
                  '[&_pre]:w-full',
                  '[&_pre]:overflow-hidden',
                  '[&_pre]:rounded',
                  '[&_pre]:border',
                  '[&_pre]:border-zinc-300',
                  '[&_pre]:dark:border-slate-700',
                  '[&_pre]:dark:bg-slate-900',
                  '[&_pre]:ui-max-w-full',
                  '[&_pre]:overflow-auto',
                  '[&_pre]:p-4',
                  '[&_pre]:text-sm',
                  '[&_table]:mb-6',
                  '[&_table]:w-full',
                  '[&_table]:text-sm',
                  '[&_td]:py-4',
                  '[&_td]:pr-6',
                  '[&_td]:align-top',
                  '[&_td>code]:text-slate-500',
                  '[&_th]:py-4',
                  '[&_th]:text-left',
                  '[&_tr]:border-b',
                  '[&_tr]:border-b-zinc-200',
                )}
                dangerouslySetInnerHTML={{ __html: addon.readme }}
              />
            </Highlight>
          ) : null}
        </div>
        <AddonSidebar addon={addon} />
      </div>
    </main>
  );
}
