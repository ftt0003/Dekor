// Función para manejar el menú lateral
function toggleMenu() {
  const menuLateral = document.createElement("div")
  menuLateral.className = "menu-lateral"

  // Verificar si el menú ya existe
  if (document.querySelector(".menu-lateral")) {
    document.querySelector(".menu-lateral").classList.toggle("active")
    document.querySelector(".menu-overlay").classList.toggle("active")
    return
  }

  // Crear el contenido del menú
  menuLateral.innerHTML = `
        <div class="p-3">
            <button class="btn-close float-end" onclick="toggleMenu()"></button>
            <h5 class="mb-4 mt-3">Menú</h5>
            <ul class="list-unstyled">
                <li><a href="index.html">Inicio</a></li>
                <li><a href="category/salon.html">Categorías</a></li>
                <li><a href="quienessomos.html">Quiénes Somos</a></li>
                <li><a href="contactanos.html">Contacto</a></li>
            </ul>
            
            <h5 class="mb-3 mt-4">Categorías</h5>
            <ul class="list-unstyled">
                <li><a href="category/salon.html">Salón</a></li>
                <li><a href="category/cocina.html">Cocina</a></li>
                <li><a href="category/habitacion.html">Habitación</a></li>
                <li><a href="category/bano.html">Baño</a></li>
            </ul>
        </div>
    `

  // Crear overlay para cerrar el menú al hacer clic fuera
  const overlay = document.createElement("div")
  overlay.className = "menu-overlay"
  overlay.addEventListener("click", toggleMenu)

  // Añadir el menú y el overlay al body
  document.body.appendChild(menuLateral)
  document.body.appendChild(overlay)

  // Activar el menú después de añadirlo (para la animación)
  setTimeout(() => {
    menuLateral.classList.add("active")
    overlay.classList.add("active")
  }, 10)
}

// Gestión de cookies
document.addEventListener("DOMContentLoaded", () => {
  // Mostrar la barra de cookies si no se han aceptado
  if (!localStorage.getItem("cookiesAccepted")) {
    setTimeout(() => {
      const cookieBar = document.getElementById("cookie-bar")
      if (cookieBar) {
        cookieBar.classList.add("show")
      }
    }, 1000)
  }

  // Botones de cookies
  const acceptAllBtn = document.getElementById("cookie-accept-all")
  const acceptNecessaryBtn = document.getElementById("cookie-accept-necessary")
  const configureBtn = document.getElementById("cookie-configure")

  if (acceptAllBtn) {
    acceptAllBtn.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "all")
      document.getElementById("cookie-bar").classList.remove("show")
    })
  }

  if (acceptNecessaryBtn) {
    acceptNecessaryBtn.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "necessary")
      document.getElementById("cookie-bar").classList.remove("show")
    })
  }

  if (configureBtn) {
    configureBtn.addEventListener("click", () => {
      showCookieModal()
    })
  }

  // Inicializar funcionalidades específicas según la página
  initPageSpecificFunctions()

  // Inicializar el botón de login
  const loginButton = document.getElementById("login-button")
  if (loginButton) {
    loginButton.addEventListener("click", (e) => {
      e.preventDefault()
      const loginModal = document.getElementById("login-modal")
      if (loginModal) {
        loginModal.style.display = "block"
        document.body.style.overflow = "hidden" // Evitar scroll en el fondo
      }
    })
  }

  // Cerrar el modal de login al hacer clic en la X
  const closeLoginModal = document.querySelector(".close-login-modal")
  if (closeLoginModal) {
    closeLoginModal.addEventListener("click", () => {
      document.getElementById("login-modal").style.display = "none"
      document.body.style.overflow = "auto" // Restaurar scroll
    })
  }

  // Cerrar el modal de login al hacer clic fuera del contenido
  window.addEventListener("click", (event) => {
    const loginModal = document.getElementById("login-modal")
    if (event.target === loginModal) {
      loginModal.style.display = "none"
      document.body.style.overflow = "auto" // Restaurar scroll
    }
  })
})

