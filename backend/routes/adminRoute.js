var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt'); 
const Admin = require('../modeles/Admin');

// register admin
router.post('/register', async (req, res) => {
const { nomad, prenomad, telad ,emailad,passwordad} = req.body;
try {   
  const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(passwordad, salt);
    const newAdmin= new Admin({
    nomad:nomad,
    prenomad:prenomad,
    telad:telad,
    emailad:emailad,
    passwordad:hash
})
await newAdmin.save();
res.status(200).json(newAdmin );
} catch (error) {
res.status(404).json({ message: error.message });
}
});
 //Login
 router.post('/login', async (req, res) => {
    try {
      const { emailad, passwordad } = req.body;
      const admin = await Admin.findOne({ emailad });
      if (!admin) {
        res.status(401).json({ message: 'Utilisateur non existant' });
        return;
      }
      const isMatch = await bcrypt.compare(passwordad, admin.passwordad);
      if (!isMatch) {
        res.status(400).json({ message: 'Mot de passe incorrect' });
        return;
      }
    const accessToken = generateAccessToken(admin);
    res.status(200).json({
      accessToken,
      admin
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  });
   //Access Token 
   const generateAccessToken = (admin) => {
    return jwt.sign({ admin }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' });
  };
// afficher la liste des users.
router.get('/', async (req, res, )=> {
    try {
        const ad= await Admin.find();
        res.status(200).json(ad);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
        
});
// chercher admin 
router.get('/:adminId',async(req, res)=>{
    try {
        const add = await Admin.findById(req.params.adminId);
        res.status(200).json(add);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }

});

router.put('/:adminId', async (req, res)=> {
    const { nomad, prenomad, telad ,emailad,passwordad} = req.body;
const id = req.params.adminId;
try {
const ad1 = {nomad:nomad,prenomad:prenomad,telad:telad,emailad:emailad,passwordad:passwordad };
console.log(ad1)
await Admin.findByIdAndUpdate(id, ad1);
res.json(ad1);
} catch (error) {
res.status(404).json({ message: error.message });
}

});

router.delete('/:adminId', async (req, res)=> {
    const id = req.params.adminId;
await Admin.findByIdAndDelete(id);
res.json({ message: "admin deleted successfully." });
});
module.exports = router;