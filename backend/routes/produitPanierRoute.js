// routes.js
const express = require('express');

const Produit = require('../modeles/Produit.js');
const Panier = require('../modeles/Panier.js');
const produitPanier = require('../modeles/produitPanier.js');
const router = express.Router();
// Create a new produit
router.post('/produits', async (req, res) => {
  try {
    const produit = await Produit.create(req.body);
    res.json(produit);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create a produit.' });
  }
});

// Create a new panier
router.post('/paniers', async (req, res) => {
  try {
    const panier = await Panier.create(req.body);
    res.json(panier);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create a panier.' });
  }
});

// Add produit to panier (with quantity)
router.post('/paniers/:panierId/produits/:produitId', async (req, res) => {
  try {
    const { panierId, produitId } = req.params;
    const { quantity } = req.body;

    const panierProduits = await produitPanier.create({
      panierId,
      produitId,
      quantity,
    });

    res.json(panierProduits);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add produit to panier.' });
  }
});

// Get all produits in a panier
router.get('/paniers/:panierId/produits', async (req, res) => {
  try {
    const { panierId } = req.params;
    const panierProduits = await produitPanier.find({ panierId }).populate('produitId');
    res.json(panierProduits);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch produits in panier.' });
  }
});

// Get all paniers and their produits
router.get('/paniers', async (req, res) => {
  try {
    const paniers = await Panier.find().populate('produits');
    res.json(paniers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch paniers.' });
  }
});

module.exports = router;
