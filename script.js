// Obtener el botón "Crear Contacto" y el formulario
const createContactBtn = document.getElementById('createContactBtn');
const createContactForm = document.getElementById('createContactForm');

// Función para mostrar u ocultar el formulario
function toggleCreateContactForm() {
    if (createContactForm.style.display === 'block') {
        createContactForm.style.display = 'none'; // Ocultar el formulario
    } else {
        createContactForm.style.display = 'block'; // Mostrar el formulario
    }
}

// Evento click para el botón "Crear Contacto"
createContactBtn.addEventListener('click', toggleCreateContactForm);
