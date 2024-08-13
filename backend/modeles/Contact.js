const mongoose = require("mongoose");
const schema = mongoose.Schema;
const contactSchema = new schema({
      prenom:{
          type:String,
          required:true,
      },
        nom:{
          type:String,
          required:true,
      },
        tel:{
          type:Number
        },
      email:{
          type:String,
          required:true,
      },
      msg:{
        type:String,
        required:true
    },

})
module.exports = mongoose.model("contact", contactSchema);