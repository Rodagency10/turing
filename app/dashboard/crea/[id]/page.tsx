import { notFound } from "next/navigation"
import { CreaDetailContent } from "@/components/crea-detail-content"
import { loadAdsData, getAdById } from "@/lib/data"

interface CreaDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function CreaDetailPage({ params }: CreaDetailPageProps) {
  const { id } = await params
  const data = await loadAdsData()
  const ad = getAdById(data, id)

  if (!ad) {
    notFound()
  }

  return <CreaDetailContent ad={ad} />
}
