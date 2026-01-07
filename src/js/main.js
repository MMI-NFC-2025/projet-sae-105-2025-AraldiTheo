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

// ===== Simple Carousel =====
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');
  
  if (!slides.length || !prevBtn || !nextBtn) return;
  
  let currentIndex = 0;
  
  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.dot');
  
  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.classList.remove('active', 'prev');
      if (index === currentIndex) {
        slide.classList.add('active');
      } else if (index < currentIndex) {
        slide.classList.add('prev');
      }
    });
    
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  function goToSlide(index) {
    currentIndex = index;
    updateSlides();
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlides();
  }
  
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlides();
  }
  
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
  
  // Auto-play
  let autoPlayInterval = setInterval(nextSlide, 5000);
  
  // Pause on hover
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
      clearInterval(autoPlayInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
      autoPlayInterval = setInterval(nextSlide, 5000);
    });
  }
  
  // Touch support
  let touchStartX = 0;
  let touchEndX = 0;
  
  if (carouselContainer) {
    carouselContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    carouselContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  }
  
  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
      prevSlide();
    }
  }
});
