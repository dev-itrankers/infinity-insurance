const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name: {
    type      : String,
    require   : true,
    lowercase : true
  },
  variant : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "variant"
  }]
},{
  versionKey : false
});

module.exports = mongoose.model("model",schema);