const mongoose = require("mongoose");
const user = require("./user");
const schema = mongoose.Schema;
const demandeSchema = new schema({
    cin:{type:String,
        unique:true,
        },
   photo:{
    type:String,     
   },
   desc:{
    type:String,   
   },
    etatdem:{
        type:String,   
       },
       userID: {type:mongoose.Schema.Types.ObjectId,
        ref:user},
})
module.exports = mongoose.model("demande", demandeSchema);