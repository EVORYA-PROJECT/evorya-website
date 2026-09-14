import First10Editor from "@/components/admin/cms/First10Editor";
import { getSiteContentMap } from "@/lib/cms/queries";

export default async function AdminFirst10Page() {
  const { content, updatedAt } = await getSiteContentMap();
  return <First10Editor initial={content.first10} initialUpdatedAt={updatedAt.first10 ?? null} />;
}
