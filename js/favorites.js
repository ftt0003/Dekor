/**
 * Sistema de gestión de favoritos
 */
class Favorites {
  constructor() {
    this.items = this.loadFavorites()
    this.updateFavoritesIcon()
  }

  /**
   * Carga los favoritos desde localStorage
   */
  loadFavorites() {
    const savedFavorites = localStorage.getItem("dekor_favorites")
    return savedFavorites ? JSON.parse(savedFavorites) : []
  }

  /**
   * Guarda los favoritos en localStorage
   */
  saveFavorites() {
    localStorage.setItem("dekor_favorites", JSON.stringify(this.items))
    this.updateFavoritesIcon()
  }

  /**
   * Añade un producto a favoritos
   */
  addToFavorites(productId) {
    const product = getProductById(productId)

    if (!product) {
      console.error(`Producto con ID ${productId} no encontrado`)
      return false
    }

    // Verificar si el producto ya está en favoritos
    if (!this.isInFavorites(productId)) {
      this.items.push({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
      })

      this.saveFavorites()
      this.showNotification(`${product.name} añadido a favoritos`)
      return true
    }

    return false
  }

  /**
   * Elimina un producto de favoritos
   */
  removeFromFavorites(productId) {
    const initialLength = this.items.length
    this.items = this.items.filter((item) => item.id !== Number.parseInt(productId))

    if (this.items.length !== initialLength) {
      this.saveFavorites()
      return true
    }
    return false
  }

  /**
   * Comprueba si un producto está en favoritos
   */
  isInFavorites(productId) {
    return this.items.some((item) => item.id === Number.parseInt(productId))
  }

  /**
   * Alterna el estado de favorito de un producto
   */
  toggleFavorite(productId) {
    if (this.isInFavorites(productId)) {
      return this.removeFromFavorites(productId)
    } else {
      return this.addToFavorites(productId)
    }
  }

  /**
   * Actualiza el icono de favoritos con la cantidad
   */
  updateFavoritesIcon() {
    const favIcon = document.querySelector(".bi-heart-fill")
    if (favIcon) {
      const itemCount = this.items.length

      // Eliminar badge anterior si existe
      const existingBadge = document.querySelector(".favorites-badge")
      if (existingBadge) {
        existingBadge.remove()
      }

      // Añadir badge si hay productos
      if (itemCount > 0) {
        const badge = document.createElement("span")
        badge.className =
          "favorites-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        badge.textContent = itemCount
        badge.style.fontSize = "0.6rem"
        badge.style.transform = "translate(-50%, -50%)"

        // Añadir badge al contenedor del icono
        const iconContainer = favIcon.parentElement
        iconContainer.style.position = "relative"
        iconContainer.appendChild(badge)
      }
    }
  }

  /**
   * Muestra una notificación temporal
   */
  showNotification(message) {
    // Comprobar si ya existe una notificación
    let notification = document.querySelector(".favorites-notification")

    if (!notification) {
      // Crear nueva notificación
      notification = document.createElement("div")
      notification.className = "favorites-notification toast align-items-center text-white bg-dark border-0"
      notification.setAttribute("role", "alert")
      notification.setAttribute("aria-live", "assertive")
      notification.setAttribute("aria-atomic", "true")
      notification.style.position = "fixed"
      notification.style.bottom = "20px"
      notification.style.right = "20px"
      notification.style.zIndex = "1050"

      notification.innerHTML = `
        <div class="d-flex">
          <div class="toast-body">
            ${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      `

      document.body.appendChild(notification)
    } else {
      // Actualizar mensaje de notificación existente
      notification.querySelector(".toast-body").textContent = message
    }

    // Mostrar notificación
    const toast = new bootstrap.Toast(notification, { delay: 3000 })
    toast.show()

    // Eliminar notificación después de ocultarse
    notification.addEventListener("hidden.bs.toast", () => {
      notification.remove()
    })
  }

  /**
   * Renderiza los productos favoritos en la página
   */
  renderFavoriteItems() {
    const favoritesContent = document.querySelector(".favoritos-content")

    if (!favoritesContent) return

    if (this.items.length === 0) {
      favoritesContent.innerHTML = `
        <h1 class="text-center text-secondary m-5">Todavía no hay nada entre tus favoritos.</h1>
      `
      return
    }

    let favoritesHTML = `
      <div class="container my-5">
        <h1 class="mb-4 text-center">Tus favoritos</h1>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
    `

    // Productos
    this.items.forEach((item) => {
      favoritesHTML += `
        <div class="col">
          <div class="card h-100 product-item" data-product-id="${item.id}">
            <div class="position-relative">
              <img src="${item.image}" class="card-img-top product-image" alt="${item.name}">
              <button class="btn btn-sm position-absolute top-0 end-0 m-2 text-danger remove-favorite" data-product-id="${item.id}">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">${formatPrice(item.price)}</p>
              <div class="d-flex justify-content-between align-items-center mt-3">
                <button class="btn btn-dark add-to-cart-from-favorites" data-product-id="${item.id}">
                  <i class="bi bi-bag-plus me-1"></i> Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      `
    })

    favoritesHTML += `
        </div>
      </div>
    `

    favoritesContent.innerHTML = favoritesHTML

    // Añadir event listeners
    this.addFavoritesEventListeners()
  }

  /**
   * Añade event listeners a los elementos de favoritos
   */
  addFavoritesEventListeners() {
    // Eliminar de favoritos
    document.querySelectorAll(".remove-favorite").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.currentTarget.dataset.productId
        this.removeFromFavorites(Number.parseInt(productId))
        this.renderFavoriteItems()
      })
    })

    // Añadir al carrito desde favoritos
    document.querySelectorAll(".add-to-cart-from-favorites").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = Number.parseInt(e.currentTarget.dataset.productId)
        if (window.cart) {
          window.cart.addToCart(productId)
        } else {
          console.error("El objeto cart no está disponible")
        }
      })
    })
  }
}

// Inicializar favoritos
const favorites = new Favorites()

// Renderizar favoritos si estamos en la página de favoritos
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("favoritos.html")) {
    favorites.renderFavoriteItems()
  }
})

// Mock functions to avoid errors. In a real project, these would be defined elsewhere.
function getProductById(productId) {
  console.warn("getProductById is a mock function.  Ensure this is defined elsewhere in your project.")
  return { id: productId, name: "Mock Product", price: 10, image: "mock.jpg" }
}

function formatPrice(price) {
  console.warn("formatPrice is a mock function. Ensure this is defined elsewhere in your project.")
  return `$${price.toFixed(2)}`
}

// Mock bootstrap object
const bootstrap = {
  Toast: class {
    constructor(element, options) {
      this.element = element
      this.options = options
    }
    show() {
      console.log("Toast shown", this.element, this.options)
      setTimeout(() => {
        this.element.dispatchEvent(new Event("hidden.bs.toast"))
      }, this.options.delay)
    }
  },
}
