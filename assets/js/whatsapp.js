/* ============================================================
   WHATSAPP.JS — Génération de la commande
   ============================================================ */

const WHATSAPP_NUMBER = '33765263917' // Votre numéro

export function buildWhatsAppMessage(cart, customer) {
  const lines = []

  lines.push('🌍 *NOUVELLE COMMANDE — Bakrine & Co*')
  lines.push('━━━━━━━━━━━━━━━━━━━━')
  lines.push('')
  lines.push(`📅 ${new Date().toLocaleDateString('fr-FR')}`)
  lines.push('')

  // Infos client
  lines.push('👤 *CLIENT*')
  lines.push(`▸ Nom : ${customer.name}`)
  lines.push(`▸ Tél : ${customer.phone}`)
  lines.push(`▸ Email : ${customer.email}`)
  lines.push(`▸ Adresse : ${customer.address}`)
  lines.push(`▸ Pays : ${customer.country}`)
  if (customer.city) lines.push(`▸ Ville : ${customer.city}`)
  if (customer.notes) lines.push(`▸ Notes : ${customer.notes}`)
  lines.push('')

  // Articles
  lines.push(`🛍️ *ARTICLES (${cart.length})*`)
  lines.push('━━━━━━━━━━━━━━━━━━━━')
  cart.forEach((item, i) => {
    lines.push(`${i + 1}️⃣ ${item.name}`)
    lines.push(`   Taille ${item.size} | Qté ${item.qty} | ${new Intl.NumberFormat('fr-FR').format(item.priceXof * item.qty)} FCFA`)
    lines.push('')
  })

  // Total
  const totalXof = cart.reduce((s, i) => s + i.priceXof * i.qty, 0)
  const totalEur = cart.reduce((s, i) => s + i.priceEur * i.qty, 0)

  lines.push('💰 *TOTAL*')
  lines.push('━━━━━━━━━━━━━━━━━━━━')
  lines.push('Livraison : OFFERTE 🎉')
  lines.push(`*TOTAL : ${new Intl.NumberFormat('fr-FR').format(totalXof)} FCFA*`)
  lines.push(`_(≈ ${totalEur.toFixed(2)} €)_`)
  lines.push('')
  lines.push('✅ Merci de confirmer la disponibilité et le mode de paiement 🙏')

  return lines.join('\n')
}

export function openWhatsApp(cart, customer) {
  const message = buildWhatsAppMessage(cart, customer)
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
}
