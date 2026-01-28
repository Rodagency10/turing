# PROTOTYPE (TEST) — TURING

**Durée : 30 à 60 minutes | Outils IA : Autorisés et encouragés**

## Contexte

Tu es développeur pour l'agence TURING. Un client fictif (marque de compléments alimentaires) te fournit un export de ses données publicitaires Meta Ads. Il veut un outil interne pour visualiser et analyser ses performances créatives.

**Note :** Ce test utilise des données fictives. La marque, les créateurs et les chiffres sont inventés.

## Brief client

"On dépense plusieurs dizaines de milliers d'euros par mois en publicité Meta. On a un Google Sheets avec toutes nos données mais c'est illisible. On veut un vrai dashboard pour que notre équipe Growth puisse voir en un coup d'œil si on est rentable, identifier nos meilleurs créateurs, et explorer toutes nos créas en détail. On veut quelque chose de beau, moderne, et surtout UTILE."

## Ce que tu dois livrer

Un dashboard de 3 écrans avec une sidebar de navigation à gauche.

### Écran 1 — Overview

**En haut : filtres**
- Sélecteur de produit, Sélecteur de mois, Sélecteur de statut

**6 cartes KPIs**

| Carte | Valeur |
|-------|--------|
| Budget dépensé | Somme de Budget dépensé (€) |
| Conversions | Somme de Conversions (achats) |
| ROAS moyen | Moyenne de ROAS |
| Coût par conversion | Moyenne de Coût par conversion (€) |
| Revenu total | Somme de Revenu estimé (€) |
| Nombre de créas | Nombre de lignes |

**2 graphiques côte à côte**
- Gauche : ROAS par mois (barres) — Droite : Budget par produit (donut ou barres)

**2 classements en bas**
- Gauche : Top 5 créas par ROAS — Droite : Top 5 créateurs par conversions

### Écran 2 — Tableau des créas

**En haut : filtres**
- Produit, Créateur, Type de contenu, Mois, Statut, Recherche

**Colonnes du tableau**
- Nom de l'annonce, Produit, Créateur, Type, Mois, Statut, Budget (€), Conversions, ROAS, Coût par conversion (€)

**Fonctionnalités**
- Clic sur en-tête = trier
- Filtres en temps réel
- Clic sur ligne = écran 3

### Écran 3 — Détail d'une créa

**En haut**
- Nom de la créa, Produit + Créateur

**6-8 cartes KPIs**
- Budget, Conversions, ROAS, Coût par conversion, Revenu, Impressions, Clics, Taux de clic

**Infos de la créa**
- Type de contenu, Angle marketing, Hook, Mois, Statut, Date de lancement

## Design attendu

Regarde les images de référence fournies.
- Sidebar à gauche avec navigation
- Fond clair (blanc ou gris très clair)
- Cartes KPIs : icône + label + grand chiffre
- Graphiques propres avec légendes
- Tableau avec lignes alternées, hover, tri

## Contrainte technique

Les données viennent du fichier CSV fourni. Pas de données en dur. Filtres et calculs dynamiques.

## Fichiers fournis

| Fichier | Description |
|---------|-------------|
| AG1-Data.csv | Données des créas (1268 lignes, 30 colonnes) |
| StyleReference.jpeg | Style visuel de référence |
| Exemple-Overview.png | Exemple d'écran Overview |
| Exemple-Tableau.png | Exemple d'écran Tableau |
| Exemple-Detail.png | Exemple d'écran Détail |

## Structure du CSV — Colonnes principales

| Colonne | Type | Utilisation |
|---------|------|-------------|
| Nom de l'annonce | Texte | Identifiant unique |
| Produit | Texte | Filtre, groupement |
| Créateur | Texte | Filtre, classement |
| Type de contenu | Texte | Filtre |
| Angle marketing | Texte | Info détail |
| Hook | Texte | Info détail |
| Mois | Texte | Filtre, graphique |
| Statut | Texte | Filtre |
| Budget dépensé (€) | Nombre | KPI principal |
| Conversions (achats) | Nombre | KPI principal |
| Revenu estimé (€) | Nombre | KPI principal |
| ROAS | Nombre | KPI principal |
| Coût par conversion (€) | Nombre | KPI principal |
| Impressions | Nombre | KPI détail |
| Clics | Nombre | KPI détail |
| Taux de clic (%) | Nombre | KPI détail |

## Valeurs possibles

| Colonne | Valeurs |
|---------|---------|
| Produit | AG1 Powder, AG1 Travel Packs, Vitamine D3+K2, Omega-3, Shaker, Bundle Complet, Abonnement |
| Type de contenu | UGC, Podcast, Image statique, Motion/Vidéo, Témoignage |
| Mois | Juillet 2025, Août 2025, Septembre 2025, Octobre 2025, Novembre 2025 |
| Statut | En ligne, Arrêtée, En pause, Archivée |

## Dictionnaire des termes

| Terme | Définition |
|-------|------------|
| Créa | Une publicité (aussi appelée annonce ou ad) |
| Créateur | L'influenceur qui a créé le contenu de la pub |
| UGC | User Generated Content — contenu créé par un créateur, pas la marque |
| Hook | L'accroche de la pub, ce qui capte l'attention |
| Angle | Le message principal ou argument de vente |
| Impressions | Nombre de fois où la pub a été affichée |
| Reach | Nombre de personnes uniques qui ont vu la pub |
| Clics | Nombre de personnes qui ont cliqué sur la pub |
| Conversions | Nombre d'achats générés par la pub |
| Budget | Argent dépensé pour diffuser la pub |
| Revenu | Argent généré par les ventes (Conversions × Panier moyen) |
| ROAS | Return On Ad Spend = Revenu ÷ Budget. Si > 1, la pub est rentable |
| CPA | Coût Par Acquisition = Budget ÷ Conversions |
| CPM | Coût Pour Mille impressions |
| CPC | Coût Par Clic |
| CTR | Click-Through Rate = Clics ÷ Impressions × 100 |
| Hook rate | % de personnes qui regardent au moins 3 secondes d'une vidéo |

## Livrables

1. Lien vers le prototype OU Repo GitHub
2. Vidéo démo de 2 min max montrant les 3 écrans

## Évaluation

| Critère | Points | Ce qu'on regarde |
|---------|--------|------------------|
| Design (UI/UX) | 40 | Qualité visuelle, respect du style, clarté, navigation |
| Compréhension métier | 30 | Les bons KPIs, les bons calculs, ça a du sens |
| Fonctionnel | 30 | Ça marche, filtres OK, données dynamiques, pas de bugs |
