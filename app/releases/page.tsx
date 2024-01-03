import { getReleases } from "@/lib/getReleases";
import { redirect } from "next/navigation";

export default function Page() {
  const releases = getReleases();

  redirect(`/releases/${releases[releases.length - 1]}`);
}
