import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { postContactUs } from '../../../util/http for admin/http.js';

const ContactUsForm = () => {
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [successMessage, setSuccessMessage] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 

  const mutation = useMutation(postContactUs, {
    onSuccess: () => {
      console.log('Contact message sent successfully');
      setSuccessMessage('Your message has been sent successfully!'); 
      setErrorMessage(''); 
      setContactData({ name: '', email: '', phone: '', message: '' }); 
    },
    onError: (error) => {
      console.error('Error sending contact message:', error);
      setErrorMessage('There was an error sending your message. Please try again.')
      setSuccessMessage(''); 
    },
  });

  const handleChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(contactData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={contactData.name} onChange={handleChange} placeholder="Name" required />
      <input type="email" name="email" value={contactData.email} onChange={handleChange} placeholder="Email" required />
      <input type="text" name="phone" value={contactData.phone} onChange={handleChange} placeholder="Phone" required />
      <textarea name="message" value={contactData.message} onChange={handleChange} placeholder="Message" required />
      <button type="submit">Send</button>
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>} 
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>} 
    </form>
  );
};

export default ContactUsForm;