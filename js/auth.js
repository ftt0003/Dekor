// Funciones para el popup de autenticación
function mostrarPopupAuth() {
  const authPopup = document.getElementById("auth-popup");
  if (authPopup) {
    authPopup.style.display = "flex";
    document.body.style.overflow = "hidden"; // Evitar scroll en el fondo
  }
}

function cerrarPopupAuth() {
  const authPopup = document.getElementById("auth-popup");
  if (authPopup) {
    authPopup.style.display = "none";
    document.body.style.overflow = "auto"; // Restaurar scroll
  }
}

function mostrarTab(tab) {
  // Ocultar todos los contenedores de formularios
  document.querySelectorAll('.auth-form-container').forEach(container => {
    container.classList.remove('active');
  });
  
  // Desactivar todas las pestañas
  document.querySelectorAll('.auth-tab').forEach(tabBtn => {
    tabBtn.classList.remove('active');
  });
  
  // Activar la pestaña seleccionada
  document.getElementById(`${tab}-tab`).classList.add('active');
  
  // Mostrar el formulario correspondiente
  document.getElementById(`${tab}-form-container`).classList.add('active');
}

// Inicializar cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  // Configurar el botón de login para abrir el popup
  const loginButton = document.getElementById("login-button");
  if (loginButton) {
    loginButton.addEventListener("click", (e) => {
      e.preventDefault();
      mostrarPopupAuth();
    });
  }
  
  // Manejar el envío del formulario de login
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
      const rememberMe = document.getElementById("remember-me").checked;
      
      // Aquí iría la lógica de autenticación
      console.log("Login:", { email, password, rememberMe });
      
      // Simulación de login exitoso
      const messageElement = document.getElementById("login-message");
      messageElement.textContent = "Inicio de sesión exitoso";
      messageElement.className = "newsletter-message success";
      
      // Cerrar el popup después de un breve retraso
      setTimeout(() => {
        cerrarPopupAuth();
      }, 1500);
    });
  }
  
  // Manejar el envío del formulario de registro
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const nombre = document.getElementById("register-nombre").value;
      const apellidos = document.getElementById("register-apellidos").value;
      const email = document.getElementById("register-email").value;
      const telefono = document.getElementById("register-telefono").value;
      const password = document.getElementById("register-password").value;
      const confirmPassword = document.getElementById("register-confirm-password").value;
      const privacyAccepted = document.getElementById("register-privacy").checked;
      const newsletterAccepted = document.getElementById("register-newsletter").checked;
      
      const messageElement = document.getElementById("register-message");
      
      // Validaciones básicas
      if (password !== confirmPassword) {
        messageElement.textContent = "Las contraseñas no coinciden";
        messageElement.className = "newsletter-message error";
        return;
      }
      
      if (!privacyAccepted) {
        messageElement.textContent = "Debes aceptar la política de privacidad";
        messageElement.className = "newsletter-message error";
        return;
      }
      
      // Validar formato de contraseña
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (!passwordRegex.test(password)) {
        messageElement.textContent = "La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula y un número";
        messageElement.className = "newsletter-message error";
        return;
      }
      
      // Aquí iría la lógica de registro
      console.log("Registro:", { nombre, apellidos, email, telefono, password, newsletterAccepted });
      
      // Simulación de registro exitoso
      messageElement.textContent = "Cuenta creada con éxito. ¡Bienvenido/a a DEKOR!";
      messageElement.className = "newsletter-message success";
      
      // Cambiar a la pestaña de login después de un breve retraso
      setTimeout(() => {
        mostrarTab('login');
      }, 1500);
    });
  }
  
  // Configurar los botones de redes sociales
  document.querySelectorAll('.social-btn').forEach(button => {
    button.addEventListener('click', function() {
      let network = '';
      if (this.classList.contains('facebook-btn')) {
        network = 'Facebook';
      } else if (this.classList.contains('google-btn')) {
        network = 'Google';
      } else if (this.classList.contains('instagram-btn')) {
        network = 'Instagram';
      }
      
      console.log(`Autenticación con ${network}`);
      
      // Mostrar mensaje de éxito
      const activeTab = document.querySelector('.auth-tab.active').id.split('-')[0];
      const messageElement = document.getElementById(`${activeTab}-message`);
      messageElement.textContent = `Autenticación con ${network} en proceso...`;
      messageElement.className = "newsletter-message info";
    });
  });
});