// Mostrar modal de configuración de cookies
function showCookieModal() {
  // Crear el modal si no existe
  if (!document.querySelector(".cookie-modal")) {
    const modal = document.createElement("div")
    modal.className = "cookie-modal"
    modal.innerHTML = `
            <div class="modal-content">
                <h3>Configuración de Cookies</h3>
                <p>Selecciona qué tipos de cookies deseas aceptar:</p>
                
                <div class="cookie-option">
                    <div class="option-header">
                        <input type="checkbox" id="necessary-cookies" checked disabled>
                        <label for="necessary-cookies">Cookies Necesarias</label>
                    </div>
                    <div class="option-description">
                        Estas cookies son esenciales para el funcionamiento básico del sitio.
                    </div>
                </div>
                
                <div class="cookie-option">
                    <div class="option-header">
                        <input type="checkbox" id="analytics-cookies">
                        <label for="analytics-cookies">Cookies Analíticas</label>
                    </div>
                    <div class="option-description">
                        Nos ayudan a entender cómo interactúas con el sitio web.
                    </div>
                </div>
                
                <div class="cookie-option">
                    <div class="option-header">
                        <input type="checkbox" id="marketing-cookies">
                        <label for="marketing-cookies">Cookies de Marketing</label>
                    </div>
                    <div class="option-description">
                        Utilizadas para rastrear a los visitantes en los sitios web.
                    </div>
                </div>
                
                <div class="modal-buttons">
                    <button class="cookie-button save" id="save-cookie-preferences">Guardar preferencias</button>
                    <button class="cookie-button cancel" id="cancel-cookie-modal">Cancelar</button>
                </div>
            </div>
        `

    document.body.appendChild(modal)

    // Añadir eventos a los botones
    document.getElementById("save-cookie-preferences").addEventListener("click", () => {
      const preferences = {
        necessary: true,
        analytics: document.getElementById("analytics-cookies").checked,
        marketing: document.getElementById("marketing-cookies").checked,
      }

      localStorage.setItem("cookiePreferences", JSON.stringify(preferences))
      localStorage.setItem("cookiesAccepted", "custom")

      document.querySelector(".cookie-modal").classList.remove("show")
      document.getElementById("cookie-bar").classList.remove("show")
    })

    document.getElementById("cancel-cookie-modal").addEventListener("click", () => {
      document.querySelector(".cookie-modal").classList.remove("show")
    })
  }

  // Mostrar el modal
  document.querySelector(".cookie-modal").classList.add("show")
}

