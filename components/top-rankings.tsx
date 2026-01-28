import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown, User } from "iconsax-reactjs"
import type { TopCrea, TopCreator } from "@/types/ads"
import Link from "next/link"

interface TopRankingsProps {
  topCreas: TopCrea[]
  topCreators: TopCreator[]
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("fr-FR").format(Math.round(num))
}

export function TopRankings({ topCreas, topCreators }: TopRankingsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-2 lg:px-6">
      {/* Top 5 Créas par ROAS */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Crown size={20} className="text-amber-500" variant="Bold" />
            <CardTitle className="text-base font-medium">Top 5 créas par ROAS</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {topCreas.map((crea, index) => (
              <Link 
                key={crea.id} 
                href={`/dashboard/crea/${crea.id}`}
                className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
              >
                <div className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${
                  index === 0 ? "bg-amber-100 text-amber-700" :
                  index === 1 ? "bg-gray-100 text-gray-600" :
                  index === 2 ? "bg-orange-100 text-orange-700" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium">{crea.nom}</p>
                  <p className="text-xs text-muted-foreground">{crea.produit}</p>
                </div>
                <div className={`text-sm font-semibold tabular-nums ${
                  crea.roas >= 5 ? "text-green-600" : 
                  crea.roas >= 1 ? "text-emerald-500" : 
                  "text-red-500"
                }`}>
                  {crea.roas.toFixed(2)}x
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top 5 Créateurs par conversions */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <User size={20} className="text-purple-500" variant="Bold" />
            <CardTitle className="text-base font-medium">Top 5 créateurs par conversions</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {topCreators.map((creator, index) => (
              <div 
                key={creator.createur} 
                className="flex items-center gap-3 rounded-lg p-2"
              >
                <div className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${
                  index === 0 ? "bg-amber-100 text-amber-700" :
                  index === 1 ? "bg-gray-100 text-gray-600" :
                  index === 2 ? "bg-orange-100 text-orange-700" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium">{creator.createur}</p>
                </div>
                <div className="text-sm font-semibold tabular-nums text-purple-600">
                  {formatNumber(creator.conversions)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
