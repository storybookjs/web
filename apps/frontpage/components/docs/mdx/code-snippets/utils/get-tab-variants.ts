/**
 * Names that mean the same thing across docs versions. The snippet tabs cookie is shared by all
 * versions, so a tab chosen in one version must match its renamed counterpart in another.
 * Names can appear inside a tab title, e.g. "Vite (CSF Next 🧪)" matches "Vite (CSF 4)".
 */
export const tabAliases: string[][] = [['CSF 4', 'CSF Next 🧪']];

/** Returns the id plus each variant made by swapping an aliased name for its counterparts */
export function getTabVariants(id: string, aliases: string[][] = tabAliases) {
  const variants = [id];
  aliases.forEach((group) => {
    group.forEach((name) => {
      if (!id.includes(name)) return;
      group
        .filter((alias) => alias !== name)
        .forEach((alias) => variants.push(id.replace(name, alias)));
    });
  });
  return variants;
}
