import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import {
  Grid,
  Button,
  Container,
  Stack,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

export default function FacturePage() {
  const [factures, setFactures] = useState([]);
  const [newFacture, setNewFacture] = useState({ dateFac: '', etatcom: '' });
  const [openForm, setOpenForm] = useState(false);
  const [editingFacture, setEditingFacture] = useState(null);

  useEffect(() => {
    fetchFactures();
  }, []);

  const fetchFactures = () => {
    axios
      .get('http://localhost:3002/api/factures')
      .then(response => {
        setFactures(response.data);
      })
      .catch(error => {
        console.error('Error fetching factures:', error);
      });
  };

  const handleCreateFacture = () => {
    axios
      .post('http://localhost:3002/api/factures', newFacture)
      .then(response => {
        fetchFactures()
        setNewFacture({ dateFac: '', etatcom: '' });
        setOpenForm(false);
      })
      .catch(error => {
        console.error('Error creating new facture:', error);
      });
  };

  const handleEditFacture = facture => {
    setEditingFacture(facture);
  };

  const handleUpdateFacture = updatedFacture => {
    axios
      .put(`http://localhost:3002/api/factures/${updatedFacture._id}`, updatedFacture)
      .then(response => {
        fetchFactures();
        setEditingFacture(null);
      })
      .catch(error => {
        console.error('Error updating facture:', error);
      });
  };

  const handleDeleteFacture = factureId => {
    axios
      .delete(`http://localhost:3002/api/factures/${factureId}`)
      .then(response => {
        fetchFactures();
      })
      .catch(error => {
        console.error('Error deleting facture:', error);
      });
  };
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredFactures = factures.filter(facture => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      facture.dateFac.toLowerCase().includes(searchTerm) ||
      facture.etatcom.toLowerCase().includes(searchTerm)
    );
  });
    
  return (
    <>
      <Helmet>
        <title>Factures</title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Liste des Factures
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
          <SearchIcon fontSize="small" />
          <TextField
            label="Rechercher"
            value={searchQuery}
            onChange={handleSearch}
            sx={{ width: '200px' }}
          />
          </Stack>
          <Button
            variant="contained"
            onClick={() => setOpenForm(true)}
          >
            Nouvelle Facture
          </Button>
       
        </Stack>

        <Dialog open={openForm} onClose={() => setOpenForm(false)}>
          <DialogTitle>Ajouter une Nouvelle Facture</DialogTitle>
          <DialogContent>
            <TextField
              label="Date de la Facture"
              value={newFacture.dateFac}
              onChange={e =>
                setNewFacture({ ...newFacture, dateFac: e.target.value })
              }sx={{marginTop:"16px",marginRight:"16px"}}
            />
            <TextField
              label="État Commercial"
              value={newFacture.etatcom}
              onChange={e =>
                setNewFacture({ ...newFacture, etatcom: e.target.value })
              }sx={{marginTop:"16px"}}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenForm(false)}variant="contained" color="secondary">Annuler</Button>
            <Button onClick={handleCreateFacture}variant="contained" sx={{ bgcolor: '#007bff', color: '#ffffff' }}>Ajouter la Facture</Button>
          </DialogActions>
        </Dialog>

        <Grid container spacing={3}>
        {filteredFactures.map(facture => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={facture._id}>
              <div>
                <Typography>Date: {facture.dateFac}</Typography>
                <Typography>État Commercial: {facture.etatcom}</Typography>
                <Button onClick={() => handleEditFacture(facture)}variant="outlined"color="primary" 
                style={{ marginRight: "1em", borderColor: "#007bff", color: "#007bff" }}>Modifier</Button>
                <Button onClick={() => handleDeleteFacture(facture._id)} variant="outlined" color="secondary" 
                style={{ borderColor: "#dc3545", color: "#dc3545" }}>Supprimer</Button>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {editingFacture && (
        <Dialog
          open={Boolean(editingFacture)}
          onClose={() => setEditingFacture(null)}
        >
          <DialogTitle>Modifier la Facture</DialogTitle>
          <DialogContent>
            <TextField
              label="Date de la Facture"
              value={editingFacture.dateFac}
              onChange={e =>
                setEditingFacture({
                  ...editingFacture,
                  dateFac: e.target.value
                })
              }sx={{marginTop:"16px",marginRight:"16px"}}
            />
            <TextField
              label="État Commercial"
              value={editingFacture.etatcom}
              onChange={e =>
                setEditingFacture({
                  ...editingFacture,
                  etatcom: e.target.value
                })
              }sx={{marginTop:"16px"}}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditingFacture(null)}variant="contained" color="secondary">Annuler</Button>
            <Button onClick={() => handleUpdateFacture(editingFacture)}variant="contained" sx={{ bgcolor: '#007bff', color: '#ffffff' }}>Enregistrer les Modifications</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
