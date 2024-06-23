export function AddonReadme({ addon }: { addon: Addon }) {
  return (
    <div className="flex-1">
      {addon.readme ? (
        <div
          className="[&_code]:w-20 [&_code]:overflow-scroll [&_pre]:w-full [&_pre]:overflow-scroll"
          dangerouslySetInnerHTML={{ __html: addon.readme }}
        />
      ) : null}
    </div>
  );
}
