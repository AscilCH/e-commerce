var express = require('express');
var router = express.Router();
// Créer une instance de produit.
const Produit = require('../modeles/Produit');

// créer un nouvelle catégorie
router.post('/', async (req, res) => {
const { nomProd,prixProd, imgProd,vidProd,quantProd,statusProd,refProd,descrpProd,categorieID,marqueID} = req.body;
const newProduit = new Produit({nomProd:nomProd,prixProd:prixProd, imgProd:imgProd,
    vidProd:vidProd,quantProd:quantProd,statusProd:statusProd,refProd:refProd,categorieID:categorieID,marqueID:marqueID,
    descrpProd:descrpProd})
try {
await newProduit.save();
res.status(200).json(newProduit);
} catch (error) {
res.status(404).json({ message: error.message });
}

});
// afficher la liste des Produits.
router.get('/', async (req, res, )=> {
    try {
        const prod = await Produit.find();
        res.status(200).json(prod);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
        
});
// chercher une produit
router.get('/:produitId',async(req, res)=>{
    try {
        const prod = await Produit.findById(req.params.produitId);
        
        res.status(200).json(prod);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }

});
// modifier une produit
router.put('/:produitId', async (req, res)=> {
    const { nomProd,prixProd, imgProd,vidProd,quantProd,statusProd,refProd,descrpProd,categorieID,marqueID} = req.body;
const id = req.params.produitId;
try {
const prod1 = {nomProd:nomProd,prixProd:prixProd, imgProd:imgProd,
    vidProd:vidProd,quantProd:quantProd,statusProd:statusProd,refProd:refProd,categorieID:categorieID,marqueID:marqueID,
    descrpProd:descrpProd}
console.log(prod1)
await Produit.findByIdAndUpdate(id,prod1);
res.json(prod1);
} catch (error) {
res.status(404).json({ message: error.message });
}

});
// Supprimer une produit
router.delete('/:produitId', async (req, res)=> {
    const id = req.params.produitId;
await Produit.findByIdAndDelete(id);
res.json({ message: "produit deleted successfully." });
});
module.exports = router;

