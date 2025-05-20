/**
 * Funciones para la página de listado de productos
 */
document.addEventListener("DOMContentLoaded", () => {
  // Comprobar si estamos en una página de listado de productos
  const productListContainer = document.querySelector(".product-list")
  if (!productListContainer) return

  // Añadir event listeners para los botones de acción en cada producto
  function addProductEventListeners() {
    // Botones de añadir al carrito
    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault()
        const productId = e.currentTarget.dataset.productId

        if (window.cart) {
          window.cart.addToCart(Number.parseInt(productId))
        } else {
          console.error("El objeto cart no está disponible")
        }
      })
    })

    // Botones de favoritos
    document.querySelectorAll(".toggle-favorite-btn").forEach((button) => {
      const productId = Number.parseInt(button.dataset.productId)

      // Actualizar estado inicial del botón
      if (window.favorites && window.favorites.isInFavorites(productId)) {
        button.classList.add("active")
        button.querySelector("i").classList.remove("bi-heart")
        button.querySelector("i").classList.add("bi-heart-fill")
      }

      button.addEventListener("click", (e) => {
        e.preventDefault()

        if (window.favorites) {
          const isNowFavorite = window.favorites.toggleFavorite(productId)

          // Actualizar apariencia del botón
          if (isNowFavorite) {
            button.classList.add("active")
            button.querySelector("i").classList.remove("bi-heart")
            button.querySelector("i").classList.add("bi-heart-fill")
          } else {
            button.classList.remove("active")
            button.querySelector("i").classList.remove("bi-heart-fill")
            button.querySelector("i").classList.add("bi-heart")
          }
        } else {
          console.error("El objeto favorites no está disponible")
        }
      })
    })
  }

  // Inicializar event listeners
  addProductEventListeners()
})
