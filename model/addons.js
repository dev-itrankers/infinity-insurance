const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id   : mongoose.Schema.Types.ObjectId,
  name  : {
    type      : String,
    required  : true,
    unique    : true,
    lowercase : true
  },
  price : {
    type      : Number,
    required  : true
  }
});


module.exports = mongoose.model("addons",schema);