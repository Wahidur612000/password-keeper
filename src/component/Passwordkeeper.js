import React, { useState, useContext, useEffect } from 'react';
import { PasswordContext } from './context/PasswordContext';

const PasswordKeeper = () => {
  const { addPassword, passwords } = useContext(PasswordContext);
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [totalPasswords, setTotalPasswords] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPasswords, setFilteredPasswords] = useState([]);

  useEffect(() => {
    setTotalPasswords(passwords.length);
  }, [passwords]);

  const handleAddPassword = () => {
    addPassword(title, password);
    setTitle('');
    setPassword('');
    setShowModal(false); // Close modal after adding password
    setSearchQuery(''); // Reset search query
  };

  const handleSearch = () => {
    // Filter passwords based on search query
    const filtered = passwords.filter(password => password.title.toLowerCase().includes(title.toLowerCase()));
    setFilteredPasswords(filtered);
  };

  const handleClose = (index) => {
    // Remove the password from the filtered list when close button is clicked
    const updatedPasswords = [...filteredPasswords];
    updatedPasswords.splice(index, 1);
    setFilteredPasswords(updatedPasswords);
  };

  return (
    <div>
      <h1>Password Keeper</h1>
      <p>Total passwords: {totalPasswords}</p>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Search by title..." />
      <button onClick={handleSearch}>Search</button>
      <button onClick={() => setShowModal(true)}>Add new Password</button>
      {/* Modal content */}
      {showModal && (
        <div className="modal">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button onClick={handleAddPassword}>Add</button>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      )}
      {/* Display filtered passwords */}
      <ul>
        {filteredPasswords.map((password, index) => (
          <li key={index}>
            {password.title} - {password.password}
            <button onClick={() => handleClose(index)}>Close</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordKeeper;
