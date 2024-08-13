var express = require('express');
var router = express.Router();
const Panier = require('../modeles/Panier');

// Créer un nouveau panier
router.post('/', async (req, res) => {
  const { nomProd, quantProd, totProd, prixProd } = req.body;
  const newPanier = new Panier({ nomProd, quantProd, totProd, prixProd });
  try {
    await newPanier.save();
    res.status(200).json(newPanier);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Afficher la liste des paniers
router.get('/', async (req, res) => {
  try {
    const paniers = await Panier.find();
    res.status(200).json(paniers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Chercher un panier par son ID
router.get('/:panierId', async (req, res) => {
  try {
    const panier = await Panier.findById(req.params.panierId);
    res.status(200).json(panier);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Modifier un panier
router.put('/:panierId', async (req, res) => {
  const { nomProd, quantProd, totProd, prixProd } = req.body;
  const id = req.params.panierId;
  try {
    const panier = await Panier.findByIdAndUpdate(id, { nomProd, quantProd, totProd, prixProd }, { new: true });
    res.json(panier);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Supprimer un panier
router.delete('/:panierId', async (req, res) => {
  const id = req.params.panierId;
  try {
    await Panier.findByIdAndDelete(id);
    res.json({ message: "Panier deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
