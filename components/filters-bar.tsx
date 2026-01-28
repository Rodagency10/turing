"use client"

import { PRODUITS, MOIS, STATUTS } from "@/types/ads"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Filter } from "iconsax-reactjs"

interface FiltersBarProps {
  selectedProduit: string
  selectedMois: string
  selectedStatut: string
  onProduitChange: (value: string) => void
  onMoisChange: (value: string) => void
  onStatutChange: (value: string) => void
}

export function FiltersBar({
  selectedProduit,
  selectedMois,
  selectedStatut,
  onProduitChange,
  onMoisChange,
  onStatutChange,
}: FiltersBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 px-4 lg:px-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Filter size={18} variant="Linear" />
        <span className="text-sm font-medium">Filtres</span>
      </div>
      
      <Select value={selectedProduit} onValueChange={onProduitChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tous les produits" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les produits</SelectItem>
          {PRODUITS.map((produit) => (
            <SelectItem key={produit} value={produit}>
              {produit}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedMois} onValueChange={onMoisChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Tous les mois" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les mois</SelectItem>
          {MOIS.map((mois) => (
            <SelectItem key={mois} value={mois}>
              {mois}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedStatut} onValueChange={onStatutChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Tous les statuts" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les statuts</SelectItem>
          {STATUTS.map((statut) => (
            <SelectItem key={statut} value={statut}>
              {statut}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
