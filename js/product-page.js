/**
 * Funciones para la página de producto
 */
document.addEventListener("DOMContentLoaded", () => {
  // Comprobar si estamos en una página de producto
  const productContainer = document.querySelector(".product-detail")
  if (!productContainer) return

  // Obtener ID del producto de la URL
  const urlParams = new URLSearchParams(window.location.search)
  const productId = urlParams.get("id")

  if (!productId) {
    console.error("ID de producto no encontrado en la URL")
    return
  }

  // Mock function for getProductById (replace with your actual implementation)
  function getProductById(id) {
    // This is a placeholder.  In a real application, you would
    // fetch the product data from a database or API.
    console.warn("getProductById is a mock function. Replace with your actual implementation.")
    return { id: id, name: "Mock Product", price: 99.99 } // Example product
  }

  // Obtener datos del producto
  const product = getProductById(Number.parseInt(productId))
  if (!product) {
    console.error(`Producto con ID ${productId} no encontrado`)
    return
  }

  // Añadir event listeners para los botones de acción
  const addToCartBtn = document.getElementById("add-to-cart")
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      const quantityInput = document.getElementById("product-quantity")
      const quantity = quantityInput ? Number.parseInt(quantityInput.value) : 1

      if (window.cart) {
        window.cart.addToCart(productId, quantity)
      } else {
        console.error("El objeto cart no está disponible")
      }
    })
  }

  const addToFavoritesBtn = document.getElementById("add-to-favorites")
  if (addToFavoritesBtn) {
    // Actualizar estado inicial del botón
    if (window.favorites && window.favorites.isInFavorites(Number.parseInt(productId))) {
      addToFavoritesBtn.classList.add("active")
      addToFavoritesBtn.querySelector("i").classList.remove("bi-heart")
      addToFavoritesBtn.querySelector("i").classList.add("bi-heart-fill")
    }

    addToFavoritesBtn.addEventListener("click", () => {
      if (window.favorites) {
        const isNowFavorite = window.favorites.toggleFavorite(Number.parseInt(productId))

        // Actualizar apariencia del botón
        if (isNowFavorite) {
          addToFavoritesBtn.classList.add("active")
          addToFavoritesBtn.querySelector("i").classList.remove("bi-heart")
          addToFavoritesBtn.querySelector("i").classList.add("bi-heart-fill")
        } else {
          addToFavoritesBtn.classList.remove("active")
          addToFavoritesBtn.querySelector("i").classList.remove("bi-heart-fill")
          addToFavoritesBtn.querySelector("i").classList.add("bi-heart")
        }
      } else {
        console.error("El objeto favorites no está disponible")
      }
    })
  }
})
