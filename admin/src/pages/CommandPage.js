import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import {
  Grid,
  Button,
  Container,
  Stack,Typography,TextField,Dialog,DialogTitle,DialogContent,DialogActions} from '@mui/material';
import Iconify from '../components/iconify';

export default function CommandPage() {
  const [commands, setCommands] = useState([]);
  const [newCommand, setNewCommand] = useState({
    nom: '',
    prenom: '',
    email: '',
    adresseCom: '',
    telCom: '',
    payCom: '',
    villeCom: '',
    codPostCom: '',
    typePay: '',
    DateCom: ''
  });
  const [openForm, setOpenForm] = useState(false);
  const [editingCommand, setEditingCommand] = useState(null);

  useEffect(() => {
    fetchCommands();
  }, []);

  const handleCreateCommand = () => {
    axios.post('http://localhost:3002/api/commandes', newCommand)
      .then(response => {
        fetchCommands();
        setNewCommand({
          nom: '',
          prenom: '',
          email: '',
          adresseCom: '',
          telCom: '',
          payCom: '',
          villeCom: '',
          codPostCom: '',
          typePay: '',
          DateCom: ''
        });
        setOpenForm(false);
      })
      .catch(error => {
        console.error('Error creating new command:', error);
      });
  };

  const handleEditCommand = command => {
    setEditingCommand(command);
  };

  const handleUpdateCommand = updatedCommand => {
    axios.put(`http://localhost:3002/api/commandes/${updatedCommand._id}`, updatedCommand)
      .then(response => {
        fetchCommands();
        setEditingCommand(null);
      })
      .catch(error => {
        console.error('Error updating command:', error);
      });
  };

  const handleDeleteCommand = commandId => {
    axios.delete(`http://localhost:3002/api/commandes/${commandId}`)
      .then(response => {
        fetchCommands();
      })
      .catch(error => {
        console.error('Error deleting command:', error);
      });
  };

  const fetchCommands = () => {
    axios.get('http://localhost:3002/api/commandes')
      .then(response => {
        setCommands(response.data);
      })
      .catch(error => {
        console.error('Error fetching commands:', error);
      });
  };
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredCommands = commands.filter(command => {
    const searchTerm = searchQuery.toLowerCase();
    const commandFields = [
      command.nom,
      command.prenom,
      command.email,
      command.adresseCom,
      command.telCom,
      command.payCom,
      command.villeCom,
      command.codPostCom,
      command.typePay,
      command.DateCom
    ];

    return commandFields.some(field => field.toLowerCase().includes(searchTerm));
  });
  return (
    <>
      <Helmet>
        <title>Commands</title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Liste des Commandes
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
          <SearchIcon fontSize="small" />
          <TextField
            label="Search"
            value={searchQuery}
            onChange={handleSearch}
            sx={{ marginLeft: -1, marginTop: 0 }} 
          />
          </Stack>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => setOpenForm(true)}
          >
            Nouvelle Commande
          </Button>
        </Stack>

        <Dialog open={openForm} onClose={() => setOpenForm(false)}>
          <DialogTitle>Ajouter une Nouvelle Commande</DialogTitle>
          <DialogContent>
            <TextField
              label="Nom"
              value={newCommand.nom}
              onChange={e =>
                setNewCommand({ ...newCommand, nom: e.target.value })
              }sx={{marginTop:"16px",marginRight:"16px"}}
            />
           <TextField
              label="prenom"
              value={newCommand.prenom}
              onChange={e =>
                setNewCommand({ ...newCommand, prenom: e.target.value })
              }sx={{marginTop:"16px",marginRight:"16px"}}
            />
            <TextField
              label="email"
              value={newCommand.email}
              onChange={e =>
                setNewCommand({ ...newCommand, email: e.target.value })
              }sx={{marginTop:"16px",marginRight:"16px"}}
            />
            <TextField
              label="adresseCom"
              value={newCommand.adresseCom}
              onChange={e =>
                setNewCommand({ ...newCommand, adresseCom: e.target.value })
              }sx={{marginTop:"16px",marginRight:"16px"}}
            />
            <TextField
              label="telCom"
              value={newCommand.telCom}
              onChange={e =>
                setNewCommand({ ...newCommand, telCom: e.target.value })
              }sx={{marginTop:"16px",marginRight:"16px"}}
            />
            <TextField
              label="payCom"
              value={newCommand.payCom}
              onChange={e =>
                setNewCommand({ ...newCommand, payCom: e.target.value })
              }sx={{marginTop:"16px",marginRight:"16px"}}
            />
            <TextField
              label="villeCom"
              value={newCommand.villeCom}
              onChange={e =>
                setNewCommand({ ...newCommand, villeCom: e.target.value })
              }sx={{marginTop:"16px",marginRight:"16px"}}
            />
            <TextField
              label="codPostCom"
              value={newCommand.codPostCom}
              onChange={e =>
                setNewCommand({ ...newCommand, codPostCom: e.target.value })
              }sx={{marginTop:"16px",marginRight:"16px"}}
            />
            <TextField
              label="typePay"
              value={newCommand.typePay}
              onChange={e =>
                setNewCommand({ ...newCommand, typePay: e.target.value })
              }sx={{marginTop:"16px",marginRight:"16px"}}
            />
            <TextField
              label="DateCom"
              value={newCommand.DateCom}
              onChange={e =>
                setNewCommand({ ...newCommand, DateCom: e.target.value })
              }sx={{marginTop:"16px",marginRight:"16px"}}
            />
            
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenForm(false)}variant="contained" color="secondary">Annuler</Button>
            <Button onClick={handleCreateCommand} sx={{ bgcolor: '#007bff', color: '#ffffff' }}>
              Ajouter Commande
            </Button>
          </DialogActions>
        </Dialog>

        <Grid container spacing={3}>
        {filteredCommands.map(command => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={command._id}>
              <div>
              <Typography>Nom: {command.nom}</Typography>
                <Typography>Prenom: {command.prenom}</Typography>
                <Typography>Email: {command.email}</Typography>
                <Typography>Adresse commande: {command.adresseCom}</Typography>
                <Typography>telephone : {command.telCom}</Typography>
                <Typography>payer: {command.payCom}</Typography>
                <Typography>ville : {command.villeCom}</Typography>
                <Typography>code Post: {command.codPostCom}</Typography>
                <Typography>type Payament: {command.typePay}</Typography>
                <Typography>Date commande: {command.DateCom}</Typography>
                <Button onClick={() => handleEditCommand(command)}variant="outlined" color="primary" 
                style={{ marginRight: "1em", borderColor: "#007bff", color: "#007bff" }}>Modifier</Button>
                <Button onClick={() => handleDeleteCommand(command._id)}variant="outlined" color="secondary" 
                style={{ borderColor: "#dc3545", color: "#dc3545" }}>Supprimer</Button>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {editingCommand && (
        <Dialog
          open={Boolean(editingCommand)}
          onClose={() => setEditingCommand(null)}
        >
          <DialogTitle>Modifier la Commande</DialogTitle>
          <DialogContent>
            <TextField
              label="Nom"
              value={editingCommand.nom}
              onChange={e =>
                setEditingCommand({
                  ...editingCommand,
                  nom: e.target.value
                })
              }sx={{marginTop:"16px",marginRight:"16px"}}
            />
           
           <TextField
              label="prenom"
              value={editingCommand.prenom}
              onChange={e =>
                setEditingCommand({
                  ...editingCommand,
                  prenom: e.target.value
                })
              }sx={{marginTop:"16px",marginRight:"16px"}}
            />   <TextField
            label="email"
            value={editingCommand.email}
            onChange={e =>
              setEditingCommand({
                ...editingCommand,
                email: e.target.value
              })
            }sx={{marginTop:"16px",marginRight:"16px"}}
          />
           <TextField
            label="adresseCom"
            value={editingCommand.adresseCom}
            onChange={e =>
              setEditingCommand({
                ...editingCommand,
                adresseCom: e.target.value
              })
            }sx={{marginTop:"16px",marginRight:"16px"}}
          />
           <TextField
            label="telCom"
            value={editingCommand.telCom}
            onChange={e =>
              setEditingCommand({
                ...editingCommand,
                telCom: e.target.value
              })
            }sx={{marginTop:"16px",marginRight:"16px"}}
          />
            <TextField
            label="payCom"
            value={editingCommand.payCom}
            onChange={e =>
              setEditingCommand({
                ...editingCommand,
                payCom: e.target.value
              })
            }sx={{marginTop:"16px",marginRight:"16px"}}
          />
            <TextField
            label="villeCom"
            value={editingCommand.villeCom}
            onChange={e =>
              setEditingCommand({
                ...editingCommand,
                villeCom: e.target.value
              })
            }sx={{marginTop:"16px",marginRight:"16px"}}
          />
            <TextField
            label="codPostCom"
            value={editingCommand.codPostCom}
            onChange={e =>
              setEditingCommand({
                ...editingCommand,
                codPostCom: e.target.value
              })
            }sx={{marginTop:"16px",marginRight:"16px"}}
          />
           <TextField
            label="typePay"
            value={editingCommand.typePay}
            onChange={e =>
              setEditingCommand({
                ...editingCommand,
                typePay: e.target.value
              })
            }sx={{marginTop:"16px",marginRight:"16px"}}
          />
           <TextField
            label="DateCom"
            value={editingCommand.DateCom}
            onChange={e =>
              setEditingCommand({
                ...editingCommand,
                DateCom: e.target.value
              })
            }sx={{marginTop:"16px",marginRight:"16px"}}
          />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditingCommand(null)}variant="contained" color="secondary">Annuler</Button>
            <Button onClick={() => handleUpdateCommand(editingCommand)} sx={{ bgcolor: '#007bff', color: '#ffffff' }}>
              Enregistrer les Modifications
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
