// Newsletter functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if newsletter popup should be shown
    const shouldShowNewsletterPopup = !localStorage.getItem('newsletterPopupClosed') && !sessionStorage.getItem('newsletterPopupClosed');
    
    if (shouldShowNewsletterPopup) {
        // Show newsletter popup after 5 seconds
        setTimeout(() => {
            const newsletterModal = new bootstrap.Modal(document.getElementById('newsletterModal'));
            newsletterModal.show();
        }, 5000);
    }
    
    // Handle newsletter popup close
    const newsletterModal = document.getElementById('newsletterModal');
    if (newsletterModal) {
        newsletterModal.addEventListener('hidden.bs.modal', function() {
            // Store in sessionStorage so it doesn't show again during this session
            sessionStorage.setItem('newsletterPopupClosed', 'true');
        });
    }
    
    // Join now button click handler
    const joinNowBtn = document.getElementById('joinNowBtn');
    if (joinNowBtn) {
        joinNowBtn.addEventListener('click', function() {
            // Show newsletter subscription form
            const newsletterModal = bootstrap.Modal.getInstance(document.getElementById('newsletterModal'));
            newsletterModal.hide();
            
            // Show newsletter subscription form modal
            showNewsletterForm();
        });
    }
    
    // Newsletter footer button click handler
    const newsletterFooterBtn = document.getElementById('newsletterFooterBtn');
    if (newsletterFooterBtn) {
        newsletterFooterBtn.addEventListener('click', function() {
            // Get the email input
            const emailInput = this.previousElementSibling;
            if (emailInput && emailInput.value.trim() !== '') {
                // Show newsletter subscription form with pre-filled email
                showNewsletterForm(emailInput.value);
                
                // Clear the input
                emailInput.value = '';
            } else {
                // Show newsletter subscription form
                showNewsletterForm();
            }
        });
    }
    
    // Function to show newsletter subscription form
    function showNewsletterForm(email = '') {
        // Create modal element
        const modalElement = document.createElement('div');
        modalElement.className = 'modal fade';
        modalElement.id = 'newsletterFormModal';
        modalElement.tabIndex = '-1';
        modalElement.setAttribute('aria-labelledby', 'newsletterFormModalLabel');
        modalElement.setAttribute('aria-hidden', 'true');
        
        modalElement.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="newsletterFormModalLabel">Suscríbete a nuestra newsletter</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="newsletterForm">
                            <div class="mb-3">
                                <label for="newsletterEmail" class="form-label">Email*</label>
                                <input type="email" class="form-control" id="newsletterEmail" value="${email}" required>
                            </div>
                            <div class="mb-3">
                                <label for="newsletterName" class="form-label">Nombre</label>
                                <input type="text" class="form-control" id="newsletterName">
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="newsletterConsent" required>
                                <label class="form-check-label" for="newsletterConsent">
                                    Acepto recibir comunicaciones comerciales de DEKOR. Puedo cancelar mi suscripción en cualquier momento.
                                </label>
                            </div>
                            <div class="d-grid">
                                <button type="submit" class="btn btn-dark">Suscribirme</button>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <p class="text-muted small">
                            Consulta nuestra <a href="privacidad.html" class="text-decoration-none">Política de Privacidad</a> para más información.
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to document
        document.body.appendChild(modalElement);
        
        // Initialize modal
        const newsletterFormModal = new bootstrap.Modal(modalElement);
        newsletterFormModal.show();
        
        // Handle form submission
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('newsletterEmail').value;
                const name = document.getElementById('newsletterName').value;
                
                // Here you would typically send a request to your server to subscribe the user
                // For this example, we'll just simulate a successful subscription
                
                // Store in localStorage so the popup doesn't show again
                localStorage.setItem('newsletterPopupClosed', 'true');
                
                // Close the modal
                newsletterFormModal.hide();
                
                // Remove modal from DOM after it's hidden
                modalElement.addEventListener('hidden.bs.modal', function() {
                    document.body.removeChild(modalElement);
                });
                
                // Show success message
                showNotification('¡Gracias por suscribirte a nuestra newsletter!');
            });
        }
        
        // Remove modal from DOM when it's closed
        modalElement.addEventListener('hidden.bs.modal', function() {
            document.body.removeChild(modalElement);
        });
    }
    
    // Function to show notification
    function showNotification(message, type = 'success') {
        // Check if the showNotification function exists in cart.js
        if (typeof window.showNotification === 'function') {
            window.showNotification(message, type);
        } else {
            // Create a simple notification if the function doesn't exist
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                    <span>${message}</span>
                </div>
            `;
            
            // Add to document
            document.body.appendChild(notification);
            
            // Show notification
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            // Hide and remove notification after 3 seconds
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }
    }
});