import { openCart, updateCartBadge, renderCartDrawer } from './cart.js'

export function renderHeader() {
  const container = document.getElementById('header')
  if (!container) return

  container.innerHTML = `
    <header class="sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b border-ink/5">
      <div class="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        
        <!-- Logo -->
        <a href="index.html" class="font-serif text-3xl md:text-4xl text-forest flex items-baseline gap-1">
          Bakrine & <span class="italic text-terracotta">Co</span>
        </a>

        <!-- Nav Desktop (caché sur mobile) -->
        <nav class="hidden lg:flex items-center gap-12">
          <a href="index.html" class="text-base text-ink/70 hover:text-terracotta transition-colors">Accueil</a>
          <a href="boutique.html" class="text-base text-ink/70 hover:text-terracotta transition-colors">Boutique</a>
          <a href="a-propos.html" class="text-base text-ink/70 hover:text-terracotta transition-colors">À propos</a>
          <a href="contact.html" class="text-base text-ink/70 hover:text-terracotta transition-colors">Contact</a>
        </nav>

        <!-- Actions (Panier + Menu mobile) -->
        <div class="flex items-center gap-4">
          
          <!-- Panier -->
          <button id="cartBtn" class="relative p-2 text-ink hover:text-terracotta transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span id="cartCount" class="absolute -top-1 -right-1 bg-terracotta text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center hidden">0</span>
          </button>

          <!-- Bouton Menu Mobile (visible uniquement sur mobile) -->
          <button id="menuBtn" class="lg:hidden p-2 text-ink hover:text-terracotta transition-colors">
            <svg id="menuIcon" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

        </div>
      </div>

      <!-- Nav Mobile (caché par défaut) -->
      <nav id="mobileMenu" class="hidden lg:hidden bg-cream border-t border-ink/5">
        <div class="px-6 py-6 flex flex-col gap-6">
          <a href="index.html" class="text-lg text-forest hover:text-terracotta transition-colors">Accueil</a>
          <a href="boutique.html" class="text-lg text-forest hover:text-terracotta transition-colors">Boutique</a>
          <a href="a-propos.html" class="text-lg text-forest hover:text-terracotta transition-colors">À propos</a>
          <a href="contact.html" class="text-lg text-forest hover:text-terracotta transition-colors">Contact</a>
        </div>
      </nav>
    </header>
  `

  // 1. Gestion du Panier
  const cartBtn = document.getElementById('cartBtn')
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      renderCartDrawer()
      openCart()
    })
  }
  updateCartBadge()

  // 2. Gestion du Menu Mobile
  const menuBtn = document.getElementById('menuBtn')
  const mobileMenu = document.getElementById('mobileMenu')
  const menuIcon = document.getElementById('menuIcon')

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden')
      
      // Changer l'icône (croix / hamburger)
      if (mobileMenu.classList.contains('hidden')) {
        menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />'
      } else {
        menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />'
      }
    })
  }
}
export function renderFooter() {
  const container = document.getElementById('footer')
  if (!container) return

  container.innerHTML = `
    <footer class="bg-forest text-cream pt-24 pb-12">
      <div class="max-w-7xl mx-auto px-6">
        
        <!-- GRILLE PRINCIPALE (Aérée) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20 mb-24">
          
          <!-- 1. Marque -->
          <div class="lg:col-span-1">
            <h3 class="font-serif text-3xl mb-6">Bakrine & <span class="text-gold italic">Co</span></h3>
            <p class="text-cream/60 text-sm leading-relaxed mb-8 pr-4">
              L'élégance africaine réinventée. Des pièces uniques, faites main avec passion.
            </p>
            <div class="flex gap-4">
              <a href="#" class="w-10 h-10 rounded-full border border-cream/20 hover:border-gold hover:text-gold flex items-center justify-center transition-colors">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" class="w-10 h-10 rounded-full border border-cream/20 hover:border-gold hover:text-gold flex items-center justify-center transition-colors">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://wa.me/33 7 65 26 39 17" target="_blank" class="w-10 h-10 rounded-full border border-cream/20 hover:border-gold hover:text-gold flex items-center justify-center transition-colors">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
            </div>
          </div>

          <!-- 2. Boutique -->
          <div>
            <h4 class="text-xs tracking-[0.2em] text-gold uppercase mb-8">Boutique</h4>
            <ul class="space-y-6 text-sm text-cream/70">
              <li><a href="boutique.html" class="hover:text-gold transition-colors">Toutes les créations</a></li>
              <li><a href="boutique.html?category=costume" class="hover:text-gold transition-colors">Costumes</a></li>
              <li><a href="boutique.html?category=chemise" class="hover:text-gold transition-colors">Chemises</a></li>
              <li><a href="boutique.html?category=blazer" class="hover:text-gold transition-colors">Blazers</a></li>
            </ul>
          </div>

          <!-- 3. Aide -->
          <div>
            <h4 class="text-xs tracking-[0.2em] text-gold uppercase mb-8">Aide</h4>
            <ul class="space-y-6 text-sm text-cream/70">
              <li><a href="contact.html" class="hover:text-gold transition-colors">Nous contacter</a></li>
              <li><a href="a-propos.html" class="hover:text-gold transition-colors">Notre histoire</a></li>
              <li><a href="mentions-legales.html" class="hover:text-gold transition-colors">Livraison & Retours</a></li>
              <li><a href="cgv.html" class="hover:text-gold transition-colors">CGV</a></li>
            </ul>
          </div>

          <!-- 4. Newsletter -->
          <div>
            <h4 class="text-xs tracking-[0.2em] text-gold uppercase mb-8">Newsletter</h4>
            <p class="text-sm text-cream/60 mb-6">Recevez nos nouveautés et offres exclusives.</p>
            <form onsubmit="event.preventDefault(); alert('Merci ! Vous êtes inscrit à la newsletter.');" class="flex flex-col gap-3">
              <input type="email" placeholder="votre@email.com" required class="w-full px-4 py-3 bg-transparent border-b border-cream/20 text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold transition-colors" />
              <button type="submit" class="text-left text-xs tracking-widest uppercase text-gold hover:text-white mt-2 transition-colors">
                S'inscrire →
              </button>
            </form>
          </div>

        </div>

        <!-- Ligne de séparation -->
        <div class="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream/40">
          <p>© 2026 Bakrine & Co. Tous droits réservés.</p>
          <div class="flex gap-8">
            <a href="mentions-legales.html" class="hover:text-gold transition-colors">Mentions Légales</a>
            <a href="cgv.html" class="hover:text-gold transition-colors">CGV</a>
          </div>
        </div>

      </div>
    </footer>
  `
}
