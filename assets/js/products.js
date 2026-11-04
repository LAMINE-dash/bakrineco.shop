/* ============================================================
   PRODUCTS.JS — Connexion Supabase et chargement des données
   ============================================================ */

const SUPABASE_URL = 'https://wamrraarelxsmiksoqhe.supabase.co'
// ⚠️ REMPLACEZ PAR VOTRE VRAIE CLÉ ANON PUBLIC
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhbXJyYWFyZWx4c21pa3NvcWhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwMjY4MjMsImV4cCI6MjEwNTYwMjgyM30.DbO56YDbbXSDkSvL3YqY5X0GB_CMUzt5RseTwag0DkA' 

export let products = []
export let collections = []

export async function loadData() {
  try {
    const headers = {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }

    // 1. Charger les produits avec images ET variantes (tailles)
   const resProducts = await fetch(
      `${SUPABASE_URL}/rest/v1/products?select=*,product_images(*),product_variants(*)&is_active=eq.true&order=created_at.desc`,
      { headers }
    )
    products = await resProducts.json()

    // 2. Charger les collections
    const resCollections = await fetch(
      `${SUPABASE_URL}/rest/v1/collections?select=*&order=position`,
      { headers }
    )
    collections = await resCollections.json()

    // 3. Charger les liaisons (pour les filtres)
    const resLinks = await fetch(
      `${SUPABASE_URL}/rest/v1/collection_products?select=*`,
      { headers }
    )
    const links = await resLinks.json()

    // 4. Ajouter les slugs de collections à chaque produit
    products = products.map(p => {
      const productLinks = links.filter(l => l.product_id === p.id)
      const productCollectionSlugs = productLinks
        .map(l => collections.find(c => c.id === l.collection_id)?.slug)
        .filter(Boolean)

      return { ...p, collectionSlugs: productCollectionSlugs }
    })

    return { products, collections }
  } catch (error) {
    console.error('Erreur de chargement Supabase:', error)
    return { products: [], collections: [] }
  }
}