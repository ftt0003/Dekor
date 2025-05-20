/**
 * Sistema de gestión del carrito de compras
 */
class ShoppingCart {
  constructor() {
    this.items = this.loadCart()
    this.updateCartIcon()
  }

  /**
   * Carga el carrito desde localStorage
   */
  loadCart() {
    const savedCart = localStorage.getItem("dekor_cart")
    return savedCart ? JSON.parse(savedCart) : []
  }

  /**
   * Guarda el carrito en localStorage
   */
  saveCart() {
    localStorage.setItem("dekor_cart", JSON.stringify(this.items))
    this.updateCartIcon()
  }

  /**
   * Añade un producto al carrito
   */
  addToCart(productId, quantity = 1) {
    const product = getProductById(productId)

    if (!product) {
      console.error(`Producto con ID ${productId} no encontrado`)
      return false
    }

    // Verificar si el producto ya está en el carrito
    const existingItemIndex = this.items.findIndex((item) => item.id === productId)

    if (existingItemIndex !== -1) {
      // Actualizar cantidad si ya existe
      this.items[existingItemIndex].quantity += quantity
    } else {
      // Añadir nuevo item si no existe
      this.items.push({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
      })
    }

    this.saveCart()
    this.showNotification(`${product.name} añadido al carrito`)
    return true
  }

  /**
   * Elimina un producto del carrito
   */
  removeFromCart(productId) {
    const initialLength = this.items.length
    this.items = this.items.filter((item) => item.id !== Number.parseInt(productId))

    if (this.items.length !== initialLength) {
      this.saveCart()
      return true
    }
    return false
  }

  /**
   * Actualiza la cantidad de un producto en el carrito
   */
  updateQuantity(productId, quantity) {
    const item = this.items.find((item) => item.id === Number.parseInt(productId))

    if (item) {
      if (quantity <= 0) {
        return this.removeFromCart(productId)
      }

      item.quantity = quantity
      this.saveCart()
      return true
    }
    return false
  }

  /**
   * Vacía el carrito
   */
  clearCart() {
    this.items = []
    this.saveCart()
  }

