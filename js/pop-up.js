// Función para mostrar el popup de newsletter con retraso
function mostrarPopupNewsletterConRetraso() {
  // Comprobamos si ya se ha mostrado antes
  if (!localStorage.getItem("newsletterPopupMostrado")) {
    setTimeout(() => {
      document.getElementById("newsletter-popup").style.display = "flex";
      localStorage.setItem("newsletterPopupMostrado", "true");
    }, 5000); // 5 segundos de retraso
  }
}

// Función para cerrar el popup
function cerrarPopupNewsletter() {
  document.getElementById("newsletter-popup").style.display = "none";
}

// Función para validar y procesar la suscripción
function aceptarNewsletter() {
  const email = document.getElementById("newsletter-email").value.trim();
  const cookiesAceptadas = document.getElementById("newsletter-cookies").checked;
  const mensajeElement = document.getElementById("newsletter-message");
  
  // Validar email
  if (!email) {
    mensajeElement.textContent = "Por favor, introduce tu correo electrónico.";
    mensajeElement.className = "newsletter-message error";
    return;
  }
  
  // Validar formato de email con expresión regular
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    mensajeElement.textContent = "Por favor, introduce un correo electrónico válido.";
    mensajeElement.className = "newsletter-message error";
    return;
  }
  
  // Validar aceptación de cookies/política
  if (!cookiesAceptadas) {
    mensajeElement.textContent = "Debes aceptar nuestra política de privacidad para continuar.";
    mensajeElement.className = "newsletter-message error";
    return;
  }
  
  // Si todo es correcto, mostrar mensaje de éxito
  mensajeElement.textContent = "¡Gracias por suscribirte! Recibirás nuestras novedades pronto.";
  mensajeElement.className = "newsletter-message success";
  
  // Aquí podrías añadir código para enviar el email a tu servidor o servicio de newsletter
  
  // Cerrar el popup después de 3 segundos
  setTimeout(() => {
    cerrarPopupNewsletter();
    
    // Guardar en localStorage que el usuario ya está suscrito para no mostrar el popup de nuevo
    localStorage.setItem("newsletterSuscrito", "true");
  }, 3000);
}

// Inicializar cuando se carga la página
document.addEventListener("DOMContentLoaded", function() {
  // Solo mostramos el popup si el usuario no está ya suscrito
  if (!localStorage.getItem("newsletterSuscrito")) {
    mostrarPopupNewsletterConRetraso();
  }
  
  // Cerrar popup al hacer clic fuera del contenido
  document.getElementById("newsletter-popup").addEventListener("click", function(e) {
    if (e.target === this) {
      cerrarPopupNewsletter();
    }
  });
});