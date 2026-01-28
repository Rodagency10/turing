import { OverviewContent } from "@/components/overview-content"
import { loadAdsData } from "@/lib/data"

export default async function DashboardPage() {
  const data = await loadAdsData()

  return <OverviewContent initialData={data} />
}
