var express = require('express');
var router = express.Router();
const demande = require('../modeles/Demande');
// créer un nouvelle contact
router.post('/', async (req, res) => {
const {cin,photo,desc,etatdem,userID} = req.body;
const newdemande= new demande( {cin:cin,photo:photo,desc:desc,etatdem:etatdem,userID:userID })
try {
await newdemande.save();
res.status(200).json(newdemande );
} catch (error) {
res.status(404).json({ message: error.message });
}

});
// afficher la liste des factures.
router.get('/', async (req, res, )=> {
    try {
        const dem = await demande.find();
        res.status(200).json(dem);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
});
// chercher une demande
router.get('/:demandeId',async(req, res)=>{
    try {
        const dem = await demande.findById(req.params.demandeId);
        res.status(200).json(dem);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
});
// modifier une demande
router.put('/:demandeId', async (req, res)=> {
    const {cin,photo,desc,etatdem,userID}= req.body;
const id = req.params.demandeId;
try {
const dem = {cin:cin,photo:photo,desc:desc,etatdem:etatdem,userID:userID };
console.log(dem)
await demande.findByIdAndUpdate(id, dem);
res.json(dem);
} catch (error) {
res.status(404).json({ message: error.message });
}
});

router.delete('/:demandeId', async (req, res)=> {
    const id = req.params.demandeId;
await demande.findByIdAndDelete(id);
res.json({ message: "demande deleted successfully." });
});
module.exports = router;

