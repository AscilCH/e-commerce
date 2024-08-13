var express = require('express');
var router = express.Router();
// Créer une instance de contact.

const Commande = require('../modeles/Commande');
// créer un nouvelle contact
router.post('/', async (req, res) => {
const {nom,prenom,email,adresseCom,telCom,payCom,
villeCom,codPostCom, typePay, DateCom
    } = req.body;
const newCommande= new Commande( {nom:nom,prenom:prenom,email:email,adresseCom:adresseCom,telCom:telCom,payCom:payCom,
    villeCom:villeCom,codPostCom:codPostCom, typePay:typePay, DateCom:DateCom
        })
try {
await newCommande.save();
res.status(200).json(newCommande );
} catch (error) {
res.status(404).json({ message: error.message });
}

});
// afficher la liste des Commandes.
router.get('/', async (req, res, )=> {
    try {
        const cmd = await Commande.find();
        res.status(200).json(cmd);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
});
// chercher une Commande
router.get('/:commandeId',async(req, res)=>{
    try {
        const cmd = await Commande.findById(req.params.commandeId);
        res.status(200).json(cmd);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
});
// modifier une commande
router.put('/:commandeId', async (req, res)=> {
    const {nom,prenom,email,adresseCom,telCom,payCom,
        villeCom,codPostCom, typePay, DateCom
            }= req.body;
const id = req.params.commandeId;
try {
const cmd1 = {nom:nom,prenom:prenom,email:email,adresseCom:adresseCom,telCom:telCom,payCom:payCom,
    villeCom:villeCom,codPostCom:codPostCom, typePay:typePay, DateCom:DateCom
         };
console.log(cmd1)
await Commande.findByIdAndUpdate(id, cmd1);
res.json(cmd1);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// Supprimer une commande
router.delete('/:commandeId', async (req, res)=> {
    const id = req.params.commandeId;
await Commande.findByIdAndDelete(id);
res.json({ message: "commande deleted successfully." });
});
module.exports = router;

