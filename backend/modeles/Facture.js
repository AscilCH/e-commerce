const mongoose = require("mongoose");
const schema = mongoose.Schema;
const FactureSchema = new schema({
    dateFac: {
        type: Date,
        required: true
      },
      etatcom: {
        type: String,
        required: true
      },
})
module.exports = mongoose.model("facture", FactureSchema);