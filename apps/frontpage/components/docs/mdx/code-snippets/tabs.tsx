import { cn } from '@repo/utils';

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
    {tabs.map((tab, index) => (
      <button
        key={index}
        className={cn(
          'flex h-7 items-center justify-center rounded border px-2 text-sm transition-colors',
          activeTab === tab.id &&
            'border-slate-500 bg-slate-500 text-white dark:border-slate-700 dark:bg-slate-700 dark:text-slate-400',
          activeTab !== tab.id &&
            'border-zinc-300 hover:border-blue-500 hover:text-blue-500 dark:border-slate-700 dark:text-slate-500 dark:hover:border-blue-500 dark:hover:text-blue-500',
        )}
        onClick={() => {
          onTabChange(tab.id);
        }}
      >
        {tab.title}
      </button>
    ))}
  </div>
);
