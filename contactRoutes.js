const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new contact
router.post('/', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const saved = await newContact.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
