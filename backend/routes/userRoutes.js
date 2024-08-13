var express = require('express');
var router = express.Router();
const User = require('../modeles/user');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt'); 
//Register
router.post('/register', async (req, res) => {
  const { nom, prenom, tel, email, password, role } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = new User({
      nom: nom,
      prenom: prenom,
      tel: tel,
      email: email,
      password: hash,
      role: role
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});
 //Login
 router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Utilisateur non existant' });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Mot de passe incorrect' });
      return;
    }
  //if(user.role!=1) throw Error('Accès authorisé sauf pour admin');
  const accessToken = generateAccessToken(user);
  res.status(200).json({
    accessToken,
    user
  });
} catch (error) {
  res.status(404).json({ message: error.message });
}
});
 //Access Token 
 const generateAccessToken = (user) => {
  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' });
};
// afficher la liste des users.
router.get('/', async (req, res, )=> {
    try {
        const usr = await User.find();
        res.status(200).json(usr);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
        
});

router.get('/:userId',async(req, res)=>{
    try {
        const usr = await User.findById(req.params.userId);
        
        res.status(200).json(usr);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }

});
// modifier une user
router.put('/:userId', async (req, res)=> {
    const { nom, prenom, tel ,email,password} = req.body;
const id = req.params.userId;
try {
const cat1 = {nom:nom,prenom:prenom,tel:tel,email:email,password:password, _id:id };
console.log(cat1)
await User.findByIdAndUpdate(id, cat1);
res.json(cat1);
} catch (error) {
res.status(404).json({ message: error.message });
}

});
// Supprimer une user
router.delete('/:userId', async (req, res)=> {
    const id = req.params.userId;
await User.findByIdAndDelete(id);
res.json({ message: "user deleted successfully." });
});
module.exports = router;