// Funcionalidad de favoritos
function initFavorites() {
  // Cargar favoritos guardados
  const favorites = JSON.parse(localStorage.getItem("favorites")) || []

  // Si estamos en la página de favoritos, mostrar los productos
  if (window.location.pathname.includes("favoritos.html")) {
    const favoritesContent = document.querySelector(".favoritos-content")

    if (favorites.length === 0) {
      // Mostrar mensaje de que no hay favoritos
      favoritesContent.innerHTML = `
                <h1 class="text-center text-secondary m-5">Todavía no hay nada entre tus favoritos.</h1>
            `
    } else {
      // Mostrar los productos favoritos
      favoritesContent.innerHTML = `
                <div class="product-container">
                    <h1 class="text-center mb-4">Mis Favoritos</h1>
                    <div class="product-list"></div>
                </div>
            `

      const productList = favoritesContent.querySelector(".product-list")

      favorites.forEach((product) => {
        const productItem = document.createElement("div")
        productItem.className = "product-item"
        productItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-details">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p class="fw-bold">${product.price}</p>
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-outline-dark add-to-cart" data-id="${product.id}">
                            <i class="bi bi-bag-plus"></i> Añadir al carrito
                        </button>
                        <button class="btn btn-outline-danger remove-favorite" data-id="${product.id}">
                            <i class="bi bi-heart-fill"></i> Eliminar
                        </button>
                    </div>
                `

        productList.appendChild(productItem)
      })

      // Añadir eventos a los botones
      document.querySelectorAll(".remove-favorite").forEach((button) => {
        button.addEventListener("click", function () {
          const productId = this.getAttribute("data-id")
          removeFavorite(productId)
          this.closest(".product-item").remove()

          // Si no quedan favoritos, mostrar mensaje
          if (document.querySelectorAll(".product-item").length === 0) {
            favoritesContent.innerHTML = `
                            <h1 class="text-center text-secondary m-5">Todavía no hay nada entre tus favoritos.</h1>
                        `
          }
        })
      })

      document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", function () {
          const productId = this.getAttribute("data-id")
          const product = favorites.find((p) => p.id === productId)
          addToCart(product)
          this.innerHTML = '<i class="bi bi-check"></i> Añadido'
          this.disabled = true
          this.classList.remove("btn-outline-dark")
          this.classList.add("btn-success")

          setTimeout(() => {
            this.innerHTML = '<i class="bi bi-bag-plus"></i> Añadir al carrito'
            this.disabled = false
            this.classList.remove("btn-success")
            this.classList.add("btn-outline-dark")
          }, 2000)
        })
      })
    }
  }
}

// Añadir a favoritos
function addToFavorites(product) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || []

  // Verificar si el producto ya está en favoritos
  if (!favorites.some((p) => p.id === product.id)) {
    favorites.push(product)
    localStorage.setItem("favorites", JSON.stringify(favorites))

    // Mostrar notificación
    showNotification("Producto añadido a favoritos")
  }
}

// Eliminar de favoritos
function removeFavorite(productId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || []
  favorites = favorites.filter((p) => p.id !== productId)
  localStorage.setItem("favorites", JSON.stringify(favorites))
}

// Funcionalidad de carrito
function initCart() {
  // Cargar carrito guardado
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  // Si estamos en la página del carrito, mostrar los productos
  if (window.location.pathname.includes("carrito.html")) {
    const carritoContent = document.querySelector(".carrito-content")

    if (cart.length === 0) {
      // Mostrar mensaje de que no hay productos en el carrito
      carritoContent.innerHTML = `
                <h1 class="text-center text-secondary m-5">Todavía no hay nada en tu carrito.</h1>
            `
    } else {
      // Mostrar los productos del carrito
      carritoContent.innerHTML = `
                <div class="product-container">
                    <h1 class="text-center mb-4">Mi Carrito</h1>
                    <div class="product-list"></div>
                    <div class="cart-summary mt-4">
                        <div class="d-flex justify-content-between">
                            <h4>Total:</h4>
                            <h4 id="cart-total">0.00 €</h4>
                        </div>
                        <button class="btn btn-dark w-100 mt-3">Proceder al pago</button>
                    </div>
                </div>
            `

      const productList = carritoContent.querySelector(".product-list")
      let total = 0

      cart.forEach((item) => {
        const productItem = document.createElement("div")
        productItem.className = "product-item"

        // Calcular subtotal
        const subtotal = Number.parseFloat(item.price.replace("€", "").trim()) * item.quantity
        total += subtotal

        productItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="product-image">
                    <div class="product-details">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <p class="fw-bold">${item.price}</p>
                    </div>
                    <div class="product-quantity">
                        <div class="input-group">
                            <button class="btn btn-outline-secondary decrease-quantity" data-id="${item.id}">-</button>
                            <input type="number" class="form-control text-center quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                            <button class="btn btn-outline-secondary increase-quantity" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <div class="product-subtotal text-end">
                        <p class="fw-bold">${subtotal.toFixed(2)} €</p>
                        <button class="btn btn-outline-danger remove-from-cart" data-id="${item.id}">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                `

        productList.appendChild(productItem)
      })

      // Actualizar total
      document.getElementById("cart-total").textContent = total.toFixed(2) + " €"

      // Añadir eventos a los botones
      document.querySelectorAll(".remove-from-cart").forEach((button) => {
        button.addEventListener("click", function () {
          const productId = this.getAttribute("data-id")
          removeFromCart(productId)
          this.closest(".product-item").remove()

          // Actualizar total
          updateCartTotal()

          // Si no quedan productos, mostrar mensaje
          if (document.querySelectorAll(".product-item").length === 0) {
            carritoContent.innerHTML = `
                            <h1 class="text-center text-secondary m-5">Todavía no hay nada en tu carrito.</h1>
                        `
          }
        })
      })

      // Eventos para cambiar cantidad
      document.querySelectorAll(".decrease-quantity").forEach((button) => {
        button.addEventListener("click", function () {
          const productId = this.getAttribute("data-id")
          const input = document.querySelector(`.quantity-input[data-id="${productId}"]`)
          if (Number.parseInt(input.value) > 1) {
            input.value = Number.parseInt(input.value) - 1
            updateCartItemQuantity(productId, Number.parseInt(input.value))
            updateCartTotal()
          }
        })
      })

      document.querySelectorAll(".increase-quantity").forEach((button) => {
        button.addEventListener("click", function () {
          const productId = this.getAttribute("data-id")
          const input = document.querySelector(`.quantity-input[data-id="${productId}"]`)
          input.value = Number.parseInt(input.value) + 1
          updateCartItemQuantity(productId, Number.parseInt(input.value))
          updateCartTotal()
        })
      })

      document.querySelectorAll(".quantity-input").forEach((input) => {
        input.addEventListener("change", function () {
          const productId = this.getAttribute("data-id")
          if (Number.parseInt(this.value) < 1) {
            this.value = 1
          }
          updateCartItemQuantity(productId, Number.parseInt(this.value))
          updateCartTotal()
        })
      })
    }
  }
}

// Añadir al carrito
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  // Verificar si el producto ya está en el carrito
  const existingItem = cart.find((item) => item.id === product.id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      ...product,
      quantity: 1,
    })
  }

  localStorage.setItem("cart", JSON.stringify(cart))

  // Mostrar notificación
  showNotification("Producto añadido al carrito")
}

