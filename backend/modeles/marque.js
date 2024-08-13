const mongoose = require("mongoose");
const schema = mongoose.Schema;
const marqueSchema = new schema({
    nomMarq:{type:String,
        unique:true,
        required:true},
   
    imgMarq:{type:String,
        unique:true,
        required:true},
})
module.exports = mongoose.model("marque", marqueSchema);