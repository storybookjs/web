export const DocsFooter = () => {
  return (
    <div className="flex items-center justify-between pb-6 pt-12">
      <div className="text-md flex h-12 items-center gap-3 rounded-full border border-zinc-200 pl-4 pr-2">
        Was this page useful?
        <div className="flex items-center gap-2">
          <Button>👍</Button>
          <Button>👎</Button>
        </div>
      </div>
      <button className="hidden h-12 items-center rounded-full border border-zinc-200 px-5 transition-all hover:-translate-y-1 hover:border-zinc-400 md:flex">
        ✍️ Edit on Github
      </button>
    </div>
  );
};

const Button = ({ children }: { children: string }) => {
  return (
    <button className="h-8 w-8 rounded-full hover:bg-blue-100">
      {children}
    </button>
  );
};
