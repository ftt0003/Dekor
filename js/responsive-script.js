/**
 * Script para mejorar la responsividad del sitio DEKOR
 */

document.addEventListener("DOMContentLoaded", () => {
  // Ajustar altura de elementos según el viewport
  adjustHeights()

  // Inicializar menú responsive
  initResponsiveMenu()

  // Inicializar popups responsive
  initResponsivePopups()

  // Escuchar cambios de tamaño de ventana
  window.addEventListener("resize", () => {
    adjustHeights()
  })
})

/**
 * Ajusta las alturas de elementos clave para mejor responsividad
 */
function adjustHeights() {
  const viewportHeight = window.innerHeight
  const viewportWidth = window.innerWidth

  // Ajustar altura del hero section
  const heroSection = document.querySelector("nav.navbar-expand-lg")
  if (heroSection) {
    if (viewportWidth < 768) {
      // En móviles, altura más pequeña
      heroSection.style.minHeight = "40vh"
    } else {
      // En desktop, altura completa
      heroSection.style.minHeight = "80vh"
    }
  }

  // Ajustar altura de las tarjetas de productos
  const productCards = document.querySelectorAll(".card")
  productCards.forEach((card) => {
    // Resetear altura para cálculo correcto
    card.style.height = ""

    // Asegurar que las imágenes tengan altura proporcional
    const cardImage = card.querySelector(".card-img-top")
    if (cardImage && viewportWidth < 768) {
      cardImage.style.maxHeight = "200px"
    } else if (cardImage) {
      cardImage.style.maxHeight = ""
    }
  })

  // Ajustar menú lateral
  const menuLateral = document.querySelector(".menu-lateral")
  if (menuLateral) {
    menuLateral.style.height = `${viewportHeight}px`
  }
}

/**
 * Inicializa el comportamiento del menú responsive
 */
function initResponsiveMenu() {
  const toggleButton = document.querySelector("button.toggle")
  const menuLateral = document.querySelector(".menu-lateral")
  const menuOverlay = document.querySelector(".menu-overlay")

  if (toggleButton && menuLateral) {
    // Crear overlay si no existe
    if (!menuOverlay) {
      const overlay = document.createElement("div")
      overlay.className = "menu-overlay"
      document.body.appendChild(overlay)

      // Cerrar menú al hacer clic en overlay
      overlay.addEventListener("click", () => {
        menuLateral.classList.remove("active")
        overlay.classList.remove("active")
        document.body.style.overflow = ""
      })
    }

    // Toggle del menú
    toggleButton.addEventListener("click", () => {
      menuLateral.classList.toggle("active")
      document.querySelector(".menu-overlay").classList.toggle("active")

      // Bloquear scroll cuando el menú está abierto en móviles
      if (window.innerWidth < 768) {
        if (menuLateral.classList.contains("active")) {
          document.body.style.overflow = "hidden"
        } else {
          document.body.style.overflow = ""
        }
      }
    })

    // Cerrar menú en enlaces
    const menuLinks = menuLateral.querySelectorAll("a")
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 768) {
          menuLateral.classList.remove("active")
          document.querySelector(".menu-overlay").classList.remove("active")
          document.body.style.overflow = ""
        }
      })
    })
  }
}

/**
 * Inicializa comportamiento responsive para popups
 */
function initResponsivePopups() {
  // Ajustar popups de newsletter y login
  const popups = document.querySelectorAll(".newsletter-popup, .login-modal")

  popups.forEach((popup) => {
    // Asegurar que el popup se cierre correctamente en móviles
    const closeButtons = popup.querySelectorAll(".close-popup")
    closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        popup.style.display = "none"
        document.body.style.overflow = ""
      })
    })

    // Cerrar al hacer clic fuera del contenido
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.style.display = "none"
        document.body.style.overflow = ""
      }
    })
  })

  // Ajustar cookie bar para mejor visualización en móviles
  const cookieBar = document.querySelector(".cookie-bar")
  if (cookieBar) {
    const cookieButtons = cookieBar.querySelectorAll(".cookie-button")

    // Reorganizar botones en móviles
    if (window.innerWidth < 768) {
      cookieButtons.forEach((button) => {
        button.style.width = "100%"
        button.style.marginBottom = "0.5rem"
      })
    }
  }
}

