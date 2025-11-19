// Manejo del formulario de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Validación básica
    if (!email || !password) {
        alert('Por favor, complete todos los campos');
        return;
    }
    
    // Simulación de inicio de sesión exitoso
    alert('Inicio de sesión exitoso. ¡Bienvenido!');
    
    // Cerrar modal
    const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    loginModal.hide();
    
    // Limpiar formulario
    document.getElementById('loginForm').reset();
});

// Manejo del formulario de registro
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    // Validaciones
    if (!name || !email || !password || !confirmPassword) {
        alert('Por favor, complete todos los campos');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }
    
    if (!document.getElementById('acceptTerms').checked) {
        alert('Debe aceptar los términos y condiciones');
        return;
    }
    
    // Simulación de registro exitoso
    alert('Registro exitoso. ¡Bienvenido a nuestra comunidad!');
    
    // Cerrar modal
    const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    registerModal.hide();
    
    // Limpiar formulario
    document.getElementById('registerForm').reset();
    
    // Abrir modal de inicio de sesión
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
});

// Botones de reserva
document.querySelectorAll('.btn-primary').forEach(button => {
    if (button.textContent === 'Reservar') {
        button.addEventListener('click', function() {
            // Verificar si el usuario está logueado
            const isLoggedIn = false; // En una aplicación real, esto vendría de la autenticación
            
            if (!isLoggedIn) {
                alert('Para realizar una reserva, primero debe iniciar sesión');
                const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
                loginModal.show();
            } else {
                alert('Redirigiendo al proceso de reserva...');
                // En una aplicación real, aquí redirigiríamos a la página de reservas
            }
        });
    }
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});