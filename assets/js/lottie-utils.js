/* ============================================================
   LOTTIE-UTILS.JS — Chargement des animations Lottie
   ============================================================ */

/**
 * Charge une animation Lottie dans un conteneur
 * @param {string} containerId - ID du div conteneur
 * @param {string} path - Chemin du fichier JSON
 * @param {Object} options - Options (loop, autoplay, etc.)
 */
export function loadLottie(containerId, path, options = {}) {
  const container = document.getElementById(containerId)
  if (!container) return

  return window.lottie.loadAnimation({
    container,
    renderer: 'svg',
    loop: options.loop ?? false,
    autoplay: options.autoplay ?? true,
    path,
  })
}

/**
 * Charge plusieurs Lotties d'un coup
 * @param {Array} list - [{ id, path, options }]
 */
export function loadMultipleLotties(list) {
  list.forEach(({ id, path, options }) => {
    loadLottie(id, path, options)
  })
}