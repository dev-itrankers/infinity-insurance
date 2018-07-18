var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  _id   : mongoose.Schema.Types.ObjectId,
  name  : {
    type      : String,
    require   : true,
    lowercase : true
  }
},{
  versionKey : false
});

module.exports = mongoose.model("variant",schema);