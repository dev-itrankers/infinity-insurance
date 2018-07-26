const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  _id   : mongoose.Schema.Types.ObjectId,
  make  : {
    type      : String,
    require   : true,
    unique    : true,
    lowercase : true
  }
  ,model : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "model"
  }]
},{
  versionKey : false
});

module.exports = mongoose.model("car",schema);