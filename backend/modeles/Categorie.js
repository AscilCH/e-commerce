const mongoose = require("mongoose");
const schema = mongoose.Schema;
const CategorieSchema = new schema({
///categorieId:{type:Number},
nomtypeCatq:{ type: String},
imagecategorie :{ type: String, required: false }

})
module.exports = mongoose.model("categorie", CategorieSchema);