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
  Card,
  CardContent,
  CardActions,
  CardHeader,
  CardMedia,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Iconify from '../components/iconify';

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    nomProd: '',
    prixProd: '',
    imgProd: '',
    vidProd: '',
    quantProd: '',
    statusProd: '',
    refProd: '',
    descrpProd: '',
    categorieID: '',
    marqueID: ''
  });
  const [openForm, setOpenForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchBrands();
    fetchCategories();
  }, [searchTerm]); 
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
  const fetchBrands = () => {
    axios
      .get('http://localhost:3002/api/marques')
      .then(response => {
        setBrands(response.data);
      })
      .catch(error => {
        console.error('Error fetching brands:', error);
      });
  };
  const handleCreateProduct = () => {
    axios
      .post('http://localhost:3002/api/produits', newProduct)
      .then(response => {
        fetchProducts();
        setNewProduct({
          nomProd: '',
          prixProd: '',
          imgProd: '',
          vidProd: '',
          quantProd: '',
          statusProd: '',
          refProd: '',
          descrpProd: '',
          categorieID: '',
          marqueID: ''
        });
        setOpenForm(false);
      })
      .catch(error => {
        console.error('Error creating new product:', error);
      });
  };

  const handleEditProduct = product => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = updatedProduct => {
    axios
      .put(`http://localhost:3002/api/produits/${updatedProduct._id}`, updatedProduct)
      .then(response => {
        fetchProducts();
        setEditingProduct(null);
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  const handleDeleteProduct = productId => {
    axios
      .delete(`http://localhost:3002/api/produits/${productId}`)
      .then(response => {
        fetchProducts();
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };


  const fetchProducts = () => {
    axios.get('http://localhost:3002/api/produits')
      .then(response => {
        const filteredProducts = response.data.filter(product => {
          return product.nomProd.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setProducts(filteredProducts);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };
 

  return (
    <div >
      <Helmet>
        <title>Products</title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5} >
          <Typography variant="h4" gutterBottom>
            Liste des Produits
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
          <SearchIcon fontSize="small" />
        <TextField
          label="Search "
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          sx={{ marginLeft: -1, marginTop: 0 }} 
        />
        </Stack>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => setOpenForm(true)}
          >
            Nouveau Produit
          </Button>
     
        </Stack>
      
        <Dialog open={openForm} onClose={() => setOpenForm(false)}  fullWidth
          maxWidth="md">
          <DialogTitle>Ajouter un Nouveau Produit</DialogTitle>
          <DialogContent  sx={{ display: 'flex', flexDirection: 'column',width:"100%"}}>
            <TextField
              label="Nom du Produit"
              value={newProduct.nomProd}
              onChange={e =>
                setNewProduct({ ...newProduct, nomProd: e.target.value })
              }
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              label="Prix du Produit"
              value={newProduct.prixProd}
              onChange={e =>
                setNewProduct({ ...newProduct, prixProd: e.target.value })
              }
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              label="Image URL du Produit"
              value={newProduct.imgProd}
              onChange={e =>
                setNewProduct({ ...newProduct, imgProd: e.target.value })
              }
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              label="Vidéo URL du Produit"
              value={newProduct.vidProd}
              onChange={e =>
                setNewProduct({ ...newProduct, vidProd: e.target.value })
              }  sx={{ marginBottom: '16px' }}
            />
            <TextField
              label="Quantité du Produit"
              value={newProduct.quantProd}
              onChange={e =>
                setNewProduct({ ...newProduct, quantProd: e.target.value })
              }  sx={{ marginBottom: '16px' }}
            />
            <TextField
              label="Statut du Produit"
              value={newProduct.statusProd}
              onChange={e =>
                setNewProduct({ ...newProduct, statusProd: e.target.value })
              }  sx={{ marginBottom: '16px' }}
            />
            <TextField
              label="Référence du Produit"
              value={newProduct.refProd}
              onChange={e =>
                setNewProduct({ ...newProduct, refProd: e.target.value })
              }  sx={{ marginBottom: '16px' }}
            />
            <TextField
              label="Description du Produit"
              value={newProduct.descrpProd}
              onChange={e =>
                setNewProduct({ ...newProduct, descrpProd: e.target.value })
              }  sx={{ marginBottom: '16px' }}
            />
            <TextField
              label="ID de la Catégorie"
              value={newProduct.categorieID}
              onChange={e =>
                setNewProduct({ ...newProduct, categorieID: e.target.value })
              }  sx={{ marginBottom: '16px' }}
            />
            <TextField
              label="ID de la Marque"
              value={newProduct.marqueID}
              onChange={e =>
                setNewProduct({ ...newProduct, marqueID: e.target.value })
              }  sx={{ marginBottom: '16px' }}
            />
          </DialogContent>
          <DialogActions>
          <Button
            onClick={() => setOpenForm(false)}
            variant="contained" color="secondary"
          >
            Annuler
          </Button>
          <Button
            onClick={handleCreateProduct}
            sx={{ backgroundColor: '#007bff', color: '#ffffff' }}
          >
            Ajouter le Produit
          </Button>
          </DialogActions>
        </Dialog>

        <Grid container spacing={3}>
  {products.map(product => {
    const brand = brands.find(brand => brand._id === product.marqueID);
    const category = categories.find(category => category._id === product.categorieID);
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
      <Card>
        <CardHeader title={product.nomProd} />
        <CardMedia
          component="img"
          alt={`Product ${product.nomProd}`}
          height="200"
          image={product.imgProd}
        />
        <CardContent>
          <Typography variant="body2">
            Prix: {product.prixProd} Dt
          </Typography>
          <Typography>Quantité: {product.quantProd}</Typography>
          <Typography>Statut: {product.statusProd}</Typography>
          <Typography>Référence: {product.refProd}</Typography>
          <Typography>Description: {product.descrpProd}</Typography>
          <Typography>Catégorie: {category ? category.nomtypeCatq : 'N/A'}</Typography>
          {brand && <Typography>Marque: {brand.nomMarq}</Typography>}
          </CardContent>
                  <CardActions>
                  <Button
                  onClick={() => handleEditProduct(product)}
                  sx={{ backgroundColor: '#007bff', color: '#ffffff', marginRight: '10px' }}
                >
                  Modifier
                </Button>
                <Button
                  onClick={() => handleDeleteProduct(product._id)}
                  sx={{ backgroundColor: '#dc3545', color: '#ffffff' }}
                >
                  Supprimer
                </Button>
          </CardActions>
                </Card>
              </Grid>
                );
              })}
</Grid>

      </Container>

      {editingProduct && (
        <Dialog
          open={Boolean(editingProduct)}
          onClose={() => setEditingProduct(null)}fullWidth
          maxWidth="md"
        >
          <DialogTitle>Modifier le Produit</DialogTitle>
          <DialogContent>
            <TextField
              label="Nom du Produit"
              value={editingProduct.nomProd}
              onChange={e =>
                setEditingProduct({
                  ...editingProduct,
                  nomProd: e.target.value
                })
              } sx={{ marginBottom: '16px' , marginTop:'16px',marginRight:'16px'  }}
            />
            <TextField
              label="Prix du Produit"
              value={editingProduct.prixProd}
              onChange={e =>
                setEditingProduct({
                  ...editingProduct,
                  prixProd: e.target.value
                })
              } sx={{ marginBottom: '16px', marginTop:'16px',marginRight:'16px' }}
            />
            <TextField
              label="Image URL du Produit"
              value={editingProduct.imgProd}
              onChange={e =>
                setEditingProduct({
                  ...editingProduct,
                  imgProd: e.target.value
                })
              } sx={{ marginBottom: '16px', marginTop:'16px' ,marginRight:'16px' }}
            />
            <TextField
              label="Vidéo URL du Produit"
              value={editingProduct.vidProd}
              onChange={e =>
                setEditingProduct({
                  ...editingProduct,
                  vidProd: e.target.value
                })
              } sx={{ marginBottom: '16px' ,marginRight:'16px' }}
            />
            <TextField
              label="Quantité du Produit"
              value={editingProduct.quantProd}
              onChange={e =>
                setEditingProduct({
                  ...editingProduct,
                  quantProd: e.target.value
                })
              } sx={{ marginBottom: '16px' ,marginRight:'16px' }}
            />
            <TextField
              label="Statut du Produit"
              value={editingProduct.statusProd}
              onChange={e =>
                setEditingProduct({
                  ...editingProduct,
                  statusProd: e.target.value
                })
              } sx={{ marginBottom: '16px' ,marginRight:'16px' }}
            />
            <TextField
              label="Référence du Produit"
              value={editingProduct.refProd}
              onChange={e =>
                setEditingProduct({
                  ...editingProduct,
                  refProd: e.target.value
                })
              } sx={{ marginBottom: '16px',marginRight:'16px'  }}
            />
            <TextField
              label="Description du Produit"
              value={editingProduct.descrpProd}
              onChange={e =>
                setEditingProduct({
                  ...editingProduct,
                  descrpProd: e.target.value
                })
              } sx={{ marginBottom: '16px' ,marginRight:'16px' }}
            />
            <TextField
              label="ID de la Catégorie"
              value={editingProduct.categorieID}
              onChange={e =>
                setEditingProduct({
                  ...editingProduct,
                  categorieID: e.target.value
                })
              } sx={{ marginBottom: '16px' ,marginRight:'16px' }}
            />
            <TextField
              label="ID de la Marque"
              value={editingProduct.marqueID}
              onChange={e =>
                setEditingProduct({
                  ...editingProduct,
                  marqueID: e.target.value
                })
              } sx={{ marginBottom: '16px' ,marginRight:'16px' }}
            />
          </DialogContent>
          <DialogActions>
          <Button onClick={() => setEditingProduct(null)}variant="contained" color="secondary">Annuler</Button>
            <Button
              onClick={() => handleUpdateProduct(editingProduct)}
              sx={{ bgcolor: '#007bff', color: '#ffffff' }}
            >
              Enregistrer les Modifications
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
