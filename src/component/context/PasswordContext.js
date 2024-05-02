import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PasswordContext = createContext();

export const PasswordProvider = ({ children }) => {
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    try {
      const response = await axios.get('https://crudcrud.com/api/86bcbfd54e644de58d932c0de3a12ced/passwords');
      setPasswords(response.data);
    } catch (error) {
      console.error('Error fetching passwords:', error);
    }
  };

  const addPassword = async (title, password) => {
    try {
      await axios.post('https://crudcrud.com/api/86bcbfd54e644de58d932c0de3a12ced/passwords', { title, password });
      fetchPasswords();
    } catch (error) {
      console.error('Error adding password:', error);
    }
  };

  const deletePassword = async (id) => {
    try {
      await axios.delete(`https://crudcrud.com/api/86bcbfd54e644de58d932c0de3a12ced/passwords/${id}`);
      fetchPasswords();
    } catch (error) {
      console.error('Error deleting password:', error);
    }
  };

  const editPassword = async (id, title, password) => {
    try {
      await axios.put(`https://crudcrud.com/api/86bcbfd54e644de58d932c0de3a12ced/passwords/${id}`, { title, password });
      fetchPasswords();
    } catch (error) {
      console.error('Error editing password:', error);
    }
  };

  return (
    <PasswordContext.Provider value={{ passwords, fetchPasswords, addPassword, deletePassword, editPassword }}>
      {children}
    </PasswordContext.Provider>
  );
};
