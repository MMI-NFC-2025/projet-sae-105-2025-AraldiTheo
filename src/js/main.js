// Mobile Navigation Toggle
const openNavBtn = document.getElementById("openNav")
const closeNavBtn = document.getElementById("closeNav")
const mobileNav = document.getElementById("mobileNav")
const headerLogo = document.querySelector(".header__logo")
let overlay = null

// Create overlay
function createOverlay() {
  overlay = document.createElement("div")
  overlay.className = "overlay"
  document.body.appendChild(overlay)
  overlay.addEventListener("click", closeMobileNav)
}

// Open mobile navigation
function openMobileNav() {
  if (!overlay) createOverlay()

  // Retirer l'attribut hidden pour ouvrir le menu
  mobileNav.removeAttribute("hidden")
  
  // Agrandir et changer la couleur du logo
  if (headerLogo) {
    headerLogo.classList.add("header__logo--extend")
  }
  
  // Afficher l'overlay
  overlay.classList.add("is-visible")
  
  // Bloquer le scroll
  document.body.style.overflow = "hidden"
}

// Close mobile navigation
function closeMobileNav() {
  // Ajouter l'attribut hidden pour fermer le menu
  mobileNav.setAttribute("hidden", "")
  
  // Remettre le logo à sa taille normale
  if (headerLogo) {
    headerLogo.classList.remove("header__logo--extend")
  }
  
  // Cacher l'overlay
  if (overlay) {
    overlay.classList.remove("is-visible")
  }
  
  // Réactiver le scroll
  document.body.style.overflow = ""
}

// Event Listeners
if (openNavBtn) {
  openNavBtn.addEventListener("click", openMobileNav)
}

if (closeNavBtn) {
  closeNavBtn.addEventListener("click", closeMobileNav)
}

// Fermer le menu avec la touche Échap
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !mobileNav.hasAttribute("hidden")) {
    closeMobileNav()
  }
})

// ===== Breadcrumb Navigation History =====
function updateBreadcrumb() {
  const breadcrumbList = document.querySelector('.breadcrumb__list')
  if (!breadcrumbList) return

  const currentPath = window.location.pathname
  
  // Récupérer le titre depuis le breadcrumb existant ou le h1
  const currentBreadcrumbText = document.querySelector('.breadcrumb__current')?.textContent
  const currentH1 = document.querySelector('.article__title, h1')?.textContent
  const currentTitle = currentBreadcrumbText || currentH1 || document.title
  
  // Déterminer si c'est la version anglaise
  const isEnglish = currentPath.includes('/en/') || currentPath.includes('Eng.html')
  const homeTitle = isEnglish ? 'Home' : 'Accueil'
  const homeUrl = isEnglish ? '/indexEng.html' : '/index.html'
  
  // Récupérer et mettre à jour l'historique
  let history = JSON.parse(sessionStorage.getItem('pageHistory') || '[]')
  
  // Ajouter la page actuelle avec son titre
  const currentPageData = { path: currentPath, title: currentTitle }
  
  if (history.length === 0 || history[history.length - 1].path !== currentPath) {
    history.push(currentPageData)
    // Garder seulement les 3 dernières pages
    if (history.length > 3) {
      history = history.slice(-3)
    }
    sessionStorage.setItem('pageHistory', JSON.stringify(history))
  }
  
  // Construire le fil d'Ariane
  let breadcrumbHTML = `
    <li class="breadcrumb__item">
      <a href="${homeUrl}" class="breadcrumb__link">${homeTitle}</a>
    </li>
  `
  
  // Ajouter les pages précédentes (sauf home et page actuelle)
  const previousPages = history.slice(0, -1).filter(page => 
    page.path !== '/index.html' && 
    page.path !== '/indexEng.html' &&
    page.path !== currentPath
  )
  
  previousPages.forEach(page => {
    breadcrumbHTML += `
      <li class="breadcrumb__item">
        <a href="${page.path}" class="breadcrumb__link">${page.title}</a>
      </li>
    `
  })
  
  // Ajouter la page actuelle
  breadcrumbHTML += `
    <li class="breadcrumb__item breadcrumb__item--active">
      <span class="breadcrumb__current">${currentTitle}</span>
    </li>
  `
  
  breadcrumbList.innerHTML = breadcrumbHTML
}

// Exécuter au chargement de la page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateBreadcrumb)
} else {
  updateBreadcrumb()
}

// ===== Video Click to Play =====
// Gérer tous les clics sur les vidéos pour les lancer
const videoIds = ['radioactiveVideo', 'lamoucheVideo', 'theflyVideo'];

videoIds.forEach(videoId => {
  const video = document.getElementById(videoId);
  if (video) {
    video.addEventListener('click', function() {
      if (this.paused) {
        this.play();
        this.setAttribute('controls', 'controls');
      } else {
        this.pause();
      }
    });
  }
});
