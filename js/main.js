/**
 * Script principal para inicializar funcionalidades
 */
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar los objetos cart y favorites (simulados para este ejemplo)
  const cart = {}
  const favorites = {}

  // Hacer disponibles globalmente los objetos cart y favorites
  window.cart = cart
  window.favorites = favorites

  // Inicializar menú lateral
  function toggleMenu() {
    const menuLateral = document.querySelector(".menu-lateral")
    const menuOverlay = document.querySelector(".menu-overlay")

    if (menuLateral) {
      menuLateral.classList.toggle("active")
    }

    if (menuOverlay) {
      menuOverlay.classList.toggle("active")
    } else {
      // Crear overlay si no existe
      const overlay = document.createElement("div")
      overlay.className = "menu-overlay"
      document.body.appendChild(overlay)

      // Añadir event listener para cerrar menú al hacer clic en overlay
      overlay.addEventListener("click", toggleMenu)

      // Activar overlay
      setTimeout(() => {
        overlay.classList.add("active")
      }, 10)
    }
  }

  // Asignar función toggleMenu al objeto window para que sea accesible desde HTML
  window.toggleMenu = toggleMenu

  // Añadir estilos CSS para los badges
  const style = document.createElement("style")
  style.textContent = `
    .cart-badge, .favorites-badge {
      font-size: 0.6rem !important;
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(25%, -25%);
    }
    
    .product-item {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .product-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
    
    .toggle-favorite-btn.active {
      color: #dc3545 !important;
    }
    
    .item-quantity {
      max-width: 50px;
    }
  `
  document.head.appendChild(style)
})
