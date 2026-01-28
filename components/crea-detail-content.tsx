import { 
  Wallet3, 
  ShoppingCart, 
  TrendUp, 
  MoneyRecive, 
  Eye as EyeIcon,
  MouseCircle,
  PercentageCircle,
  DollarCircle,
  Calendar,
  Tag,
  Message,
  VideoPlay,
  User,
  ArrowLeft
} from "iconsax-reactjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { AdCreative } from "@/types/ads"
import Link from "next/link"

interface CreaDetailContentProps {
  ad: AdCreative
}

const formatCurrency = (num: number) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num)
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("fr-FR").format(Math.round(num))
}

const getStatutBadgeVariant = (statut: string) => {
  switch (statut) {
    case "En ligne":
      return "default"
    case "Arrêtée":
      return "destructive"
    case "En pause":
      return "secondary"
    case "Archivée":
      return "outline"
    default:
      return "secondary"
  }
}

export function CreaDetailContent({ ad }: CreaDetailContentProps) {
  const kpiCards = [
    { title: "Budget dépensé", value: formatCurrency(ad.budgetDepense), icon: Wallet3 },
    { title: "Conversions", value: formatNumber(ad.conversions), icon: ShoppingCart },
    { title: "ROAS", value: ad.roas.toFixed(2), icon: TrendUp },
    { title: "Coût par conversion", value: formatCurrency(ad.coutParConversion), icon: DollarCircle },
    { title: "Revenu estimé", value: formatCurrency(ad.revenuEstime), icon: MoneyRecive },
    { title: "Impressions", value: formatNumber(ad.impressions), icon: EyeIcon },
    { title: "Clics", value: formatNumber(ad.clics), icon: MouseCircle },
    { title: "Taux de clic", value: `${ad.tauxDeClic.toFixed(2)}%`, icon: PercentageCircle },
  ]

  const infoItems = [
    { label: "Type de contenu", value: ad.typeContenu, icon: VideoPlay },
    { label: "Angle marketing", value: ad.angleMarketing, icon: Tag },
    { label: "Hook", value: ad.hook, icon: Message },
    { label: "Date de lancement", value: ad.dateLancement, icon: Calendar },
  ]

  return (
    <div className="flex flex-col gap-6 py-6">
      {/* Back button & Header */}
      <div className="px-4 lg:px-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/dashboard/tableau">
            <ArrowLeft size={16} />
            Retour au tableau
          </Link>
        </Button>
        
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{ad.nomAnnonce}</h1>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Tag size={16} />
              <span>{ad.produit}</span>
            </div>
            {ad.createur && ad.createur !== "—" && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <User size={16} />
                <span>{ad.createur}</span>
              </div>
            )}
            <Badge variant={getStatutBadgeVariant(ad.statut)}>
              {ad.statut}
            </Badge>
          </div>
        </div>
      </div>

      {/* KPI Cards - Same style as Overview */}
      <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        {kpiCards.map((card) => (
          <Card key={card.title} className="border border-purple-100 bg-purple-50/30">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100">
                <card.icon size={22} className="text-purple-600" variant="Bold" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-muted-foreground">{card.title}</span>
                <span className="text-2xl font-bold tabular-nums text-foreground">
                  {card.value}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Section */}
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Informations de la créa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {infoItems.map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <item.icon size={14} />
                    {item.label}
                  </div>
                  <p className="font-medium">{item.value || "—"}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Mois</span>
                <p className="font-medium">{ad.mois}</p>
              </div>
            </div>

            {ad.hookRate && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">Hook Rate</span>
                  <p className="font-medium">{ad.hookRate}%</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats - Same style */}
      <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-3 lg:px-6">
        <Card className="border border-purple-100 bg-purple-50/30">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100">
              <User size={22} className="text-purple-600" variant="Bold" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm text-muted-foreground">Personnes touchées</span>
              <span className="text-2xl font-bold tabular-nums">{formatNumber(ad.personnesTouchees)}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-purple-100 bg-purple-50/30">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100">
              <TrendUp size={22} className="text-purple-600" variant="Bold" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm text-muted-foreground">Fréquence</span>
              <span className="text-2xl font-bold tabular-nums">{ad.frequence.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-purple-100 bg-purple-50/30">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100">
              <DollarCircle size={22} className="text-purple-600" variant="Bold" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm text-muted-foreground">CPM</span>
              <span className="text-2xl font-bold tabular-nums">{formatCurrency(ad.cpm)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
