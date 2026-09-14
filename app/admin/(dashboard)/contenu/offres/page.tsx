import OffersEditor from "@/components/admin/cms/OffersEditor";
import { getOffers } from "@/lib/cms/queries";

export default async function AdminOffersContentPage() {
  const offers = await getOffers();
  return <OffersEditor initial={offers} />;
}
