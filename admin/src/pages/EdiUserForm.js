import React, { useState } from 'react';
import { TextField, Button, Stack, Container } from '@mui/material';

export default function EditUserForm({ user, onUpdate, onCancel }) {
  const [editedUser, setEditedUser] = useState(user);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdateClick = () => {
    onUpdate(editedUser);
  };

  return (
    <Container maxWidth="sm">
      <form>
        <Stack spacing={2}>
          <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
            <TextField
              sx={{ flex: 1 }}
              name="nom"
              label="Nom"
              value={editedUser.nom}
              onChange={handleFieldChange}
              fullWidth
            />
            <TextField
              sx={{ flex: 1 }}
              name="prenom"
              label="Prenom"
              value={editedUser.prenom}
              onChange={handleFieldChange}
              fullWidth
            />
          </Stack>
          <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
            <TextField
              sx={{ flex: 1 }}
              name="tel"
              label="Téléphone"
              value={editedUser.tel}
              onChange={handleFieldChange}
              fullWidth
            />
            <TextField
              sx={{ flex: 1 }}
              name="email"
              label="Email"
              value={editedUser.email}
              onChange={handleFieldChange}
              fullWidth
            />
          </Stack>
          <TextField
            name="password"
            label="Password"
            value={editedUser.password}
            onChange={handleFieldChange}
            fullWidth
          />
          <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
            <Button variant="contained" onClick={handleUpdateClick} fullWidth>
              Mettre à jour
            </Button>
            <Button variant="outlined" onClick={onCancel} fullWidth>
              Annuler
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
}
