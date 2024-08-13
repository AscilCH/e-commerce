const mongoose = require("mongoose");
const schema = mongoose.Schema;
const CommandeSchema = new schema({
nom:{type:String, required:true },
prenom:{type:String,unique:true},
email:{type:String,required:true},
adresseCom:{type:String,required:true},
telCom:{type:Number,required:true},
payCom:{type:String,required:true},
villeCom:{type:String,required:true},
codPostCom:{type:Number,required:true},
typePay:{type:String,required:true},
DateCom:{type:Date,required:true},

})
module.exports = mongoose.model("commande", CommandeSchema);