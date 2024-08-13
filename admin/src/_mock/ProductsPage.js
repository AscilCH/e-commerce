import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import axios from 'axios';

export default function ProductsPage() {
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
  console.log("Fetched products:", products); // Add this line

  return (
    <div>
      <h1>Product List</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ProductList productList={products} /> // Pass the products as a prop named productList
      )}
    </div>
  );
}
