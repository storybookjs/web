import { fetchAddonDetailsData } from '../../lib/fetch-addon-details-data';
import { MDXContent, SubHeader } from '@repo/ui';
import { AddonHero } from '../../components/addon/addon-hero';
import { AddonSidebar } from '../../components/addon/addon-sidebar';

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
          <MDXContent source={addon.readme} />
        </div>
        <AddonSidebar addon={addon} />
      </div>
    </main>
  );
}
