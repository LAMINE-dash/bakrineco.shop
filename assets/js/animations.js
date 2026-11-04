// animations.js
document.addEventListener('DOMContentLoaded', () => {
  // Animation d'apparition au scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0')
        entry.target.classList.remove('opacity-0', 'translate-y-10')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  // On cible les sections à animer
  setTimeout(() => {
    document.querySelectorAll('section, .group, .reveal').forEach(el => {
      el.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10')
      observer.observe(el)
    })
  }, 200)
})
