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
import Iconify from '../components/iconify';
import {
  BlogPostCard,
  BlogPostsSort,
  BlogPostsSearch
} from '../sections/@dashboard/blog';



const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [newMarque, setNewMarque] = useState({ nomMarq: '', imgMarq: '' });
  const [openForm, setOpenForm] = useState(false);
  const [editingMarque, setEditingMarque] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3002/api/marques')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching blog posts:', error);
      });
  }, []);

  const handleCreateMarque = () => {
    axios
      .post('http://localhost:3002/api/marques', newMarque)
      .then(response => {
        fetchMarques();
        setNewMarque({ nomMarq: '', imgMarq: '' });
        setOpenForm(false);
      })
      .catch(error => {
        console.error('Error creating new marque:', error);
      });
  };

  const handleEditMarque = marque => {
    setEditingMarque(marque);
  };

  const handleUpdateMarque = updatedMarque => {
    axios
      .put(`http://localhost:3002/api/marques/${updatedMarque._id}`, updatedMarque)
      .then(response => {
        fetchMarques();
        setEditingMarque(null);
      })
      .catch(error => {
        console.error('Error updating marque:', error);
      });
  };

  const handleDeleteMarque = marqueId => {
    axios
      .delete(`http://localhost:3002/api/marques/${marqueId}`)
      .then(response => {
        fetchMarques();
      })
      .catch(error => {
        console.error('Error deleting marque:', error);
      });
  };

  const fetchMarques = () => {
    axios
      .get('http://localhost:3002/api/marques')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching marques:', error);
      });
  };
  const filteredMarques = posts.filter(marque => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      marque.nomMarq.toLowerCase().includes(searchTerm)
    );
  });
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

      
  return (
    <>
      <Helmet>
        <title>Blog</title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
         Liste Marque
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
          <SearchIcon fontSize="small" />
          <TextField
            label="Search"
            value={searchQuery}
            onChange={handleSearch}
            sx={{ width: '200px' }}
          />
          </Stack>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => setOpenForm(true)}
          >
            New Marque
          </Button>
      
        </Stack>

        <Dialog open={openForm} onClose={() => setOpenForm(false)}>
          <DialogTitle>Add New Marque</DialogTitle>
          <DialogContent>
            <TextField
              label="Marque Name"
              value={newMarque.nomMarq}
              onChange={e =>
                setNewMarque({ ...newMarque, nomMarq: e.target.value })
              }sx={{ marginBottom: '16px' ,marginRight:'16px' }}
            />
            <TextField
              label="Image URL"
              value={newMarque.imgMarq}
              onChange={e =>
                setNewMarque({ ...newMarque, imgMarq: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenForm(false)}variant="contained" color="secondary">Cancel</Button>
            <Button onClick={handleCreateMarque}  sx={{ bgcolor: '#007bff', color: '#ffffff' }}>Add Marque</Button>
          </DialogActions>
        </Dialog>

        <Grid container spacing={3}>
        {filteredMarques.map(marque => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={marque._id}>
              <BlogPostCard
                nomMarq={marque.nomMarq}
                imgMarq={marque.imgMarq}
                onEditClick={() => handleEditMarque(marque)}
                onDeleteClick={() => handleDeleteMarque(marque._id)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {editingMarque && (
        <Dialog
          open={Boolean(editingMarque)}
          onClose={() => setEditingMarque(null)}
        >
          <DialogTitle>Edit Marque</DialogTitle>
          <DialogContent>
           <div>
            <TextField
              label="Marque Name"
              value={editingMarque.nomMarq}
              onChange={e =>
                setEditingMarque({
                  ...editingMarque,
                  nomMarq: e.target.value
                })
              }sx={{marginTop:"16px",marginBottom:"16px"}}
            /></div>
            <div>
            <TextField
              label="Image URL"
              value={editingMarque.imgMarq}
              onChange={e =>
                setEditingMarque({
                  ...editingMarque,
                  imgMarq: e.target.value
                })
              }
            /></div>
          </DialogContent>
          <DialogActions>
          <Button onClick={() => setEditingMarque(null)} variant="contained" color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleUpdateMarque(editingMarque)} variant="contained" sx={{ bgcolor: '#007bff', color: '#ffffff' }}>
            Save Changes
          </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
