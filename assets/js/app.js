import { renderHeader, renderFooter } from './layout.js'
import { renderHero } from './hero.js'
import { loadData } from './products.js'
import { renderAdvantages, renderCollections, renderTeaserProducts, renderStats } from './sections.js'

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Injecter le Header et le Footer
  renderHeader()
  renderFooter()
  
  // 2. Injecter le Hero
  renderHero()

  // 3. Charger les données depuis Supabase
  await loadData()

  // 4. Afficher les sections
  renderAdvantages()
  renderCollections()
  renderTeaserProducts()
  renderStats() // <-- La nouvelle section stats
})