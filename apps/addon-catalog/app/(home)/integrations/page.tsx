import { type Metadata } from 'next';
import { IntegrationCard } from '../../../components/integration-card';
import { PageHeader } from '../../../components/page-header';
import { integrations } from './data';

const description =
  'Tools that work with Storybook outside of the addon ecosystem, such as IDE plugins.';

export const metadata: Metadata = {
  title: 'Third-party tools | Storybook integrations',
  description,
};

export default function Page() {
  return (
    <>
      <PageHeader title="Third-party tools" description={description} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {integrations.map((integration) => (
          <IntegrationCard key={integration.href} integration={integration} />
        ))}
      </div>
    </>
  );
}
