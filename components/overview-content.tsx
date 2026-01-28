"use client"

import { useState } from "react"
import { KPICards } from "@/components/kpi-cards"
import { FiltersBar } from "@/components/filters-bar"
import { ROASByMonthChart, BudgetByProductChart } from "@/components/charts"
import { TopRankings } from "@/components/top-rankings"
import type { AdCreative, FilterState } from "@/types/ads"
import { 
  calculateKPIs, 
  filterData, 
  getTopCreasByROAS, 
  getTopCreatorsByConversions,
  getROASByMonth,
  getBudgetByProduct
} from "@/lib/calculations"


interface OverviewContentProps {
  initialData: AdCreative[]
}

export function OverviewContent({ initialData }: OverviewContentProps) {
  const [selectedProduit, setSelectedProduit] = useState("all")
  const [selectedMois, setSelectedMois] = useState("all")
  const [selectedStatut, setSelectedStatut] = useState("all")

  // Apply filters
  const filters: FilterState = {
    produit: selectedProduit === "all" ? [] : [selectedProduit],
    mois: selectedMois === "all" ? [] : [selectedMois],
    statut: selectedStatut === "all" ? [] : [selectedStatut],
    createur: [],
    typeContenu: [],
    recherche: "",
  }

  const filteredData = filterData(initialData, filters)

  // Calculate all metrics
  const kpis = calculateKPIs(filteredData)
  const topCreas = getTopCreasByROAS(filteredData)
  const topCreators = getTopCreatorsByConversions(filteredData)
  const roasByMonth = getROASByMonth(filteredData)
  const budgetByProduct = getBudgetByProduct(filteredData)

  return (
    <div className="flex flex-col gap-6 py-6">
      {/* Filters */}
      <FiltersBar
        selectedProduit={selectedProduit}
        selectedMois={selectedMois}
        selectedStatut={selectedStatut}
        onProduitChange={setSelectedProduit}
        onMoisChange={setSelectedMois}
        onStatutChange={setSelectedStatut}
      />

      {/* KPI Cards */}
      <KPICards kpis={kpis} />

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-2 lg:px-6">
        <ROASByMonthChart data={roasByMonth} />
        <BudgetByProductChart data={budgetByProduct} />
      </div>

      {/* Rankings */}
      <TopRankings topCreas={topCreas} topCreators={topCreators} />
    </div>
  )
}
