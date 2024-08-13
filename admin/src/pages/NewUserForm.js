import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import axios from 'axios'; // Import the axios library

export default function NewUserForm({ open, onClose, onCreateUser }) {
  const [userData, setUserData] = useState({
    nom: '',
    prenom: '',
    tel: '',
    role: '',
    isVerified: false,
    email: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateUser = () => {
    axios.post('http://localhost:3002/api/users/', userData)
      .then((response) => {
        onCreateUser(response.data); // Update user list in the parent component
        onClose();
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New User</DialogTitle>
      <DialogContent>
        <TextField
          name="nom"
          label="Nom"
          value={userData.nom}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="prenom"
          label="Prenom"
          value={userData.prenom}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
         <TextField
          name="tel"
          label="Téléphone"
          value={userData.tel}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
          <TextField
          name="email"
          label="Email"
          value={userData.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
             <TextField
          name="role"
          label="role"
          value={userData.role}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="password"
          label="Password"
          value={userData.password}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}variant="contained" color="secondary">Cancel</Button>
        <Button onClick={handleCreateUser}  sx={{ bgcolor: '#007bff', color: '#ffffff' }}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}
