import { 
  Wallet3, 
  ShoppingCart, 
  TrendUp, 
  MoneyRecive, 
  DollarCircle, 
  Chart21 
} from "iconsax-reactjs"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { KPIs } from "@/types/ads"

interface KPICardsProps {
  kpis: KPIs
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("fr-FR").format(Math.round(num))
}

const formatCurrency = (num: number) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num)
}

const formatROAS = (num: number) => {
  return num.toFixed(2)
}

export function KPICards({ kpis }: KPICardsProps) {
  const cards = [
    {
      title: "Budget dépensé",
      value: formatCurrency(kpis.budgetTotal),
      icon: Wallet3,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Conversions",
      value: formatNumber(kpis.conversionsTotal),
      icon: ShoppingCart,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "ROAS moyen",
      value: formatROAS(kpis.roasMoyen),
      icon: TrendUp,
      color: kpis.roasMoyen >= 1 ? "text-green-600" : "text-red-500",
      bgColor: kpis.roasMoyen >= 1 ? "bg-green-50" : "bg-red-50",
    },
    {
      title: "Coût par conversion",
      value: formatCurrency(kpis.coutParConversionMoyen),
      icon: DollarCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Revenu total",
      value: formatCurrency(kpis.revenuTotal),
      icon: MoneyRecive,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Nombre de créas",
      value: formatNumber(kpis.nombreCreas),
      icon: Chart21,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 lg:px-6">
      {cards.map((card) => (
        <Card key={card.title} className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-sm font-medium">
                {card.title}
              </CardDescription>
              <div className={`rounded-lg p-2 ${card.bgColor}`}>
                <card.icon size={20} className={card.color} variant="Bold" />
              </div>
            </div>
            <CardTitle className={`text-2xl font-bold tabular-nums ${card.color}`}>
              {card.value}
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