/**
 * Función para mostrar el popup de autenticación de manera responsive
 */
function mostrarPopupAuth() {
  const authPopup = document.getElementById("auth-popup")
  if (authPopup) {
    authPopup.style.display = "flex"

    // Bloquear scroll en móviles
    if (window.innerWidth < 768) {
      document.body.style.overflow = "hidden"
    }

    // Ajustar altura de la imagen según el dispositivo
    const popupImage = authPopup.querySelector(".newsletter-image")
    if (popupImage && window.innerWidth < 768) {
      popupImage.style.height = "200px"
    }
  }
}

/**
 * Función para cerrar el popup de autenticación
 */
function cerrarPopupAuth() {
  const authPopup = document.getElementById("auth-popup")
  if (authPopup) {
    authPopup.style.display = "none"
    document.body.style.overflow = ""
  }
}

/**
 * Función para mostrar el popup de newsletter de manera responsive
 */
function mostrarPopupNewsletter() {
  const newsletterPopup = document.getElementById("newsletter-popup")
  if (newsletterPopup) {
    newsletterPopup.style.display = "flex"

    // Bloquear scroll en móviles
    if (window.innerWidth < 768) {
      document.body.style.overflow = "hidden"
    }

    // Ajustar altura de la imagen según el dispositivo
    const popupImage = newsletterPopup.querySelector(".newsletter-image")
    if (popupImage && window.innerWidth < 768) {
      popupImage.style.height = "200px"
    }
  }
}

/**
 * Función para cerrar el popup de newsletter
 */
function cerrarPopupNewsletter() {
  const newsletterPopup = document.getElementById("newsletter-popup")
  if (newsletterPopup) {
    newsletterPopup.style.display = "none"
    document.body.style.overflow = ""
  }
}

/**
 * Función para cambiar entre pestañas de login/registro
 */
function mostrarTab(tabId) {
  // Ocultar todos los contenedores de formularios
  document.querySelectorAll(".auth-form-container").forEach((container) => {
    container.classList.remove("active")
  })

  // Desactivar todas las pestañas
  document.querySelectorAll(".auth-tab").forEach((tab) => {
    tab.classList.remove("active")
  })

  // Activar la pestaña seleccionada
  document.getElementById(`${tabId}-tab`).classList.add("active")

  // Mostrar el contenedor correspondiente
  document.getElementById(`${tabId}-form-container`).classList.add("active")
}

/**
 * Función para ajustar el menú vertical en la página de avisos legales
 */
function initLegalMenu() {
  const menuItems = document.querySelectorAll(".menu-vertical a")

  if (menuItems.length > 0) {
    // Añadir evento de clic a cada elemento del menú
    menuItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        // Eliminar la clase active de todos los elementos
        menuItems.forEach((i) => i.classList.remove("active"))

        // Añadir la clase active al elemento clicado
        this.classList.add("active")

        // Si estamos en móvil, hacer scroll suave al contenido
        if (window.innerWidth < 992) {
          const targetId = this.getAttribute("href").substring(1)
          const targetElement = document.getElementById(targetId)

          if (targetElement) {
            e.preventDefault()
            window.scrollTo({
              top: targetElement.offsetTop - 100,
              behavior: "smooth",
            })
          }
        }
      })
    })

    // Activar el primer elemento por defecto
    menuItems[0].classList.add("active")
  }
}

// Inicializar el menú legal si estamos en la página de avisos legales
if (document.querySelector(".container-legales")) {
  document.addEventListener("DOMContentLoaded", initLegalMenu)
}
