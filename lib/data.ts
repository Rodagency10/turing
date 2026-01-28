import "server-only"
import { promises as fs } from "fs"
import path from "path"
import type { AdCreative } from "@/types/ads"

// Parse le fichier CSV et retourne les données - SERVEUR UNIQUEMENT
export async function loadAdsData(): Promise<AdCreative[]> {
  const csvPath = path.join(process.cwd(), "consignes", "AG1-Data.csv")
  const csvContent = await fs.readFile(csvPath, "utf-8")
  
  const lines = csvContent.split("\n").filter(line => line.trim())
  
  const data: AdCreative[] = []
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    if (values.length < 20) continue
    
    const ad: AdCreative = {
      id: values[29] || `ad-${i}`,
      nomAnnonce: values[0] || "",
      produit: values[1] || "",
      createur: values[2] || "—",
      typeContenu: values[3] || "",
      angleMarketing: values[4] || "",
      hook: values[5] || "",
      audience: values[6] || "",
      mois: values[7] || "",
      nomAdSet: values[8] || "",
      nomCampagne: values[9] || "",
      statut: values[10] || "",
      dateLancement: values[11] || "",
      personnesTouchees: parseNumber(values[12]),
      impressions: parseNumber(values[13]),
      frequence: parseNumber(values[14]),
      clics: parseNumber(values[15]),
      conversions: parseNumber(values[16]),
      budgetDepense: parseNumber(values[17]),
      revenuEstime: parseNumber(values[18]),
      roas: parseNumber(values[19]),
      cpm: parseNumber(values[20]),
      coutParClic: parseNumber(values[21]),
      tauxDeClic: parseNumber(values[22]),
      coutParConversion: parseNumber(values[23]),
      tauxConversion: parseNumber(values[24]),
      hookRate: values[25] === "—" ? null : parseNumber(values[25]),
      panierMoyen: parseNumber(values[26]),
      lienApercu: values[27] || "",
      idAdSet: values[28] || "",
      idAnnonce: values[29] || "",
    }
    
    data.push(ad)
  }
  
  return data
}

// Parse une ligne CSV en gérant les virgules dans les guillemets
function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === "," && !inQuotes) {
      result.push(current.trim())
      current = ""
    } else {
      current += char
    }
  }
  
  result.push(current.trim())
  return result
}

// Parse un nombre depuis une chaîne
function parseNumber(value: string): number {
  if (!value || value === "—") return 0
  const cleaned = value.replace(",", ".").replace(/[^\d.-]/g, "")
  const num = parseFloat(cleaned)
  return isNaN(num) ? 0 : num
}

// Récupère les créateurs uniques
export function getUniqueCreators(data: AdCreative[]): string[] {
  const creators = new Set<string>()
  for (const ad of data) {
    if (ad.createur && ad.createur !== "—") {
      creators.add(ad.createur)
    }
  }
  return Array.from(creators).sort()
}

// Récupère une créa par son ID
export function getAdById(data: AdCreative[], id: string): AdCreative | undefined {
  return data.find(ad => ad.id === id || ad.idAnnonce === id)
}
