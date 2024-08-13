import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
import { fToNow } from '../../../utils/formatTime';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function AppNewsUpdate({ title, subheader, ...other }) {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    // Fetch product data from the backend API
    axios.get('http://localhost:3002/api/produits')
      .then(response => {
        setNewsList(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {newsList.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
          View all
        </Button>
      </Box>
    </Card>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    nomProd: PropTypes.string,
    imgProd: PropTypes.string,
    descrpProd: PropTypes.string,
    prixProd: PropTypes.number,
    categorieID: PropTypes.string,
  }),
};

function ProductItem({ product }) {
  const { nomProd, imgProd, descrpProd, prixProd } = product;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box component="img" alt={nomProd} src={imgProd} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
          {nomProd}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {descrpProd}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          Price: {prixProd}
        </Typography>
      </Box>
    </Stack>
  );
}
