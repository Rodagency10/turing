import { 
  Wallet3, 
  ShoppingCart, 
  TrendUp, 
  MoneyRecive, 
  DollarCircle, 
  Chart21 
} from "iconsax-reactjs"
import { Card, CardContent } from "@/components/ui/card"
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
    },
    {
      title: "Conversions",
      value: formatNumber(kpis.conversionsTotal),
      icon: ShoppingCart,
    },
    {
      title: "ROAS moyen",
      value: formatROAS(kpis.roasMoyen),
      icon: TrendUp,
    },
    {
      title: "Coût par conversion",
      value: formatCurrency(kpis.coutParConversionMoyen),
      icon: DollarCircle,
    },
    {
      title: "Revenu total",
      value: formatCurrency(kpis.revenuTotal),
      icon: MoneyRecive,
    },
    {
      title: "Nombre de créas",
      value: formatNumber(kpis.nombreCreas),
      icon: Chart21,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 lg:px-6">
      {cards.map((card) => (
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
  )
}
