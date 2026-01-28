import { TableauContent } from "@/components/tableau-content"
import { loadAdsData, getUniqueCreators } from "@/lib/data"

export default async function TableauPage() {
  const data = await loadAdsData()
  const creators = getUniqueCreators(data)

  return <TableauContent initialData={data} creators={creators} />
}
