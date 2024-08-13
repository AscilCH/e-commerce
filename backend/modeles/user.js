const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userSchema = new schema({
  prenom:{
    type:String,
    required:true,
    unique:true 
},
  nom:{
    type:String,
    required:true,
    unique:true 
},
  tel:{
    type:Number
  },
email:{
    type:String,
    required:true,
    unique:true 
},
password:{
    type:String,
    required:true
}, 
role:{ 
    type:Number, 
    default:0
    }
});
module.exports = mongoose.model("user", userSchema);
