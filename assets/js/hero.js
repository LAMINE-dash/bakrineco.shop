/* ============================================================
   HERO.JS — Section Hero de la page d'accueil (Centré)
   ============================================================ */

export function renderHero() {
  const container = document.getElementById('hero')
  if (!container) return

  // Image de fond (Costume Bordeaux)
  const heroImage = 'https://wamrraarelxsmiksoqhe.supabase.co/storage/v1/object/public/products/costume-mandarin/WhatsApp%20Image%202026-09-22%20at%2019.40.45%20(1).jpeg'
  container.innerHTML = `
    <section class="relative min-h-[90vh] flex items-center justify-center bg-forest overflow-hidden">
      
      <!-- IMAGE DE FOND -->
      <div class="absolute inset-0 z-0">
        <img 
          src="${heroImage}" 
          alt="Bakrine & Co" 
          class="w-full h-full object-cover object-top"
        />
        <!-- VOILE SOMBRE POUR LIRE LE TEXTE -->
       <div class="absolute inset-0" style="background-color: rgba(27, 67, 50, 0.85);"></div>
      </div>

      <!-- CONTENU CENTRÉ -->
      <div class="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8 animate-fade-up">
        
        <!-- Eyebrow -->
        <div class="flex items-center justify-center gap-4 text-xs tracking-[0.4em] uppercase text-gold">
          <span class="w-12 h-px bg-gold"></span>
          <span>Collection 2026</span>
          <span class="w-12 h-px bg-gold"></span>
        </div>

        <!-- Titre -->
        <h1 class="font-serif text-5xl md:text-7xl lg:text-8xl text-cream leading-[1.1] text-balance">
        Chemise de luxe sur <br />
          <em class="italic text-gold font-light">mesure</em>
        </h1>

        <!-- Sous-titre -->
        <p class="text-lg md:text-xl text-cream/80 max-w-2xl mx-auto font-light">
         Des tenues uniques, tissées avec passion
        </p>

        <!-- Boutons -->
        <div class="flex flex-wrap justify-center gap-4 pt-4">
          <a href="boutique.html" class="inline-flex items-center gap-3 bg-terracotta hover:bg-terracotta-dark transition-all text-white px-8 py-4 rounded-full font-medium shadow-lg shadow-terracotta/30 hover:-translate-y-0.5">
            Découvrir la boutique
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="a-propos.html" class="inline-flex items-center gap-3 border border-cream/30 hover:border-cream/70 hover:bg-white/10 text-cream px-8 py-4 rounded-full font-medium transition-all backdrop-blur-sm">
            Notre histoire
          </a>
        </div>

      </div>
    </section>
  `
}