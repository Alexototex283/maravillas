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

// ========== CÓDIGO DEL PANEL DE ADMINISTRADOR ==========

// Credenciales de administrador (en una aplicación real, esto estaría en el servidor)
const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123"
};

// Estado de autenticación
let isAdminLoggedIn = false;

// Manejo del formulario de inicio de sesión de administrador
document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    // Validación básica
    if (!username || !password) {
        alert('Por favor, complete todos los campos');
        return;
    }
    
    // Verificar credenciales
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        isAdminLoggedIn = true;
        alert('Acceso concedido. Bienvenido al panel de administración.');
        
        // Cerrar modal
        const adminLoginModal = bootstrap.Modal.getInstance(document.getElementById('adminLoginModal'));
        adminLoginModal.hide();
        
        // Mostrar panel de administración
        document.getElementById('adminPanel').style.display = 'block';
        
        // Limpiar formulario
        document.getElementById('adminLoginForm').reset();
        
        // Cargar maravillas existentes
        loadWondersForAdmin();
        
        // Desplazar al panel de administración
        document.getElementById('adminPanel').scrollIntoView({ behavior: 'smooth' });
    } else {
        alert('Credenciales incorrectas. Intente nuevamente.');
    }
});

// Cerrar sesión de administrador
document.getElementById('logoutAdmin').addEventListener('click', function() {
    isAdminLoggedIn = false;
    document.getElementById('adminPanel').style.display = 'none';
    alert('Sesión de administrador cerrada.');
});

// Cargar maravillas para el panel de administración
function loadWondersForAdmin() {
    const wondersList = document.getElementById('wondersList');
    wondersList.innerHTML = '';
    
    // Obtener todas las tarjetas de maravillas
    const wonderCards = document.querySelectorAll('#maravillas .card');
    
    wonderCards.forEach((card, index) => {
        const title = card.querySelector('.card-title').textContent;
        const location = title.split(', ')[1] || '';
        const name = title.split(', ')[0];
        const description = card.querySelector('.card-text').textContent;
        const image = card.querySelector('.card-img-top').src;
        
        // Obtener los datos de la lista
        const listItems = card.querySelectorAll('ul li');
        const facts = Array.from(listItems).map(li => li.textContent).join('; ');
        
        const wonderElement = document.createElement('div');
        wonderElement.className = 'col-md-6 mb-3';
        wonderElement.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">${location}</p>
                    <p class="card-text"><small>${description.substring(0, 100)}...</small></p>
                    <button class="btn btn-danger btn-sm" onclick="deleteWonder(${index})">Eliminar</button>
                </div>
            </div>
        `;
        
        wondersList.appendChild(wonderElement);
    });
}

// Función para eliminar una maravilla
function deleteWonder(index) {
    if (!isAdminLoggedIn) {
        alert('No tiene permisos para realizar esta acción.');
        return;
    }
    
    if (confirm('¿Está seguro de que desea eliminar esta maravilla?')) {
        const wonderCards = document.querySelectorAll('#maravillas .col-md-6');
        if (wonderCards[index]) {
            wonderCards[index].remove();
            alert('Maravilla eliminada correctamente.');
            loadWondersForAdmin(); // Recargar la lista
        }
    }
}

// Manejo del formulario para agregar nueva maravilla
document.getElementById('addWonderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!isAdminLoggedIn) {
        alert('No tiene permisos para realizar esta acción.');
        return;
    }
    
    const name = document.getElementById('wonderName').value;
    const location = document.getElementById('wonderLocation').value;
    const description = document.getElementById('wonderDescription').value;
    const image = document.getElementById('wonderImage').value;
    const facts = document.getElementById('wonderFacts').value;
    
    // Validaciones
    if (!name || !location || !description || !image || !facts) {
        alert('Por favor, complete todos los campos');
        return;
    }
    
    // Crear nueva tarjeta de maravilla
    addNewWonderCard(name, location, description, image, facts);
    
    // Limpiar formulario
    document.getElementById('addWonderForm').reset();
    
    // Recargar lista de administración
    loadWondersForAdmin();
    
    alert('Nueva maravilla agregada correctamente.');
});

// Función para agregar una nueva tarjeta de maravilla
function addNewWonderCard(name, location, description, image, facts) {
    const factsArray = facts.split(';').map(fact => fact.trim());
    const factsHTML = factsArray.map(fact => `<li>${fact}</li>`).join('');
    
    const newCardHTML = `
        <div class="col-md-6 col-lg-4">
            <div class="card h-100">
                <img src="${image}" class="card-img-top" alt="${name}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${name}, ${location}</h5>
                    <p class="card-text">${description}</p>
                    <ul>
                        ${factsHTML}
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    // Agregar la nueva tarjeta al contenedor de maravillas
    const maravillasContainer = document.querySelector('#maravillas .row');
    maravillasContainer.insertAdjacentHTML('beforeend', newCardHTML);
}

// Validación de URL de imagen
document.getElementById('wonderImage').addEventListener('blur', function() {
    const url = this.value;
    if (url && !isValidImageUrl(url)) {
        alert('Por favor, ingrese una URL válida de imagen (debe comenzar con http:// o https://)');
        this.focus();
    }
});

function isValidImageUrl(url) {
    return url.startsWith('http://') || url.startsWith('https://');
}

setTimeout(() => {
    if (isAdminLoggedIn) {
        isAdminLoggedIn = false;
        document.getElementById('adminPanel').style.display = 'none';
        alert('Su sesión de administrador ha expirado por seguridad.');
    }
}, 30 * 60 * 1000);
