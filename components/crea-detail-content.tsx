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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
    { title: "Budget dépensé", value: formatCurrency(ad.budgetDepense), icon: Wallet3, color: "text-blue-600", bgColor: "bg-blue-50" },
    { title: "Conversions", value: formatNumber(ad.conversions), icon: ShoppingCart, color: "text-green-600", bgColor: "bg-green-50" },
    { title: "ROAS", value: ad.roas.toFixed(2), icon: TrendUp, color: ad.roas >= 1 ? "text-green-600" : "text-red-500", bgColor: ad.roas >= 1 ? "bg-green-50" : "bg-red-50" },
    { title: "Coût par conversion", value: formatCurrency(ad.coutParConversion), icon: DollarCircle, color: "text-orange-600", bgColor: "bg-orange-50" },
    { title: "Revenu estimé", value: formatCurrency(ad.revenuEstime), icon: MoneyRecive, color: "text-emerald-600", bgColor: "bg-emerald-50" },
    { title: "Impressions", value: formatNumber(ad.impressions), icon: EyeIcon, color: "text-purple-600", bgColor: "bg-purple-50" },
    { title: "Clics", value: formatNumber(ad.clics), icon: MouseCircle, color: "text-indigo-600", bgColor: "bg-indigo-50" },
    { title: "Taux de clic", value: `${ad.tauxDeClic.toFixed(2)}%`, icon: PercentageCircle, color: "text-cyan-600", bgColor: "bg-cyan-50" },
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        {kpiCards.map((card) => (
          <Card key={card.title} className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription className="text-sm font-medium">
                  {card.title}
                </CardDescription>
                <div className={`rounded-lg p-2 ${card.bgColor}`}>
                  <card.icon size={18} className={card.color} variant="Bold" />
                </div>
              </div>
              <CardTitle className={`text-xl font-bold tabular-nums ${card.color}`}>
                {card.value}
              </CardTitle>
            </CardHeader>
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

      {/* Additional Stats */}
      <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-3 lg:px-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Personnes touchées</CardDescription>
            <CardTitle className="text-xl tabular-nums">{formatNumber(ad.personnesTouchees)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Fréquence</CardDescription>
            <CardTitle className="text-xl tabular-nums">{ad.frequence.toFixed(2)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>CPM</CardDescription>
            <CardTitle className="text-xl tabular-nums">{formatCurrency(ad.cpm)}</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
