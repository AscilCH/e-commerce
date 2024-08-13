const express=require('express');
const mongoose =require("mongoose")
const dotenv =require('dotenv')
const cors = require('cors')
dotenv.config()
const app = express();
//Les cors 
app.use(cors())
//BodyParser Middleware
app.use(express.json()); 
mongoose.set("strictQuery", false);
// Connexion à la base données
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => {console.log("Connexion à la base de données réussie");
    }).catch(err => {
    console.log('Impossible de se connecter à la base de données', err);
    process.exit();
    });
    app.get("/",(req,res)=>{
    res.send("bonjour");
    });
    const categorieRouter =require("./routes/categorieroute")
    app.use('/api/categories', categorieRouter);
    const userRoutes =require("./routes/userRoutes")
    app.use('/api/users', userRoutes);
    const contactRoutes =require("./routes/contactRoute")
    app.use('/api/contacts', contactRoutes);
    const produitRoutes =require("./routes/produitRoute")
    app.use('/api/produits', produitRoutes);
    const factureRoutes =require("./routes/factureRoute")
    app.use('/api/factures', factureRoutes);
    const commandeRoutes =require("./routes/commandeRoute")
    app.use('/api/commandes', commandeRoutes);
    const panierRoutes =require("./routes/panierRoute")
    app.use('/api/paniers', panierRoutes);
    const marqueRoutes =require("./routes/marqueRoute")
    app.use('/api/marques', marqueRoutes);
    const adminRoutes =require("./routes/adminRoute")
    app.use('/api/admins', adminRoutes);

    const demandeRoutes =require("./routes/demandeRoute")
    app.use('/api/demands', demandeRoutes);

    const produitPanierRoutes =require("./routes/produitPanierRoute")
    app.use('/api/produitPanier', produitPanierRoutes);
    const produitUserRoutes =require("./routes/produitUserRoute")
    app.use('/api/produitUser', produitUserRoutes);
    app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`); });
    module.exports = app;
   