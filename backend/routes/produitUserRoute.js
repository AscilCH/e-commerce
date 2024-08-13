const express = require('express');
const router = express.Router();

const Produit = require('../modeles/Produit.js');
const User = require('../modeles/user.js');
const ProduitUser = require('../modeles/produitUser.js');

// Create a new produit matmchich
router.post('/produits', async (req, res) => {
  try {
    const produit = await Produit.create(req.body);
    res.json(produit);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create a produit.' });
  }
});

// Create a new user (panier)
router.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create a panier.' });
  }
});

// Add produit to user's panier (with quantity)
router.post('/users/:userId/produits/:produitId', async (req, res) => {
  try {
    const { userId, produitId } = req.params;
    const userProduits = await ProduitUser.create({
      userId,
      produitId,
    });
    res.json(userProduits);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add produit to panier.' });
  }
});

// Get all produits in a user's panier
router.get('/users/:userId/produits', async (req, res) => {
  try {
    const { userId } = req.params;
    const userProduits = await ProduitUser.find({ userId }).populate('produitId');
    res.json(userProduits);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch produits in panier.' });
  }
});

// Get all users (paniers) and their produits
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().populate('produits');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch paniers.' });
  }
});

module.exports = router;
