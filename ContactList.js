import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactList = ({ onDeleteContact }) => {
    const [contacts, setContacts] = useState([]);

    // Fetch contacts from backend
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/contacts');
                setContacts(response.data);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };
        fetchContacts();
    }, []);

    // Delete contact
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/contacts/${id}`);
            setContacts(contacts.filter(contact => contact.id !== id));
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    return (
        <div>
            <h2>Contact List</h2>
            {contacts.length === 0 ? (
                <p>No contacts found.</p>
            ) : (
                <ul>
                    {contacts.map((contact) => (
                        <li key={contact.id}>
                            {contact.name} - {contact.email} - {contact.phone}
                            <button onClick={() => handleDelete(contact.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ContactList;