// Eliminar del carrito
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || []
  cart = cart.filter((item) => item.id !== productId)
  localStorage.setItem("cart", JSON.stringify(cart))
}

// Actualizar cantidad de un producto en el carrito
function updateCartItemQuantity(productId, quantity) {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const item = cart.find((item) => item.id === productId)

  if (item) {
    item.quantity = quantity
    localStorage.setItem("cart", JSON.stringify(cart))

    // Actualizar subtotal en la interfaz
    const productItem = document
      .querySelector(`.product-item .quantity-input[data-id="${productId}"]`)
      .closest(".product-item")
    const subtotalElement = productItem.querySelector(".product-subtotal p")
    const price = Number.parseFloat(item.price.replace("€", "").trim())
    const subtotal = price * quantity
    subtotalElement.textContent = subtotal.toFixed(2) + " €"
  }
}

// Actualizar total del carrito
function updateCartTotal() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  let total = 0

  cart.forEach((item) => {
    const price = Number.parseFloat(item.price.replace("€", "").trim())
    total += price * item.quantity
  })

  const totalElement = document.getElementById("cart-total")
  if (totalElement) {
    totalElement.textContent = total.toFixed(2) + " €"
  }
}

// Mostrar notificación
function showNotification(message) {
  // Crear elemento de notificación si no existe
  if (!document.querySelector(".notification")) {
    const notification = document.createElement("div")
    notification.className = "notification"
    notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #333;
            color: white;
            padding: 10px 20px;
            border-radius: 4px;
            z-index: 10000;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s ease, transform 0.3s ease;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        `

    document.body.appendChild(notification)
  }

  const notification = document.querySelector(".notification")
  notification.textContent = message

  // Mostrar notificación
  notification.style.opacity = "1"
  notification.style.transform = "translateY(0)"

  // Ocultar después de 3 segundos
  setTimeout(() => {
    notification.style.opacity = "0"
    notification.style.transform = "translateY(20px)"
  }, 3000)
}

// Inicializar funciones específicas según la página
function initPageSpecificFunctions() {
  // Inicializar favoritos
  initFavorites()

  // Inicializar carrito
  initCart()

  // Inicializar formulario de registro
  if (window.location.pathname.includes("registro.html")) {
    const form = document.querySelector("form")
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault()

        // Validar formulario
        const nombre = document.getElementById("nombre").value
        const apellidos = document.getElementById("apellidos").value
        const email = document.getElementById("email").value
        const contraseña = document.getElementById("contraseña").value
        const telefono = document.getElementById("telefono").value
        const politicaPrivacidad = document.getElementById("politica-privacidad").checked

        if (!nombre || !apellidos || !email || !contraseña || !telefono) {
          showNotification("Por favor, completa todos los campos")
          return
        }

        if (!politicaPrivacidad) {
          showNotification("Debes aceptar la política de privacidad")
          return
        }

        // Simular registro exitoso
        showNotification("Registro completado con éxito")

        // Limpiar formulario
        form.reset()
      })
    }
  }
}

// Inicializar cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  // Añadir productos de ejemplo para probar la funcionalidad
  const exampleProducts = [
    {
      id: "1",
      name: "Jarrón Marea",
      description: "Jarrón Ondulado",
      price: "49.99 €",
      image: "fotos/Jarrón Marea.jpg",
    },
    {
      id: "2",
      name: "Orón",
      description: "Posa-lámparas Circular",
      price: "39.99 €",
      image: "fotos/Posa-lámpara Orón.jpg",
    },
    {
      id: "3",
      name: "Nudillos",
      description: "Portavelas Escultórico",
      price: "29.99 €",
      image: "fotos/Porta velas Nudillos 2.jpg",
    },
    {
      id: "4",
      name: "Perla",
      description: "Frutero Negro",
      price: "59.99 €",
      image: "fotos/Frutero Perla 3 (negro).jpg",
    },
  ]

  // Guardar productos de ejemplo en localStorage para pruebas
  localStorage.setItem("exampleProducts", JSON.stringify(exampleProducts))

  // Añadir eventos a los botones de añadir a favoritos y carrito en la página de productos
  document.querySelectorAll(".add-to-favorites").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-id")
      const products = JSON.parse(localStorage.getItem("exampleProducts"))
      const product = products.find((p) => p.id === productId)

      if (product) {
        addToFavorites(product)
      }
    })
  })

  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-id")
      const products = JSON.parse(localStorage.getItem("exampleProducts"))
      const product = products.find((p) => p.id === productId)

      if (product) {
        addToCart(product)
      }
    })
  })
})
