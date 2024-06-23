export function AddonReadme({ addon }: { addon: Addon }) {
  return (
    <div className="min-w-0 flex-1">
      {addon.readme ? (
        <div
          className="[&_pre]:w-full [&_pre]:overflow-scroll"
          dangerouslySetInnerHTML={{ __html: addon.readme }}
        />
      ) : null}
    </div>
  );
}
