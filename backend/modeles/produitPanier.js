// models/PanierProduits.js
const mongoose = require('mongoose');
const Panier =require("./Panier.js");
const Produit =require("./Produit.js");
const produitPanierSchema = new mongoose.Schema({
  panierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Panier',
  },
  produitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produit',
  },
  quantity: Number,
});

module.exports = mongoose.model('produitPanier', produitPanierSchema);
