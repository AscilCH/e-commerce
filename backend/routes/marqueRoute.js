var express = require('express');
var router = express.Router();
// Créer une instance de contact.

const Marque = require('../modeles/marque');
// créer un nouvelle contact
router.post('/', async (req, res) => {
const {nomMarq,imgMarq} = req.body;
const newMarque= new Marque( {nomMarq:nomMarq,imgMarq:imgMarq })
try {
await newMarque.save();
res.status(200).json(newMarque );
} catch (error) {
res.status(404).json({ message: error.message });
}

});
// afficher la liste des factures.
router.get('/', async (req, res, )=> {
    try {
        const mar = await Marque.find();
        res.status(200).json(mar);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
});
// chercher une marque
router.get('/:marqueId',async(req, res)=>{
    try {
        const mar = await Marque.findById(req.params.marqueId);
        res.status(200).json(mar);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
});
// modifier une facture
router.put('/:marqueId', async (req, res)=> {
    const {nomMarq,imgMarq}= req.body;
const id = req.params.marqueId;
try {
const mar1 = {nomMarq:nomMarq,imgMarq:imgMarq};
console.log(mar1)
await Marque.findByIdAndUpdate(id, mar1);
res.json(mar1);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// Supprimer une catégorie
router.delete('/:marqueId', async (req, res)=> {
    const id = req.params.marqueId;
await Marque.findByIdAndDelete(id);
res.json({ message: "marque deleted successfully." });
});
module.exports = router;

