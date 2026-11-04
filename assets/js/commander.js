import { getCart, clearCart } from './cart.js'
import { openWhatsApp } from './whatsapp.js'

export function initCommander() {
  const cart = getCart()
  const summaryContainer = document.getElementById('orderSummary')

  // 1. Si le panier est vide, on redirige
  if (cart.length === 0) {
    window.location.href = 'boutique.html'
    return
  }

  // 2. Afficher le récapitulatif
  renderSummary(cart, summaryContainer)

  // 3. Attacher l'action sur le bouton
  const btn = document.getElementById('whatsappBtn')
  
  if (btn) {
    btn.addEventListener('click', () => {
      // Récupérer les données manuellement
      const name = document.querySelector('input[name="name"]').value
      const phone = document.querySelector('input[name="phone"]').value
      const email = document.querySelector('input[name="email"]').value
      const address = document.querySelector('input[name="address"]').value
      const country = document.querySelector('input[name="country"]').value
      const city = document.querySelector('input[name="city"]').value
      const notes = document.querySelector('textarea[name="notes"]')?.value || ''

      // Vérifier les champs
      if (!name || !phone || !email || !address || !country) {
        alert("Veuillez remplir tous les champs obligatoires (*).")
        return
      }

      const customer = { name, phone, email, address, country, city, notes }

      // Ouvrir WhatsApp
      openWhatsApp(cart, customer)

      // Vider le panier et rediriger
      clearCart()
      setTimeout(() => {
        window.location.href = 'merci.html'
      }, 1000)
    })
  }
}

function renderSummary(cart, container) {
  if (!container) return

  const totalXof = cart.reduce((s, i) => s + i.priceXof * i.qty, 0)
  const totalEur = cart.reduce((s, i) => s + i.priceEur * i.qty, 0)

  const itemsHtml = cart.map(item => `
    <div class="flex gap-4 py-3">
      <img src="${item.image}" class="w-14 h-16 object-cover rounded bg-gold/10">
      <div>
        <p class="font-serif text-sm text-forest">${item.name}</p>
        <p class="text-xs text-ink/50">${item.size} × ${item.qty}</p>
        <p class="text-sm text-terracotta">${new Intl.NumberFormat('fr-FR').format(item.priceXof * item.qty)} FCFA</p>
      </div>
    </div>
  `).join('')

  container.innerHTML = `
    <h2 class="font-serif text-2xl text-forest mb-6">Votre commande</h2>
    <div class="space-y-2 max-h-96 overflow-y-auto pr-2">
      ${itemsHtml}
    </div>
    <div class="border-t border-ink/10 mt-4 pt-4">
      <div class="flex justify-between items-end">
        <span class="text-ink/60">Total</span>
        <div class="text-right">
          <p class="font-serif text-2xl text-forest">${new Intl.NumberFormat('fr-FR').format(totalXof)} FCFA</p>
          <p class="text-xs text-ink/50">≈ ${totalEur.toFixed(2)} €</p>
        </div>
      </div>
    </div>
  `
}