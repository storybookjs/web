import { fetchAddonDetailsData } from '../../lib/fetch-addon-details-data';
import { fetchAddonsData } from '../../lib/fetch-addons-data';

interface AddonDetailsProps {
  params: {
    addonName: string[];
  };
}

export async function generateStaticParams() {
  const addons = await fetchAddonsData() || [];
  return addons.map((name) => ({ params: { addonName: name.split('/') } }));
}

export default async function AddonDetails({ params }: AddonDetailsProps) {
  // TODO: Better decoding?
  const name = params.addonName.join('/').replace('%40', '@');
  const {
    homepageUrl,
    repositoryUrl,
    readme,
    compatibility,
    tags,
    authors,
    ...addon
  } = await fetchAddonDetailsData(name) || {};

  return (
    <main className="p-8">
      <pre>
        {JSON.stringify(
          {
            homepageUrl,
            repositoryUrl,
            readme,
            compatibility,
            tags,
            authors,
            ...addon,
          },
          null,
          2,
        )}
      </pre>
    </main>
  );
}
