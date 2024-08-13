const mongoose = require("mongoose");
const schema = mongoose.Schema;
const adminSchema = new schema({
  prenomad:{
    type:String,
    required:true,
    
},
  nomad:{
    type:String,
    required:true,
   
},
  telad:{
    type:Number
  },
emailad:{
    type:String,
    required:true,
    unique:true 
},
passwordad:{
    type:String,
    required:true
},
});
module.exports = mongoose.model("admin", adminSchema);
