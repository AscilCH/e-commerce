const mongoose = require("mongoose");
const schema = mongoose.Schema;
const panierSchema = new schema({
    nomProd:{
        type:String,
        required:true,
    },
      quantProd:{
        type:Number,
        required:true,
      },
      totProd:{
        type:Number,
        required:true
      },
      prixProd:{
        type:Number,
        required:true,
      },
})
module.exports = mongoose.model("panier", panierSchema);