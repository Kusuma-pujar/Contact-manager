import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactList from './components/ContactList.js';
import AddContact from './components/AddContact.js';
import './App.css';

function App() {
    const [contacts, setContacts] = useState([]);

    // Fetch contacts from the backend
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/contacts");
                setContacts(response.data);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };
        fetchContacts();
    }, []);

    // Add contact to the backend
    const addContact = async (contact) => {
        try {
            const response = await axios.post("http://localhost:3001/api/contacts", contact);
            setContacts([...contacts, response.data]);
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    };

    // Delete contact from the backend
    const deleteContact = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/contacts/${id}`);
            setContacts((prevContacts) => prevContacts.filter(contact => contact.id !== id));
            alert('Contact deleted successfully!');
        } catch (error) {
            console.error('Error deleting contact:', error);
            alert('Failed to delete contact.');
        }
    };

    return (
        <div>
            <h1>Contact Manager</h1>
            <AddContact onAddContact={addContact} />
            <ContactList contacts={contacts} onDeleteContact={deleteContact} />
        </div>
    );
}

export default App;
