"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { SearchNormal1, Filter, ArrowUp, ArrowDown, ArrowLeft2, ArrowRight2 } from "iconsax-reactjs"
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

const getStatutColor = (statut: string) => {
  switch (statut) {
    case "En ligne":
      return "bg-green-100 text-green-700 border-green-200"
    case "Arrêtée":
      return "bg-red-100 text-red-700 border-red-200"
    case "En pause":
      return "bg-yellow-100 text-yellow-700 border-yellow-200"
    case "Archivée":
      return "bg-gray-100 text-gray-600 border-gray-200"
    default:
      return "bg-gray-100 text-gray-600 border-gray-200"
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
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

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
    if (sortField !== field) return <span className="ml-1 text-muted-foreground/40">↕</span>
    return sortDirection === "asc" 
      ? <ArrowUp size={14} className="ml-1 inline" />
      : <ArrowDown size={14} className="ml-1 inline" />
  }

  return (
    <div className="flex flex-col gap-6 py-6">
      {/* Header */}
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold">Tableau des créas</h1>
        <p className="text-muted-foreground">Visualisez et analysez les performances de vos créatives.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 px-4 lg:px-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Filter size={18} variant="Linear" />
        </div>

        <Select value={selectedProduit} onValueChange={setSelectedProduit}>
          <SelectTrigger className="w-[160px] bg-white">
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
          <SelectTrigger className="w-[160px] bg-white">
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
          <SelectTrigger className="w-[140px] bg-white">
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
          <SelectTrigger className="w-[150px] bg-white">
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
          <SelectTrigger className="w-[130px] bg-white">
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
            className="pl-9 bg-white"
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
        <div className="rounded-xl border bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead 
                  className="cursor-pointer hover:text-foreground transition-colors font-semibold"
                  onClick={() => handleSort("nomAnnonce")}
                >
                  Nom de l'annonce <SortIndicator field="nomAnnonce" />
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-foreground transition-colors font-semibold"
                  onClick={() => handleSort("produit")}
                >
                  Produit <SortIndicator field="produit" />
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-foreground transition-colors font-semibold"
                  onClick={() => handleSort("createur")}
                >
                  Créateur <SortIndicator field="createur" />
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-foreground transition-colors font-semibold"
                  onClick={() => handleSort("typeContenu")}
                >
                  Type <SortIndicator field="typeContenu" />
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-foreground transition-colors font-semibold"
                  onClick={() => handleSort("mois")}
                >
                  Mois <SortIndicator field="mois" />
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-foreground transition-colors font-semibold"
                  onClick={() => handleSort("statut")}
                >
                  Statut <SortIndicator field="statut" />
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-foreground transition-colors text-right font-semibold"
                  onClick={() => handleSort("budgetDepense")}
                >
                  Budget <SortIndicator field="budgetDepense" />
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-foreground transition-colors text-right font-semibold"
                  onClick={() => handleSort("conversions")}
                >
                  Conv. <SortIndicator field="conversions" />
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-foreground transition-colors text-right font-semibold"
                  onClick={() => handleSort("roas")}
                >
                  ROAS <SortIndicator field="roas" />
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-foreground transition-colors text-right font-semibold"
                  onClick={() => handleSort("coutParConversion")}
                >
                  CPA <SortIndicator field="coutParConversion" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((ad, index) => (
                <TableRow 
                  key={ad.id}
                  className={`cursor-pointer transition-colors hover:bg-purple-50 ${index % 2 === 0 ? "bg-white" : "bg-muted/20"}`}
                  onClick={() => router.push(`/dashboard/crea/${ad.idAnnonce}`)}
                >
                  <TableCell className="font-medium max-w-[280px]">
                    <div className="truncate">{ad.nomAnnonce}</div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{ad.produit}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{ad.createur}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{ad.typeContenu}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{ad.mois.replace(" 2025", "")}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${getStatutColor(ad.statut)}`}>
                      {ad.statut}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="tabular-nums font-medium">{formatCurrency(ad.budgetDepense)}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="tabular-nums">{formatNumber(ad.conversions)}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums ${
                      ad.roas >= 5 ? "bg-green-100 text-green-700" : 
                      ad.roas >= 1 ? "bg-emerald-100 text-emerald-700" : 
                      "bg-red-100 text-red-600"
                    }`}>
                      {ad.roas.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="tabular-nums text-muted-foreground">{formatCurrency(ad.coutParConversion)}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        {filteredData.length > itemsPerPage && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Affichage {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredData.length)} sur {filteredData.length} créas
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex h-9 w-9 items-center justify-center rounded-lg border bg-white transition-colors hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft2 size={18} />
              </button>
              {Array.from({ length: Math.min(5, Math.ceil(filteredData.length / itemsPerPage)) }, (_, i) => {
                const totalPages = Math.ceil(filteredData.length / itemsPerPage)
                let pageNum: number
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      currentPage === pageNum
                        ? "bg-purple-600 text-white"
                        : "border bg-white hover:bg-muted"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
              <button
                onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredData.length / itemsPerPage), p + 1))}
                disabled={currentPage >= Math.ceil(filteredData.length / itemsPerPage)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border bg-white transition-colors hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowRight2 size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
