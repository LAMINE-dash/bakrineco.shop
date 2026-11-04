/* ============================================================
   SECTIONS.JS — Avantages, Collections, Boutique Teaser
   ============================================================ */
import { collections, products } from './products.js'

/* 1. AVANTAGES */
import { loadLottie } from './lottie-utils.js'
export function renderAdvantages() {
  const container = document.getElementById('advantages')
  if (!container) return

  const icons = [
    { id: 'icon-truck', path: 'assets/icons/truck.json', title: 'Livraison mondiale', text: '50+ pays desservis' },
    { id: 'icon-shield', path: 'assets/icons/shield.json', title: 'Paiement sécurisé', text: 'Via WhatsApp' },
    { id: 'icon-sparkle', path: 'assets/icons/sparkle.json', title: 'Fait main', text: 'Pièces uniques' },
    { id: 'icon-heart', path: 'assets/icons/heart.json', title: 'Éthique', text: 'Artisans valorisés' },
  ]

  // On force la taille en pixels (width et height) sur le conteneur
  const html = icons.map(icon => `
    <div style="display: flex; flex-direction: column; align-items: center; text-align: center; gap: 12px;">
      <div style="width: 64px; height: 64px;">
        <div id="${icon.id}" style="width: 100%; height: 100%;"></div>
      </div>
      <h3 class="font-serif text-lg">${icon.title}</h3>
      <p class="text-[11px] uppercase tracking-widest text-cream/50">${icon.text}</p>
    </div>
  `).join('')

  container.innerHTML = `
    <section class="bg-forest text-cream border-y border-gold/10 py-12">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          ${html}
        </div>
      </div>
    </section>
  `

  // Charger les animations
  icons.forEach(icon => {
    loadLottie(icon.id, icon.path, { loop: true, autoplay: true })
  })
}
/* 2. COLLECTIONS */
export function renderCollections() {
  const container = document.getElementById('collections')
  if (!container) return

  // On prend les 4 collections
  const c = collections.slice(0, 4)
  if (c.length < 4) return

  container.innerHTML = `
    <section class="py-24 md:py-32 max-w-7xl mx-auto px-6">
      <!-- En-tête éditorial -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-ink/10 pb-8">
        <div>
          <span class="text-xs tracking-[0.4em] text-terracotta uppercase">Nos univers</span>
          <h2 class="mt-4 text-5xl md:text-7xl font-serif text-forest leading-none">
            Collections <br>
            <span class="italic text-ink/40 text-3xl md:text-5xl">(01 — 04)</span>
          </h2>
        </div>
        <p class="text-ink/60 max-w-sm mt-6 md:mt-0">
          Chaque pièce est une invitation au voyage. Découvrez nos lignes de vêtements conçues pour durer.
        </p>
      </div>

      <!-- Grille asymétrique -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        
        <!-- Collection 1 (Grande à gauche) -->
        <a href="boutique.html?category=${c[0].slug}" class="group relative block md:col-span-7 aspect-[4/5] md:aspect-auto md:h-[600px] rounded-none overflow-hidden">
          <img src="${c[0].image_url}" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div class="absolute bottom-8 left-8">
            <span class="text-white/60 text-xs tracking-widest uppercase">01</span>
            <h3 class="font-serif text-4xl text-white mt-1">${c[0].name_fr}</h3>
          </div>
        </a>

        <!-- Collection 2 (Petite en haut à droite) -->
        <a href="boutique.html?category=${c[1].slug}" class="group relative block md:col-span-5 h-[280px] md:h-[288px] rounded-none overflow-hidden">
          <img src="${c[1].image_url}" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div class="absolute inset-0 bg-black/30"></div>
          <div class="absolute bottom-6 left-6">
            <span class="text-white/60 text-xs tracking-widest uppercase">02</span>
            <h3 class="font-serif text-3xl text-white mt-1">${c[1].name_fr}</h3>
          </div>
        </a>

        <!-- Collection 3 (Petite en bas à gauche) -->
        <a href="boutique.html?category=${c[2].slug}" class="group relative block md:col-span-5 h-[280px] md:h-[288px] rounded-none overflow-hidden">
          <img src="${c[2].image_url}" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div class="absolute inset-0 bg-black/30"></div>
          <div class="absolute bottom-6 left-6">
            <span class="text-white/60 text-xs tracking-widest uppercase">03</span>
            <h3 class="font-serif text-3xl text-white mt-1">${c[2].name_fr}</h3>
          </div>
        </a>

        <!-- Collection 4 (Grande à droite) -->
        <a href="boutique.html?category=${c[3].slug}" class="group relative block md:col-span-7 h-[400px] md:h-[288px] rounded-none overflow-hidden">
          <img src="${c[3].image_url}" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div class="absolute inset-0 bg-black/30"></div>
          <div class="absolute bottom-6 left-6">
            <span class="text-white/60 text-xs tracking-widest uppercase">04</span>
            <h3 class="font-serif text-3xl text-white mt-1">${c[3].name_fr}</h3>
          </div>
        </a>

      </div>
    </section>
  `
}
/* 3. TEASER BOUTIQUE */
export function renderTeaserProducts() {
  const container = document.getElementById('teaser')
  if (!container) return

  const htmlProducts = products.slice(0, 4).map(p => `
    <a href="produit.html?slug=${p.slug}" class="group block">
      <div class="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gold/10">
        <img src="${p.product_images?.[0]?.url || 'assets/images/placeholder.jpg'}" alt="${p.name_fr}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div class="mt-4 space-y-1">
        <p class="text-[10px] text-ink/40 uppercase tracking-widest">${p.fabric || p.category}</p>
        <h3 class="font-serif text-lg text-forest group-hover:text-terracotta transition-colors line-clamp-1">${p.name_fr}</h3>
        <p class="text-base font-medium text-terracotta">${new Intl.NumberFormat('fr-FR').format(p.price_xof)} FCFA</p>
      </div>
    </a>
  `).join('')

  container.innerHTML = `
    <section class="py-24 md:py-32 bg-cream/40">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex items-end justify-between mb-12">
          <div>
            <span class="text-xs tracking-[0.4em] text-terracotta uppercase">Sélection</span>
            <h2 class="mt-3 text-4xl md:text-5xl font-serif text-forest">Nos <em class="italic text-terracotta">coups de cœur</em></h2>
          </div>
          <a href="boutique.html" class="hidden md:inline-flex items-center gap-2 text-sm text-ink/60 hover:text-terracotta transition-colors">
            Voir tout <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          ${htmlProducts}
        </div>
      </div>
    </section>
  `
}
/* 4. STATISTIQUES */
export function renderStats() {
  const container = document.getElementById('stats')
  if (!container) return

  container.innerHTML = `
    <section class="bg-forest text-cream py-20 border-t border-gold/10">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          
          <div>
            <p class="font-serif text-5xl md:text-6xl text-gold">20+</p>
            <div class="w-8 h-px bg-gold mx-auto my-4"></div>
            <p class="text-[10px] md:text-xs uppercase tracking-[0.2em] text-cream/60">Créations uniques</p>
          </div>

          <div>
            <p class="font-serif text-5xl md:text-6xl text-gold">50+</p>
            <div class="w-8 h-px bg-gold mx-auto my-4"></div>
            <p class="text-[10px] md:text-xs uppercase tracking-[0.2em] text-cream/60">Pays livrés</p>
          </div>

          <div>
            <p class="font-serif text-5xl md:text-6xl text-gold">12</p>
            <div class="w-8 h-px bg-gold mx-auto my-4"></div>
            <p class="text-[10px] md:text-xs uppercase tracking-[0.2em] text-cream/60">Artisans partenaires</p>
          </div>

          <div>
            <p class="font-serif text-5xl md:text-6xl text-gold">5 ans</p>
            <div class="w-8 h-px bg-gold mx-auto my-4"></div>
            <p class="text-[10px] md:text-xs uppercase tracking-[0.2em] text-cream/60">D'expertise</p>
          </div>

        </div>
      </div>
    </section>
  `
}