const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let contacts = [];
let idCounter = 1;

// Get all contacts
app.get('/contacts', (req, res) => {
  res.json(contacts);
});

// Add a new contact
app.post('/contacts', (req, res) => {
  const contact = { id: idCounter++, ...req.body };
  contacts.push(contact);
  res.status(201).json(contact);
});

// Update contact
app.put('/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = contacts.findIndex(c => c.id === id);
  if (index !== -1) {
    contacts[index] = { id, ...req.body };
    res.json(contacts[index]);
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
});

// Delete contact
app.delete('/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  contacts = contacts.filter(c => c.id !== id);
  res.json({ message: 'Contact deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
