const createContactBtn = document.getElementById('createContactBtn');
const createContactForm = document.getElementById('createContactForm');

function toggleCreateContactForm() {
    if (createContactForm.style.display === 'block') {
        createContactForm.style.display = 'none'; // Ocultar el formulario
    } else {
        createContactForm.style.display = 'block'; // Mostrar el formulario
    }
}

createContactBtn.addEventListener('click', toggleCreateContactForm);

document.addEventListener("DOMContentLoaded", function() {
    
    const createContactForm = document.getElementById('createContactForm');
    
    const contactTableBody = document.querySelector('.contact-list table tbody');

    function saveContact(event) {
        event.preventDefault();

        const name = createContactForm.querySelector('input[name="name"]').value;
        const phone = createContactForm.querySelector('input[name="phone"]').value;
        const email = createContactForm.querySelector('input[name="email"]').value;

        const contact = {
            name: name,
            phone: phone,
            email: email
        };

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${phone}</td>
            <td>${email}</td>
            <td class="contact-actions">
                <div class="action-icon">
                    <button class="edit-contact"><i class="bx bx-edit"></i></button>
                </div>
                <div class="action-icon">
                    <button class="delete-contact"><i class="bx bx-trash"></i></button>
                </div>
            </td>
        `;

        newRow.dataset.contact = JSON.stringify(contact);

        contactTableBody.appendChild(newRow);

        createContactForm.reset();
    }

    createContactForm.addEventListener('submit', saveContact);
});
