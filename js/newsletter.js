// Funcionalidad unificada para el newsletter
document.addEventListener("DOMContentLoaded", () => {
  // Referencias a elementos
  const newsletterPopup = document.getElementById("newsletter-popup")
  const newsletterForm = document.getElementById("newsletter-form")
  const newsletterLink = document.getElementById("newsletter-link")
  const footerSubscribe = document.getElementById("footer-subscribe")
  const footerEmail = document.getElementById("footer-email")

  // Comprobar si ya se ha mostrado el popup o si el usuario ya está suscrito
  const newsletterShown = localStorage.getItem("newsletterShown")
  const newsletterSubscribed = localStorage.getItem("newsletterSubscribed")

  // Mostrar popup automáticamente después de 5 segundos si no se ha mostrado antes
  if (!newsletterShown && !newsletterSubscribed) {
    setTimeout(() => {
      mostrarPopupNewsletter()
      localStorage.setItem("newsletterShown", "true")
    }, 5000)
  }

  // Evento para mostrar el popup al hacer clic en el enlace del footer
  if (newsletterLink) {
    newsletterLink.addEventListener("click", (e) => {
      e.preventDefault()
      mostrarPopupNewsletter()
    })
  }

  // Evento para el botón de suscripción en el footer
  if (footerSubscribe) {
    footerSubscribe.addEventListener("click", () => {
      const email = footerEmail.value.trim()

      if (validarEmail(email)) {
        // Rellenar el email en el formulario del popup y mostrarlo
        if (document.getElementById("newsletter-email")) {
          document.getElementById("newsletter-email").value = email
        }
        mostrarPopupNewsletter()
        footerEmail.value = ""
      } else {
        showNotification("Por favor, introduce un email válido")
      }
    })
  }

  // Evento para el formulario del popup
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("newsletter-email").value.trim()
      const cookies = document.getElementById("newsletter-cookies").checked
      const mensajeElement = document.getElementById("newsletter-message")

      if (!validarEmail(email)) {
        mensajeElement.textContent = "Por favor, introduce un email válido"
        mensajeElement.className = "newsletter-message error"
        return
      }

      if (!cookies) {
        mensajeElement.textContent = "Debes aceptar recibir comunicaciones comerciales"
        mensajeElement.className = "newsletter-message error"
        return
      }

      // Aquí iría el código para enviar el email al servidor
      // Por ahora, simulamos una suscripción exitosa

      mensajeElement.textContent = "¡Gracias por suscribirte! Recibirás nuestras novedades pronto."
      mensajeElement.className = "newsletter-message success"

      // Guardar que el usuario está suscrito
      localStorage.setItem("newsletterSubscribed", "true")

      // Cerrar el popup después de 3 segundos
      setTimeout(() => {
        cerrarPopupNewsletter()
      }, 3000)
    })
  }
})

// Función para mostrar el popup
function mostrarPopupNewsletter() {
  const newsletterPopup = document.getElementById("newsletter-popup")
  if (newsletterPopup) {
    newsletterPopup.style.display = "flex"
  }
}

// Función para cerrar el popup
function cerrarPopupNewsletter() {
  const newsletterPopup = document.getElementById("newsletter-popup")
  if (newsletterPopup) {
    newsletterPopup.style.display = "none"
  }
}

// Función para validar email
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// Función para mostrar notificaciones
function showNotification(message, type = "info") {
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
