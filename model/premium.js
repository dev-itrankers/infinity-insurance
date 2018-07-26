var mongoose = require("mongoose");

var stringSchema = {
  type      : String,
  require   : true,
  lowercase : true,
}

var numberSchema = {
  type      : Number,
  require : true
}
var objType = {type : mongoose.Schema.Types.ObjectId};

const schema  = new mongoose.Schema({
  _id         : objType,
  idv         : numberSchema,
  pre_date    : Date,
  perod       : numberSchema,
  od          : numberSchema,
  pertd       : numberSchema,
  td          : numberSchema,
  netod       : numberSchema,
  perncb      : numberSchema,
  ncb         : numberSchema,
  todp        : numberSchema,
  un_pass     : numberSchema,
  third_party : numberSchema,
  legal       : numberSchema,
  cpa         : numberSchema,
  np          : numberSchema,
  gst         : numberSchema,
  tcp         : numberSchema,
  addonper    : numberSchema,
  rsa         : numberSchema,
  zerodep     : numberSchema,
  addons      : [{type : mongoose.Schema.Types.ObjectId,ref:"addons"}],
  customer    : {...objType,ref:"customer"},
  user_car    : {...objType,ref:"usercar"}
});

module.exports = mongoose.model("prem",schema);