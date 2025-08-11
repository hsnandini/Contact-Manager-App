const apiUrl = 'http://localhost:3000/contacts';

const contactForm = document.getElementById('contactForm');
const contactList = document.getElementById('contactList');
const contactId = document.getElementById('contactId');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

async function fetchContacts() {
  const res = await fetch(apiUrl);
  const contacts = await res.json();
  displayContacts(contacts);
}

function displayContacts(contacts) {
  contactList.innerHTML = '';
  contacts.forEach(contact => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${contact.name}</strong><br>
      ${contact.email} | ${contact.phone}<br>
      <button onclick="editContact(${contact.id})">Edit</button>
      <button onclick="deleteContact(${contact.id})">Delete</button>
    `;
    contactList.appendChild(li);
  });
}

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const contact = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value
  };

  const id = contactId.value;
  if (id) {
    await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact)
    });
  } else {
    await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact)
    });
  }

  contactForm.reset();
  contactId.value = '';
  fetchContacts();
});

async function editContact(id) {
  const res = await fetch(`${apiUrl}`);
  const contacts = await res.json();
  const contact = contacts.find(c => c.id === id);
  contactId.value = contact.id;
  nameInput.value = contact.name;
  emailInput.value = contact.email;
  phoneInput.value = contact.phone;
}

async function deleteContact(id) {
  await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  fetchContacts();
}

fetchContacts();