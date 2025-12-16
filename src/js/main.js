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
