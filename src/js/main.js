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
// Définition des titres de pages
const pageConfig = {
  '/index.html': { title: 'Accueil', url: '/index.html' },
  '/indexEng.html': { title: 'Home', url: '/indexEng.html' },
  '/fr/rosalind-franklin.html': { title: 'Rosalind Franklin', url: '/fr/rosalind-franklin.html' },
  '/fr/femmes-science.html': { title: 'Les Femmes de Science', url: '/fr/femmes-science.html' },
  '/fr/vulgarisation-adn.html': { title: 'Vulgarisation de l\'ADN', url: '/fr/vulgarisation-adn.html' },
  '/fr/films-series.html': { title: 'Films et Séries', url: '/fr/films-series.html' },
  '/fr/la-mouche.html': { title: 'La Mouche', url: '/fr/la-mouche.html' },
  '/fr/genie-genes.html': { title: 'Le Génie des Gènes', url: '/fr/genie-genes.html' },
  '/fr/glossaire.html': { title: 'Glossaire', url: '/fr/glossaire.html' },
  '/fr/apropos.html': { title: 'À propos', url: '/fr/apropos.html' },
  '/fr/contact.html': { title: 'Contact', url: '/fr/contact.html' },
  '/fr/frise-matilda.html': { title: 'La Frise des Matilda', url: '/fr/frise-matilda.html' },
  '/en/rosalind-franklineng.html': { title: 'Rosalind Franklin', url: '/en/rosalind-franklineng.html' },
  '/en/femmes-scienceeng.html': { title: 'Women Scientists', url: '/en/femmes-scienceeng.html' },
  '/en/vulgarisation-adneng.html': { title: 'DNA Popularization', url: '/en/vulgarisation-adneng.html' },
  '/en/films-serieseng.html': { title: 'Films and Series', url: '/en/films-serieseng.html' },
  '/en/la-moucheeng.html': { title: 'The Fly', url: '/en/la-moucheeng.html' },
  '/en/genie-geneseng.html': { title: 'The Genius of Genes', url: '/en/genie-geneseng.html' },
  '/en/glossaireeng.html': { title: 'Glossary', url: '/en/glossaireeng.html' },
  '/en/aproposeng.html': { title: 'About', url: '/en/aproposeng.html' },
  '/en/contacteng.html': { title: 'Contact', url: '/en/contacteng.html' },
  '/en/frise-matildaeng.html': { title: 'The Matilda Timeline', url: '/en/frise-matildaeng.html' }
}

function updateBreadcrumb() {
  const breadcrumbList = document.querySelector('.breadcrumb__list')
  if (!breadcrumbList) return

  const currentPath = window.location.pathname
  const currentPage = pageConfig[currentPath]
  if (!currentPage) return

  // Récupérer l'historique stocké
  let history = JSON.parse(sessionStorage.getItem('pageHistory') || '[]')
  
  // Ajouter la page actuelle à l'historique si elle n'est pas déjà la dernière
  if (history.length === 0 || history[history.length - 1] !== currentPath) {
    history.push(currentPath)
    // Garder seulement les 3 dernières pages (pour avoir 2 pages précédentes + actuelle)
    if (history.length > 3) {
      history = history.slice(-3)
    }
    sessionStorage.setItem('pageHistory', JSON.stringify(history))
  }

  // Construire le fil d'Ariane
  const isEnglish = currentPath.includes('/en/') || currentPath.includes('Eng.html')
  const homeTitle = isEnglish ? 'Home' : 'Accueil'
  const homeUrl = isEnglish ? '/indexEng.html' : '/index.html'
  
  let breadcrumbHTML = `
    <li class="breadcrumb__item">
      <a href="${homeUrl}" class="breadcrumb__link">${homeTitle}</a>
    </li>
  `

  // Ajouter les pages précédentes (maximum 2)
  const previousPages = history.slice(0, -1).filter(path => path !== '/index.html' && path !== '/indexEng.html')
  
  previousPages.forEach(path => {
    const page = pageConfig[path]
    if (page) {
      breadcrumbHTML += `
        <li class="breadcrumb__item">
          <a href="${page.url}" class="breadcrumb__link">${page.title}</a>
        </li>
      `
    }
  })

  // Ajouter la page actuelle
  breadcrumbHTML += `
    <li class="breadcrumb__item breadcrumb__item--active">
      <span class="breadcrumb__current">${currentPage.title}</span>
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
