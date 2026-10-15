import { type Metadata } from 'next';
import { IntegrationCard } from '../../../components/integration-card';
import { PageHeader } from '../../../components/page-header';
import { integrations } from './data';

export const metadata: Metadata = {
  title: 'Third-party tools | Storybook integrations',
  description:
    'Tools that work with Storybook outside of the addon ecosystem, such as IDE plugins.',
};

export default function Page() {
  return (
    <>
      <PageHeader
        title="Integrations"
        description="Integrate your tools with Storybook to connect workflows and unlock advanced features."
      />
      <h3 className="mb-8 text-2xl font-bold">Third-party tools</h3>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {integrations.map((integration) => (
          <IntegrationCard key={integration.href} integration={integration} />
        ))}
      </div>
    </>
  );
}
