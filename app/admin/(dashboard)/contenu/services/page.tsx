import ServicesEditor from "@/components/admin/cms/ServicesEditor";
import { getSiteContentMap } from "@/lib/cms/queries";

export default async function AdminServicesContentPage() {
  const { content, updatedAt } = await getSiteContentMap();
  return <ServicesEditor initial={content.services} initialUpdatedAt={updatedAt.services ?? null} />;
}
