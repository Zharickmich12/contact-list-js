document.addEventListener("DOMContentLoaded", function() {
    const createContactBtn = document.getElementById('createContactBtn');
    const createContactForm = document.getElementById('createContactForm');
    const contactTableBody = document.querySelector('.contact-list table tbody');
    const editContactForm = document.getElementById('editContactForm');
    const closeFormBtn = document.getElementById('closeFormBtn');
    const searchInput = document.getElementById('searchInput');

    function toggleCreateContactForm() {
        createContactForm.style.display = createContactForm.style.display === 'block' ? 'none' : 'block';
    }

    createContactBtn.addEventListener('click', toggleCreateContactForm);

    function saveContact(event) {
        event.preventDefault();

        const name = createContactForm.querySelector('input[name="name"]').value;
        const phone = createContactForm.querySelector('input[name="phone"]').value;
        const email = createContactForm.querySelector('input[name="email"]').value;

        const contact = { name, phone, email };

        addContactRow(contact);

        createContactForm.querySelector('form').reset(); 
    }

    createContactForm.addEventListener('submit', saveContact);

    function addContactRow(contact) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td>${contact.email}</td>
            <td class="contact-actions">
                <div class="action-icon">
                    <button class="edit-contact"><i class="bx bx-edit"></i></button>
                </div>
                <div class="action-icon">
                    <button class="delete-contact"><i class="bx bx-trash"></i></button>
                </div>
            </td>
        `;
        newRow.dataset.contactId = generateUniqueId();
        newRow.dataset.contact = JSON.stringify(contact);

        contactTableBody.appendChild(newRow);
    }

    function deleteContact(event) {
        const row = event.target.closest('tr');
        if (row) {
            row.remove();
        }
    }

    function editContact(event) {
        const row = event.target.closest('tr');
        if (row) {
            const contactData = JSON.parse(row.dataset.contact);
            const contactId = row.dataset.contactId;

            editContactForm.querySelector('input[name="contactId"]').value = contactId;
            editContactForm.querySelector('input[name="name"]').value = contactData.name;
            editContactForm.querySelector('input[name="phone"]').value = contactData.phone;
            editContactForm.querySelector('input[name="email"]').value = contactData.email;

            editContactForm.style.display = 'block';
        }
    }

    contactTableBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-contact')) {
            editContact(event);
        } else if (event.target.classList.contains('delete-contact')) {
            deleteContact(event);
        }
    });

    editContactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const contactId = editContactForm.querySelector('input[name="contactId"]').value;
        const name = editContactForm.querySelector('input[name="name"]').value;
        const phone = editContactForm.querySelector('input[name="phone"]').value;
        const email = editContactForm.querySelector('input[name="email"]').value;

        const row = contactTableBody.querySelector(`tr[data-contact-id="${contactId}"]`);
        if (row) {
            const contact = { name, phone, email };
            row.dataset.contact = JSON.stringify(contact);
            row.querySelector('td:nth-child(1)').textContent = name;
            row.querySelector('td:nth-child(2)').textContent = phone;
            row.querySelector('td:nth-child(3)').textContent = email;
        }

        editContactForm.style.display = 'none';
    });

    function closeEditForm() {
        editContactForm.style.display = 'none';
    }

    closeFormBtn.addEventListener('click', closeEditForm);

    function searchContacts() {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = contactTableBody.querySelectorAll('tr');

        rows.forEach(row => {
            const contactJson = row.dataset.contact;
            if (contactJson) {
                const contactData = JSON.parse(contactJson);
                const name = contactData.name.toLowerCase();
                const phone = contactData.phone.toLowerCase();
                const email = contactData.email.toLowerCase();

                if (name.includes(searchTerm) || phone.includes(searchTerm) || email.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            }
        });
    }

    searchInput.addEventListener('input', searchContacts);

    function generateUniqueId() {
        return Math.random().toString(36).substr(2, 9);
    }
});

