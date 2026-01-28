// Types pour les données publicitaires Meta Ads

export interface AdCreative {
  id: string;
  nomAnnonce: string;
  produit: string;
  createur: string;
  typeContenu: string;
  angleMarketing: string;
  hook: string;
  audience: string;
  mois: string;
  nomAdSet: string;
  nomCampagne: string;
  statut: string;
  dateLancement: string;
  personnesTouchees: number;
  impressions: number;
  frequence: number;
  clics: number;
  conversions: number;
  budgetDepense: number;
  revenuEstime: number;
  roas: number;
  cpm: number;
  coutParClic: number;
  tauxDeClic: number;
  coutParConversion: number;
  tauxConversion: number;
  hookRate: number | null;
  panierMoyen: number;
  lienApercu: string;
  idAdSet: string;
  idAnnonce: string;
}

export interface FilterState {
  produit: string[];
  mois: string[];
  statut: string[];
  createur: string[];
  typeContenu: string[];
  recherche: string;
}

export interface KPIs {
  budgetTotal: number;
  conversionsTotal: number;
  roasMoyen: number;
  coutParConversionMoyen: number;
  revenuTotal: number;
  nombreCreas: number;
}

export interface TopCreator {
  createur: string;
  conversions: number;
}

export interface TopCrea {
  id: string;
  nom: string;
  roas: number;
  produit: string;
}

export const PRODUITS = [
  "AG1 Powder",
  "AG1 Travel Packs",
  "Vitamine D3+K2",
  "Omega-3",
  "Shaker",
  "Bundle Complet",
  "Abonnement",
] as const;

export const TYPES_CONTENU = [
  "UGC",
  "Podcast",
  "Image statique",
  "Motion/Vidéo",
  "Témoignage",
] as const;

export const MOIS = [
  "Juillet 2025",
  "Août 2025",
  "Septembre 2025",
  "Octobre 2025",
  "Novembre 2025",
] as const;

export const STATUTS = [
  "En ligne",
  "Arrêtée",
  "En pause",
  "Archivée",
] as const;
