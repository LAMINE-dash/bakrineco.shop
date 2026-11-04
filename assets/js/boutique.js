import { products, collections, loadData } from './products.js'

let activeFilter = 'all'

export async function initBoutique() {
  if (products.length === 0) {
    await loadData()
  }
  renderGrid()
  renderFilters()
}

function renderFilters() {
  const container = document.getElementById('filters')
  if (!container) return

  let html = `<button class="filter-btn active" data-filter="all">Tout</button>`
  collections.forEach(c => {
    html += `<button class="filter-btn" data-filter="${c.slug}">${c.name_fr}</button>`
  })
  container.innerHTML = html

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'))
      e.target.classList.add('active')
      activeFilter = e.target.dataset.filter
      renderGrid()
    })
  })
}

function renderGrid() {
  const grid = document.getElementById('productsGrid')
  if (!grid) return

  let filtered = products
  if (activeFilter !== 'all') {
    filtered = products.filter(p => p.collectionSlugs && p.collectionSlugs.includes(activeFilter))
  }

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="col-span-full text-center py-20 text-ink/50">Aucun produit dans cette catégorie.</p>`
    return
  }

  const html = filtered.map(p => {
    const productSlug = p.slug || p.id
    return `
      <!-- Astuce : on sauvegarde le slug dans le localStorage au clic -->
      <a href="produit.html?slug=${productSlug}" onclick="localStorage.setItem('current-slug', '${productSlug}')" class="group block">
        <div class="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gold/10">
          <img src="${p.product_images?.[0]?.url || 'assets/images/placeholder.jpg'}" alt="${p.name_fr}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div class="mt-4 space-y-1">
          <p class="text-[10px] text-ink/40 uppercase tracking-widest">${p.fabric || p.category}</p>
          <h3 class="font-serif text-lg text-forest group-hover:text-terracotta transition-colors line-clamp-1">${p.name_fr}</h3>
          <p class="text-base font-medium text-terracotta">${new Intl.NumberFormat('fr-FR').format(p.price_xof)} FCFA</p>
        </div>
      </a>
    `
  }).join('')

  grid.innerHTML = html
}