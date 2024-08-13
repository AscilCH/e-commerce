import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
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
  DialogActions,
  InputAdornment, 
  IconButton 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Iconify from '../components/iconify';

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ nomtypeCatq: '', imagecategorie: '' });
  const [openForm, setOpenForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = () => {
    axios
      .post('http://localhost:3002/api/categories', newCategory)
      .then(response => {
        fetchCategories();
        setNewCategory({ nomtypeCatq: '', imagecategorie: '' });
        setOpenForm(false);
      })
      .catch(error => {
        console.error('Error creating new category:', error);
      });
  };

  const handleEditCategory = category => {
    setEditingCategory(category);
  };

  const handleUpdateCategory = updatedCategory => {
    axios
      .put(`http://localhost:3002/api/categories/${updatedCategory._id}`, updatedCategory)
      .then(response => {
        fetchCategories();
        setEditingCategory(null);
      })
      .catch(error => {
        console.error('Error updating category:', error);
      });
  };

  const handleDeleteCategory = categoryId => {
    axios
      .delete(`http://localhost:3002/api/categories/${categoryId}`)
      .then(response => {
        fetchCategories();
      })
      .catch(error => {
        console.error('Error deleting category:', error);
      });
  };

  const fetchCategories = () => {
    axios
      .get('http://localhost:3002/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  };
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = searchQuery
  ? categories.filter(category =>
      category.nomtypeCatq.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : categories;
  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Liste des Catégories
          </Typography> <Stack direction="row" spacing={1} alignItems="center">
          <SearchIcon fontSize="small" />
          <TextField
          label="Search "
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          sx={{ marginLeft: -1, marginTop: 0 }} 
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchQuery('')}>
                  <Iconify icon="eva:close-circle-fill" />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        </Stack>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => setOpenForm(true)}
          >
            Nouvelle Catégorie
          </Button>
       
        </Stack>

        <Dialog open={openForm} onClose={() => setOpenForm(false)}>
          <DialogTitle>Ajouter une Nouvelle Catégorie</DialogTitle>

          <DialogContent>
            <TextField
              label="Nom de la Catégorie"
              value={newCategory.nomtypeCatq}
              onChange={e =>
                setNewCategory({ ...newCategory, nomtypeCatq: e.target.value })
              }sx={{ marginBottom: '16px' ,marginRight:'16px' }}
            />
            <TextField
              label="URL de l'Image"
              value={newCategory.imagecategorie}
              onChange={e =>
                setNewCategory({ ...newCategory, imagecategorie: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenForm(false)}>Annuler</Button>
            <Button onClick={handleCreateCategory} sx={{ bgcolor: '#007bff', color: '#ffffff' }}>
              Ajouter Catégorie
            </Button>
          </DialogActions>
        </Dialog>
        
        <Grid container spacing={3}>
        {filteredCategories.map(category => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={category._id}>
              <div>
                <Typography>{category.nomtypeCatq}</Typography>
                <img src={category.imagecategorie} alt={category.nomtypeCatq} />
                <Button onClick={() => handleEditCategory(category)}variant="outlined" color="primary" 
                style={{marginTop:"16px", marginRight: "1em", borderColor: "#007bff", color: "#007bff" }}>Modifier</Button>
                <Button onClick={() => handleDeleteCategory(category._id)}variant="outlined" 
                color="secondary" style={{marginTop:"16px", borderColor: "#dc3545", color: "#dc3545" }}>Supprimer</Button>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {editingCategory && (
        <Dialog
          open={Boolean(editingCategory)}
          onClose={() => setEditingCategory(null)}
        >
          <DialogTitle>Modifier la Catégorie</DialogTitle>
          <DialogContent>
            <TextField
              label="Nom de la Catégorie"
              value={editingCategory.nomtypeCatq}
              onChange={e =>
                setEditingCategory({
                  ...editingCategory,
                  nomtypeCatq: e.target.value
                })
              }sx={{marginTop:"16px" ,marginBottom: '16px' ,marginRight:'16px',width:"100%" }}
             />
            <TextField
              label="URL de l'Image"
              value={editingCategory.imagecategorie}
              onChange={e =>
                setEditingCategory({
                  ...editingCategory,
                  imagecategorie: e.target.value
                })
              }sx={{marginTop:"16px",marginRight:"16px", width:"100%"}}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditingCategory(null)} variant="contained" color="secondary">Annuler</Button>
            <Button onClick={() => handleUpdateCategory(editingCategory)} sx={{ bgcolor: '#007bff', color: '#ffffff' }}>
              Enregistrer les Modifications
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
