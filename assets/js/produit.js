import { products, loadData } from './products.js'
import { addToCart } from './cart.js'

let currentProduct = null
let selectedSize = null

export async function initProduct() {
  // 1. Lire l'URL
  const urlParams = new URLSearchParams(window.location.search)
  let slug = urlParams.get('slug')
  
  // Astuce si le serveur local mange le "?slug="
  if (!slug) slug = localStorage.getItem('current-slug')

  if (!slug) {
    document.getElementById('productContent').innerHTML = '<p class="text-center py-20 text-red-500 font-bold">Erreur : Aucun slug trouvé.</p>'
    return
  }

  // 2. Charger les données
  if (products.length === 0) {
    await loadData()
  }

  // 3. Trouver le produit
  currentProduct = products.find(p => p.slug === slug)

  if (!currentProduct) {
    document.getElementById('productContent').innerHTML = `<p class="text-center py-20 text-red-500 font-bold">Produit introuvable (${slug}).</p>`
    return
  }

  // 4. Afficher le produit
  renderProduct()
}

function renderProduct() {
  const container = document.getElementById('productContent')
  
  // On récupère toutes les images triées par position
  // On récupère les images et on FILTRE pour exclure luxe10
const images = currentProduct.product_images
  ?.sort((a, b) => a.position - b.position)
  .filter(img => !img.url.includes('luxe10.jpeg')) || []
  
  // La première image est l'image principale, les autres sont les miniatures
  const mainImage = images[0]?.url || 'assets/images/placeholder.jpg'
  const thumbnails = images.slice(1) 
  
  const variants = currentProduct.product_variants || []
  const sizes = variants.map(v => v.size)

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      
      <!-- GALERIE D'IMAGES -->
      <div class="space-y-6">
        
        <!-- 1. Image principale (Grande) -->
        <div class="aspect-[3/4] rounded-2xl overflow-hidden bg-gold/10">
          <img id="mainProductImage" src="${mainImage}" alt="${currentProduct.name_fr}" class="w-full h-full object-cover transition-opacity duration-300">
        </div>
        
        <!-- 2. Miniatures (Taille moyenne en dessous) -->
        <div class="grid grid-cols-3 gap-4">
          ${thumbnails.map((img, i) => `
            <button onclick="window.changeImage('${img.url}', this)" class="aspect-square rounded-lg overflow-hidden bg-gold/10 border-2 border-transparent hover:border-terracotta transition-colors">
              <img src="${img.url}" class="w-full h-full object-cover">
            </button>
          `).join('')}
        </div>
      </div>

      <!-- INFOS PRODUIT -->
      <div class="space-y-8 lg:sticky lg:top-28 self-start">
        <div>
          <span class="text-xs tracking-[0.3em] text-terracotta uppercase">${currentProduct.fabric || currentProduct.category}</span>
          <h1 class="mt-3 font-serif text-4xl md:text-5xl text-forest leading-tight">${currentProduct.name_fr}</h1>
          <div class="mt-4 space-y-1">
            <p class="font-serif text-3xl text-terracotta">${new Intl.NumberFormat('fr-FR').format(currentProduct.price_xof)} FCFA</p>
            <p class="text-sm text-ink/50">≈ ${currentProduct.price_eur} €</p>
          </div>
        </div>

        <div class="w-16 h-px bg-gold"></div>
        <p class="text-ink/70 leading-relaxed">${currentProduct.description_fr || 'Aucune description.'}</p>

        <div>
          <p class="text-sm font-medium uppercase tracking-widest mb-3">Taille</p>
          <div class="flex flex-wrap gap-2">
            ${sizes.length > 0 ? sizes.map(s => `
              <button onclick="window.selectSize('${s}')" class="size-btn min-w-14 px-4 py-3 text-sm rounded-lg border border-ink/15 hover:border-ink/40 transition-all">${s}</button>
            `).join('') : '<p class="text-sm text-ink/50">Aucune taille</p>'}
          </div>
        </div>

        <button id="addBtn" onclick="window.addToCartAction()" class="w-full py-5 rounded-full bg-ink/10 text-ink/40 font-medium cursor-not-allowed transition-all" disabled>
          Ajouter au panier
        </button>
      </div>
    </div>
  `
}

// Fonction pour changer l'image principale au clic sur une miniature
window.changeImage = (url, btn) => {
  const mainImg = document.getElementById('mainProductImage')
  
  // Effet de fondu
  mainImg.style.opacity = '0'
  setTimeout(() => {
    mainImg.src = url
    mainImg.style.opacity = '1'
  }, 200)

  // Changer la bordure active sur les boutons
  const buttons = document.querySelectorAll('.grid-cols-3 button')
  buttons.forEach(b => {
    b.classList.remove('border-terracotta')
    b.classList.add('border-transparent')
  })
  btn.classList.remove('border-transparent')
  btn.classList.add('border-terracotta')
}