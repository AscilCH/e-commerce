const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Categorie =require("./Categorie.js");
const marque =require("./marque.js");

const ProduitSchema = new schema({
    nomProd:{type:String,
        unique:true},
    refProd:{type:String,
        required:true,
        unique:true },
    descrpProd:{type:String,
        required:true},
    prixProd:{type:Number,
        required:true},
    imgProd:{type:String,
        unique:true,
        required:true},
    vidProd:{type:String,
        unique:true},
    quantProd: {
            type: Number, },   
    statusProd:{type:String,
       required:true},
    categorieID: {type:mongoose.Schema.Types.ObjectId,
        ref:Categorie},
    marqueID: {type:mongoose.Schema.Types.ObjectId,
            ref:marque},
});
module.exports = mongoose.model("produit", ProduitSchema);