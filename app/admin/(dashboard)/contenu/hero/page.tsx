import HeroEditor from "@/components/admin/cms/HeroEditor";
import { getSiteContentMap } from "@/lib/cms/queries";

export default async function AdminHeroContentPage() {
  const { content, updatedAt } = await getSiteContentMap();
  return <HeroEditor initial={content.hero} initialUpdatedAt={updatedAt.hero ?? null} />;
}
