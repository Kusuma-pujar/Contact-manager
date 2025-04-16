import React, { useState } from 'react';
import axios from 'axios';

const AddContact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        category: 'personal',
        address: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prevent empty space inputs
        const trimmedData = {
            ...formData,
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            address: formData.address.trim()
        };

        if (!trimmedData.name || !trimmedData.email || !trimmedData.phone) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            await axios.post("http://localhost:3001/api/contacts", trimmedData);
            alert('Contact added successfully!');
            setFormData({ name: '', email: '', phone: '', category: 'personal', address: '' }); // Clear form
        } catch (error) {
            console.error('Error adding contact:', error.response?.data || error.message);
            alert(`Failed to add contact: ${error.response?.data?.message || 'Server error'}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
            />
            <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
            >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="family">Family</option>
            </select>
            <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
            />
            <button type="submit">Add Contact</button>
        </form>
    );
};

export default AddContact;
