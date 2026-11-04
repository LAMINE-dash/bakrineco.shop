/* ============================================================
   CART.JS — Gestion du panier avec localStorage
   ============================================================ */

let cart = JSON.parse(localStorage.getItem('bakrine-cart') || '[]')

// 1. Mettre à jour le badge du panier
export function updateCartBadge() {
  const countEl = document.getElementById('cartCount')
  const drawerCountEl = document.getElementById('cartDrawerCount')
  
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0)
  
  if (countEl) {
    countEl.textContent = totalItems
    if (totalItems === 0) countEl.classList.add('hidden')
    else countEl.classList.remove('hidden')
  }
  if (drawerCountEl) {
    drawerCountEl.textContent = `(${totalItems})`
  }
}

// 2. Ajouter un produit
export function addToCart(item) {
  const existing = cart.find(i => i.variantId === item.variantId)
  if (existing) {
    existing.qty += item.qty
  } else {
    cart.push(item)
  }
  
  saveCart()
  updateCartBadge()
  renderCartDrawer()
  openCart()
}

// 3. Retirer un produit
export function removeFromCart(variantId) {
  cart = cart.filter(i => i.variantId !== variantId)
  saveCart()
  updateCartBadge()
  renderCartDrawer()
}

// 4. Changer la quantité
export function updateQty(variantId, newQty) {
  const item = cart.find(i => i.variantId === variantId)
  if (item) {
    item.qty = Math.max(1, newQty)
    saveCart()
    updateCartBadge()
    renderCartDrawer()
  }
}

// 5. Vider le panier
export function clearCart() {
  cart = []
  saveCart()
  updateCartBadge()
  renderCartDrawer()
}

// 6. Récupérer le panier (C'EST CE QUI MANQUAIT)
export function getCart() {
  return cart
}

// --- FONCTIONS UTILITAIRES ---

function saveCart() {
  localStorage.setItem('bakrine-cart', JSON.stringify(cart))
}

export function openCart() {
  const drawer = document.getElementById('cartDrawer')
  const overlay = document.getElementById('cartOverlay')
  if (drawer) drawer.classList.remove('translate-x-full')
  if (overlay) overlay.classList.remove('hidden')
  document.body.style.overflow = 'hidden'
}

export function closeCart() {
  const drawer = document.getElementById('cartDrawer')
  const overlay = document.getElementById('cartOverlay')
  if (drawer) drawer.classList.add('translate-x-full')
  if (overlay) overlay.classList.add('hidden')
  document.body.style.overflow = ''
}

export function renderCartDrawer() {
  const content = document.getElementById('cartContent')
  const totalXofEl = document.getElementById('cartTotalXof')
  const totalEurEl = document.getElementById('cartTotalEur')
  
  if (!content) return

  if (cart.length === 0) {
    content.innerHTML = `
      <div class="flex flex-col items-center justify-center h-full text-center gap-4 py-10">
        <p class="text-ink/50">Votre panier est vide</p>
      </div>
    `
    if (totalXofEl) totalXofEl.textContent = '0 FCFA'
    if (totalEurEl) totalEurEl.textContent = '≈ 0.00 €'
    return
  }

  const totalXof = cart.reduce((s, i) => s + i.priceXof * i.qty, 0)
  const totalEur = cart.reduce((s, i) => s + i.priceEur * i.qty, 0)
  
  if (totalXofEl) totalXofEl.textContent = `${new Intl.NumberFormat('fr-FR').format(totalXof)} FCFA`
  if (totalEurEl) totalEurEl.textContent = `≈ ${totalEur.toFixed(2)} €`

  content.innerHTML = cart.map(item => `
    <div class="flex gap-4 py-4 border-b border-ink/5">
      <img src="${item.image}" alt="${item.name}" class="w-20 h-24 object-cover rounded-lg bg-gold/10">
      <div class="flex-1">
        <h4 class="font-serif text-base text-forest">${item.name}</h4>
        <p class="text-xs text-ink/50 mb-1">Taille : ${item.size}</p>
        <p class="text-sm font-medium text-terracotta mb-2">${new Intl.NumberFormat('fr-FR').format(item.priceXof * item.qty)} FCFA</p>
        
        <div class="flex items-center justify-between">
          <div class="flex items-center border border-ink/15 rounded-full">
            <button onclick="window.cartUpdateQty('${item.variantId}', ${item.qty - 1})" class="px-3 py-1 hover:text-terracotta">−</button>
            <span class="w-6 text-center text-sm">${item.qty}</span>
            <button onclick="window.cartUpdateQty('${item.variantId}', ${item.qty + 1})" class="px-3 py-1 hover:text-terracotta">+</button>
          </div>
          <button onclick="window.cartRemoveItem('${item.variantId}')" class="text-ink/30 hover:text-red-500">
            ✕
          </button>
        </div>
      </div>
    </div>
  `).join('')
}

// Exposer au window pour que les boutons HTML du tiroir fonctionnent
window.cartUpdateQty = updateQty
window.cartRemoveItem = removeFromCart