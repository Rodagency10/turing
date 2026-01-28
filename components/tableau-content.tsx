"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { SearchNormal1, Filter } from "iconsax-reactjs"
import { PRODUITS, MOIS, STATUTS, TYPES_CONTENU } from "@/types/ads"
import type { AdCreative } from "@/types/ads"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface TableauContentProps {
  initialData: AdCreative[]
  creators: string[]
}

type SortField = "nomAnnonce" | "produit" | "createur" | "typeContenu" | "mois" | "statut" | "budgetDepense" | "conversions" | "roas" | "coutParConversion"
type SortDirection = "asc" | "desc"

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

export function TableauContent({ initialData, creators }: TableauContentProps) {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [selectedProduit, setSelectedProduit] = useState("all")
  const [selectedMois, setSelectedMois] = useState("all")
  const [selectedStatut, setSelectedStatut] = useState("all")
  const [selectedCreateur, setSelectedCreateur] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [sortField, setSortField] = useState<SortField>("roas")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  // Filter and sort data
  const filteredData = useMemo(() => {
    let result = initialData

    // Apply filters
    if (selectedProduit !== "all") {
      result = result.filter(ad => ad.produit === selectedProduit)
    }
    if (selectedMois !== "all") {
      result = result.filter(ad => ad.mois === selectedMois)
    }
    if (selectedStatut !== "all") {
      result = result.filter(ad => ad.statut === selectedStatut)
    }
    if (selectedCreateur !== "all") {
      result = result.filter(ad => ad.createur === selectedCreateur)
    }
    if (selectedType !== "all") {
      result = result.filter(ad => ad.typeContenu === selectedType)
    }
    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(ad => 
        ad.nomAnnonce.toLowerCase().includes(searchLower) ||
        ad.createur.toLowerCase().includes(searchLower) ||
        ad.produit.toLowerCase().includes(searchLower)
      )
    }

    // Sort
    result = [...result].sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }
      
      const aStr = String(aValue)
      const bStr = String(bValue)
      return sortDirection === "asc" 
        ? aStr.localeCompare(bStr, "fr") 
        : bStr.localeCompare(aStr, "fr")
    })

    return result
  }, [initialData, search, selectedProduit, selectedMois, selectedStatut, selectedCreateur, selectedType, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const SortIndicator = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
  }

  return (
    <div className="flex flex-col gap-4 py-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 px-4 lg:px-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Filter size={18} variant="Linear" />
          <span className="text-sm font-medium">Filtres</span>
        </div>

        <Select value={selectedProduit} onValueChange={setSelectedProduit}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Produit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous produits</SelectItem>
            {PRODUITS.map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedCreateur} onValueChange={setSelectedCreateur}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Créateur" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous créateurs</SelectItem>
            {creators.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous types</SelectItem>
            {TYPES_CONTENU.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedMois} onValueChange={setSelectedMois}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Mois" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les mois</SelectItem>
            {MOIS.map((m) => (
              <SelectItem key={m} value={m}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStatut} onValueChange={setSelectedStatut}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous statuts</SelectItem>
            {STATUTS.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative flex-1 min-w-[200px]">
          <SearchNormal1 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher une créa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Results count */}
      <div className="px-4 lg:px-6">
        <p className="text-sm text-muted-foreground">
          {filteredData.length} créa{filteredData.length > 1 ? "s" : ""} trouvée{filteredData.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* Table */}
      <div className="px-4 lg:px-6 overflow-auto">
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead 
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => handleSort("nomAnnonce")}
                >
                  Nom de l'annonce <SortIndicator field="nomAnnonce" />
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => handleSort("produit")}
                >
                  Produit <SortIndicator field="produit" />
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => handleSort("createur")}
                >
                  Créateur <SortIndicator field="createur" />
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => handleSort("typeContenu")}
                >
                  Type <SortIndicator field="typeContenu" />
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => handleSort("mois")}
                >
                  Mois <SortIndicator field="mois" />
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => handleSort("statut")}
                >
                  Statut <SortIndicator field="statut" />
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted text-right"
                  onClick={() => handleSort("budgetDepense")}
                >
                  Budget <SortIndicator field="budgetDepense" />
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted text-right"
                  onClick={() => handleSort("conversions")}
                >
                  Conv. <SortIndicator field="conversions" />
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted text-right"
                  onClick={() => handleSort("roas")}
                >
                  ROAS <SortIndicator field="roas" />
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted text-right"
                  onClick={() => handleSort("coutParConversion")}
                >
                  CPA <SortIndicator field="coutParConversion" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.slice(0, 50).map((ad) => (
                <TableRow 
                  key={ad.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => router.push(`/dashboard/crea/${ad.idAnnonce}`)}
                >
                  <TableCell className="font-medium max-w-[300px] truncate">
                    {ad.nomAnnonce}
                  </TableCell>
                  <TableCell className="text-sm">{ad.produit}</TableCell>
                  <TableCell className="text-sm">{ad.createur}</TableCell>
                  <TableCell className="text-sm">{ad.typeContenu}</TableCell>
                  <TableCell className="text-sm">{ad.mois.replace(" 2025", "")}</TableCell>
                  <TableCell>
                    <Badge variant={getStatutBadgeVariant(ad.statut)}>
                      {ad.statut}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatCurrency(ad.budgetDepense)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatNumber(ad.conversions)}
                  </TableCell>
                  <TableCell className={`text-right tabular-nums font-medium ${
                    ad.roas >= 5 ? "text-green-600" : 
                    ad.roas >= 1 ? "text-emerald-500" : 
                    "text-red-500"
                  }`}>
                    {ad.roas.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatCurrency(ad.coutParConversion)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {filteredData.length > 50 && (
          <p className="mt-2 text-sm text-muted-foreground text-center">
            Affichage des 50 premiers résultats sur {filteredData.length}
          </p>
        )}
      </div>
    </div>
  )
}
