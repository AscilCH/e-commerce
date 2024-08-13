import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductList({ productList  }) { 
  const [products, setProducts] = useState([]); 
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      axios.get('http://localhost:3002/api/produits')
        .then(response => {
          setProducts(response.data);
        })
        .catch(error => {
          setError(`Error fetching products: ${error.message}`);
        });
    } catch (error) {
      setError(`Error fetching products: ${error.message}`);
    }
  }, []);

  return (
    <div>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul>
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            products.map(product => (
              <li key={product.id}>
                <img src={product.imgProd} alt={product.nomProd} />
                <p>{product.descrpProd}</p>
                <p>{product.prixProd}</p>
                {product.priceSale && <p>Sale Price: {product.priceSale}</p>}
                <p>Colors: {product.colors.join(', ')}</p>
                <p>Status: {product.status}</p>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
