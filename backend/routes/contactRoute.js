var express = require('express');
var router = express.Router();
// Créer une instance de contact.
const Contact = require('../modeles/Contact');
// créer un nouvelle contact
router.post('/', async (req, res) => {
const { nom, prenom, tel ,email, msg} = req.body;
const newContact= new Contact({nom:nom,prenom:prenom,tel:tel,email:email,msg:msg})
try {
await newContact.save();
res.status(200).json(newContact );
} catch (error) {
res.status(404).json({ message: error.message });
}

});
// afficher la liste des Contacts.
router.get('/', async (req, res, )=> {
    try {
        const cont = await Contact.find();
        res.status(200).json(cont);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
});
// chercher un Contact 
router.get('/:contactId',async(req, res)=>{
    try {
        const cont = await Contact.findById(req.params.contactId);
        res.status(200).json(cont);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
});
// modifier une catégorie
router.put('/:contactId', async (req, res)=> {
    const { nom, prenom, tel ,email,msg} = req.body;
const id = req.params.contactId;
try {
const cont1 = {nom:nom,prenom:prenom,tel:tel,email:email,msg:msg, _id:id };
console.log(cont1)
await Contact.findByIdAndUpdate(id, cont1);
res.json(cont1);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// Supprimer une catégorie
router.delete('/:contactId', async (req, res)=> {
    const id = req.params.contactId;
await Contact.findByIdAndDelete(id);
res.json({ message: "contact deleted successfully." });
});
module.exports = router;

