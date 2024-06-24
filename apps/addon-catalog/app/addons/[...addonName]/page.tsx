import { fetchAddonDetailsData } from '../../../lib/fetch-addon-details-data';
import { fetchAddonsData } from '../../../lib/fetch-addons-data';
import { ArrowLeftIcon } from '@storybook/icons';
import Link from 'next/link';
import { MDXContent } from '@repo/ui';
import { fakeAddon } from '../../../components/fake-addon';
import { AddonHero } from '../../../components/addon/addon-hero';
import { AddonSidebar } from '../../../components/addon/addon-sidebar';

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
  // const name = params.addonName.join('/').replace('%40', '@');
  // const addon = await fetchAddonDetailsData(name);
  const addon = fakeAddon;

  // if (!addon) {
  //   return <div>Not found</div>;
  // }

  // console.log(addon);

  return <div>Hello</div>;

  return (
    <main className="mb-20 mt-8">
      <div className="mb-16">
        <Link
          href="/"
          className="flex items-center gap-2 transition-colors hover:text-blue-500"
        >
          <ArrowLeftIcon />
          Back to integrations
        </Link>
      </div>
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
