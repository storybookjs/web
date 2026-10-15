import { fetchHomeData } from '../../../lib/fetch-home-data';
import { Preview } from '../../../components/preview';

// 60*60*24 = 24 hrs
export const revalidate = 86400;

export default async function Page() {
  const { popularAddons = [] } = (await fetchHomeData()) || {};

  return (
    <>
      <h3 className="mb-8 text-2xl font-bold">Popular addons</h3>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {popularAddons.map((addon) => (
          <Preview
            key={addon.name}
            orientation="vertical"
            element={addon}
            type="addon"
          />
        ))}
      </div>
    </>
  );
}
