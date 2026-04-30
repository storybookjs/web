import { Button } from '@repo/ui';

export interface Tab {
  id: string;
  title: string;
}

export const Tabs = ({
  activeTab,
  onTabChange,
  tabs,
}: {
  activeTab: string | null;
  onTabChange: (tabId: string) => void;
  tabs: Tab[];
}) => (
  <div className="flex gap-2">
    {tabs.map((tab) => (
      <Button
        key={tab.id}
        variant="outline"
        size="sm"
        active={activeTab === tab.id ? 'filled' : undefined}
        type="button"
        onClick={() => {
          onTabChange(tab.id);
        }}
      >
        {tab.title}
      </Button>
    ))}
  </div>
);
