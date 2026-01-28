import type { AdCreative, KPIs, TopCrea, TopCreator, FilterState } from "@/types/ads"

// Applique les filtres sur les données
export function filterData(data: AdCreative[], filters: FilterState): AdCreative[] {
  return data.filter(ad => {
    if (filters.produit.length > 0 && !filters.produit.includes(ad.produit)) {
      return false
    }
    if (filters.mois.length > 0 && !filters.mois.includes(ad.mois)) {
      return false
    }
    if (filters.statut.length > 0 && !filters.statut.includes(ad.statut)) {
      return false
    }
    if (filters.createur.length > 0 && !filters.createur.includes(ad.createur)) {
      return false
    }
    if (filters.typeContenu.length > 0 && !filters.typeContenu.includes(ad.typeContenu)) {
      return false
    }
    if (filters.recherche) {
      const search = filters.recherche.toLowerCase()
      return (
        ad.nomAnnonce.toLowerCase().includes(search) ||
        ad.createur.toLowerCase().includes(search) ||
        ad.produit.toLowerCase().includes(search)
      )
    }
    return true
  })
}

// Calcule les KPIs à partir des données
export function calculateKPIs(data: AdCreative[]): KPIs {
  if (data.length === 0) {
    return {
      budgetTotal: 0,
      conversionsTotal: 0,
      roasMoyen: 0,
      coutParConversionMoyen: 0,
      revenuTotal: 0,
      nombreCreas: 0,
    }
  }
  
  const budgetTotal = data.reduce((sum, ad) => sum + ad.budgetDepense, 0)
  const conversionsTotal = data.reduce((sum, ad) => sum + ad.conversions, 0)
  const revenuTotal = data.reduce((sum, ad) => sum + ad.revenuEstime, 0)
  const roasMoyen = budgetTotal > 0 ? revenuTotal / budgetTotal : 0
  const coutParConversionMoyen = conversionsTotal > 0 ? budgetTotal / conversionsTotal : 0
  
  return {
    budgetTotal,
    conversionsTotal,
    roasMoyen,
    coutParConversionMoyen,
    revenuTotal,
    nombreCreas: data.length,
  }
}

// Top 5 créas par ROAS
export function getTopCreasByROAS(data: AdCreative[], limit = 5): TopCrea[] {
  return [...data]
    .filter(ad => ad.roas > 0)
    .sort((a, b) => b.roas - a.roas)
    .slice(0, limit)
    .map(ad => ({
      id: ad.id,
      nom: ad.nomAnnonce,
      roas: ad.roas,
      produit: ad.produit,
    }))
}

// Top 5 créateurs par conversions
export function getTopCreatorsByConversions(data: AdCreative[], limit = 5): TopCreator[] {
  const creatorMap = new Map<string, number>()
  
  for (const ad of data) {
    if (ad.createur && ad.createur !== "—") {
      creatorMap.set(ad.createur, (creatorMap.get(ad.createur) || 0) + ad.conversions)
    }
  }
  
  return Array.from(creatorMap.entries())
    .map(([createur, conversions]) => ({ createur, conversions }))
    .sort((a, b) => b.conversions - a.conversions)
    .slice(0, limit)
}

// Données pour le graphique ROAS par mois
export function getROASByMonth(data: AdCreative[]): { mois: string; roas: number }[] {
  const monthOrder = ["Juillet 2025", "Août 2025", "Septembre 2025", "Octobre 2025", "Novembre 2025"]
  const monthData = new Map<string, { budget: number; revenu: number }>()
  
  for (const ad of data) {
    const existing = monthData.get(ad.mois) || { budget: 0, revenu: 0 }
    monthData.set(ad.mois, {
      budget: existing.budget + ad.budgetDepense,
      revenu: existing.revenu + ad.revenuEstime,
    })
  }
  
  return monthOrder
    .filter(mois => monthData.has(mois))
    .map(mois => {
      const { budget, revenu } = monthData.get(mois)!
      return {
        mois: mois.replace(" 2025", ""),
        roas: budget > 0 ? revenu / budget : 0,
      }
    })
}

// Données pour le graphique Budget par produit
export function getBudgetByProduct(data: AdCreative[]): { produit: string; budget: number }[] {
  const productMap = new Map<string, number>()
  
  for (const ad of data) {
    productMap.set(ad.produit, (productMap.get(ad.produit) || 0) + ad.budgetDepense)
  }
  
  return Array.from(productMap.entries())
    .map(([produit, budget]) => ({ produit, budget }))
    .sort((a, b) => b.budget - a.budget)
}
