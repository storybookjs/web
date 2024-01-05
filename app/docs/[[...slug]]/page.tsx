import { docsVersions } from "@/docs-versions";
import { getVersion } from "@/lib/getVersion";

export default function TestPage({ params }: { params: { slug: string[] } }) {
  // Get the latest version
  const activeVersion = getVersion(params.slug);

  // Check if the URL has a version in it
  const hasVersionInUrl =
    params.slug &&
    docsVersions.some((version) => {
      return params.slug[0] === version.id;
    });

  return (
    <div>
      Latest version {activeVersion.label} - {activeVersion.id}
      <div>{hasVersionInUrl ? "true" : "false"}</div>
    </div>
  );
}