  /**
   * Calcula el total del carrito
   */
  getTotal() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  /**
   * Obtiene el número total de productos en el carrito
   */
  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0)
  }

  /**
   * Actualiza el icono del carrito con la cantidad de productos
   */
  updateCartIcon() {
    const cartIcon = document.querySelector(".bi-bag")
    if (cartIcon) {
      const itemCount = this.getItemCount()

      // Eliminar badge anterior si existe
      const existingBadge = document.querySelector(".cart-badge")
      if (existingBadge) {
        existingBadge.remove()
      }

      // Añadir badge si hay productos
      if (itemCount > 0) {
        const badge = document.createElement("span")
        badge.className = "cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        badge.textContent = itemCount
        badge.style.fontSize = "0.6rem"
        badge.style.transform = "translate(-50%, -50%)"

        // Añadir badge al contenedor del icono
        const iconContainer = cartIcon.parentElement
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
    let notification = document.querySelector(".cart-notification")

    if (!notification) {
      // Crear nueva notificación
      notification = document.createElement("div")
      notification.className = "cart-notification toast align-items-center text-white bg-dark border-0"
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
   * Renderiza los productos del carrito en la página
   */
  renderCartItems() {
    const cartContent = document.querySelector(".carrito-content")

    if (!cartContent) return

    if (this.items.length === 0) {
      cartContent.innerHTML = `
        <h1 class="text-center text-secondary m-5">Todavía no hay nada en tu carrito.</h1>
      `
      return
    }

    let cartHTML = `
      <div class="container my-5">
        <h1 class="mb-4 text-center">Tu carrito</h1>
        <div class="row">
          <div class="col-lg-8">
    `

    // Productos
    this.items.forEach((item) => {
      cartHTML += `
        <div class="card mb-3 product-item" data-product-id="${item.id}">
          <div class="row g-0">
            <div class="col-md-3">
              <img src="${item.image}" class="img-fluid rounded-start product-image" alt="${item.name}">
            </div>
            <div class="col-md-9">
              <div class="card-body d-flex flex-column h-100">
                <div class="d-flex justify-content-between">
                  <h5 class="card-title">${item.name}</h5>
                  <button class="btn btn-sm text-danger remove-item" data-product-id="${item.id}">
                    <i class="bi bi-x-lg"></i>
                  </button>
                </div>
                <p class="card-text mb-2">${formatPrice(item.price)}</p>
                <div class="d-flex align-items-center mt-auto">
                  <div class="input-group input-group-sm" style="max-width: 120px;">
                    <button class="btn btn-outline-secondary decrease-quantity" data-product-id="${item.id}">-</button>
                    <input type="number" class="form-control text-center item-quantity" value="${item.quantity}" min="1" data-product-id="${item.id}">
                    <button class="btn btn-outline-secondary increase-quantity" data-product-id="${item.id}">+</button>
                  </div>
                  <span class="ms-auto fw-bold">${formatPrice(item.price * item.quantity)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
    })

    cartHTML += `
          </div>
          <div class="col-lg-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Resumen del pedido</h5>
                <hr>
                <div class="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>${formatPrice(this.getTotal())}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Gastos de envío</span>
                  <span>Calculado en el checkout</span>
                </div>
                <hr>
                <div class="d-flex justify-content-between mb-4">
                  <span class="fw-bold">Total</span>
                  <span class="fw-bold">${formatPrice(this.getTotal())}</span>
                </div>
                <button class="btn btn-dark w-100 mb-2">Finalizar compra</button>
                <button class="btn btn-outline-secondary w-100 clear-cart">Vaciar carrito</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `

    cartContent.innerHTML = cartHTML

    // Añadir event listeners
    this.addCartEventListeners()
  }

  /**
   * Añade event listeners a los elementos del carrito
   */
  addCartEventListeners() {
    // Eliminar producto
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.currentTarget.dataset.productId
        this.removeFromCart(Number.parseInt(productId))
        this.renderCartItems()
      })
    })

    // Vaciar carrito
    const clearCartButton = document.querySelector(".clear-cart")
    if (clearCartButton) {
      clearCartButton.addEventListener("click", () => {
        if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
          this.clearCart()
          this.renderCartItems()
        }
      })
    }

    // Incrementar cantidad
    document.querySelectorAll(".increase-quantity").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = Number.parseInt(e.currentTarget.dataset.productId)
        const itemIndex = this.items.findIndex((item) => item.id === productId)
        if (itemIndex !== -1) {
          this.items[itemIndex].quantity++
          this.saveCart()
          this.renderCartItems()
        }
      })
    })

    // Decrementar cantidad
    document.querySelectorAll(".decrease-quantity").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = Number.parseInt(e.currentTarget.dataset.productId)
        const itemIndex = this.items.findIndex((item) => item.id === productId)
        if (itemIndex !== -1 && this.items[itemIndex].quantity > 1) {
          this.items[itemIndex].quantity--
          this.saveCart()
          this.renderCartItems()
        }
      })
    })

    // Cambiar cantidad directamente
    document.querySelectorAll(".item-quantity").forEach((input) => {
      input.addEventListener("change", (e) => {
        const productId = Number.parseInt(e.currentTarget.dataset.productId)
        const quantity = Number.parseInt(e.currentTarget.value)
        if (quantity >= 1) {
          this.updateQuantity(productId, quantity)
          this.renderCartItems()
        } else {
          e.currentTarget.value = 1
        }
      })
    })
  }
}

// Inicializar carrito
const cart = new ShoppingCart()

// Renderizar carrito si estamos en la página del carrito
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("../cart.html")) {
    cart.renderCartItems()
  }
})

function getProductById(productId) {
  // Replace this with your actual product fetching logic
  // This is just a placeholder
  const products = [
    { id: 1, name: "Product 1", price: 20, image: "image1.jpg" },
    { id: 2, name: "Product 2", price: 30, image: "image2.jpg" },
    { id: 3, name: "Product 3", price: 40, image: "image3.jpg" },
  ]

  return products.find((product) => product.id === productId)
}

function formatPrice(price) {
  return "$" + price.toFixed(2)
}
