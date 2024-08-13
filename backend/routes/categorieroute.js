var express = require('express');
var router = express.Router();
// Créer une instance de categorie.
const Categorie = require('../modeles/Categorie');

// créer un nouvelle catégorie
router.post('/', async (req, res) => {
const { nomtypeCatq, imagecategorie} = req.body;
const newCategorie = new Categorie({nomtypeCatq:nomtypeCatq,imagecategorie:imagecategorie})
try {
await newCategorie.save();
res.status(200).json(newCategorie );
} catch (error) {
res.status(404).json({ message: error.message });
}

});
// afficher la liste des categories.
router.get('/', async (req, res, )=> {
    try {
        const cat = await Categorie.find();
        res.status(200).json(cat);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
        
});
// chercher une catégorie 
router.get('/:categorieId',async(req, res)=>{
    try {
        const cat = await Categorie.findById(req.params.categorieId);
        
        res.status(200).json(cat);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }

});
// modifier une catégorie
router.put('/:categorieId', async (req, res)=> {
    const { nomtypeCatq,imagecategorie} = req.body;
const id = req.params.categorieId;
try {
const cat1 = { nomtypeCatq:nomtypeCatq,imagecategorie:imagecategorie, _id:id };
console.log(cat1)
await Categorie.findByIdAndUpdate(id, cat1);
res.json(cat1);
} catch (error) {
res.status(404).json({ message: error.message });
}

});
// Supprimer une catégorie
router.delete('/:categorieId', async (req, res)=> {
    const id = req.params.categorieId;
await Categorie.findByIdAndDelete(id);
res.json({ message: "categorie deleted successfully." });
});
module.exports = router;

