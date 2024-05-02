import React, { useState, useContext, useEffect } from 'react';
import { PasswordContext } from './context/PasswordContext';

const AllPasswords = () => {
  const { passwords, deletePassword, editPassword, fetchPasswords } = useContext(PasswordContext);
  const [editingPassword, setEditingPassword] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedPassword, setEditedPassword] = useState('');

//   useEffect(() => {
//     fetchPasswords();
//   }, []); // Call fetchPasswords when the component mounts

  const handleDeletePassword = (id) => {
    deletePassword(id);
  };

  const handleEditPassword = (id, title, password) => {
    setEditingPassword({ id, title, password });
    setEditedTitle(title);
    setEditedPassword(password);
  };

  const handleSaveEditedPassword = () => {
    editPassword(editingPassword.id, editedTitle, editedPassword);
    setEditingPassword(null);
    setEditedTitle('');
    setEditedPassword('');
  };

  return (
    <div>
      <h2>All Passwords</h2>
      <ul>
        {passwords.map((password, index) => (
          <li key={password._id}>
            {index + 1}. {password.title} - {password.password}
            <button onClick={() => handleDeletePassword(password._id)}>Delete</button>
            <button onClick={() => handleEditPassword(password._id, password.title, password.password)}>Edit</button>
          </li>
        ))}
      </ul>
      {/* Edit Modal */}
      {editingPassword && (
        <div className="modal">
          <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} placeholder="Title" />
          <input type="password" value={editedPassword} onChange={(e) => setEditedPassword(e.target.value)} placeholder="Password" />
          <button onClick={handleSaveEditedPassword}>Save</button>
          <button onClick={() => setEditingPassword(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AllPasswords;
