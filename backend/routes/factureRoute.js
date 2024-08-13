var express = require('express');
var router = express.Router();
// Créer une instance de contact.

const Facture = require('../modeles/Facture');
// créer un nouvelle contact
router.post('/', async (req, res) => {
const { dateFac,etatcom} = req.body;
const newFacture= new Facture( {dateFac:dateFac,etatcom :etatcom  })
try {
await newFacture.save();
res.status(200).json(newFacture );
} catch (error) {
res.status(404).json({ message: error.message });
}

});
// afficher la liste des factures.
router.get('/', async (req, res, )=> {
    try {
        const fact = await Facture.find();
        res.status(200).json(fact);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
});
// chercher une facture
router.get('/:factureId',async(req, res)=>{
    try {
        const fact = await Facture.findById(req.params.factureId);
        res.status(200).json(fact);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
});
// modifier une facture
router.put('/:factureId', async (req, res)=> {
    const {dateFac,etatcom }= req.body;
const id = req.params.factureId;
try {
const fact1 = {dateFac:dateFac,etatcom :etatcom  };
console.log(fact1)
await Facture.findByIdAndUpdate(id, fact1);
res.json(fact1);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// Supprimer une catégorie
router.delete('/:factureId', async (req, res)=> {
    const id = req.params.factureId;
await Facture.findByIdAndDelete(id);
res.json({ message: "facture deleted successfully." });
});
module.exports = router;

