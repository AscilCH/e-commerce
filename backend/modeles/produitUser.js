// models/
const mongoose =require('mongoose');
const user =require("./user.js");
const Produit =require("./Produit.js");
const produitUserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  produitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produit',
  }
});

module.exports = mongoose.model('produitUser', produitUserSchema);
